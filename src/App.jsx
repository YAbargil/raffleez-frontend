import React from "react";
import SignUp from "./SignUp";
import { Raffles } from "./Raffles/List";
import { UserRaffleList } from "./Raffles/MyRaffles";
import { createBrowserRouter } from "react-router-dom";
import { CreateRaffle } from "./CreateRaffle";
import { Participate } from "./participate";
const App = () => {
  // if user authenticated show app
  // if not show login / sign up

  // return <CreateRaffle />;
  // return <SignUp />;
  return <UserRaffleList />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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
]);

export default App;
