/* =========================================================
   Grab Grocery – front-end logic
   NOTE: All prices below are SAMPLE DATA for a student project.
   To use real prices later, replace PRODUCTS with an API call.
   ========================================================= */

const STORES = [
  { id: "blinkit",   name: "Blinkit",         color: "#f2c200", fee: 25, freeAbove: 199, eta: "10 min" },
  { id: "zepto",     name: "Zepto",           color: "#7b2ff7", fee: 30, freeAbove: 199, eta: "10 min" },
  { id: "instamart", name: "Swiggy Instamart", color: "#fc8019", fee: 25, freeAbove: 149, eta: "15 min" },
  { id: "bigbasket", name: "BigBasket",       color: "#4f9a1c", fee: 30, freeAbove: 300, eta: "2 hrs" },
  { id: "jiomart",   name: "JioMart",         color: "#0a5bd3", fee: 40, freeAbove: 249, eta: "Next day" },
];

// prices order: blinkit, zepto, instamart, bigbasket, jiomart (null = not stocked)
const p = (a, b, c, d, e) => ({ blinkit: a, zepto: b, instamart: c, bigbasket: d, jiomart: e });

const PRODUCTS = [
  { id: "milk",   name: "Toned milk",              size: "1 L",     cat: "Dairy",     emoji: "🥛", tags: "milk amul dairy",       prices: p(56, 55, 57, 56, 54) },
  { id: "curd",   name: "Fresh curd",              size: "400 g",   cat: "Dairy",     emoji: "🍶", tags: "dahi yogurt curd",      prices: p(35, 34, 36, 33, null) },
  { id: "butter", name: "Salted butter",           size: "100 g",   cat: "Dairy",     emoji: "🧈", tags: "butter amul dairy",     prices: p(62, 60, 62, 58, 57) },
  { id: "eggs",   name: "Farm eggs",               size: "12 pcs",  cat: "Dairy",     emoji: "🥚", tags: "eggs anda",             prices: p(96, 92, 99, 94, 89) },
  { id: "atta",   name: "Whole wheat atta",        size: "5 kg",    cat: "Staples",   emoji: "🌾", tags: "atta flour wheat",      prices: p(268, 249, 259, 245, 239) },
  { id: "rice",   name: "Basmati rice",            size: "1 kg",    cat: "Staples",   emoji: "🍚", tags: "rice chawal basmati",   prices: p(135, 129, 138, 124, 119) },
  { id: "dal",    name: "Toor dal",                size: "1 kg",    cat: "Staples",   emoji: "🫘", tags: "dal toor arhar pulses", prices: p(178, 172, 181, 165, 168) },
  { id: "oil",    name: "Sunflower oil",           size: "1 L",     cat: "Staples",   emoji: "🛢️", tags: "oil cooking sunflower", prices: p(152, 148, 155, 141, 139) },
  { id: "sugar",  name: "Sugar",                   size: "1 kg",    cat: "Staples",   emoji: "🧂", tags: "sugar cheeni",          prices: p(52, 51, 54, 49, 48) },
  { id: "tomato", name: "Tomato",                  size: "500 g",   cat: "Fresh",     emoji: "🍅", tags: "tomato vegetable",      prices: p(24, 22, 26, 20, null) },
  { id: "onion",  name: "Onion",                   size: "1 kg",    cat: "Fresh",     emoji: "🧅", tags: "onion pyaz vegetable",  prices: p(44, 42, 46, 38, 36) },
  { id: "banana", name: "Robusta banana",          size: "6 pcs",   cat: "Fresh",     emoji: "🍌", tags: "banana fruit kela",     prices: p(38, 35, 40, 36, null) },
  { id: "tea",    name: "Tea leaves",              size: "500 g",   cat: "Beverages", emoji: "🍵", tags: "tea chai",              prices: p(265, 259, 268, 249, 245) },
  { id: "coffee", name: "Instant coffee",          size: "100 g",   cat: "Beverages", emoji: "☕", tags: "coffee nescafe",        prices: p(345, 339, 349, 329, 325) },
  { id: "chips",  name: "Salted potato chips",     size: "90 g",    cat: "Snacks",    emoji: "🥔", tags: "chips snacks lays",     prices: p(30, 30, 30, 28, 27) },
  { id: "biscuit",name: "Cream biscuits",          size: "250 g",   cat: "Snacks",    emoji: "🍪", tags: "biscuit snacks cookies",prices: p(48, 45, 50, 44, 42) },
  { id: "apple", name: "Red apples",              size: "4 pcs",   cat: "Fruits & vegetables", emoji: "🍎", tags: "apple fruit fresh", prices: p(99, 95, 105, 89, 92), image: "photo-1560807707-8cc77767d783" },
  { id: "potato",name: "Potato",                  size: "1 kg",    cat: "Fruits & vegetables", emoji: "🥔", tags: "potato aloo vegetable", prices: p(35, 32, 38, 30, 34), image: "photo-1518977676601-b53f82aba655" },
  { id: "spinach",name: "Fresh spinach",          size: " bunch",  cat: "Fruits & vegetables", emoji: "🥬", tags: "spinach palak greens", prices: p(25, 28, 26, 22, 24), image: "photo-1576045057995-568f588f82fb" },
  { id: "orange",name: "Orange",                  size: "6 pcs",   cat: "Fruits & vegetables", emoji: "🍊", tags: "orange fruit citrus", prices: p(75, 79, 82, 70, 73), image: "photo-1547514701-42782101795e" },
  { id: "cheese",name: "Cheese slices",           size: "200 g",   cat: "Dairy",     emoji: "🧀", tags: "cheese dairy slices", prices: p(135, 129, 139, 125, 128), image: "photo-1486297678162-eb2a19b0a32d" },
  { id: "yogurt",name: "Plain yogurt",            size: "400 g",   cat: "Dairy",     emoji: "🥣", tags: "yogurt dahi dairy", prices: p(48, 45, 49, 44, 46), image: "photo-1488477181946-6428a0291777" },
  { id: "bread", name: "Whole wheat bread",       size: "400 g",   cat: "Bakery",    emoji: "🍞", tags: "bread bakery loaf", prices: p(45, 42, 48, 40, 43), image: "photo-1509440159596-0249088772ff" },
  { id: "croissant",name: "Butter croissant",     size: "2 pcs",   cat: "Bakery",    emoji: "🥐", tags: "croissant bakery pastry", prices: p(60, 58, 65, 55, 59), image: "photo-1555507036-ab1f4038808a" },
  { id: "chicken",name: "Chicken breast",         size: "500 g",   cat: "Meat & seafood", emoji: "🍗", tags: "chicken meat protein", prices: p(185, 179, 199, 175, 188), image: "photo-1607623814075-e51df1bdc82f" },
  { id: "fish",  name: "Fresh fish fillet",       size: "400 g",   cat: "Meat & seafood", emoji: "🐟", tags: "fish seafood fillet", prices: p(240, 229, 249, 235, 239), image: "photo-1510130387422-82bed34b37e9" },
  { id: "peas",  name: "Frozen green peas",       size: "500 g",   cat: "Frozen foods", emoji: "🫛", tags: "frozen peas vegetables", prices: p(75, 72, 79, 69, 73), image: "photo-1587049352851-8d4e89133924" },
  { id: "icecream",name: "Vanilla ice cream",      size: "500 ml",  cat: "Frozen foods", emoji: "🍨", tags: "ice cream frozen dessert", prices: p(120, 115, 125, 110, 118), image: "photo-1501446529957-6226bd447c46" },
  { id: "juice", name: "Orange juice",            size: "1 L",     cat: "Beverages", emoji: "🧃", tags: "juice orange drink", prices: p(110, 105, 115, 99, 108), image: "photo-1600271886742-f049cd451bba" },
  { id: "water", name: "Packaged drinking water", size: "1 L",     cat: "Beverages", emoji: "💧", tags: "water bottle drink", prices: p(20, 20, 20, 18, 20), image: "photo-1560023907-5f339617ea30" },
  { id: "chocolate",name: "Milk chocolate",       size: "100 g",   cat: "Snacks",    emoji: "🍫", tags: "chocolate sweets candy", prices: p(50, 48, 55, 45, 49), image: "photo-1548907040-4d42bfc2a5a0" },
  { id: "detergent",name: "Laundry detergent",    size: "1 kg",    cat: "Home care", emoji: "🧺", tags: "detergent washing laundry", prices: p(145, 139, 149, 135, 140), image: "photo-1605276374104-dee2a0ed3cd6" },
  { id: "dishwash",name: "Dishwashing liquid",    size: "500 ml",  cat: "Home care", emoji: "🧽", tags: "dishwash soap kitchen cleaning", prices: p(99, 95, 105, 92, 97), image: "photo-1585421514738-01798e348b17" },
  { id: "shampoo",name: "Daily care shampoo",     size: "180 ml",  cat: "Personal care", emoji: "🧴", tags: "shampoo hair personal care", prices: p(125, 119, 129, 115, 122), image: "photo-1608248543803-ba4f8c70ae0b" },
  { id: "toothpaste",name: "Mint toothpaste",     size: "150 g",   cat: "Personal care", emoji: "🪥", tags: "toothpaste oral dental", prices: p(85, 82, 89, 79, 83), image: "photo-1609845478782-1b9f9d2f06f4" },
  { id: "diapers",name: "Baby diapers",           size: "Pack of 10", cat: "Baby care", emoji: "🍼", tags: "baby diapers infant", prices: p(199, 189, 205, 195, 190), image: "photo-1516627145497-ae6968895b74" },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(x => x.cat))];
const CATEGORY_IMAGES = {
  Dairy: "photo-1550583724-b2692b85b150",
  Staples: "photo-1518843875459-f738682238a6",
  Fresh: "photo-1542838132-92c53300491e",
  Beverages: "photo-1510626176961-4bfb8f6c9f9d",
  Snacks: "photo-1621939514649-280e2aa67f7f",
  "Fruits & vegetables": "photo-1540420773420-3366772f4999",
  Bakery: "photo-1509440159596-0249088772ff",
  "Meat & seafood": "photo-1607623814075-e51df1bdc82f",
  "Frozen foods": "photo-1501446529957-6226bd447c46",
  "Home care": "photo-1585421514738-01798e348b17",
  "Personal care": "photo-1608248543803-ba4f8c70ae0b",
  "Baby care": "photo-1516627145497-ae6968895b74",
};

/* ---------- State ---------- */
const state = {
  query: "",
  cat: "All",
  sort: "relevance",
};

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const rupee = n => "₹" + n.toLocaleString("en-IN");
const storeById = id => STORES.find(s => s.id === id);
const productById = id => PRODUCTS.find(x => x.id === id);

// sorted list of [storeId, price] for stores that stock it, cheapest first
function ranked(product) {
  return Object.entries(product.prices)
    .filter(([, price]) => price !== null)
    .sort((a, b) => a[1] - b[1]);
}
function saving(product) {
  const r = ranked(product);
  return r.length > 1 ? r[r.length - 1][1] - r[0][1] : 0;
}

// Open each retailer's search page with the current product name prefilled.
function storeSearchUrl(storeId, product) {
  const query = encodeURIComponent(`${product.name} ${product.size}`);
  const urls = {
    blinkit: `https://blinkit.com/s/?q=${query}`,
    zepto: `https://www.zepto.com/search?query=${query}`,
    instamart: `https://www.swiggy.com/instamart/search?custom_back=true&query=${query}`,
    bigbasket: `https://www.bigbasket.com/ps/?q=${query}`,
    jiomart: `https://www.jiomart.com/search/${encodeURIComponent(product.name)}`,
  };
  return urls[storeId];
}

/* ---------- Hero price tag ---------- */
function renderHero() {
  const item = productById("atta");
  const r = ranked(item);
  const max = r[r.length - 1][1];
  $(".tag-item").textContent = `${item.name}, ${item.size}`;
  $("#heroBars").innerHTML = r.map(([sid, price], i) => `
    <li class="${i === 0 ? "cheapest" : ""}">
      <span>${storeById(sid).name.replace("Swiggy ", "")}</span>
      <span class="bar-track"><span class="bar-fill" data-w="${(price / max) * 100}"></span></span>
      <span class="price">${rupee(price)}</span>
    </li>`).join("");
  const diff = max - r[0][1];
  $("#heroNote").textContent = `${storeById(r[0][0]).name} is ${rupee(diff)} cheaper than ${storeById(r[r.length - 1][0]).name}.`;
  // grow bars once, after paint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll(".bar-fill").forEach(el => (el.style.width = el.dataset.w + "%"));
  }));
}

/* ---------- Categories ---------- */
function renderChips() {
  $("#chips").innerHTML = CATEGORIES.map(c =>
    `<button class="chip" role="tab" aria-selected="${c === state.cat}" data-cat="${c}">${c}</button>`
  ).join("");
}

/* ---------- Product grid ---------- */
function visibleProducts() {
  const q = state.query.trim().toLowerCase();
  let list = PRODUCTS.filter(x =>
    (state.cat === "All" || x.cat === state.cat) &&
    (!q || `${x.name} ${x.cat} ${x.tags}`.toLowerCase().includes(q))
  );
  if (state.sort === "saving") list = [...list].sort((a, b) => saving(b) - saving(a));
  if (state.sort === "low")    list = [...list].sort((a, b) => ranked(a)[0][1] - ranked(b)[0][1]);
  if (state.sort === "name")   list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function cardHTML(x) {
  const r = ranked(x);
  const best = r[0][0];
  const rows = STORES.map(s => {
    const price = x.prices[s.id];
    if (price === null) {
      return `<li class="out"><span class="dot" style="background:${s.color}"></span><span>${s.name}</span><span class="price">Not stocked</span></li>`;
    }
    return `<li class="${s.id === best ? "best" : ""}">
      <span class="dot" style="background:${s.color}"></span>
      <span>${s.name}${s.id === best ? " · lowest" : ""}</span>
      <span class="price">${rupee(price)}</span></li>`;
  }).join("");
  const storeChoices = STORES.map(s => `
    <a class="store-choice" href="${storeSearchUrl(s.id, x)}" target="_blank" rel="noopener noreferrer" aria-label="Search for ${x.name} on ${s.name}">
      <span class="dot" style="background:${s.color}"></span>${s.name.replace("Swiggy ", "")}<span aria-hidden="true">↗</span>
    </a>`).join("");
  return `
    <article class="card" data-id="${x.id}">
      <div class="card-top">
        <img class="product-image" src="https://images.unsplash.com/${x.image || CATEGORY_IMAGES[x.cat] || CATEGORY_IMAGES.Fresh}?auto=format&fit=crop&w=600&q=80" alt="${x.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'" />
        <div><h3>${x.name}</h3><p class="size">${x.size}</p></div>
      </div>
      <ul class="prices">${rows}</ul>
      <div class="store-choices"><p>Search this item on</p><div>${storeChoices}</div></div>
    </article>`;
}

function renderGrid() {
  const list = visibleProducts();
  $("#grid").innerHTML = list.map(cardHTML).join("");
  $("#empty").hidden = list.length > 0;
  const where = state.cat === "All" ? "" : ` in ${state.cat}`;
  const what = state.query.trim() ? ` for “${state.query.trim()}”` : "";
  $("#resultLine").textContent = list.length
    ? `${list.length} item${list.length > 1 ? "s" : ""}${where}${what}. Lowest price is highlighted.`
    : "";
}

/* ---------- Events ---------- */
// search (live) + submit
const searchInput = $("#searchInput");
searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  renderGrid();
});
$("#heroSearch").addEventListener("submit", e => {
  e.preventDefault();
  state.query = searchInput.value;
  renderGrid();
  $("#products").scrollIntoView({ behavior: "smooth" });
});
document.querySelectorAll("[data-search]").forEach(btn =>
  btn.addEventListener("click", () => {
    searchInput.value = btn.dataset.search;
    state.query = btn.dataset.search;
    renderGrid();
    $("#products").scrollIntoView({ behavior: "smooth" });
  })
);
$("#clearSearch").addEventListener("click", () => {
  searchInput.value = ""; state.query = ""; state.cat = "All";
  renderChips(); renderGrid();
});

// categories + sort
$("#chips").addEventListener("click", e => {
  const chip = e.target.closest("[data-cat]");
  if (!chip) return;
  state.cat = chip.dataset.cat;
  renderChips(); renderGrid();
  $(`[data-cat="${state.cat}"]`).focus();
});
$("#sortSelect").addEventListener("change", e => {
  state.sort = e.target.value;
  renderGrid();
});

/* ---------- Stores section ---------- */
function renderStores() {
  $("#storeList").innerHTML = STORES.map(s => `
    <li>
      <span class="store-name"><span class="dot" style="background:${s.color}"></span>${s.name}</span>
      <small>Delivery in ${s.eta}</small>
      <small>${rupee(s.fee)} fee under ${rupee(s.freeAbove)}</small>
    </li>`).join("");
}

/* ---------- Init ---------- */
renderHero();
renderChips();
renderGrid();
renderStores();
