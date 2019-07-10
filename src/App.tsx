import * as React from "react";
import { useState } from "react";

import Results from "./Results";

const App: React.FC = () => {
  const [money, setMoney] = useState("12 500");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInvalid, setIsInvalid] = useState("");

  function submitHandler(e: any) {
    console.log("ok", money);
    e.preventDefault();
    setIsSubmit(!isSubmit);
    // fractionChecker(money);
    console.info(checker(money));
  }

  // function fractionChecker(fraction) {
  //   // const regex = /(?=.*\d)^(Rp)|(\s)|(0.+)?(([1-9]\d{0,2}(.\d{3})*)|0)?(,\d{1,2})?$/;
  //   // const regex = /(?=.)^(Rp(\s)?)?((\d{0,2}(.\d)*)|0)?(,\d{1,2})?$/;
  //   // const regex = /^(?!0.00)\d{1,3}(.?\d{3})*(,\d\d)?$/
  //   const regex = /(Rp )|(Rp)?\d{1,3}(?!,)(?:.)/;
  //   console.log(regex.test(fraction));
  //   return regex.test(fraction);
  // }

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

    // console.log(commaOrSpaceSeparator, dotOrSpaceWithNumberLessThenThree);
    if (commaOrSpaceSeparator || dotOrSpaceWithNumberLessThenThree) {
      return setIsInvalid("Invalid Separator");
      // return false;
    }
    if (wrongPosition) {
      return setIsInvalid("Valid Character in Wrong Position");
      // return false;
    }
    if (missingValue) {
      return setIsInvalid("Missing Value");
      // return false;
    }

    // capture valid currency
    //18.215
    const withDot = /^\d+\.?\d+$/.test(fraction);
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
      // return true;
    }

    return setIsInvalid("Invalid Format");
    // return false;
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
  // console.log("isInvalid", isInvalid);
  return (
    <div className="App">
      <h1 className="money">{money || ""}</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="input amount of money"
          className="input-money"
          onChange={e => {
            setMoney(e.target.value);
            setIsSubmit(false);
            // fractionChecker(e.target.value);
          }}
        />
        <button className="submit-money">Submit</button>
      </form>
      {isSubmit && !isInvalid && (
        <Results value={parseInt(formatter(money), 0)} />
      )}
      {isSubmit && isInvalid && <p className="invalid-results">{isInvalid}</p>}
    </div>
  );
};

export default App;
