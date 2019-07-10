import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  getByTestId,
  queryByAttribute
} from "@testing-library/react";

import App from "../App";

afterEach(cleanup);

describe("Correct Value", () => {
  it("first render", () => {
    const { container } = render(<App />);
    const money = getByTestId(container, "money");
    expect(money.textContent).toBe("12.500.000");
  });

  it("input value and submit", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "18.250";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("1x Rp50")).toBeDefined();
    expect(getByText("2x Rp100")).toBeDefined();
    expect(getByText("1x Rp1000")).toBeDefined();
    expect(getByText("1x Rp2000")).toBeDefined();
    expect(getByText("1x Rp5000")).toBeDefined();
    expect(getByText("1x Rp10000")).toBeDefined();
  });

  it("Rp 120.325", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "Rp 120.325";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("left Rp25 (no available fraction)")).toBeDefined();
    expect(getByText("3x Rp100")).toBeDefined();
    expect(getByText("1x Rp20000")).toBeDefined();
    expect(getByText("1x Rp100000")).toBeDefined();
  });

  it("005.000", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "005.000";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("1x Rp5000")).toBeDefined();
  });

  it("001000", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "001000";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("1x Rp1000")).toBeDefined();
  });

  it("Rp17500 or Rp17.500,00", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    let newMoney = "Rp17500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("1x Rp500")).toBeDefined();
    expect(getByText("1x Rp2000")).toBeDefined();
    expect(getByText("1x Rp5000")).toBeDefined();
    expect(getByText("1x Rp10000")).toBeDefined();

    newMoney = "Rp17.500,00";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("1x Rp500")).toBeDefined();
    expect(getByText("1x Rp2000")).toBeDefined();
    expect(getByText("1x Rp5000")).toBeDefined();
    expect(getByText("1x Rp10000")).toBeDefined();
  });
});

describe("InCorrect Value", () => {
  it("17,500 or 2 500", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    let newMoney = "17,500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("Invalid Separator")).toBeDefined();

    newMoney = "2 500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("Invalid Separator")).toBeDefined();
  });

  it("3000 Rp", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "3000 Rp";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("Valid Character in Wrong Position")).toBeDefined();
  });

  it("Rp", () => {
    const { container, getByText } = render(<App />);
    const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "Rp";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(money.textContent).toEqual(newMoney);

    expect(getByText("Missing Value")).toBeDefined();
  });
});

describe("Onclick submit button", () => {
  it("clickable", () => {
    const { getByText } = render(<App />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
  });

  it("render default", () => {
    const { getByText } = render(<App />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    getByText("125x Rp100000");
  });
});
