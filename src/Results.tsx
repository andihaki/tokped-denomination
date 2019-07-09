import * as React from "react";

interface IResults {
  value: number;
}

interface Iresults {
  [key: string]: number;
}

// const Results: React.FC<IResults> = ({ value }: IResults) => {
const Results = ({ value }: IResults): any => {
  const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
  const results: Iresults = {};
  // let money = value;
  let money = value;

  fractions.forEach(fraction => {
    function countIt(count: number, mon: number, frac: number): any {
      if (mon >= frac) {
        count += 1;
        return countIt(count, mon - frac, frac);
      }
      return count;
    }
    if (money >= fraction) {
      let test = countIt(0, money, fraction);
      money = money - test * fraction;
      results[fraction] = test;
      console.info(test, money, fraction);
    }
  });
  console.log(results);

  return (
    Object.keys(results).length &&
    Object.keys(results).map((result, index) => {
      return <div key={index}>{results[result] + "x Rp" + result}</div>;
    })
  );
};

export default Results;
