import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  const mockOnClick = jest.fn();

  test("renders the card with the correct value when flipped", () => {
    act(() => {
      render(
        <Card
          id={1}
          value="Card 1"
          isFlipped={true}
          isMatched={false}
          onClick={mockOnClick}
        />
      );
    });
    expect(screen.getByText("Card 1")).toBeInTheDocument();
  });

  test("renders the card back when not flipped or matched", () => {
    act(() => {
      render(
        <Card
          id={1}
          value="Card 1"
          isFlipped={false}
          isMatched={false}
          onClick={mockOnClick}
        />
      );
    });
    expect(screen.getByText("❓")).toBeInTheDocument();
  });

  test("triggers onClick when clicked", () => {
    act(() => {
      render(
        <Card
          id={1}
          value="Card 1"
          isFlipped={false}
          isMatched={false}
          onClick={mockOnClick}
        />
      );
    });
    fireEvent.click(screen.getByText("❓"));
    expect(mockOnClick).toHaveBeenCalledWith(1);
  });
});
