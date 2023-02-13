import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  List,
  Title,
  Text,
  Image,
  Grid,
  NumberInput,
  Flex,
  Divider,
} from "@mantine/core";
import React, { useState } from "react";

export const CreateRaffle = () => {
  const [products, setProducts] = useState([]);

  return (
    <Container mt="lg">
      <Flex justify={"space-between"}>
        <Title>Create new Raffle</Title>
        <Button>See My Raffles</Button>
      </Flex>
      <Divider my="lg" />
      <Grid mt={10}>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <NumberInput
              defaultValue={0}
              placeholder="0"
              label="Quantity"
              description="Number of items to participate in the Raffle"
              radius="md"
              withAsterisk
            />
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Create new Raffle
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
