import React from "react";
import { render, cleanup } from "@testing-library/react";

import Results from "../Results";

afterEach(cleanup);

describe("Render Correctly", () => {
  it("empty value", () => {
    const { getByText } = render(<Results />);
    const result = getByText("0");
    expect(result).toBeDefined();
  });
  it("value = 50", () => {
    const props = {
      value: 50
    };
    const { getByText } = render(<Results {...props} />);
    const result = getByText("1x Rp50");
    expect(result).toBeDefined();
  });
  it("value = 15000", () => {
    const { getByText } = render(<Results value={15000} />);
    getByText("1x Rp10000");
    getByText("1x Rp5000");
  });
  it("value = 3900", () => {
    const { getByText } = render(<Results value={3900} />);
    getByText("1x Rp2000");
    getByText("1x Rp1000");
    getByText("1x Rp500");
    getByText("4x Rp100");
  });
  it("value = 12510", () => {
    const { getByText } = render(<Results value={12510} />);
    getByText("1x Rp10000");
    getByText("1x Rp2000");
    getByText("1x Rp500");
    getByText("left Rp10 (no available fraction)");
  });
});
