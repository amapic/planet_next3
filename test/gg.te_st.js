import { render, screen, act } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
// import Home from "../pages/index";
import PanelGauche from "../components_planet/PanneauMobile";
import React from "react";

// const setup = () => {
  // return render(Home);
// };
// jest.mock('@react-three/cannon');

test("Texte centrale", async () => {
  var hh = "";
  const result = render(<PanelGauche />);

  await screen.findByRole("contact");
  expect(screen.getByRole("contact")).toHaveTextContent(Array(7).join("Cliquez sur les fleches pour faire defiler les systemes solaires et cliquez sur une planete pour avoir des informations la concernant"));
});
