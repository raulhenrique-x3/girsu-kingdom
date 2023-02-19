import { fireEvent, render } from "@testing-library/react";
import { Login } from "../../pages/login/Login";

describe("Login page", () => {
  it("Input fields are present", () => {
    const { getByTestId } = render(<Login />);
    const loginPage = getByTestId("LoginPage");
    expect(loginPage).toContainElement(getByTestId("TitleInput"));
    expect(loginPage).toContainElement(getByTestId("TitlePasswordInput"));
  });

  it("Input fields are functioning correctly", () => {
    const { getByTestId } = render(<Login />);

    const titleInput = getByTestId("TitleInput");
    expect(titleInput).toHaveValue("");
    fireEvent.change(titleInput, { target: { value: "test@gmail.com" } });
    expect(titleInput).toHaveValue("test@gmail.com");

    const titlePasswordInput = getByTestId("TitlePasswordInput");
    expect(titlePasswordInput).toHaveValue("");
    fireEvent.change(titlePasswordInput, { target: { value: "password" } });
    expect(titlePasswordInput).toHaveValue("password");
  });

  it("Login button is present and functioning correctly", () => {
    const { getByTestId } = render(<Login />);

    const loginButton = getByTestId("LoginButton");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
  });
});
