import React from "react";
import SignUp from "./SignUp";
import { Raffles } from "./Raffles/List";
import { UserRaffleList } from "./Raffles/MyRaffles";
import { createBrowserRouter, NavLink } from "react-router-dom";
import { CreateRaffle } from "./CreateRaffle";
import { Participate } from "./participate";
const App = () => {
  if (
    window.localStorage.getItem("accessToken") &&
    window.location.pathname == "/"
  ) {
    console.log(window.location.pathname);
    return <UserRaffleList></UserRaffleList>;
  } else {
    return <SignUp />;
  }
};

export const router = createBrowserRouter([
  {
    path: "/user",
    element: <UserRaffleList />,
  },
  {
    path: "user/create-raffle",
    element: <CreateRaffle />,
  },
  {
    path: "/:raffleId/participate",
    element: <Participate />,
  },
  {
    path: "/raffles",
    element: <Raffles />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default App;
