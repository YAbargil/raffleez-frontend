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
      <Group position="center">
        <NavLink to={"/"}>
          <Image height={202} width={408} fit="contain" src={`/logo.jpeg`} />
        </NavLink>
      </Group>
      <Title> Raffles</Title>
      <Flex justify={"space-between"}></Flex>
      <Divider size={3} my="xl" />
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
              {r.active ? (
                <Badge color="pink" variant="gradient">
                  ACTIVE
                </Badge>
              ) : (
                <Badge color="pink" variant="light">
                  ENDED
                </Badge>
              )}
              <br />
              <Group position="center" mt="md" mb="xs">
                <Text size="md" weight={400}>
                  Quantity: {r.quantity}
                </Text>
              </Group>
              <br />
              <NavLink to={`/${r.raffleId}/participate`}>
                <Button
                  color="indigo"
                  radius="xs"
                  fullWidth
                  uppercase
                  disabled={!r.active}
                >
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
