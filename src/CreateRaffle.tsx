import {
  Button,
  Container,
  Group,
  Title,
  Image,
  Grid,
  Flex,
  Divider,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import { useNavigate, NavLink } from "react-router-dom";
import { CreateRaffleCard } from "./CreateRaffleCard";

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
        <Group position="center">
          <NavLink to={"/"}>
            <Image height={202} width={408} fit="contain" src={`/logo.jpeg`} />
          </NavLink>
        </Group>
      </Flex>
      <Group position="right">
        <Button onClick={onClickHandler}>See My Raffles</Button>
      </Group>
      <Title>Create new Raffle</Title>
      <Divider my="lg" />
      <Grid mt={10}>
        {products.map((p) => (
          <CreateRaffleCard product={p} />
        ))}
      </Grid>
    </Container>
  );
};
