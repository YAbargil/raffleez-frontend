import React, { useState } from "react";
import * as api from "./api";
import {
  Title,
  Text,
  Box,
  TextInput,
  createStyles,
  PasswordInput,
  Button,
  Flex,
  Paper,
  Tabs,
  Divider,
  Container,
  Image,
  Loader,
  Center,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
}));

function PasswordRequirement({ meets, label }) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? "✅" : "❌"}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

function PasswordInputComponent({ value = "", onChange }) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  return (
    <div>
      <PasswordInput
        label="Your password"
        id="your-password"
        classNames={classes}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
      />
      {focused && (
        <PasswordRequirement
          label="Has at least 6 characters"
          meets={value.length > 5}
        />
      )}
    </div>
  );
}

export function EmailInput({ value = "", onChange }) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  return (
    <TextInput
      label="Email"
      placeholder="Enter you email address"
      required
      classNames={classes}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      mt="md"
    />
  );
}

export function UsernameInput({ value = "", onChange }) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  return (
    <TextInput
      label="Username"
      placeholder="Enter you user name"
      required
      classNames={classes}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      mt="md"
    />
  );
}

export default function SignUp() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await api[mode](username, password);
      navigate("/create-raffle");
      window.localStorage.accessToken = response.data.token;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" px="xs" my="lg">
      <Paper shadow="sm" radius="lg" p="xl" withBorder>
        <Flex direction={"column"} gap={10}>
          <Image src={`/logo.jpeg`} />
          {/* <Title align="center" order={1}>
            Rafflez 👟
          </Title> */}
          <Tabs value={mode} variant="pills" defaultValue="first">
            <Tabs.List position="center">
              <Tabs.Tab onClick={() => setMode("login")} value="login">
                Login
              </Tabs.Tab>
              <Tabs.Tab onClick={() => setMode("signup")} value="signup">
                Sign Up
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {/* <EmailInput value={email} onChange={setEmail} /> */}

          <UsernameInput value={username} onChange={setUsername} />

          <PasswordInputComponent value={password} onChange={setPassword} />
          <Button mt="md" onClick={handleButtonClick}>
            {loading && <Loader color="white" size="sm" variant="dots" />}
            {!loading ? (mode === "signup" ? "Sign Up" : "Log In") : null}
          </Button>
          <Divider my="sm" />
          <NavLink to="/raffles">
            <Button variant="white">Or Continue as a Guest</Button>
          </NavLink>
        </Flex>
      </Paper>
    </Container>
  );
}
