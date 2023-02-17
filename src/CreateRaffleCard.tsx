import {
  Button,
  Card,
  Container,
  Group,
  Title,
  Text,
  Image,
  Grid,
  NumberInput,
  Flex,
  Divider,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { createRaffle } from "./api";

export const CreateRaffleCard = ({ product }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCreateClick = async () => {
    setLoading(true);
    try {
      //
      const response = await createRaffle(product._id, name, quantity);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid.Col span={4} key={product._id}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={product.image} height={160} alt={product.name} />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={700}>{product.name}</Text>
          <Text lineClamp={4} size="xs" color="dimmed">
            {product.description}
          </Text>
        </Group>
        <Group>
          <TextInput
            label="Raffle's name"
            placeholder="name"
            withAsterisk
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <NumberInput
            defaultValue={1}
            min={1}
            placeholder="0"
            label="Quantity"
            description="Number of items to giveaway"
            radius="md"
            withAsterisk
            value={quantity}
            onChange={(q) => (q ? setQuantity(q) : null)}
          />
        </Group>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={onCreateClick}
        >
          Create new Raffle
        </Button>
      </Card>
    </Grid.Col>
  );
};
