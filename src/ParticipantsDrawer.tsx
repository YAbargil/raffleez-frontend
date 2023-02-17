import React, { useState } from "react";
import {
  Alert,
  Collapse,
  Box,
  List,
  Avatar,
  Badge,
  Button,
  Group,
  Text,
  Divider,
} from "@mantine/core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeParticipant } from "./api";

export function ParticipateDrawer({ participants, isActive }) {
  const [collapse, setCollapse] = useState(false);
  const [button, setButton] = useState(false);

  console.log(participants);

  const removeParticipantHandler = async (raffleId, index) => {
    try {
      const result = await removeParticipant(raffleId, index);
      console.log(result.data.msg);
      setCollapse(!collapse);
      setButton(!button);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <List spacing="md" withPadding>
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
                    <Alert
                      title="Caution!"
                      color="red"
                      radius="xs"
                      variant="outline"
                    >
                      Deleting a participant is unreverseable!
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
