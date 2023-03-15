import { Flex, Text, Container } from "native-base";
import React from "react";
import Header from "../components/Header";
import NewTodo from "../components/NewTodo";
import Todos from "../components/Todos";

const AddTodo = ({ route }) => {
  const { listTitle } = route.params;

  return (
    <Container
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Header />
      <Todos title={listTitle} />
      <NewTodo />
    </Container>
  );
};

export default AddTodo;
