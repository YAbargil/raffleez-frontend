import React, { useEffect, useState } from "react";

import {
  Button,
  Container,
  Group,
  Title,
  Image,
  Grid,
  Flex,
  Divider,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { RaffleHandler } from "../rafflesHandler";
import { getMyRaffles } from "../api";

export const UserRaffleList = () => {
  const [raffles, setRaffles] = useState<any[]>([]);

  const updateParticipants = (participants, id) => {
    const index = raffles.findIndex((r) => r.raffleId === id);
    const current = raffles[index];
    current.nominees = participants;

    const newState = [...raffles];
    newState[index] = current;
    setRaffles(newState);
  };
  useEffect(() => {
    const fetchUserRaffles = async () => {
      try {
        const result = await getMyRaffles();
        console.log("User raffles:", result.data.raffles);
        setRaffles(result.data.raffles);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUserRaffles();
  }, []);

  return (
    <Container mt="lg">
      <Group position="center">
        <NavLink to={"/"}>
          <Image height={202} width={408} fit="contain" src={`/logo.jpeg`} />
        </NavLink>
      </Group>
      <Flex justify={"space-between"}></Flex>
      <Group position="right">
        <NavLink to={"/user/create-raffle"}>
          <Button size="lg">Create New Raffle</Button>
        </NavLink>
      </Group>
      <Title>My Raffles</Title>
      <Divider my="lg" />
      <Grid mt={10}>
        {raffles.map((r) => (
          <RaffleHandler raffle={r} updateParticipants={updateParticipants} />
        ))}
      </Grid>
    </Container>
  );
};
