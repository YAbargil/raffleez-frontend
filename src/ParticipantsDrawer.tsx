import React, { useState } from "react";
import { Box, List, Group } from "@mantine/core";
import { removeParticipant } from "./api";
import { Participant } from "./Participant";

export function ParticipateDrawer({
  participants,
  isActive,
  raffleId,
  updateParticipants,
}) {
  const [collapse, setCollapse] = useState(false);
  const [button, setButton] = useState(false);

  console.log(participants);

  const removeParticipantHandler = async (raffleId, index) => {
    try {
      const result = await removeParticipant(raffleId, index);
      const newParticipants = participants.filter((p, i) => i !== index);
      updateParticipants(newParticipants, raffleId);
      setCollapse(!collapse);
      setButton(!button);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Box sx={{ height: "700px", overflowY: "auto" }}>
      <Group position="center" spacing="xl">
        <List spacing="xl" listStyleType={"none"}>
          {participants.map((participant) => (
            <Participant
              participant={participant}
              isActive={isActive}
              raffleId={raffleId}
              removeParticipantHandler={removeParticipantHandler}
            />
          ))}
        </List>
      </Group>
    </Box>
  );
}
