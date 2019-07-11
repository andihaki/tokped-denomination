import * as React from "react";

interface IResults {
  value: number;
}

interface Iresults {
  [key: string]: number;
}

// function memo<P extends object>(
//   Component: SFC<P>,
//   propsAreEqual?: (
//     prevProps: Readonly<PropsWithChildren<P>>,
//     nextProps: Readonly<PropsWithChildren<P>>
//   ) => boolean
// ): NamedExoticComponent<P>;
// const Results: <P extends object>(Component: FC<P>, propsAreEqual? : (IResults | any))  => {
// const Results: React.FC<IResults | any> = ({ value }: IResults) => {
const Results = ({ value }: IResults): any => {
  const fractions = [
    100000,
    50000,
    20000,
    10000,
    5000,
    2000,
    1000,
    500,
    // 200,
    100,
    50
  ];
  const results: Iresults = {};
  // let money = value;
  let money = value;

  fractions.forEach(fraction => {
    // function countIt(count: number, mon: number, frac: number): any {
    //   if (mon >= frac) {
    //     count += 1;
    //     return countIt(count, mon - frac, frac);
    //   }
    //   return count;
    // }
    function countIt(count: number, mon: number, frac: number): any {
      if (mon >= frac) {
        if (mon > fractions[0]) {
          count = Math.floor(mon / fractions[0]);
          // console.log(count);
          // const moneyLeft = frac * count;
          // 125550260
          return countIt(count, mon % fractions[0], frac);
        }
        count += 1;
        return countIt(count, mon - frac, frac);
      }
      return count;
    }
    if (money >= fraction) {
      let test = countIt(0, money, fraction);
      // let test = React.useMemo(() => countIt(0, money, fraction), [
      //   money,
      //   fraction
      // ]);

      money = money - test * fraction;
      results[fraction] = test;
      // console.info(test, money, fraction);
    }

    // no available fraction
    if (money && money < fraction && money < 50) {
      results[money] = 1;
      // console.log("last fraction");
    }
  });
  // console.log(results);

  return (
    Object.keys(results).length &&
    Object.keys(results).map((result, index) => {
      // return <div key={index}>{results[result] + "x Rp" + result}</div>;
      return (
        <div key={index} className="results">
          {parseInt(result, 0) >= 50
            ? results[result] + "x Rp" + result
            : "left Rp" + result + " (no available fraction)"}
        </div>
      );
    })
  );
};

export default Results;
