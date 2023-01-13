import React, { useState } from "react";
import axios from "axios";
import { TextInput, createStyles, PasswordInput, Button } from "@mantine/core";

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
      />
    </div>
  );
}

export function EmailInput({ value = "", onChange }) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  console.log("email value", value);

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
      mt="md"
      autoComplete="nope"
    />
  );
}

export function UsernameInput({ value = "", onChange }) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  console.log("email value", value);

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
      mt="md"
      autoComplete="nope"
    />
  );
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = async () => {
    console.log({ email, password, username });
    const response = await axios.post("localhost:5200", {
      email,
      password,
      username,
    });
  };

  return (
    <div>
      <EmailInput value={email} onChange={setEmail} />
      <UsernameInput value={username} onChange={setUsername} />
      <PasswordInputComponent value={password} onChange={setPassword} />
      <Button onClick={handleButtonClick}>Log In / Sign Up</Button>
    </div>
  );
}
