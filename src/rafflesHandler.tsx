import React, { useState } from "react";
import {
  LoadingOverlay,
  Avatar,
  Drawer,
  Badge,
  Button,
  Card,
  Group,
  Title,
  Text,
  Image,
  Grid,
  Accordion,
  ScrollArea,
} from "@mantine/core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endRaffle } from "./api";
import { ParticipateDrawer } from "./ParticipantsDrawer";
interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

export const RaffleHandler = ({ raffle, updateParticipants }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      setLoading(true);
      const result = await endRaffle(raffleId);
      result.status == 200
        ? setMessage("Raffle Ended, Emails sent !")
        : setMessage("Error eccoured");
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid.Col span={4} key={raffle.raffleId}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={raffle.product.image} height={160} alt={raffle.name} />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={900}>{raffle.name}</Text>
        </Group>
        {raffle.active ? (
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
                {raffle.quantity}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Participants" key="Participants">
            <Accordion.Control disabled={raffle.nominees.length == 0}>
              <AccordionLabel
                label="Participants"
                image="https://i.ibb.co/QkFP7j3/vector60-7909-01.jpg"
                description={
                  raffle.nominees.length === 0
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
                    &nbsp; &nbsp;{raffle.nominees.length}
                    <div>
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
        <br />
        <br />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xl"
          lockScroll={false}
        >
          <ScrollArea style={{ height: "100%" }}>
            <Title>Participants</Title>
            <ParticipateDrawer
              participants={raffle.nominees}
              isActive={raffle.active}
              raffleId={raffle.raffleId}
              updateParticipants={updateParticipants}
            />
          </ScrollArea>
        </Drawer>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Button
          color="indigo"
          radius="xs"
          fullWidth
          uppercase
          disabled={!raffle.active}
          onClick={() => {
            endRaffleHandler(raffle.raffleId);
          }}
        >
          END RAFFLE
        </Button>
      </Card>
      {message ? <Text>{message}</Text> : null}
    </Grid.Col>
  );
};
