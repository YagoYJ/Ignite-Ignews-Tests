import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

test("it render correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  //   expect(
  //     await screen.findByText(
  //       "Button",
  //       {},
  //       {
  //         timeout: 3000,
  //       }
  //     )
  //   ).toBeInTheDocument();

  await waitFor(
    () => {
      expect(screen.getByText("Button")).toBeInTheDocument();
    },
    {
      timeout: 3000,
    }
  );
});
