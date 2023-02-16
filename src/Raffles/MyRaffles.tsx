import React, { useEffect, useState } from "react";
import { getMyRaffles, endRaffle, removeParticipant } from "../api";

import axios from "axios";
import {
  LoadingOverlay,
  Alert,
  Collapse,
  Box,
  List,
  Avatar,
  Drawer,
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
import { useLocation, NavLink } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}
export const UserRaffleList = () => {
  const [opened, setOpened] = useState(false); //drawer-status
  const [button, setButton] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [message, setMessage] = useState("");
  const [raffles, setRaffles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); //while waiting to end raffle
  const tempToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc2Mjk0NTA4fQ.vJ23G14tJNQGFpjfecf2t_paxv0gjdoSclAjBIEvWqk`;
  // const location = useLocation();
  // const raffleId = location.pathname.substring(
  //   1,
  //   location.pathname.lastIndexOf("/")
  // );

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

  const removeParticipantHandler = async (raffeId, index) => {
    try {
      const result = await removeParticipant("63eb4b8b0af3e9ca5b289b05", index); //change to raffleId
      console.log(result.data.msg);
      setCollapse(!collapse);
      setButton(!button);
    } catch (error) {
      console.log("error:", error);
    }
  };
  function participateDrawer(participants, isActive) {
    return (
      <List spacing="md" withPadding>
        <br></br>
        <br></br>
        {participants.map((participant) => (
          <List.Item key={participant.email}>
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                textAlign: "center",
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
            >
              <Avatar
                radius="xl"
                color="teal"
                style={{ marginRight: 16 }}
              ></Avatar>

              <div>
                <Text weight={500}>{participant.name}</Text>
                <Text size="sm" color="gray" style={{ marginBottom: 8 }}>
                  {participant.email}
                </Text>
                {participant.winner ? (
                  <Badge color="teal" variant="filled">
                    Winner
                  </Badge>
                ) : null}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br></br>
                <Button
                  disabled={!isActive}
                  variant="outline"
                  color="gray"
                  onClick={() => {
                    setCollapse(!collapse);
                  }}
                >
                  Edit
                </Button>
                <Box>
                  <Group position="center">
                    <Collapse key={participant.email} in={collapse}>
                      <br></br>
                      <Alert
                        title="Caution!"
                        color="red"
                        radius="xs"
                        variant="outline"
                      >
                        Deleting a participant is unreverseable!
                        <br></br>
                        <br></br>
                        <Button
                          variant="outline"
                          color="red"
                          radius="xs"
                          size="xs"
                          compact
                          onClick={() =>
                            removeParticipantHandler(
                              "XXXX", //raffleId
                              participant.ticket
                            )
                          }
                        >
                          Remove Participant
                        </Button>
                      </Alert>
                    </Collapse>
                  </Group>
                </Box>
              </div>
            </Box>
            <Divider size="md"></Divider>
          </List.Item>
        ))}
      </List>
    );
  }
  const endRaffleHandler = async (raffleId) => {
    try {
      //needs token

      axios.defaults.headers.common["Authorization"] = `Bearer ${tempToken} `;
      const result = await axios.get(
        `https://raffleez.onrender.com/myraffles/${raffleId}/end`
      );
      console.log(result.data.msg);
      result.status == 200
        ? setMessage("Raffle Ended, Emails sent !")
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
                    <Text size="lg" weight={500} align="center">
                      {r.quantity}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Participants" key="Participants">
                  <Accordion.Control disabled={r.nominees.length == 0}>
                    <AccordionLabel
                      label="Participants"
                      image="https://i.ibb.co/QkFP7j3/vector60-7909-01.jpg"
                      description={
                        r.nominees.length === 0
                          ? "How many people have already joined the raffle (currently none)"
                          : "How many people have already joined the raffle"
                      }
                    ></AccordionLabel>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Group position="left">
                      <ul>
                        <li key={5}>
                          <FontAwesomeIcon icon={faUserCircle} />
                          &nbsp; &nbsp;{r.nominees.length}
                          <div>
                            <br></br>
                            &nbsp; &nbsp;
                            <Button radius="xs" onClick={() => setOpened(true)}>
                              Show Participants
                            </Button>
                          </div>
                        </li>
                      </ul>
                    </Group>
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
              <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="xl"
                size="xl"
              >
                <Title>Participants</Title>
                {participateDrawer(r.nominees, r.active)}
              </Drawer>
              <LoadingOverlay visible={loading} overlayBlur={2} />
              <Button
                color="indigo"
                radius="xs"
                fullWidth
                uppercase
                disabled={!r.active}
                onClick={() => {
                  setLoading(true);
                  endRaffleHandler(r.raffleId);
                }}
              >
                END RAFFLE
              </Button>
            </Card>
            {message ? <Text>{message}</Text> : null}
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
