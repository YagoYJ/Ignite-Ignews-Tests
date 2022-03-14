import { render } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";

import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SignIn Button component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    const { getByText } = render(<SignInButton />);

    expect(getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        expires: "10000",
        user: {
          email: "johndoe@gmail.com",
          image: "http://github.com/yagoyj.png",
          name: "John Doe",
        },
      },
      false,
    ]);

    const { getByText } = render(<SignInButton />);

    expect(getByText("John Doe")).toBeInTheDocument();
  });
});
