import { useState, useMemo } from "react";
import "./App.css";

const WHATSAPP = "923480975065";
const PHONE = "0345 5807524";

// Har item: "Name|emoji". Photos ka path neeche IMAGES mein likhein.
const build = (category, str) =>
  str.split(",").map((s) => {
    const [name, emoji] = s.trim().split("|");
    return {
      name,
      emoji: emoji || "🌿",
      category,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
    };
  });

const ITEMS = [
  ...build(
    "Local Vegetables",
    "Broccoli|🥦,Ice Burg|🥬,Tomato|🍅,Potato|🥔,Red Onion|🧅,Carrot|🥕,Cabbage|🥬,Ginger|🫚,Garlic Peeled|🧄,Garlic Whole|🧄,Spinach|🥬,Lemon Desi|🍋,Mint|🌿,Lettuce|🥬,Coriander|🌿,Cucumber|🥒,Green Capsicum|🫑,Green Chilli|🌶️,Fresh Bean|🫛,Zucchini|🥒,Radish|🌱,Green Onion|🌱,Cauliflower|🥦,Peas|🫛,Pumpkin|🎃,Egg Plant|🍆,Beetroot|🟣,Red Cabbage|🥬,Kadu Shareef|🥒,Kaali Toori|🥒,Tinday|🥒,Lady Finger|🥒,Baby Spinach|🥬,Baby Potato|🥔"
  ),
  ...build(
    "Imported Vegetables",
    "Bell Pepper|🫑,Avocado Kenya|🥑,Avocado Mexican|🥑,Cherry Tomato|🍅,Thai Bird Chilli|🌶️,Rocket Leaves|🌿,Parsley|🌿,Basil Leaves|🌿,Celery Leaves|🌿,Leek|🌱,Lolo Rosso|🥬,Kale Leaves|🥬,Soya Leaves|🌿,Romaine Lettuce|🥬,China Cabbage|🥬,Fresh Mushrooms|🍄,Lemon Grass|🌾,Galangal|🫚,Lime Leaves|🍃,Bean Sprout|🌱,Asparagus|🌱,Bok Choy|🥬,Fresh Rosemary|🌿,Fresh Thyme|🌿,Micro Green|🌱"
  ),
  ...build(
    "Fresh Fruits",
    "Apple Green|🍏,Apple Red|🍎,Banana|🍌,Pomegranate|🍎,Peach|🍑,Mango|🥭,Grapes|🍇,Blueberry|🫐,Guava|🍐"
  ),
];

// ===== IMAGES: yahan apni photos ka path likhein =====
// Photo public/images/ mein rakhein aur yahan likhein, jaise: tomato: "/images/tomato.jpg",
// Khali "" chhor denge to us item par emoji dikhay ga.
const IMAGES = {
"broccoli": "/public/images/brocli.jpg",
  "ice-burg": "/public/images/iceberg.jpg",
  "tomato": "/public/images/tomato.jpg",
  "potato": "/public/images/potato.jpg",
  "red-onion": "/public/images/red-onion.jpg",
  "carrot": "/public/images/carrot.jpg",
  "cabbage": "/public/images/cabbage.jpg",
  "ginger": "/public/images/ginger.jpg",
  "garlic-peeled": "/public/images/garlic-peeled.jpg",
  "garlic-whole": "/public/images/garlic-whole.jpg",
  "spinach": "/public/images/spanish.jpg",
  "lemon-desi": "/public/images/lemon-desi.jpg",
  "mint": "/public/images/mint.jpg",
  "lettuce": "/public/images/lettce.jpg",
  "coriander": "/public/images/coriander.jpg",
  "cucumber": "/public/images/cocumber.jpg",
  "green-capsicum": "/public/images/green-capsicum.jpg",
  "green-chilli": "/public/images/green-chilli.jpg",
  "fresh-bean": "/public/images/fresh-beans.jpg",
  "zucchini": "/public/images/zucchi.jpg",
  "radish": "/public/images/radish.jpg",
  "green-onion": "/public/images/green-onion.jpg",
  "cauliflower": "/public/images/cauliflower.jpg",
  "peas": "/public/images/peas.jpg",
  "pumpkin": "/public/images/pimpkin.jpg",
  "egg-plant": "/public/images/egg-plantt.jpg",
  "beetroot": "/public/images/beetroot.jpg",
  "red-cabbage": "/public/images/red-cabbage.jpg",
  "kadu-shareef": "/public/images/kadu-shareef.jpg",
  "kaali-toori": "/public/images/kali-tori.jfif",
  "tinday": "/public/images/tindy.jpeg",
  "lady-finger": "/public/images/lady-finger.jpg",
  "baby-spinach": "/public/images/baby-spanish.jpg",
  "baby-potato": "/public/images/baby-potato.jpg",
  "bell-pepper": "/public/images/bell-paper.jpg",
  "avocado-kenya": "/public/images/avagado-kenya.jpg",
  "avocado-mexican": "/public/images/avagado-mexican.jpg.jpg",
  "cherry-tomato": "/public/images/cherry-tomato.jpg",
  "thai-bird-chilli": "/public/images/thy-bird-chilli.jpg",
  "rocket-leaves": "/public/images/rocket-leaves.jpg",
  "parsley": "/public/images/parsely.jpg",
  "basil-leaves": "/public/images/basil-leaves.jpg",
  "celery-leaves": "/public/images/celery-leaves.jpg",
  "leek": "/public/images/leek.jpg",
  "lolo-rosso": "/public/images/lolo-rosso.jpg",
  "kale-leaves": "/public/images/kale-leaves.jpg",
  "soya-leaves": "/public/images/soya-leaves.jpg",
  "romaine-lettuce": "/public/images/romaine-lettuce.jpg",
  "china-cabbage": "/public/images/china-cabbage.jpg",
  "fresh-mushrooms": "/public/images/fresh-mushrooms.jpg",
  "lemon-grass": "/public/images/lemon-grass.jpg",
  "galangal": "/public/images/galangal.jpg",
  "lime-leaves": "/public/images/lime-leaves.jpg",
  "bean-sprout": "/public/images/bean-sprout.jpg",
  "asparagus": "/public/images/asparagus.jpg",
  "bok-choy": "/public/images/bok-choy.jpg",
  "fresh-rosemary": "/public/images/fresh-rosemary.jpg",
  "fresh-thyme": "/public/images/fresh-thyme.jpg",
  "micro-green": "/public/images/micro-green.jpg",
  "apple-green": "/public/images/apple-green.jpg",
  "apple-red": "/public/images/apple-red.jpg",
  "banana": "/public/images/banana.jpg",
  "pomegranate": "/public/images/pomegranate.jpg",
  "peach": "/public/images/peach.jpg",
  "mango": "/public/images/mango.jpg",
  "grapes": "/public/images/grapes.jpg",
  "blueberry": "/public/images/blueberry.jpg",
  "guava": "/public/images/guava.jpg",
};

const TABS = ["All", "Local Vegetables", "Imported Vegetables", "Fresh Fruits"];

function Photo({ item }) {
  const [failed, setFailed] = useState(false);
  const src = IMAGES[item.slug];
  return (
    <div className={`photo tone-${item.category.split(" ")[0].toLowerCase()}`}>
      {src && !failed ? (
        <img src={src} alt={item.name} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="emoji" aria-hidden="true">{item.emoji}</span>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState({});

  const shown = useMemo(
    () =>
      ITEMS.filter(
        (i) =>
          (tab === "All" || i.category === tab) &&
          i.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [tab, query]
  );

  const change = (slug, delta) =>
    setOrder((o) => {
      const next = Math.max(0, (o[slug] || 0) + delta);
      const copy = { ...o };
      if (next === 0) delete copy[slug];
      else copy[slug] = next;
      return copy;
    });

  const lines = ITEMS.filter((i) => order[i.slug]);
  const message =
    "Assalam o Alaikum, mujhe yeh order chahiye:\n" +
    lines.map((i) => `- ${i.name}: ${order[i.slug]} kg/dozen`).join("\n");
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <div className="page">
      <header className="masthead">
        <div className="wrap masthead-inner">
          <div>
            <h1>Al Madina</h1>
            <p className="script">Vegetables Shop</p>
          </div>
          <div className="contact">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
            <span>Manzoor Colony, Karachi</span>
          </div>
        </div>
      </header>

      <section className="hero wrap">
        <h2>Fresh today, healthy always.</h2>
        <p>
          Mandi se subah ki taza sabzi aur fruit, hotels aur gharon tak. Item chunein,
          quantity likhein, order WhatsApp par bhej dein.
        </p>
      </section>

      <div className="toolbar">
        <div className="wrap toolbar-inner">
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                className={tab === t ? "tab on" : "tab"}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            className="search"
            type="search"
            placeholder="Search sabzi ya fruit"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search items"
          />
        </div>
      </div>

      <main className="wrap">
        {shown.length === 0 && (
          <p className="empty">
            Is naam ka item nahi mila. Spelling check karein ya WhatsApp par pooch lein.
          </p>
        )}
        <ul className="grid">
          {shown.map((item) => {
            const qty = order[item.slug] || 0;
            return (
              <li key={item.slug} className={qty ? "card picked" : "card"}>
                <Photo item={item} />
                <div className="info">
                  <h3>{item.name}</h3>
                  <p className="cat">{item.category}</p>
                </div>
                {qty === 0 ? (
                  <button className="add" onClick={() => change(item.slug, 1)}>
                    Add to order
                  </button>
                ) : (
                  <div className="stepper">
                    <button onClick={() => change(item.slug, -0.5)} aria-label={`Kam ${item.name}`}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => change(item.slug, 0.5)} aria-label={`Zyada ${item.name}`}>+</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </main>

      <footer className="foot">
        <div className="wrap">Al Madina Vegetables Shop · Manzoor Colony, Karachi · {PHONE}</div>
      </footer>
      <a
  className={`wa-float ${lines.length ? "lifted" : ""}`}
  href={`https://wa.me/${WHATSAPP}`}
  target="_blank"
  rel="noreferrer"
  aria-label="WhatsApp par chat karein"
>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
</a>

      {lines.length > 0 && (
        <div className="orderbar">
          <div className="wrap orderbar-inner">
            <span>{lines.length} items chune hain</span>
            <button className="clear" onClick={() => setOrder({})}>Clear</button>
            <a className="send" href={waLink} target="_blank" rel="noreferrer">
              Send order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
