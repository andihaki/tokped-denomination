import React from "react";
import { render, cleanup } from "@testing-library/react";

import Results from "../Results";

afterEach(cleanup);

describe("Render Correctly", () => {
  // it("empty value", () => {
  //   const { getByText } = render(<Results />);
  //   const result = getByText("");
  //   expect(result).toBeDefined();
  // });
  // it("value = 50", () => {
  //   const props = {
  //     value: 50
  //   };
  //   const { getAllByText } = render(<Results {...props} />);
  //   const result = getAllByText("Rp 50");
  //   expect(result).toBeDefined();
  // });
  it("value = 15000", () => {
    const { getAllByText } = render(<Results value={15000} />);
    getAllByText("Rp 10.000,00");
    getAllByText("Rp 5.000,00");
  });
  it("value = 3900", () => {
    const { getAllByText } = render(<Results value={3900} />);
    getAllByText("Rp 2.000,00");
    getAllByText("Rp 1.000,00");
    getAllByText("Rp 500,00");
    getAllByText("Rp 200,00");
  });
  it("value = 12510", () => {
    const { getAllByText } = render(<Results value={12510} />);
    getAllByText("Rp 10.000,00");
    getAllByText("Rp 2.000,00");
    getAllByText("Rp 500,00");
    getAllByText("left Rp 10,00 (no available fraction)");
  });
});
