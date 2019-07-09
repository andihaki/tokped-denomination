import * as React from "react";
import { useState } from "react";

import Results from "./Results";

const App: React.FC = () => {
  const [money, setMoney] = useState(2500);
  const [isCount, setIsCount] = useState(false);

  function submitHandler(e: any) {
    console.log("ok", money);
    e.preventDefault();
    setIsCount(!isCount);
  }
  return (
    <div className="App">
      <h3>{money}</h3>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="input amount of money"
          onChange={e => {
            setMoney(parseInt(e.target.value, 0));
            setIsCount(false);
          }}
        />
        <button>Submit</button>
      </form>
      {isCount && <Results value={money} />}
    </div>
  );
};

export default App;
