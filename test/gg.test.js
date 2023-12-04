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
  // const useEffectMock = jest.fn();
  // jest.spyOn(console, "warn").mockImplementation(() => {});

  // jest.spyOn(React, "useEffect").mockImplementation(useEffectMock);
  // ARRANGE
  var hh = "";
  // act(() => {
  const result = render(<PanelGauche />);
  // hh = result.container.querySelector("#pannfgifeau");
  // });

  // ACT
  //   await userEvent.click(screen.getByText('Load Greeting'))
  // .container.querySelector('#some-id');

  await screen.findByRole("contact");
  // await screen.findByRole("contact");

  // ASSERT
  // expect(hh).toHaveTextContent(
  //   "Cliquez sur les fleches pour faire defiler les systemes solaires"
  // );
  expect(screen.getByRole("contact")).toHaveTextContent(Array(7).join("Cliquez sur les fleches pour faire defiler les systemes solaires et cliquez sur une planete pour avoir des informations la concernant"));
  //   expect(screen.getByRole('button')).toBeDisabled()
});
