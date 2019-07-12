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
  //   const result = getAllByText("IDR 50");
  //   expect(result).toBeDefined();
  // });
  it("value = 15000", () => {
    const { getAllByText } = render(<Results value={15000} />);
    getAllByText("IDR 10,000");
    getAllByText("IDR 5,000");
  });
  it("value = 3900", () => {
    const { getAllByText } = render(<Results value={3900} />);
    getAllByText("IDR 2,000");
    getAllByText("IDR 1,000");
    getAllByText("IDR 500");
    getAllByText("IDR 100");
  });
  it("value = 12510", () => {
    const { getAllByText } = render(<Results value={12510} />);
    getAllByText("IDR 10,000");
    getAllByText("IDR 2,000");
    getAllByText("IDR 500");
    getAllByText("left IDR 10 (no available fraction)");
  });
});
