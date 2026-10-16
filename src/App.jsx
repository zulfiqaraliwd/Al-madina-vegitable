import { useState, useMemo } from "react";
import "./App.css";

const WHATSAPP = "923480975065";
const PHONE = "0345 5807524";

const EMAIL = "info@almadina.com"; // apni asli email likhein
const SOCIALS = [
  { name: "Facebook", icon: "facebook", href: "https://facebook.com/YOUR_PAGE" },
  { name: "Instagram", icon: "instagram", href: "https://instagram.com/YOUR_PAGE" },
  { name: "WhatsApp", icon: "whatsapp", href: `https://wa.me/${WHATSAPP}` },
];

const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function Icon({ name }) {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" fill="currentColor">
      {name === "facebook" && (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      )}
      {name === "whatsapp" && <path d={WA_PATH} />}
      {name === "instagram" && (
        <g {...line}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </g>
      )}
      {name === "phone" && (
        <path {...line} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      )}
      {name === "mail" && (
        <g {...line}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </g>
      )}
      {name === "pin" && (
        <g {...line}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </g>
      )}
    </svg>
  );
}

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


const IMAGES = {
"broccoli": "/images/brocli.jpg",
  "ice-burg": "/images/iceberg.jpg",
  "tomato": "/images/tomato.jpg",
  "potato": "/images/potato.jpg",
  "red-onion": "/images/red-onion.jpg",
  "carrot": "/images/carrot.jpg",
  "cabbage": "/images/cabbage.jpg",
  "ginger": "/images/ginger.jpg",
  "garlic-peeled": "/images/garlic-peeled.jpg",
  "garlic-whole": "/images/garlic-whole.jpg",
  "spinach": "/images/spanish.jpg",
  "lemon-desi": "/images/lemon-desi.jpg",
  "mint": "/images/mint.jpg",
  "lettuce": "/images/lettce.jpg",
  "coriander": "/images/coriander.jpg",
  "cucumber": "/images/cocumber.jpg",
  "green-capsicum": "/images/green-capsicum.jpg",
  "green-chilli": "/images/green-chilli.jpg",
  "fresh-bean": "/images/fresh-beans.jpg",
  "zucchini": "/images/zucchi.jpg",
  "radish": "/images/radish.jpg",
  "green-onion": "/images/green-onion.jpg",
  "cauliflower": "/images/cauliflower.jpg",
  "peas": "/images/peas.jpg",
  "pumpkin": "/images/pimpkin.jpg",
  "egg-plant": "/images/egg-plantt.jpg",
  "beetroot": "/images/beetroot.jpg",
  "red-cabbage": "/images/red-cabbage.jpg",
  "kadu-shareef": "/images/kadu-shareef.jpg",
  "kaali-toori": "/images/kali-tori.jfif",
  "tinday": "/images/tindy.jpeg",
  "lady-finger": "/images/lady-finger.jpg",
  "baby-spinach": "/images/baby-spanish.jpg",
  "baby-potato": "/images/baby-potato.jpg",
  "bell-pepper": "/images/bell-paper.jpg",
  "avocado-kenya": "/images/avagado-kenya.jpg",
  "avocado-mexican": "/images/avagado-mexican.jpg",
  "cherry-tomato": "/images/cherry-tomato.jpg",
  "thai-bird-chilli": "/images/thy-bird-chilli.jpg",
  "rocket-leaves": "/images/rocket-leaves.jpg",
  "parsley": "/images/parsely.jpg",
  "basil-leaves": "/images/basil-leaves.jpg",
  "celery-leaves": "/images/celery-leaves.jpg",
  "leek": "/images/leek.jpg",
  "lolo-rosso": "/images/lolo-rosso.jpg",
  "kale-leaves": "/images/kale-leaves.jpg",
  "soya-leaves": "/images/soya-leaves.jpg",
  "romaine-lettuce": "/images/romaine-lettuce.jpg",
  "china-cabbage": "/images/china-cabbage.jpg",
  "fresh-mushrooms": "/images/fresh-mushrooms.jpg",
  "lemon-grass": "/images/lemon-grass.jpg",
  "galangal": "/images/galangal.jpg",
  "lime-leaves": "/images/lime-leaves.jpg",
  "bean-sprout": "/images/bean-sprout.jpg",
  "asparagus": "/images/asparagus.jpg",
  "bok-choy": "/images/bok-choy.jpg",
  "fresh-rosemary": "/images/fresh-rosemary.jpg",
  "fresh-thyme": "/images/fresh-thyme.jpg",
  "micro-green": "/images/micro-green.jpg",
  "apple-green": "/images/apple-green.jpg",
  "apple-red": "/images/apple-red.jpg",
  "banana": "/images/banana.jpg",
  "pomegranate": "/images/pomegranate.jpg",
  "peach": "/images/peach.jpg",
  "mango": "/images/mango.jpg",
  "grapes": "/images/grapes.jpg",
  "blueberry": "/images/blueberry.jpg",
  "guava": "/images/guava.jpg",
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
  Fresh vegetables and fruits delivered straight from the farms to hotels and homes.
  Choose your items, set the quantity, and send your order on WhatsApp.
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
           No item found. Check the spelling or ask us on WhatsApp.
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
                    <button onClick={() => change(item.slug, -0.5)} aria-label={`less ${item.name}`}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => change(item.slug, 0.5)} aria-label={`more ${item.name}`}>+</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </main>

   <footer className="foot">
  <div className="wrap foot-grid">
    <div>
      <h3>Al Madina</h3>
      <p className="script">Vegetables Shop</p>
      <p className="foot-tag">Fresh today, healthy always. Farm-fresh vegetables and fruits for hotels and homes.</p>
    </div>

    <div>
      <h4>Contact us</h4>
      <ul className="foot-list">
        <li><Icon name="phone" /><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></li>
        <li><Icon name="mail" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
        <li><Icon name="pin" /><span>Manzoor Colony, Karachi</span></li>
      </ul>
    </div>

    <div>
      <h4>Follow us</h4>
      <div className="social">
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            className={`social-btn ${s.icon}`}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            title={s.name}
          >
            <Icon name={s.icon} />
          </a>
        ))}
      </div>
    </div>
  </div>

  <div className="foot-bottom">
    <div className="wrap">© {new Date().getFullYear()} Developed by Zulfiqar Ali. All rights reserved.</div>
  </div>
</footer>

      {lines.length > 0 && (
        <div className="orderbar">
          <div className="wrap orderbar-inner">
            <span>{lines.length} items selected</span>
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
