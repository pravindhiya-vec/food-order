/* FoodHub connector — load AFTER script.js and localdb.js */
let currentUser = null, trackId = null, trackTimer = null;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* give every dish a unique id and hand the menu to the database */
Object.entries(restaurantMenus).forEach(([r, v]) => v.items.forEach(i => i.id = r + '|' + i.name));
DB.setMenu(restaurantMenus);
currentUser = DB.me();

/* cart keeps the item id */
function addToCart(name, price, id) {
  const ex = cart.find(i => id ? i.id === id : i.name === name);
  if (ex) ex.quantity++; else cart.push({ id: id || null, name, price, quantity: 1 });
  updateCart(); openCart();
}
function addMenuItemToCart(index) {
  const item = currentMenuItems[index];
  addToCart(item.name, item.price, item.id);
  showFoodAddedMessage(item.name);
}

/* login / register / account modal */
function authModal() {
  let m = document.getElementById('authModal'); if (m) return m;
  const st = document.createElement('style');
  st.textContent = `#authModal{position:fixed;inset:0;background:rgba(30,15,10,.65);z-index:9500;display:none;align-items:center;justify-content:center}
  #authModal.active{display:flex}#authBox{background:#fff;border-radius:14px;padding:26px;width:min(400px,92%);max-height:85vh;overflow:auto;font-size:13px}
  #authBox input{width:100%;padding:11px;margin:6px 0;border:1px solid #e5d8d1;border-radius:7px}
  #authBox .primary{width:100%;padding:12px;border:none;background:#e94b16;color:#fff;font-weight:bold;border-radius:7px;cursor:pointer;margin-top:8px}
  #authBox .link{background:none;border:none;color:#e94b16;cursor:pointer;margin-top:10px}#authBox .err{color:#d22d20;margin-top:6px}
  #authBox .ord{border-bottom:1px solid #eee;padding:9px 0}`;
  document.head.appendChild(st);
  m = document.createElement('div'); m.id = 'authModal'; m.innerHTML = '<div id="authBox"></div>';
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('active'); });
  document.body.appendChild(m); return m;
}
function showAuth(mode) {
  const m = authModal(), box = document.getElementById('authBox'); m.classList.add('active');
  if (mode === 'account') {
    const orders = DB.myOrders();
    box.innerHTML = `<h2>Hi, ${esc(currentUser.name)} 👋</h2><h4 style="margin:14px 0 4px">My Orders</h4>` +
      (orders.map(o => `<div class="ord"><b>#${esc(o.order_code)}</b> — ₹${o.total} <i>(${esc(o.status.replace(/_/g, ' '))})</i><br><small>${esc(o.items.map(i => i.name + ' x' + i.qty).join(', '))}</small></div>`).join('') || 'No orders yet.') +
      '<button class="primary" id="logoutBtn">Logout</button>';
    document.getElementById('logoutBtn').onclick = () => { DB.logout(); currentUser = null; m.classList.remove('active'); };
    return;
  }
  const reg = mode === 'register';
  box.innerHTML = `<h2>${reg ? 'Create account' : 'Welcome back'}</h2>${reg ? '<input id="aName" placeholder="Full name">' : ''}
    <input id="aEmail" type="email" placeholder="Email"><input id="aPass" type="password" placeholder="Password (6+ chars)">
    <button class="primary" id="aGo">${reg ? 'REGISTER' : 'LOGIN'}</button><div class="err" id="aErr"></div>
    <button class="link" id="aSwitch">${reg ? 'Already have an account? Login' : 'New here? Register'}</button>`;
  document.getElementById('aSwitch').onclick = () => showAuth(reg ? 'login' : 'register');
  document.getElementById('aGo').onclick = async () => {
    const data = { email: aEmail.value, password: aPass.value }; if (reg) data.name = aName.value;
    const r = reg ? await DB.register(data) : await DB.login(data);
    if (r.error) { document.getElementById('aErr').textContent = r.error; return; }
    currentUser = DB.me(); m.classList.remove('active');
  };
}
function loginUser() { showAuth(currentUser ? 'account' : 'login'); }

/* place order */
async function placeOrder() {
  if (!currentUser) { alert('Please login to place your order.'); closeCheckout(); loginUser(); return; }
  const v = id => document.getElementById(id).value.trim();
  if (!v('customerName')) return alert('Please enter your name.');
  if (!/^[0-9]{10}$/.test(v('customerPhone'))) return alert('Please enter a valid 10-digit phone number.');
  if (!v('customerAddress')) return alert('Please enter your delivery address.');
  if (!v('customerCity')) return alert('Please enter your city.');
  if (!/^[0-9]{6}$/.test(v('customerPin'))) return alert('Please enter a valid 6-digit PIN code.');
  const res = await DB.placeOrder({
    items: cart.map(i => ({ id: i.id, name: i.name, qty: i.quantity })),
    name: v('customerName'), phone: v('customerPhone'), address: v('customerAddress'), city: v('customerCity'),
    pin: v('customerPin'), instructions: v('specialInstructions'),
    payment: document.querySelector('input[name="payment"]:checked').value, coupon: v('couponInput')
  });
  if (res.error) return alert(res.error);
  trackId = res.id;
  document.getElementById('generatedOrderId').innerText = '#' + res.order_code;
  document.getElementById('trackingOrderId').innerText = 'Order #' + res.order_code;
  document.getElementById('successAddress').innerText = v('customerAddress') + ', ' + v('customerCity');
  document.getElementById('checkoutPage').classList.remove('active');
  document.getElementById('orderSuccessPage').classList.add('active');
  cart.length = 0; appliedDiscount = 0; updateCart();
}

/* live tracking — follows the status the admin sets */
const STEP = { placed: 0, accepted: 1, preparing: 2, out_for_delivery: 3, delivered: 4 };
function paintTracking(status) {
  const idx = STEP[status] ?? 0, steps = document.querySelectorAll('.tracking-step'), lines = document.querySelectorAll('.tracking-line');
  steps.forEach((s, i) => { s.classList.toggle('completed', i < idx || idx === 4); s.classList.toggle('active', i === idx && idx < 4); });
  lines.forEach((l, i) => { l.classList.toggle('completed-line', i < idx); l.classList.toggle('active-line', i === idx && idx < 4); });
  if (status === 'cancelled') document.querySelector('.tracking-header h1').innerText = 'This order was cancelled ❌';
}
function pollStatus() { if (trackId) { const r = DB.orderStatus(trackId); if (r.status) paintTracking(r.status); } }
const _showTracking = showOrderTracking;
showOrderTracking = function () { _showTracking(); pollStatus(); clearInterval(trackTimer); trackTimer = setInterval(pollStatus, 3000); };
const _closeTracking = closeTracking;
closeTracking = function () { _closeTracking(); clearInterval(trackTimer); };

/* chatbot: safe user text + menu-based answers */
function addUserMessage(message) {
  const chat = document.getElementById('chatMessages'), d = document.createElement('div'), p = document.createElement('p');
  d.className = 'user-message'; p.textContent = message; d.appendChild(p); chat.appendChild(d); scrollChat();
}
function sendMessage() {
  const input = document.getElementById('chatInput'), message = input.value.trim();
  if (!message) return;
  addUserMessage(message); input.value = '';
  showTyping(() => {
    const r = DB.chat(message);
    if (r.matched) addBotMessage(r.answer); else processUserMessage(message);
  });
}