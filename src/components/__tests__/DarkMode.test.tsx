import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import ToggleColorMode from '../Header/ToggleColorMode';

test("render dark mode component", () => {
   render(<ToggleColorMode />);

   const inputElement = screen.getByRole("checkbox") as HTMLInputElement;
   expect(inputElement).toBeInTheDocument();
})

