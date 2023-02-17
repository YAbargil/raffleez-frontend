import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Title,
  Box,
  Text,
  Image,
} from "@mantine/core";
import React, { useState } from "react";
import { parcitipateRaffle } from "./api";
import { useLocation, NavLink } from "react-router-dom";

export const Participate = () => {
  const location = useLocation();
  const raffleId = location.pathname.substring(
    1,
    location.pathname.lastIndexOf("/")
  );
  const [message, setMessage] = useState("");

  const onSumbitHandler = async (values) => {
    try {
      const result = await parcitipateRaffle(raffleId, values);
      console.log("response:", result);
      setMessage(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });
  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <NavLink to={"/"}>
        <Image src={`/logo.jpeg`} />
      </NavLink>
      <Title align="center">Participation Form</Title>
      <br />
      <br />
      <form onSubmit={form.onSubmit(onSumbitHandler)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="md"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />

        <Group position="center" mt="xl">
          <Button type="submit" mt="md">
            Submit
          </Button>
        </Group>
      </form>
      <Group position="center">
        {message === "" ? null : <Text size="xl">{message}</Text>}
      </Group>
    </Box>
  );
};
