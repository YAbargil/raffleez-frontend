import React, { useEffect, useState } from "react";
import { getMyRaffles, endRaffle } from "../api";

import axios from "axios";
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
import { NavLink } from "react-router-dom";

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}
export const UserRaffleList = () => {
  const [message, setMessage] = useState("");
  const [raffles, setRaffles] = useState<any[]>([]);
  const tempToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc2Mjk0NTA4fQ.vJ23G14tJNQGFpjfecf2t_paxv0gjdoSclAjBIEvWqk`;

  function AccordionLabel({ label, image, description }: AccordionLabelProps) {
    return (
      <Group noWrap>
        <Avatar src={image} radius="xl" size="lg" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {description}
          </Text>
        </div>
      </Group>
    );
  }

  const endRaffleHandler = async (raffleId) => {
    try {
      const result = await endRaffle(raffleId);
      console.log(result.data.msg);
      result.status == 200
        ? setMessage("Raffle Ended !")
        : setMessage("Error eccoured");
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const fetchUserRaffles = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${tempToken} `;
        const result = await axios.get(
          `https://raffleez.onrender.com/myraffles`
        );
        //const result = await getMyRaffles();
        console.log(result.data);
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
              <Accordion chevronPosition="right" variant="contained">
                <Accordion.Item value="Quantity" key="Quantity">
                  <Accordion.Control>
                    <AccordionLabel
                      label="Quantity"
                      image="https://i.ibb.co/NFfVzww/stack-5858-1.png"
                      description="Total quantity to giveaway"
                    ></AccordionLabel>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{r.quantity}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Participants" key="Participants">
                  <Accordion.Control>
                    <AccordionLabel
                      label="Participants"
                      image="https://i.ibb.co/QkFP7j3/vector60-7909-01.jpg"
                      description="How many people have already joined the raffle"
                    ></AccordionLabel>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{r.nominees.length}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              {/* <Group position="apart" mt="md" mb="xs">
                <Text weight={100}>Quantity: {r.quantity}</Text>
              </Group>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={100}>Participants: {r.nominees.length}</Text>
              </Group> */}
              <br />
              <br />
              <Button
                color="indigo"
                radius="xs"
                fullWidth
                uppercase
                onClick={endRaffleHandler}
              >
                END RAFFLE
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {message === "" ? null : <Text size="sm">{message}</Text>}
    </Container>
  );
};
