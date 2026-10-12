/* FoodHub browser database (localStorage) — acts as the backend, no server needed */
const DB = (() => {
  const K = { users: 'fh_users', orders: 'fh_orders', session: 'fh_session', admin: 'fh_admin_hash' };
  const COUPONS = { FOOD50: { discount: 50, min: 299 }, WELCOME100: { discount: 100, min: 499 } };
  const ALIAS = { 'veg noodles': 'veg hakka noodles', 'cheese burger': 'classic cheese burger' };
  const STATUSES = ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
  const ADMIN = { email: 'admin@foodhub.com', password: 'Admin@123' };
  let menu = {};

  const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const err = m => ({ error: m });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  async function hash(p) {                       // SHA-256 password hashing
    const text = 'foodhub_salt' + p;
    if (window.crypto && crypto.subtle) {
      const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
    }
    let h = 0; for (const c of text) h = (h * 31 + c.charCodeAt(0)) | 0; return 'f' + h;   // fallback
  }
  const allItems = () => Object.entries(menu).flatMap(([rest, v]) => v.items.map(i => ({ ...i, rest })));
  function find(it) {
    const items = allItems();
    if (it.id) { const f = items.find(i => i.id === it.id); if (f) return f; }
    const n = (it.name || '').toLowerCase().trim(), t = ALIAS[n] || n;
    return items.find(i => i.name.toLowerCase() === t);
  }

  return {
    STATUSES,
    setMenu(m) { menu = m; },

    /* ---- users ---- */
    async register({ name, email, password }) {
      name = (name || '').trim(); email = (email || '').trim().toLowerCase();
      if (!name || !/^\S+@\S+\.\S+$/.test(email) || (password || '').length < 6) return err('Enter a name, valid email and password (6+ chars)');
      const users = load(K.users, []);
      if (users.some(u => u.email === email)) return err('Email already registered');
      const u = { id: Date.now(), name, email, password: await hash(password) };
      users.push(u); save(K.users, users); save(K.session, { id: u.id, name });
      return { user: { name, email } };
    },
    async login({ email, password }) {
      email = (email || '').trim().toLowerCase();
      const u = load(K.users, []).find(x => x.email === email);
      if (!u || u.password !== await hash(password || '')) return err('Invalid email or password');
      save(K.session, { id: u.id, name: u.name });
      return { user: { name: u.name, email } };
    },
    logout() { localStorage.removeItem(K.session); },
    me() { return load(K.session, null); },

    /* ---- orders (prices are always taken from the menu, never from the cart) ---- */
    async placeOrder(d) {
      const s = load(K.session, null); if (!s) return err('Please login first');
      if (!d.items || !d.items.length) return err('Cart is empty');
      if (!/^\d{10}$/.test(d.phone || '')) return err('Invalid phone number');
      if (!/^\d{6}$/.test(d.pin || '')) return err('Invalid PIN code');
      if (!(d.name || '').trim() || !(d.address || '').trim() || !(d.city || '').trim()) return err('Please fill name, address and city');
      let sub = 0; const lines = [];
      for (const it of d.items) {
        const f = find(it); if (!f) return err('Item not available: ' + it.name);
        const q = Math.max(1, Math.min(20, parseInt(it.qty) || 1));
        sub += f.price * q; lines.push({ name: f.name, price: f.price, qty: q });
      }
      const delivery = sub >= 299 ? 0 : 40, tax = Math.round(sub * 0.05);
      let discount = 0; const code = (d.coupon || '').trim().toUpperCase();
      if (code) {
        const c = COUPONS[code]; if (!c) return err('Invalid coupon code');
        if (sub < c.min) return err('Coupon needs a minimum order of ₹' + c.min);
        discount = c.discount;
      }
      const total = Math.max(0, sub + tax + delivery - discount);
      const orders = load(K.orders, []);
      const order = {
        id: orders.length + 1, order_code: 'FH' + (100000 + Math.floor(Math.random() * 900000)), user_id: s.id,
        customer_name: d.name.trim(), phone: d.phone, address: d.address.trim(), city: d.city.trim(), pin: d.pin,
        payment: ['cod', 'upi', 'card'].includes(d.payment) ? d.payment : 'cod', instructions: d.instructions || '',
        items: lines, subtotal: sub, delivery, tax, discount, total, status: 'placed', created_at: new Date().toISOString()
      };
      orders.push(order); save(K.orders, orders);
      return { id: order.id, order_code: order.order_code, total };
    },
    myOrders() {
      const s = load(K.session, null); if (!s) return [];
      return load(K.orders, []).filter(o => o.user_id === s.id).reverse();
    },
    orderStatus(id) {
      const o = load(K.orders, []).find(x => x.id === id); return o ? { status: o.status } : err('Order not found');
    },

    /* ---- chatbot: answers from the menu data ---- */
    chat(message) {
      const m = (message || '').toLowerCase().trim(), items = allItems();
      const say = answer => ({ matched: true, answer });
      for (const i of items) if (m.includes(i.name.toLowerCase()))
        return say(`🍽️ <strong>${esc(i.name)}</strong> — ₹${i.price}<br>${esc(i.description)}<br>Available at ${esc(i.rest)} (${i.type === 'veg' ? 'Vegetarian' : 'Non-veg'})`);
      for (const [r, v] of Object.entries(menu)) if (m.includes(r.toLowerCase()))
        return say(`🏪 <strong>${esc(r)}</strong><br>${esc(v.info)}<br><br>` + v.items.map(i => `• ${esc(i.name)} — ₹${i.price}`).join('<br>'));
      if (/\b(coupon|coupons|promo|discount)\b/.test(m))
        return say('🎟️ Active coupons:<br>' + Object.entries(COUPONS).map(([c, x]) => `<strong>${c}</strong> — ₹${x.discount} off above ₹${x.min}`).join('<br>'));
      if (/\b(veg|vegetarian)\b/.test(m) && !/non/.test(m)) {
        const seen = new Map(); items.filter(i => i.type === 'veg').forEach(i => seen.set(i.name, i));
        return say('🥗 Vegetarian picks:<br>' + [...seen.values()].slice(0, 8).map(i => `• ${esc(i.name)} — ₹${i.price} (${esc(i.rest)})`).join('<br>'));
      }
      if (/\b(cheap|cheapest|budget|under)\b/.test(m))
        return say('💸 Cheapest dishes:<br>' + [...items].sort((a, b) => a.price - b.price).slice(0, 5).map(i => `• ${esc(i.name)} — ₹${i.price}`).join('<br>'));
      return { matched: false };
    },

    /* ---- admin ---- */
    async adminLogin(email, password) {
      if (!localStorage.getItem(K.admin)) localStorage.setItem(K.admin, await hash(ADMIN.password));
      const ok = (email || '').trim().toLowerCase() === ADMIN.email && localStorage.getItem(K.admin) === await hash(password || '');
      if (ok) sessionStorage.setItem('fh_admin', '1'); return ok;
    },
    isAdmin() { return sessionStorage.getItem('fh_admin') === '1'; },
    adminLogout() { sessionStorage.removeItem('fh_admin'); },
    allOrders() { return load(K.orders, []).slice().reverse(); },
    setStatus(id, status) {
      if (!STATUSES.includes(status)) return;
      const orders = load(K.orders, []), o = orders.find(x => x.id === id);
      if (o) { o.status = status; save(K.orders, orders); }
    },
    resetAll() { [K.users, K.orders, K.session].forEach(k => localStorage.removeItem(k)); }
  };
})();