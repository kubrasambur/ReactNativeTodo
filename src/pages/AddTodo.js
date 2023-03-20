// REACT
import React, { useState } from "react";
// NATIVE-BASE
import { Flex } from "native-base";
// COMPONENTS
import Header from "../components/Header";
import AddTodoButton from "../components/AddTodoButton";
import Todos from "../components/Todos";

const AddTodo = ({ route }) => {
  const { listTitle } = route.params;
  const [open, setOpen] = useState(false);
  return (
    <Flex flex={1} alignItems="center" justifyContent="space-between">
      <Flex w="100%" alignItems="center">
        {/* <Header /> */}
        <Todos title={listTitle} isOpen={open} setOpen={setOpen} />
      </Flex>
      <AddTodoButton listName={listTitle} openModal={setOpen} />
    </Flex>
  );
};

export default AddTodo;
