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

export const Participant = ({
  participant,
  isActive,
  raffleId,
  removeParticipantHandler,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [button, setButton] = useState(false);

  return (
    <List.Item key={participant.email}>
      <Box
        sx={(theme) => ({
          height: "160px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xs,
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
        <Avatar radius="xl" color="teal" style={{ marginRight: 16 }}></Avatar>

        <Group position="center">
          <Text weight={500}>{participant.name}</Text>
          <Text size="sm" color="gray" style={{ marginBottom: 8 }}>
            {participant.email}
          </Text>
          {participant.winner ? (
            <Badge color="teal" variant="filled">
              Winner
            </Badge>
          ) : null}
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
                      removeParticipantHandler(raffleId, participant.ticket)
                    }
                  >
                    Remove Participant
                  </Button>
                </Alert>
              </Collapse>
            </Group>
          </Box>
        </Group>
      </Box>
      <Divider size="md"></Divider>
    </List.Item>
  );
};
