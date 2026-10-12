let cart = [];


/* ================= SEARCH ================= */

function toggleSearch() {

    const searchArea =
        document.getElementById("searchArea");

    searchArea.classList.toggle("active");

    if (searchArea.classList.contains("active")) {

        document
            .getElementById("searchInput")
            .focus();

    }
}


function searchRestaurants() {

    const input =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const restaurants =
        document.querySelectorAll(
            ".restaurant-card"
        );

    restaurants.forEach(restaurant => {

        const text =
            restaurant.innerText.toLowerCase();

        restaurant.style.display =
            text.includes(input)
            ? "block"
            : "none";

    });
}


/* ================= CATEGORY ================= */

function filterCategory(category) {

    const restaurants =
        document.querySelectorAll(
            ".restaurant-card"
        );

    restaurants.forEach(restaurant => {

        const categories =
            restaurant.dataset.category;

        if (categories.includes(category)) {

            restaurant.style.display = "block";

        } else {

            restaurant.style.display = "none";

        }

    });

    document
        .getElementById("restaurants")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function showAllRestaurants() {

    document
        .querySelectorAll(".restaurant-card")
        .forEach(card => {

            card.style.display = "block";

        });
}


/* ================= SCROLL ================= */

function scrollToRestaurants() {

    document
        .getElementById("restaurants")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= RESTAURANT ================= */

/* =====================================================
   RESTAURANT MENUS
===================================================== */


const restaurantMenus = {

    "Spice Garden": {

        type: "BIRYANI • SOUTH INDIAN",

        info: "Authentic Indian flavours • 35 mins • ★ 4.5",

        items: [

            {
                name: "Chicken Biryani",
                price: 220,
                type: "nonveg",
                category: "bestseller",
                description:
                    "Aromatic basmati rice cooked with tender chicken and spices.",
                image:
                    "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Mutton Biryani",
                price: 290,
                type: "nonveg",
                category: "bestseller",
                description:
                    "Rich and flavourful biryani with tender mutton.",
                image:
                    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Paneer Biryani",
                price: 190,
                type: "veg",
                category: "veg",
                description:
                    "Fragrant basmati rice with soft paneer and aromatic spices.",
                image:
                    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Masala Dosa",
                price: 90,
                type: "veg",
                category: "veg",
                description:
                    "Crispy dosa filled with delicious potato masala.",
                image:
                    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken 65",
                price: 180,
                type: "nonveg",
                category: "nonveg",
                description:
                    "Crispy fried chicken tossed with aromatic Indian spices.",
                image:
                    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Gulab Jamun",
                price: 70,
                type: "veg",
                category: "dessert",
                description:
                    "Soft milk dumplings soaked in warm sugar syrup.",
                image:
                    "https://images.unsplash.com/photo-1601303516534-7f9b8c8e9c9a?auto=format&fit=crop&w=500&q=85"
            }

        ]

    },


    "Pizza Corner": {

        type: "PIZZA • ITALIAN • FAST FOOD",

        info: "Freshly baked pizzas • 30 mins • ★ 4.4",

        items: [

            {
                name: "Farmhouse Pizza",
                price: 299,
                type: "veg",
                category: "bestseller",
                description:
                    "Loaded with fresh vegetables and mozzarella cheese.",
                image:
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Margherita Pizza",
                price: 249,
                type: "veg",
                category: "veg",
                description:
                    "Classic pizza with tomato, basil and mozzarella.",
                image:
                    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken Pepperoni",
                price: 349,
                type: "nonveg",
                category: "nonveg",
                description:
                    "Cheesy pizza topped with chicken pepperoni.",
                image:
                    "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Paneer Tikka Pizza",
                price: 329,
                type: "veg",
                category: "veg",
                description:
                    "Indian-style pizza with spicy paneer tikka.",
                image:
                    "https://images.unsplash.com/photo-1593560708920-61dd98c8a58d?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Cheese Burst Pizza",
                price: 319,
                type: "veg",
                category: "bestseller",
                description:
                    "Extra cheesy pizza with a delicious cheese-filled crust.",
                image:
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chocolate Lava Cake",
                price: 129,
                type: "veg",
                category: "dessert",
                description:
                    "Warm chocolate cake with a gooey centre.",
                image:
                    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=85"
            }

        ]

    },


    "Burger House": {

        type: "BURGERS • FAST FOOD",

        info: "Juicy burgers • 25 mins • ★ 4.6",

        items: [

            {
                name: "Classic Cheese Burger",
                price: 149,
                type: "veg",
                category: "bestseller",
                description:
                    "Crispy patty with fresh vegetables and melted cheese.",
                image:
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken Burger",
                price: 179,
                type: "nonveg",
                category: "nonveg",
                description:
                    "Juicy chicken patty with fresh lettuce and sauce.",
                image:
                    "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Double Cheese Burger",
                price: 229,
                type: "veg",
                category: "bestseller",
                description:
                    "Double patty burger loaded with cheese.",
                image:
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Peri Peri Fries",
                price: 119,
                type: "veg",
                category: "veg",
                description:
                    "Crispy golden fries with spicy peri-peri seasoning.",
                image:
                    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken Nuggets",
                price: 159,
                type: "nonveg",
                category: "nonveg",
                description:
                    "Crispy golden chicken nuggets served with dip.",
                image:
                    "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chocolate Brownie",
                price: 99,
                type: "veg",
                category: "dessert",
                description:
                    "Rich and fudgy chocolate brownie.",
                image:
                    "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=85"
            }

        ]

    },


    "Dragon Wok": {

        type: "CHINESE • ASIAN",

        info: "Authentic Asian flavours • 40 mins • ★ 4.3",

        items: [

            {
                name: "Veg Hakka Noodles",
                price: 180,
                type: "veg",
                category: "bestseller",
                description:
                    "Classic noodles tossed with fresh vegetables.",
                image:
                    "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken Noodles",
                price: 220,
                type: "nonveg",
                category: "nonveg",
                description:
                    "Hot and spicy noodles with tender chicken.",
                image:
                    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Veg Fried Rice",
                price: 170,
                type: "veg",
                category: "veg",
                description:
                    "Fried rice tossed with vegetables and sauces.",
                image:
                    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chicken Fried Rice",
                price: 210,
                type: "nonveg",
                category: "bestseller",
                description:
                    "Flavourful fried rice with chicken and vegetables.",
                image:
                    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Spring Rolls",
                price: 140,
                type: "veg",
                category: "veg",
                description:
                    "Crispy rolls filled with seasoned vegetables.",
                image:
                    "https://images.unsplash.com/photo-1548507200-d4e5f2d5c3c1?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Mango Pudding",
                price: 120,
                type: "veg",
                category: "dessert",
                description:
                    "Smooth and creamy mango dessert.",
                image:
                    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=85"
            }

        ]

    },


    "Sweet Treats": {

        type: "DESSERTS • CAKES • ICE CREAM",

        info: "Sweet treats for every mood • 20 mins • ★ 4.7",

        items: [

            {
                name: "Chocolate Cake",
                price: 180,
                type: "veg",
                category: "bestseller",
                description:
                    "Rich chocolate cake with creamy chocolate frosting.",
                image:
                    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Red Velvet Cake",
                price: 220,
                type: "veg",
                category: "bestseller",
                description:
                    "Soft red velvet cake with cream cheese frosting.",
                image:
                    "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chocolate Brownie",
                price: 120,
                type: "veg",
                category: "dessert",
                description:
                    "Warm fudgy brownie loaded with chocolate.",
                image:
                    "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Strawberry Cheesecake",
                price: 240,
                type: "veg",
                category: "dessert",
                description:
                    "Creamy cheesecake topped with fresh strawberries.",
                image:
                    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Vanilla Ice Cream",
                price: 90,
                type: "veg",
                category: "dessert",
                description:
                    "Classic creamy vanilla ice cream.",
                image:
                    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Chocolate Sundae",
                price: 150,
                type: "veg",
                category: "dessert",
                description:
                    "Chocolate ice cream topped with chocolate sauce.",
                image:
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=85"
            }

        ]

    },


    "Madras Tiffin": {

        type: "SOUTH INDIAN • BREAKFAST",

        info: "Traditional South Indian food • 28 mins • ★ 4.5",

        items: [

            {
                name: "Masala Dosa",
                price: 90,
                type: "veg",
                category: "bestseller",
                description:
                    "Crispy dosa filled with spicy potato masala.",
                image:
                    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Idli Sambar",
                price: 70,
                type: "veg",
                category: "veg",
                description:
                    "Soft steamed idlis served with hot sambar.",
                image:
                    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Pongal",
                price: 80,
                type: "veg",
                category: "bestseller",
                description:
                    "Traditional South Indian rice and lentil dish.",
                image:
                    "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Poori Masala",
                price: 85,
                type: "veg",
                category: "veg",
                description:
                    "Fluffy puris served with potato masala.",
                image:
                    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Vada",
                price: 60,
                type: "veg",
                category: "veg",
                description:
                    "Crispy South Indian lentil fritters.",
                image:
                    "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=500&q=85"
            },

            {
                name: "Kesari",
                price: 65,
                type: "veg",
                category: "dessert",
                description:
                    "Sweet and aromatic semolina dessert.",
                image:
                    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=85"
            }

        ]

    }

};
/* =====================================================
   OPEN RESTAURANT MENU
===================================================== */

let currentRestaurant = "";

let currentMenuItems = [];


function openRestaurant(name) {

    const restaurant =
        restaurantMenus[name];

    if (!restaurant) {

        alert(
            "Restaurant menu is currently unavailable."
        );

        return;

    }


    currentRestaurant = name;

    currentMenuItems =
        restaurant.items;


    document.getElementById(
        "menuRestaurantName"
    ).innerText = name;


    document.getElementById(
        "menuRestaurantType"
    ).innerText = restaurant.type;


    document.getElementById(
        "menuRestaurantInfo"
    ).innerText = restaurant.info;


    document.getElementById(
        "menuSearchInput"
    ).value = "";


    renderMenuItems(
        currentMenuItems
    );


    document
        .getElementById("menuOverlay")
        .classList.add("active");


    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE MENU
===================================================== */

function closeMenu(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {

        return;

    }


    document
        .getElementById("menuOverlay")
        .classList.remove("active");


    document.body.style.overflow = "auto";

}


/* =====================================================
   RENDER FOOD ITEMS
===================================================== */

function renderMenuItems(items) {

    const container =
        document.getElementById("menuItems");


    if (items.length === 0) {

        container.innerHTML = `

            <div class="no-food-found">

                <i class="fa-solid fa-face-sad-tear"></i>

                <h3>
                    No dishes found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    items.forEach((item, index) => {

        const food =
            document.createElement("div");


        food.className =
            "menu-food-item";


        const badge =
            item.category === "bestseller"
                ? "BESTSELLER"
                : "";


        food.innerHTML = `

            <div
                class="menu-food-image"
                style="
                    background-image:
                    url('${item.image}')
                "
            >

                ${
                    badge
                    ? `<span>${badge}</span>`
                    : ""
                }

            </div>


            <div class="menu-food-details">

                <div
                    class="food-type ${item.type}"
                >

                    ${
                        item.type === "veg"
                        ? "● VEGETARIAN"
                        : "● NON-VEGETARIAN"
                    }

                </div>


                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${item.description}
                </p>


                <div class="menu-food-bottom">

                    <strong class="menu-food-price">

                        ₹${item.price}

                    </strong>


                    <button
                        class="add-food-button"
                        onclick="
                            addMenuItemToCart(
                                ${index}
                            )
                        "
                    >

                        ADD +

                    </button>

                </div>

            </div>

        `;


        container.appendChild(food);

    });

}


/* =====================================================
   ADD MENU ITEM TO CART
===================================================== */

function addMenuItemToCart(index) {

    const item =
        currentMenuItems[index];


    addToCart(
        item.name,
        item.price
    );


    /* Small confirmation */

    showFoodAddedMessage(
        item.name
    );

}


/* =====================================================
   FOOD ADDED MESSAGE
===================================================== */

function showFoodAddedMessage(name) {

    const message =
        document.createElement("div");


    message.style.position =
        "fixed";

    message.style.bottom =
        "100px";

    message.style.left =
        "50%";

    message.style.transform =
        "translateX(-50%)";

    message.style.background =
        "#29130b";

    message.style.color =
        "white";

    message.style.padding =
        "13px 22px";

    message.style.borderRadius =
        "30px";

    message.style.fontSize =
        "12px";

    message.style.zIndex =
        "6000";

    message.innerHTML = `

        ✓ ${name} added to cart

    `;


    document.body.appendChild(message);


    setTimeout(() => {

        message.remove();

    }, 1800);

}


/* =====================================================
   MENU CATEGORY FILTER
===================================================== */
function filterMenuItems(category) {

    const buttons =
        document.querySelectorAll(
            ".menu-categories button"
        );


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    const clickedButton =
        Array.from(buttons).find(button => {

            return button.innerText
                .toLowerCase()
                .includes(
                    category === "all"
                    ? "all"
                    : category === "veg"
                    ? "veg"
                    : category === "nonveg"
                    ? "non"
                    : category === "bestseller"
                    ? "best"
                    : "dessert"
                );

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    if (category === "all") {

        renderMenuItems(currentMenuItems);

        return;

    }


    const filtered =
        currentMenuItems.filter(item => {

            return (
                item.category === category ||
                item.type === category
            );

        });


    renderMenuItems(filtered);

}


/* =====================================================
   MENU SEARCH
===================================================== */

function searchMenuItems() {

    const search =
        document
        .getElementById(
            "menuSearchInput"
        )
        .value
        .toLowerCase();


    const filtered =
        currentMenuItems.filter(item => {

            return (

                item.name
                    .toLowerCase()
                    .includes(search)

                ||

                item.description
                    .toLowerCase()
                    .includes(search)

            );

        });


    renderMenuItems(filtered);

}


/* ================= CART ================= */

function addToCart(name, price) {

    const existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


function updateCart() {

    let itemCount = 0;

    let subtotal = 0;

    cart.forEach(item => {

        itemCount += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });


    document.getElementById("cartCount")
        .innerText = itemCount;


    document.getElementById("subtotal")
        .innerText = "₹" + subtotal;


    let delivery = subtotal === 0
        ? 0
        : subtotal >= 299
            ? 0
            : 40;


    document.getElementById("deliveryFee")
        .innerText =
        delivery === 0
        ? "FREE"
        : "₹" + delivery;


    document.getElementById("total")
        .innerText =
        "₹" + (subtotal + delivery);


    displayCart();
}


/* ================= DISPLAY CART ================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious food
                    to get started.
                </p>

            </div>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <small>
                    ₹${item.price} each
                </small>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeItem(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>

        `;


        cartItems.appendChild(div);

    });

}


/* ================= QUANTITY ================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* ================= LOGIN ================= */

function loginUser() {

    alert(
        "FOODHUB LOGIN\n\n" +
        "Login/Register page will be connected " +
        "to the database in the next stage."
    );

}



/* =====================================================
   FOODHUB AI ASSISTANT
===================================================== */


/* ================= OPEN / CLOSE CHAT ================= */

function toggleChatbot() {

    const chatbot =
        document.getElementById("chatbot");

    chatbot.classList.toggle("active");

}


/* ================= ADD USER MESSAGE ================= */

function addUserMessage(message) {

    const chat =
        document.getElementById("chatMessages");


    const div =
        document.createElement("div");

    div.className = "user-message";


    div.innerHTML = `

        <p>${message}</p>

    `;


    chat.appendChild(div);

    scrollChat();

}


/* ================= ADD BOT MESSAGE ================= */

function addBotMessage(message) {

    const chat =
        document.getElementById("chatMessages");


    const div =
        document.createElement("div");

    div.className = "bot-message";


    div.innerHTML = `

        <div class="message-icon">
            🤖
        </div>

        <div class="message-content">

            <p>
                ${message}
            </p>

        </div>

    `;


    chat.appendChild(div);

    scrollChat();

}


/* ================= TYPING EFFECT ================= */

function showTyping(callback) {

    const chat =
        document.getElementById("chatMessages");


    const typing =
        document.createElement("div");

    typing.className = "bot-message";

    typing.id = "typing";


    typing.innerHTML = `

        <div class="message-icon">
            🤖
        </div>

        <div class="typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;


    chat.appendChild(typing);

    scrollChat();


    setTimeout(() => {

        typing.remove();

        callback();

    }, 700);

}


/* ================= SCROLL ================= */

function scrollChat() {

    const chat =
        document.getElementById("chatMessages");

    chat.scrollTop =
        chat.scrollHeight;

}


/* ================= MOOD ================= */

function botMood() {

    addUserMessage(
        "I want food based on my mood 😊"
    );


    showTyping(() => {

        addBotMessage(`

            <strong>How are you feeling today?</strong>

            <div class="mood-options">

                <button onclick="selectMood('happy')">
                    😊 Happy
                </button>

                <button onclick="selectMood('sad')">
                    😢 Sad
                </button>

                <button onclick="selectMood('tired')">
                    😴 Tired
                </button>

                <button onclick="selectMood('stressed')">
                    😫 Stressed
                </button>

                <button onclick="selectMood('romantic')">
                    ❤️ Romantic
                </button>

                <button onclick="selectMood('sick')">
                    🤒 Not feeling well
                </button>

            </div>

        `);

    });

}


/* ================= MOOD SELECTION ================= */

function selectMood(mood) {

    const moodNames = {

        happy: "Happy 😊",

        sad: "Sad 😢",

        tired: "Tired 😴",

        stressed: "Stressed 😫",

        romantic: "Romantic ❤️",

        sick: "Not feeling well 🤒"

    };


    addUserMessage(
        "I'm feeling " + moodNames[mood]
    );


    showTyping(() => {

        let recommendation = "";


        if (mood === "happy") {

            recommendation = `

                <strong>You're happy! 🎉</strong>

                <br><br>

                Let's celebrate with something delicious!

                <br><br>

                🍕 Farmhouse Pizza<br>
                🍔 Cheese Burger<br>
                🍰 Chocolate Cake<br>
                🍦 Ice Cream

                <br><br>

                <button
                    class="quick-options button"
                    onclick="scrollToRestaurants()">

                    Explore Food

                </button>

            `;

        }


        else if (mood === "sad") {

            recommendation = `

                <strong>I'm sorry you're feeling down 💛</strong>

                <br><br>

                How about some comforting food?

                <br><br>

                🍛 Chicken Biryani<br>
                🍜 Hot Noodles<br>
                🍫 Chocolate Dessert<br>
                🍕 Cheesy Pizza

                <br><br>

                <em>
                A delicious meal might make your
                evening a little better! 😊
                </em>

            `;

        }


        else if (mood === "tired") {

            recommendation = `

                <strong>Feeling tired? 😴</strong>

                <br><br>

                Let's keep it simple and satisfying.

                <br><br>

                🥪 Sandwich<br>
                🍔 Burger<br>
                🥤 Cold Coffee<br>
                🍜 Noodles

                <br><br>

                <strong>
                Quick meals are the way to go!
                </strong>

            `;

        }


        else if (mood === "stressed") {

            recommendation = `

                <strong>Take a little break. 🧘</strong>

                <br><br>

                Here's some comfort food for you:

                <br><br>

                🍛 Spicy Biryani<br>
                🍜 Schezwan Noodles<br>
                🍕 Cheese Pizza<br>
                🍰 Dessert

                <br><br>

                <em>
                Don't forget to relax while your
                food is being prepared. ❤️
                </em>

            `;

        }


        else if (mood === "romantic") {

            recommendation = `

                <strong>Planning something special? ❤️</strong>

                <br><br>

                Try these:

                <br><br>

                🍝 Pasta<br>
                🍕 Gourmet Pizza<br>
                🍰 Chocolate Cake<br>
                🥤 Mocktails

                <br><br>

                <strong>
                Perfect for a cozy evening! ✨
                </strong>

            `;

        }


        else if (mood === "sick") {

            recommendation = `

                <strong>
                Take care of yourself! 💙
                </strong>

                <br><br>

                You may prefer something light:

                <br><br>

                🥣 Soup<br>
                🥞 Idli<br>
                🍚 Curd Rice<br>
                🥗 Light Meals

                <br><br>

                <em>
                If you're seriously unwell, consider
                getting appropriate medical advice.
                </em>

            `;

        }


        addBotMessage(recommendation);

    });

}


/* ================= FOOD SUGGESTION ================= */

function botFoodSuggestion() {

    addUserMessage(
        "Suggest something delicious 🍔"
    );


    showTyping(() => {

        addBotMessage(`

            <strong>
            Here are today's FoodHub picks 🔥
            </strong>

            <br><br>

            🥇 Chicken Biryani — ₹220<br>

            🥈 Cheese Burger — ₹149<br>

            🥉 Farmhouse Pizza — ₹299<br>

            ⭐ Veg Noodles — ₹180

            <br><br>

            What type of food are you looking for?

            <div class="quick-options">

                <button onclick="foodType('veg')">
                    🥗 Vegetarian
                </button>

                <button onclick="foodType('nonveg')">
                    🍗 Non-Veg
                </button>

                <button onclick="foodType('spicy')">
                    🌶️ Spicy
                </button>

                <button onclick="foodType('dessert')">
                    🍰 Dessert
                </button>

            </div>

        `);

    });

}


/* ================= FOOD TYPE ================= */

function foodType(type) {

    addUserMessage(
        "Show me " + type + " food"
    );


    showTyping(() => {

        let response = "";


        if (type === "veg") {

            response =
                "🥗 Try Paneer Biryani, Veg Noodles, Masala Dosa or Farmhouse Pizza.";

        }


        else if (type === "nonveg") {

            response =
                "🍗 Try Chicken Biryani, Chicken Burger, Chicken 65 or Chicken Noodles.";

        }


        else if (type === "spicy") {

            response =
                "🌶️ Try Schezwan Noodles, Spicy Biryani, Peri-Peri Pizza or Chilli Chicken.";

        }


        else {

            response =
                "🍰 Try Chocolate Cake, Brownie, Ice Cream, Cheesecake or Gulab Jamun.";

        }


        addBotMessage(response);

    });

}


/* ================= ORDER HELP ================= */

function botOrderHelp() {

    addUserMessage(
        "I need help with my order 📦"
    );


    showTyping(() => {

        addBotMessage(`

            <strong>
            Sure! I can help you with your order.
            </strong>

            <br><br>

            What seems to be the problem?

            <div class="quick-options">

                <button onclick="orderIssue('track')">
                    📍 Track Order
                </button>

                <button onclick="orderIssue('late')">
                    ⏰ Order is Late
                </button>

                <button onclick="orderIssue('wrong')">
                    ❌ Wrong Food
                </button>

                <button onclick="orderIssue('missing')">
                    📦 Missing Item
                </button>

                <button onclick="orderIssue('cancel')">
                    🚫 Cancel Order
                </button>

                <button onclick="orderIssue('refund')">
                    💰 Refund
                </button>

            </div>

        `);

    });

}


/* ================= ORDER ISSUE ================= */

function orderIssue(issue) {

    const names = {

        track: "Track my order",

        late: "My order is late",

        wrong: "I received the wrong food",

        missing: "An item is missing",

        cancel: "I want to cancel my order",

        refund: "I want a refund"

    };


    addUserMessage(
        names[issue]
    );


    showTyping(() => {

        let response = "";


        if (issue === "track") {

            response = `

                📍 <strong>Order Tracking</strong>

                <br><br>

                Your order tracking feature will
                show:

                <br><br>

                ✓ Order Confirmed<br>
                ✓ Restaurant Preparing<br>
                ✓ Out for Delivery<br>
                ✓ Delivered

                <br><br>

                Your live tracking system can be
                connected to the backend later.

            `;

        }


        else if (issue === "late") {

            response = `

                ⏰ <strong>Order Delayed</strong>

                <br><br>

                I'm sorry about the delay.

                <br><br>

                Please check your order status.
                If the estimated delivery time has
                passed, you can contact support.

                <br><br>

                <button onclick="contactSupport()">
                    🆘 Contact Support
                </button>

            `;

        }


        else if (issue === "wrong") {

            response = `

                ❌ <strong>Wrong Item Received</strong>

                <br><br>

                Sorry about that!

                <br><br>

                Please report the incorrect item
                through the order support section.

                <br><br>

                We can then review the order and
                assist with a replacement/refund.

            `;

        }


        else if (issue === "missing") {

            response = `

                📦 <strong>Missing Item</strong>

                <br><br>

                Please check your order summary
                first.

                <br><br>

                If the item is missing, report it
                through order support.

            `;

        }


        else if (issue === "cancel") {

            response = `

                🚫 <strong>Cancel Order</strong>

                <br><br>

                If the restaurant has not started
                preparing your order, cancellation
                may be possible.

                <br><br>

                Please open your order and select
                <strong>Cancel Order</strong>.

            `;

        }


        else if (issue === "refund") {

            response = `

                💰 <strong>Refund Assistance</strong>

                <br><br>

                Refund eligibility depends on the
                order issue and payment status.

                <br><br>

                Please select the relevant order
                and choose <strong>Help</strong>.

            `;

        }


        addBotMessage(response);

    });

}


/* ================= OFFERS ================= */

function botOffers() {

    addUserMessage(
        "What offers are available? 🎁"
    );


    showTyping(() => {

        addBotMessage(`

            🎁 <strong>Today's FoodHub Offers</strong>

            <br><br>

            🔥 <strong>20% OFF</strong><br>
            On your first order

            <br><br>

            🍕 <strong>UP TO 50% OFF</strong><br>
            Weekend specials

            <br><br>

            🛵 <strong>FREE DELIVERY</strong><br>
            On orders above ₹299

            <br><br>

            💳 Extra offers may be available
            depending on your payment method.

        `);

    });

}


/* ================= SUPPORT ================= */

function contactSupport() {

    addUserMessage(
        "I want to contact support"
    );


    showTyping(() => {

        addBotMessage(`

            🆘 <strong>FoodHub Support</strong>

            <br><br>

            I can help you resolve common
            ordering problems.

            <br><br>

            For this project, you can later
            connect this section to:

            <br><br>

            📧 Customer Support<br>
            📞 Support Number<br>
            💬 Live Agent<br>
            🎫 Raise a Ticket

        `);

    });

}


/* ================= NORMAL CHAT ================= */

function sendMessage() {

    const input =
        document.getElementById("chatInput");


    const message =
        input.value.trim();


    if (message === "") {

        return;

    }


    addUserMessage(message);

    input.value = "";


    showTyping(() => {

        processUserMessage(message);

    });

}


/* ================= ENTER KEY ================= */

function handleChatKey(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


/* ================= CHATBOT LOGIC ================= */

function processUserMessage(message) {

    const text =
        message.toLowerCase();


    /* MOOD */

    if (
        text.includes("sad") ||
        text.includes("happy") ||
        text.includes("tired") ||
        text.includes("stressed") ||
        text.includes("mood") ||
        text.includes("feeling")
    ) {

        botMood();

        return;

    }


    /* ORDER TRACKING */

    if (
        text.includes("track") ||
        text.includes("where is my order") ||
        text.includes("order status")
    ) {

        orderIssue("track");

        return;

    }


    /* CANCEL */

    if (
        text.includes("cancel")
    ) {

        orderIssue("cancel");

        return;

    }


    /* REFUND */

    if (
        text.includes("refund") ||
        text.includes("money back")
    ) {

        orderIssue("refund");

        return;

    }


    /* LATE ORDER */

    if (
        text.includes("late") ||
        text.includes("delay")
    ) {

        orderIssue("late");

        return;

    }


    /* WRONG FOOD */

    if (
        text.includes("wrong food") ||
        text.includes("wrong item")
    ) {

        orderIssue("wrong");

        return;

    }


    /* OFFERS */

    if (
        text.includes("offer") ||
        text.includes("discount") ||
        text.includes("coupon")
    ) {

        botOffers();

        return;

    }


    /* FOOD */

    if (
        text.includes("food") ||
        text.includes("eat") ||
        text.includes("hungry") ||
        text.includes("recommend")
    ) {

        botFoodSuggestion();

        return;

    }


    /* RESTAURANT */

    if (
        text.includes("restaurant") ||
        text.includes("restaurants")
    ) {

        addBotMessage(`

            🏪 We have several restaurants
            available on FoodHub.

            <br><br>

            🍛 Spice Garden<br>
            🍕 Pizza Corner<br>
            🍔 Burger House<br>
            🍜 Dragon Wok<br>
            🍰 Sweet Treats<br>
            🥞 Madras Tiffin

            <br><br>

            You can browse all restaurants
            in the <strong>Restaurants</strong>
            section.

        `);

        return;

    }


    /* GREETING */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        addBotMessage(`

            Hello! 👋

            <br><br>

            Welcome to <strong>FoodHub</strong>!

            <br><br>

            I can help you:

            <br><br>

            🍔 Choose food<br>
            😊 Suggest food based on mood<br>
            🏪 Find restaurants<br>
            📦 Track orders<br>
            ❌ Solve order problems<br>
            🎁 Find offers

        `);

        return;

    }


    /* THANK YOU */

    if (
        text.includes("thank")
    ) {

        addBotMessage(
            "You're very welcome! 😊 Enjoy your meal! 🍽️"
        );

        return;

    }


    /* DEFAULT */

    addBotMessage(`

        I'm here to help! 😊

        <br><br>

        You can ask me things like:

        <br><br>

        • "Suggest something to eat"<br>
        • "I'm feeling sad"<br>
        • "Where is my order?"<br>
        • "My order is late"<br>
        • "I want a refund"<br>
        • "What offers are available?"<br>
        • "Show me restaurants"

    `);

}
/* =====================================================
   CHECKOUT
===================================================== */

let appliedDiscount = 0;

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;


/* ================= OPEN CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!\n\n" +
            "Please add food before checkout."
        );

        return;
    }


    const checkoutPage =
        document.getElementById("checkoutPage");


    if (!checkoutPage) {

        alert(
            "Checkout page was not found."
        );

        return;
    }


    checkoutPage.classList.add("active");

    document.body.style.overflow = "hidden";


    loadCheckoutItems();
}


/* ================= LOAD CHECKOUT ITEMS ================= */

function loadCheckoutItems() {

    const container =
        document.getElementById("checkoutItems");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    let subtotal = 0;

    let totalItems = 0;


    cart.forEach(item => {

        const quantity =
            item.quantity || 1;


        const itemTotal =
            item.price * quantity;


        subtotal += itemTotal;

        totalItems += quantity;


        const div =
            document.createElement("div");


        div.className =
            "checkout-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    Qty: ${quantity}
                </small>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>

        `;


        container.appendChild(div);

    });


    const count =
        document.getElementById(
            "checkoutItemCount"
        );


    if (count) {

        count.innerText =
            totalItems +
            (
                totalItems === 1
                    ? " item"
                    : " items"
            );

    }


    updateCheckoutPrice(subtotal);
}


/* ================= CHECKOUT PRICE ================= */

function updateCheckoutPrice(subtotal) {

    const tax =
        Math.round(
            subtotal * TAX_RATE
        );


    const delivery =
        subtotal >= 299
            ? 0
            : DELIVERY_FEE;


    const total =
        subtotal +
        tax +
        delivery -
        appliedDiscount;


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "checkoutDelivery"
        );


    const taxElement =
        document.getElementById(
            "checkoutTax"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" + subtotal;

    }


    if (deliveryElement) {

        deliveryElement.innerText =
            delivery === 0
                ? "FREE"
                : "₹" + delivery;

    }


    if (taxElement) {

        taxElement.innerText =
            "₹" + tax;

    }


    if (totalElement) {

        totalElement.innerText =
            "₹" + Math.max(total, 0);

    }


    const discountElement =
        document.getElementById(
            "checkoutDiscount"
        );


    if (discountElement) {

        discountElement.innerText =
            "-₹" + appliedDiscount;

    }

}


/* ================= CALCULATE SUBTOTAL ================= */

function calculateCartSubtotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (
                    item.price *
                    (item.quantity || 1)
                );

        },
        0
    );
}


/* ================= APPLY COUPON ================= */

function applyCoupon() {

    const input =
        document.getElementById(
            "couponInput"
        );


    const message =
        document.getElementById(
            "couponMessage"
        );


    if (!input || !message) {
        return;
    }


    const code =
        input.value
            .trim()
            .toUpperCase();


    const subtotal =
        calculateCartSubtotal();


    if (code === "FOOD50") {

        if (subtotal < 299) {

            appliedDiscount = 0;

            message.innerText =
                "Minimum order value is ₹299.";

            message.style.color =
                "#d22d20";

            updateCheckoutPrice(
                subtotal
            );

            return;
        }


        appliedDiscount = 50;


        message.innerText =
            "✓ Coupon applied! You saved ₹50.";


        message.style.color =
            "#168247";


        updateCheckoutPrice(
            subtotal
        );


        return;
    }


    if (code === "WELCOME100") {

        if (subtotal < 499) {

            appliedDiscount = 0;

            message.innerText =
                "Minimum order value is ₹499.";

            message.style.color =
                "#d22d20";

            updateCheckoutPrice(
                subtotal
            );

            return;
        }


        appliedDiscount = 100;


        message.innerText =
            "✓ Welcome offer applied!";


        message.style.color =
            "#168247";


        updateCheckoutPrice(
            subtotal
        );


        return;
    }


    appliedDiscount = 0;


    message.innerText =
        "Invalid coupon code.";


    message.style.color =
        "#d22d20";


    updateCheckoutPrice(
        subtotal
    );
}


/* ================= PLACE ORDER ================= */

function placeOrder() {

    const name =
        document.getElementById(
            "customerName"
        );


    const phone =
        document.getElementById(
            "customerPhone"
        );


    const address =
        document.getElementById(
            "customerAddress"
        );


    const city =
        document.getElementById(
            "customerCity"
        );


    const pin =
        document.getElementById(
            "customerPin"
        );


    if (!name || !phone || !address || !city || !pin) {

        alert(
            "Checkout form is missing."
        );

        return;
    }


    if (name.value.trim() === "") {

        alert(
            "Please enter your name."
        );

        return;
    }


    if (
        !/^[0-9]{10}$/.test(
            phone.value.trim()
        )
    ) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    if (address.value.trim() === "") {

        alert(
            "Please enter your delivery address."
        );

        return;
    }


    if (city.value.trim() === "") {

        alert(
            "Please enter your city."
        );

        return;
    }


    if (
        !/^[0-9]{6}$/.test(
            pin.value.trim()
        )
    ) {

        alert(
            "Please enter a valid 6-digit PIN code."
        );

        return;
    }


    /* CREATE ORDER ID */

    const orderId =
        "FH" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const generatedOrderId =
        document.getElementById(
            "generatedOrderId"
        );


    if (generatedOrderId) {

        generatedOrderId.innerText =
            "#" + orderId;

    }


    const trackingOrderId =
        document.getElementById(
            "trackingOrderId"
        );


    if (trackingOrderId) {

        trackingOrderId.innerText =
            "Order #" + orderId;

    }


    const successAddress =
        document.getElementById(
            "successAddress"
        );


    if (successAddress) {

        successAddress.innerText =
            address.value +
            ", " +
            city.value;

    }


    /* CLOSE CHECKOUT */

    const checkoutPage =
        document.getElementById(
            "checkoutPage"
        );


    if (checkoutPage) {

        checkoutPage.classList.remove(
            "active"
        );

    }


    /* SHOW SUCCESS */

    const successPage =
        document.getElementById(
            "orderSuccessPage"
        );


    if (successPage) {

        successPage.classList.add(
            "active"
        );

    }


    /* CLEAR CART */

    cart.length = 0;


    updateCart();


    appliedDiscount = 0;
}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    const checkoutPage =
        document.getElementById(
            "checkoutPage"
        );


    if (checkoutPage) {

        checkoutPage.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "auto";
}


/* ================= ORDER TRACKING ================= */

function showOrderTracking() {

    const successPage =
        document.getElementById(
            "orderSuccessPage"
        );


    const trackingPage =
        document.getElementById(
            "trackingPage"
        );


    if (successPage) {

        successPage.classList.remove(
            "active"
        );

    }


    if (trackingPage) {

        trackingPage.classList.add(
            "active"
        );

    }

}


/* ================= CLOSE TRACKING ================= */

function closeTracking() {

    const trackingPage =
        document.getElementById(
            "trackingPage"
        );


    if (trackingPage) {

        trackingPage.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "auto";
}


/* ================= GO HOME ================= */

function goHome() {

    const checkoutPage =
        document.getElementById(
            "checkoutPage"
        );


    const successPage =
        document.getElementById(
            "orderSuccessPage"
        );


    const trackingPage =
        document.getElementById(
            "trackingPage"
        );


    if (checkoutPage) {

        checkoutPage.classList.remove(
            "active"
        );

    }


    if (successPage) {

        successPage.classList.remove(
            "active"
        );

    }


    if (trackingPage) {

        trackingPage.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "auto";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}