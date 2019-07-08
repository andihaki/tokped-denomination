import React, { useState } from "react";
import "./App.css";
import Results from "./Results";

const App: React.FC = () => {
  const [money, setMoney] = useState(0);
  const [renderResults, setRenderResults] = useState(false);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setRenderResults(!renderResults);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h3>{money}</h3>
        <form onSubmit={submitHandler}>
          <input
            type="string"
            placeholder="input amount of money"
            onChange={e => {
              setMoney(parseInt(e.target.value, 0));
              setRenderResults(false);
            }}
          />
          <button>Submit</button>
        </form>
        {renderResults && <Results value={money} />}
      </header>
    </div>
  );
};

export default App;
