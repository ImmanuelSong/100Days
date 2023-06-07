import { useState, useEffect } from "react";

const url = "http://api.coinpaprika.com/v1/tickers";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  let price;
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={handleSelect}>
          {coins.map((coin) => (
            <option key={coin.id}>{coin.name}</option>
          ))}
        </select>
      )}
      <label htmlFor="usd">USD</label>
      <input
        type="number"
        onChange={(e) => {
          e.preventDefault();
          setUsd(e.target.value);
        }}
        value={usd}
        placeholder="How much dollars?"
      />

      <label htmlFor="coins">{selected}</label>
      {coins.map((coin) => {
        if (coin.name === selected) {
          price = coin.quotes.USD.price;
        }
      })}
      <input type="number" value={usd / price} placeholder="is Equal to" />
    </div>
  );
}
export default App;
