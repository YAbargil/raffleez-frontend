import React from "react";
import SignUp from "./SignUp";
import { RaffleList } from "./Raffles/List";
import { createBrowserRouter } from "react-router-dom";
import { CreateRaffle } from "./CreateRaffle";

const App = () => {
  // if user authenticated show app
  // if not show login / sign up

  return <SignUp />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/rafflez",
    element: <RaffleList />,
  },
  {
    path: "/create-raffle",
    element: <CreateRaffle />,
  },
]);

export default App;
