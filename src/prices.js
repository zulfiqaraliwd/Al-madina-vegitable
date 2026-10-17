// ===== PRICES: yahan rates likhein (Rs. per kg, ya neeche UNITS mein jo unit ho) =====
// Key wohi hai jo IMAGES mein hai (item ka slug). Jis ka rate 0 ya likha na ho,
// uska rate slip mein "-" aaye ga ("Price on request").
export const DEFAULT_PRICES = {
  tomato: 250,
  potato: 80,
  "red-onion": 230,
  ginger: 400,
  "garlic-peeled": 400,
  coriander: 40,
  "green-chilli": 200,
};

// Jin items ka unit kg nahi hai
export const UNITS = {
  coriander: "bunch",
  banana: "dozen",
};
export const unitOf = (slug) => UNITS[slug] || "kg";

// Admin page (#admin) ka PIN. Isay apni marzi se badal lein.
export const ADMIN_PIN = "75065";

const PRICE_KEY = "almadina_prices";
const INV_KEY = "almadina_invoice_no";
const FIRST_INVOICE = 60; // last invoice

export function loadPrices() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRICE_KEY) || "{}");
    return { ...DEFAULT_PRICES, ...saved };
  } catch {
    return { ...DEFAULT_PRICES };
  }
}

export function savePrices(prices) {
  try {
    localStorage.setItem(PRICE_KEY, JSON.stringify(prices));
  } catch {
    /* storage band ho to ignore */
  }
}

export function resetPrices() {
  try {
    localStorage.removeItem(PRICE_KEY);
  } catch {
    /* ignore */
  }
}

export function peekInvoiceNo() {
  try {
    return Number(localStorage.getItem(INV_KEY)) || FIRST_INVOICE;
  } catch {
    return FIRST_INVOICE;
  }
}

export function bumpInvoiceNo() {
  try {
    localStorage.setItem(INV_KEY, String(peekInvoiceNo() + 1));
  } catch {
    /* ignore */
  }
}
