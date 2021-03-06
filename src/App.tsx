import * as React from "react";
import { useState } from "react";

import Results from "./Results";
import "./App.css";
import { Transition } from "react-transition-group";

const defaultStyle = {
  transition: `opacity 500ms ease-in-out`,
  opacity: 0
};

const transitionStyle: { [id: string]: React.CSSProperties } = {
  entering: { opacity: 0.6 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.7 },
  exited: { opacity: 0 }
};

const App: React.FC = () => {
  const [money, setMoney] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInvalid, setIsInvalid] = useState("");

  function submitHandler(e: any) {
    e.preventDefault();
    setIsSubmit(!isSubmit);
    checker(money);
  }

  function checker(fraction: string) {
    /*
    check if it's valid currency
    should be replace with single regex soon
    */

    // capture invalid currency format
    // 12,500
    // 12 500
    const commaOrSpaceSeparator = /(,|\s)\d{3}$/.test(fraction);
    // 12.50
    // 12 50
    const dotOrSpaceWithNumberLessThenThree = /^\d{2,}([.]|[ ])\d{0,2}$/g.test(
      fraction
    );
    //120325 Rp
    const wrongPosition = /^\d{1,3}(.)\d{1,3}\s?(Rp)\s?$/.test(fraction);
    //Rp
    const missingValue = /^\s?(Rp)\s?$/.test(fraction);

    if (commaOrSpaceSeparator || dotOrSpaceWithNumberLessThenThree) {
      return setIsInvalid("Invalid Separator");
    }
    if (wrongPosition) {
      return setIsInvalid("Valid Character in Wrong Position");
    }
    if (missingValue) {
      return setIsInvalid("Missing Value");
    }

    // capture valid currency
    //18.215
    // const withDot = /^\d+\.?\d+$/.test(fraction); bugs if repated .xxx
    const withDot = /^\d+(.?\d{3})*$/.test(fraction);

    //Rp17500
    const withRp = /^(Rp)\d+$/.test(fraction);
    //Rp17.500,00
    const withRpDotComma = /^(Rp )|(Rp)?\d{1,3}(.)\d{1,3}(,)\d{1,2}$/.test(
      fraction
    );
    //Rp 120.325
    const withRpSpaceDot = /^(Rp)\s\d{1,3}(.)\d{1,3}$/.test(fraction);

    if (withDot || withRp || withRpDotComma || withRpSpaceDot) {
      return setIsInvalid("");
    }

    return setIsInvalid("Invalid Format");
  }
  function formatter(fraction: string) {
    /*
    cleaning data for calculating results
    */
    const withoutComma = fraction.split(",")[0].replace(/\D/g, "");
    const withoutZeroPrefix = fraction.replace(/\b0+/g, "");
    const cleanFraction =
      withoutComma || withoutZeroPrefix || fraction.replace(/\D/g, "");
    return cleanFraction;
  }

  return (
    <div className="App">
      <h1 className="money" data-testid="money">
        Denominations in Rupiah
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="input amount of money"
          className="input-money"
          data-testid="input-money"
          onChange={e => {
            setMoney(e.target.value);
            setIsSubmit(false);
          }}
        />
        <button className="submit-money" disabled={!money ? true : false}>
          Submit
        </button>
      </form>
      {/* {isSubmit && !isInvalid && (
        <Results value={parseInt(formatter(money), 0)} />
      )} */}
      <Transition in={isSubmit} timeout={500}>
        {(status: string) => (
          <div style={{ ...defaultStyle, ...transitionStyle[status] }}>
            {isSubmit && !isInvalid && (
              <Results value={parseInt(formatter(money), 0)} />
            )}
          </div>
        )}
      </Transition>
      {isSubmit && isInvalid && (
        <div className="invalid-results">
          <h2>{isInvalid}</h2>
          <div>Lists of invalid input value:</div>
          <ul>
            <li>17,500 (invalid separator)</li>
            <li>2 500(invalid separator)</li>
            <li>3000 Rp (valid character in wrong position)</li>
            <li>Rp (missing value)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
