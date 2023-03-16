// REACT
import React from "react";
// NATIVE-BASE
import { Flex } from "native-base";
// COMPONENTS
import Header from "../components/Header";
import NewTodo from "../components/NewTodo";
import Todos from "../components/Todos";

const AddTodo = ({ route }) => {
  const { listTitle } = route.params;

  return (
    <Flex flex={1} alignItems="center" justifyContent="space-between">
      <Flex w="100%" alignItems="center">
        <Header />
        <Todos title={listTitle} />
      </Flex>
      <NewTodo listName={listTitle} />
    </Flex>
  );
};

export default AddTodo;
