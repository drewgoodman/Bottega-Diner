const menu = [
    {
        product: "Big Java Burger",
        price: 13.50,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "burger"]
    },
    {
        product: "Ruby on Rails Burger",
        price: 11.75,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "burger"]
    },
    {
        product: "J-Vue Salad",
        price: 10.50,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "salad"]
    },
    {
        product: "Python Cobb Salad",
        price: 11.00,
        dinnerPriceMod: 2,
        tags: ["lunch", "dinner", "specials", "salad"]
    },
    {
        product: "PHP Hot Cakes",
        price: 8.50,
        tags: ["breakfast", "specials"]
    },
    {
        product: "C++ Omelette",
        price: 9.00,
        tags: ["breakfast", "specials"]
    },
    {
        product: "Biscuits & C# Gravy",
        price: 8.50,
        tags: ["breakfast", "specials"]
    },
    {
        product: "J-Query Rings",
        price: 3.50,
        tags: ["lunch", "dinner", "sides"]
    },
    {
        product: "HTML Tots",
        price: 4.00,
        tags: ["breakfast", "lunch", "dinner", "sides"]
    },
    {
        product: "Lodash _.Bacon",
        price: 3.00,
        tags: ["breakfast", "sides"],
        description: "5 thick slices of heaven."
    },
    {
        product: "The 'Real Java' 20oz",
        price: 1.50,
        tags: ["breakfast", "drinks"]
    },
    {
        product: "Repl.it Shake",
        price: 4.00,
        tags: ["lunch", "dinner", "drinks"]
    },
    {
        product: "Fizzbuzz Soda",
        price: 3.00,
        tags: ["lunch", "dinner", "drinks"],
        description: "Free refills all day!"
    },
    {
        product: "Chrome Smoothie",
        price: 3.00,
        tags: ["lunch", "dinner", "drinks"]
    },
    {
        product: "Cascading Orange Juice",
        price: 2.00,
        tags: ["breakfast", "drinks"],
        description: "Free refill with order."
    },
    {
        product: "Firefox Mimosa",
        price: 6.00,
        tags: ["breakfast", "drinks"],
        description: "Not as dry as your sense of humor."
    },
]

const waitressNameBank = ["Carol","Shannon","Nicole","Dana","Michelle","Caitlin"];


var customerOrderList = [];
// var customerOrderList = [menu[0],menu[5],menu[6]];
var currentMenuCategory = "";
var menuActive = false;
var waitressName = generateWaitress();
var timeOfDay = "lovely day";
var totalPayment = 0;


function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TRY TO REPLACE WITH THE LODASH FUNCTION AT SOME POINT, SEE IF ITS WEIGHTS ARE BETTER


function setMenuCategory(menuType) {
    resetMenu();
    setSpecialsCategory(menuType);
    renderMenu("specials", menuType);
    renderMenu("drinks", menuType);
    renderMenu("sides", menuType);
    renderOrderList();
    toggleMenu();
    let hideList = document.querySelectorAll(".intro-menu");
    for (var i=0; i < hideList.length; i++) {
        hideList[i].classList.add('toggle-visible');
    }
    document.getElementById("server-chat-box").classList.remove("toggle-visible");
    serviceBark("intro");
}


function setSpecialsCategory(menuType) {
    currentMenuCategory = menuType;
    document.getElementById("header-specials").innerHTML = `<h2>specials("${menuType}");</h2>`;
}


function toggleMenu() {
    const myMenu = document.querySelector('#menu-display');
    if (menuActive) {
        myMenu.classList.toggle('toggle-visible');
        menuActive = false;
    } else {
       myMenu.classList.toggle('toggle-visible');
        menuActive = true;
    }
}


function resetMenu() {
    document.getElementById("list-specials").innerHTML = "";
    document.getElementById("list-drinks").innerHTML = "";
    document.getElementById("list-sides").innerHTML = "";
}


function getItemPrice(item) {
    return item.price + ('dinnerPriceMod' in item && currentMenuCategory === 'dinner' ? item.dinnerPriceMod : 0);
}


function getItemDesc(item) {
    return 'description' in item ? item.description : "&nbsp;";
}


function renderMenu(itemType, menuCategory) {
    var idListTag = "list-" + itemType;
    for (var item in menu) {
        if (menu[item].tags.includes(itemType) && menu[item].tags.includes(menuCategory)) {                
            document.getElementById(idListTag).innerHTML += `<div class="menu-item" id="add-item-${item}" onclick="addMenuItem(${item})">
                        <div class="item-name">${menu[item].product}</div>
                        <div class="item-price">$${getItemPrice(menu[item]).toFixed(2)}</div>
                        <div class="item-desc">${getItemDesc(menu[item])}</div>
                    </div>`;
        }
    }
}


function renderOrderList() {
    var orderListHTML = document.getElementById("order-list-tag");
    var totalPaymentOutput = 0;
    if (customerOrderList.length > 0) {
        document.getElementById("checkout-btn").classList.remove("toggle-visible");
        document.getElementById("reset-btn").classList.remove("toggle-visible");
        orderListHTML.innerHTML = "";
        for (var item in customerOrderList) {
            totalPaymentOutput += getItemPrice(customerOrderList[item]);
            orderListHTML.innerHTML += `<div class="order-item">
                        <div class="order-product">${customerOrderList[item].product}</div>
                        <div class="order-price">$${getItemPrice(customerOrderList[item]).toFixed(2)}</div>
                        <i class="order-remove far fa-trash-alt" onclick="delOrderItem(${item})"></i>
                    </div>`;
        }
    } else {
        document.getElementById("checkout-btn").classList.add("toggle-visible");
        document.getElementById("reset-btn").classList.add("toggle-visible");
        orderListHTML.innerHTML = `<div class="please-order-text"><br>(No items in cart.)</div>`;
    }
    document.getElementById("total-payment").innerHTML = `$${totalPaymentOutput.toFixed(2)}`;
}


function addMenuItem(itemIndex) {
    customerOrderList.push(menu[itemIndex]);
    renderOrderList();
    serviceBarkCategory(menu[itemIndex],"breakfast");
    serviceBarkCategory(menu[itemIndex],"burger");
    serviceBarkCategory(menu[itemIndex],"salad");
    serviceBarkCategory(menu[itemIndex],"sides");
    serviceBarkCategory(menu[itemIndex],"drinks");
}


function delOrderItem(itemIndex) {
    if (confirm(`Are you sure you want to delete ${customerOrderList[itemIndex].product} from your order? Hit OK to confirm.`)) {
        customerOrderList.splice(itemIndex, 1);
        renderOrderList();
        serviceBark("delete");
    }
}


function delOrderAll() {
    if (confirm(`Are you sure you want to delete your entire order? Hit OK to confirm.`)) {
        customerOrderList = [];
        renderOrderList();
        serviceBark("deleteAll");
    }
}


function checkoutButton() {
    if (customerOrderList.length > 0) {
        for (var item in customerOrderList) {
            totalPayment += getItemPrice(customerOrderList[item]);
        }
        barkTable.checkout[0] = `Perfect! We'll get that started for you right away! Your total comes out to $${totalPayment.toFixed(2)}<br><br>Would you like to leave a tip? It's hard times as a single mom with 3 kids. The little bytes bloom into megabytes so fast these days.<br><br>They'll be terrabytes before I know it.`;
        serviceBark("checkout");
        toggleMenu();
        document.getElementById("checkout-btn").classList.add("toggle-visible");
        document.getElementById("reset-btn").classList.add("toggle-visible");
    } else {
        alert("You need at least 1 item in your cart to check out.");
    }
}


function generateWaitress() {
    var idxName = getRandInt(1, waitressNameBank.length) - 1;
    return waitressNameBank[idxName];
}


function serviceBark(eventType) {
    var barkIndex = getRandInt(1, barkTable[eventType].length) - 1;
    document.getElementById("server-chat-box").innerHTML = `${waitressName.toUpperCase()} SAYS:<br><br>"` + barkTable[eventType][barkIndex] + '"';
}


function serviceBarkCategory(menuItem, category) {
    if (menuItem.tags.includes(category)) {
        serviceBark(category);
    }
}



const barkTable = {
    intro: [
        `Hello there! My name is ${waitressName} and I'll be your digital server this ${timeOfDay}.
        <br><br>Please take the time to look over our specials today on the right. Highlight and click any items you'd like to add to your basket.
        <br><br>And please let me know if you have questions. I'm fully incapable of answering of course, but I'm secretly a really good listener. Been told that my strings are the best in town.`
        ],

    delete: [
        "Not to worry, we'll just forget you ever tried to order that.",
        "Are you absolutely sure? I've been told ours are the best in the whole country.",
        "Alright, I'll scratch that one off the list. What else would you like to order?"
        ],

    checkout: [
        "SPECIAL CASE - STRING MUST BE UPDATED FROM CHECKOUT FUNCTION"
        ],

    breakfast: [
        "Great way to start the day! Don't forget about our freshly brewed Java cups!",
        "Fresh from the kitchen, I promise! I recommend our HTML tots as a side.",
        "Ever question your life choices by being awake this early? I guarantee that dish will bring some much needed clarity to your day."
        ],

    burger: [
        "That is a burger. Burgers are tasty. Sorry, my creator's laziness is occasionally on display at crucial moments. I hope you don't blame me.",
        "If the patty was ever frozen, I guarantee it wasn't at THIS establishment",
        "Made with real cow, believe it or not!",
        "We've got a full condiments bar just over there if you need any toppings."
        ],

    salad: [
        "Great choice! Gotta watch your girlish figure after all!",
        "Have you had one of our salads before? They're so filling that most people take a to-go container.",
        "Good choice! I'll be bringing pepper that I can freshly grind to your preference.",
        "I don't know which of our salad choices I like better. They're both just divine."
        ],

    drinks: [
        "I'll bring it to you ice cold once we're done with the rest of your order!"
        ],

    sides: [
        "Any sauces on the side? No extra charge."
        ],

    deleteAll: [
        "Alright, I've shredded the entire order page, ready to start from scratch. What would you like?",
        "1... 2... and.... POOF! Your indecisiveness shall not become a problem today."
        ]
};


// alert("Still works, even after all those BarkStrings!!");
