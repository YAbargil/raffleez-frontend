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
import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

export const CreateRaffle = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  const onClickHandler = () => {
    try {
      navigate("/user");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      console.log("All prodcuts:", result.data.products);
      setProducts(result.data.products);
    };
    fetchData();
  }, []);

  return (
    <Container mt="lg">
      <Flex justify={"space-between"}>
        <NavLink to={"/"}>
          <Image src={`/logo.jpeg`} />
        </NavLink>
        <Title>Create new Raffle</Title>
        <Button onClick={onClickHandler}>See My Raffles</Button>
      </Flex>
      <Divider my="lg" />
      <Grid mt={10}>
        {products.map((p) => (
          <Grid.Col span={4} key={p._id}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={p.image} height={160} alt={p.name} />
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{p.name}</Text>
              </Group>
              <Text size="sm" color="dimmed">
                {p.description}
              </Text>
              <NumberInput
                defaultValue={0}
                placeholder="0"
                label="Quantity"
                description="Number of items to participate in the Raffle"
                radius="md"
                withAsterisk
              />
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Create new Raffle
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
