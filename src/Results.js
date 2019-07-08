import React, { useEffect, useState } from "react";

const countIt = (_money, counter, fraction, setRupiah()) => {
  if (_money > fraction) {
    counter += 1;
    countIt(_money - fraction * counter, counter, fraction);
  } else {
    // const result = `${counter} x Rp${fraction}, `;
    setRupiah(_money);
    return `${counter} x Rp${fraction}, `;
  }
  // return;
  return `${counter} x Rp${fraction}, `;
};

const Results = ({ value }) => {
  const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
  const [rupiah, setRupiah] = useState(value);
  let results = "";
  let _money = value;
  let counter = 0;
  useEffect(() => console.log("useEffect", rupiah), [rupiah]);
  fractions.forEach(fraction => {
    console.log(rupiah, fraction);
    if (rupiah >= fraction) {
      let abc = countIt(rupiah, 0, fraction, setRupiah());
      if (abc) {
        // _money = abc[0];
        results += abc;
      }
      // _money = _money - fraction;
      // counter += 1;
    } else {
      // results += `${counter} x Rp${fraction}, `;
      counter = 0;
    }
    console.log(results, _money);
  });

  return <div>{results}</div>;
};

export default Results;
