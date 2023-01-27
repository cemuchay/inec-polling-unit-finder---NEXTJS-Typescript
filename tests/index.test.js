import Home from "pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("PU Form", () => {
    it("renders Input Elements For PU Search", () => {
      render(<Home />);
      

      
      // check if all components are rendered
      expect(screen.getByTestId("stateSelect")).toBeInTheDocument();
      // expect(screen.getByTestId("LgaSelect")).toBeInTheDocument();
      // expect(screen.getByTestId("wardSelect")).toBeInTheDocument();
    });
  });


