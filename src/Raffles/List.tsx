import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Title,
  Text,
  Image,
  Grid,
  Accordion,
  Flex,
  Divider,
} from "@mantine/core";
import React, { useState } from "react";
import { getAllRaffles } from "../api";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Raffles = () => {
  const [raffles, setRaffles] = useState<any[]>([]);
  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const result = await getAllRaffles();
        console.log(result.data.raffles);
        console.log("User raffles:", result.data.raffles);
        setRaffles(result.data.raffles);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchRaffles();
  }, []);

  return (
    <Container mt="lg">
      <NavLink to={"/"}>
        <Image src={`/logo.jpeg`} />
      </NavLink>
      <Title>My Raffles</Title>
      <Flex justify={"space-between"}></Flex>
      <Divider my="lg" />
      <Grid mt={10}>
        {raffles.map((r) => (
          <Grid.Col span={4} key={r.raffleId}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={r.product.image} height={160} alt={r.name} />
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={900}>{r.name}</Text>
              </Group>
              <Badge color="pink" variant="gradient">
                ACTIVE
              </Badge>
              <br />
              <br />
              <Group position="apart" mt="md" mb="xs">
                <Text weight={100}>Quantity: {r.quantity}</Text>
              </Group>
              <br />
              <br />
              <NavLink to={`/${r.raffleId}/participate`}>
                <Button color="indigo" radius="xs" fullWidth uppercase>
                  ENTER RAFFLE
                </Button>
              </NavLink>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
