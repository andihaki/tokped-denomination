import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  getByTestId,
  queryByAttribute
} from "@testing-library/react";
import { toBeDisabled } from "@testing-library/jest-dom";

import App from "../App";

afterEach(cleanup);

describe("Correct Value", () => {
  it("first render", () => {
    const { container } = render(<App />);
    // // const money = getByTestId(container, "money");
    const inputMoney = getByTestId(container, "input-money");
    expect(inputMoney.textContent).toBe("");
  });

  it("input value and submit", () => {
    const { container, getAllByText, getByText } = render(<App />);

    const inputMoney = getByTestId(container, "input-money");
    // const getByClass = queryByAttribute.bind(null, "class");
    // const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "18.250";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);
    // console.log(getByTestId(container, "results"));

    expect(inputMoney.value).toEqual(newMoney);

    expect(getAllByText(`Rp 50,00`)).toBeDefined();
    expect(getAllByText("Rp 200,00")).toBeDefined();
    expect(getAllByText("Rp 1.000,00")).toBeDefined();
    expect(getAllByText("Rp 2.000,00")).toBeDefined();
    expect(getAllByText("Rp 5.000,00")).toBeDefined();
    expect(getAllByText("Rp 10.000,00")).toBeDefined();
  });

  it("Rp 120.325", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "Rp 120.325";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("left Rp 25,00 (no available fraction)")).toBeDefined();
    expect(getAllByText("Rp 100,00")).toBeDefined();
    expect(getAllByText("Rp 20.000,00")).toBeDefined();
    expect(getAllByText("Rp 100.000,00")).toBeDefined();
  });

  it("005.000", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "005.000";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Rp 5.000,00")).toBeDefined();
  });

  it("001000", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "001000";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Rp 1.000,00")).toBeDefined();
  });

  it("Rp17500 or Rp17.500,00", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    let newMoney = "Rp17500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Rp 500,00")).toBeDefined();
    expect(getAllByText("Rp 2.000,00")).toBeDefined();
    expect(getAllByText("Rp 5.000,00")).toBeDefined();
    expect(getAllByText("Rp 10.000,00")).toBeDefined();

    newMoney = "Rp17.500,00";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Rp 500,00")).toBeDefined();
    expect(getAllByText("Rp 2.000,00")).toBeDefined();
    expect(getAllByText("Rp 5.000,00")).toBeDefined();
    expect(getAllByText("Rp 10.000,00")).toBeDefined();
  });
});

describe("InCorrect Value", () => {
  it("17,500 or 2 500", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    let newMoney = "17,500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Invalid Separator")).toBeDefined();

    newMoney = "2 500";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Invalid Separator")).toBeDefined();
  });

  it("3000 Rp", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "3000 Rp";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Valid Character in Wrong Position")).toBeDefined();
  });

  it("Rp", () => {
    const { container, getAllByText, getByText } = render(<App />);
    // const money = getByTestId(container, "money");
    // const inputMoney = getByTestId(container, "input-money");
    const getByClass = queryByAttribute.bind(null, "class");
    const inputMoney = getByClass(container, "input-money"); // wow it works
    const submitButton = getByText("Submit");

    const newMoney = "Rp";

    fireEvent.change(inputMoney, { target: { value: newMoney } });
    fireEvent.click(submitButton);

    expect(getAllByText("Missing Value")).toBeDefined();
  });
});

describe("Onclick submit button", () => {
  it("clickable", () => {
    const { getByText } = render(<App />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
  });

  it("render default", () => {
    const { getByText, container } = render(<App />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    // getByText("125x Rp100000");
    const inputMoney = getByTestId(container, "input-money");
    expect(inputMoney.textContent).toBe("");

    expect.extend({ toBeDisabled });
    expect(submitButton).toBeDisabled();
  });
});
