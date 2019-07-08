import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
  const [money, setMoney] = useState(50000);
  let results = "";

  const countIt = (counter: number, value: number, fraction: number) => {
    // console.log(counter, value, fraction);
    if (value > fraction) {
      counter += 1;
      countIt(counter, value - fraction, fraction);
    } else {
      // console.log(value, `${counter} x Rp${fraction}, `);
      results += `${counter} x Rp${fraction}, `;
      // counter = 0;
    }
    return counter;
  };

  const submitHandler = (e: any) => {
    console.log("ok", money);
    e.preventDefault();

    let _money = money;
    // let _money = 50000;

    fractions.forEach(fraction => {
      // console.log(money, fraction);
      let counter = 0;
      if (_money > fraction) {
        counter = countIt(counter, _money, fraction);

        _money = _money - counter * fraction;
        console.log(counter, _money, fraction);
        counter = 0;
      }
    });

    console.log(results);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h3>{money}</h3>
        <form onSubmit={submitHandler}>
          <input
            type="string"
            placeholder="input amount of money"
            onChange={e => setMoney(parseInt(e.target.value, 0))}
          />
          <button>Submit</button>
        </form>
      </header>
    </div>
  );
};

export default App;
