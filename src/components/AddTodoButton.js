//REACT
import React, { useState } from "react";
//REDUX
import { store } from "../redux/store";
import { addTodo } from "../redux/slices/generalSlice";
//NATIVE-BASE
import { Input, Button, Container } from "native-base";
//ID GENERATOR
import uuid from "react-native-uuid";

const NewTodo = ({ listName, description, openModal }) => {
  const onAddTodoHandle = () => {
    openModal(true);
  };

  return (
    <Container mb={10} w="100%" mt={-8}>
      <Button mt={5} w="100%" onPress={onAddTodoHandle}>
        Add New Todo
      </Button>
    </Container>
  );
};

export default NewTodo;
