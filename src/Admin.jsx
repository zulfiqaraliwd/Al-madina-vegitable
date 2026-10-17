import { useState } from "react";
import { ADMIN_PIN, loadPrices, savePrices, resetPrices, unitOf } from "./prices";

const CATEGORIES = ["Local Vegetables", "Imported Vegetables", "Fresh Fruits"];

export default function Admin({ items }) {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState("");
  const [prices, setPrices] = useState(loadPrices());
  const [saved, setSaved] = useState(false);

  if (!ok) {
    return (
      <div className="admin wrap">
        <h2>Admin login</h2>
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (pin === ADMIN_PIN ? setOk(true) : alert("Wrong PIN"))}
        />
        <button className="btn" onClick={() => (pin === ADMIN_PIN ? setOk(true) : alert("Wrong PIN"))}>
          Login
        </button>
        <p><a href="#">← Back to shop</a></p>
      </div>
    );
  }

  const set = (slug, v) => {
    setSaved(false);
    setPrices((p) => ({ ...p, [slug]: v === "" ? "" : Number(v) }));
  };

  const save = () => {
    const clean = {};
    for (const [k, v] of Object.entries(prices)) if (v) clean[k] = v;
    savePrices(clean);
    setSaved(true);
  };

  const reset = () => {
    if (!confirm("Saved rates hata kar default rates par wapas jayen?")) return;
    resetPrices();
    setPrices(loadPrices());
    setSaved(false);
  };

  return (
    <div className="admin wrap">
      <div className="admin-head">
        <h2>Set prices</h2>
        <a href="#">← Back to shop</a>
      </div>
      <p className="note">
       {" "}
        <code>src/prices.js</code> mein <code>DEFAULT_PRICES</code> update kar ke push karein.
      </p>

      {CATEGORIES.map((cat) => (
        <section key={cat}>
          <h3>{cat}</h3>
          <div className="admin-grid">
            {items
              .filter((i) => i.category === cat)
              .map((i) => (
                <label key={i.slug} className="admin-row">
                  <span>{i.name}</span>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={prices[i.slug] ?? ""}
                    onChange={(e) => set(i.slug, e.target.value)}
                    placeholder="Rs."
                  />
                  <em>/ {unitOf(i.slug)}</em>
                </label>
              ))}
          </div>
        </section>
      ))}

      <div className="admin-actions">
        <button className="btn" onClick={save}>Save prices</button>
        <button className="btn ghost" onClick={reset}>Reset</button>
        {saved && <span className="ok">Saved ✓</span>}
      </div>
    </div>
  );
}
