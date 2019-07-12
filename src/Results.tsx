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
    200,
    100,
    50
  ];
  const results: Iresults = {};
  // let money = value;
  let money = value;

  fractions.forEach(fraction => {
    function countIt(count: number, mon: number, frac: number): any {
      if (mon >= frac) {
        // fix call stack trace
        if (mon > fractions[0]) {
          count = Math.floor(mon / fractions[0]);
          return countIt(count, mon % fractions[0], frac);
        }
        count += 1;
        return countIt(count, mon - frac, frac);
      }
      return count;
    }
    if (money >= fraction) {
      let counter = countIt(0, money, fraction);

      money = money - counter * fraction;
      results[fraction] = counter;
    }

    // no available fraction
    if (money && money < fraction && money < 50) {
      results["-"] = money;
    }
  });

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fraction</th>
            <th>Total</th>
          </tr>
        </thead>
        {fractions.map(
          fraction =>
            results[fraction] && (
              <tbody key={fraction}>
                <tr>
                  <td>{results[fraction]}</td>
                  <td>
                    {fraction.toLocaleString("id", {
                      style: "currency",
                      currency: "IDR"
                    })}
                  </td>
                  <td>
                    {(results[fraction] * fraction).toLocaleString("id", {
                      style: "currency",
                      currency: "IDR"
                    })}
                  </td>
                </tr>
              </tbody>
            )
        )}
      </table>
      <p>
        {results["-"] &&
          "left " +
            results["-"].toLocaleString("id", {
              style: "currency",
              currency: "IDR"
            }) +
            " (no available fraction)"}{" "}
      </p>
    </React.Fragment>
  );
};

export default Results;
