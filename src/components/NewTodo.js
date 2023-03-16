//REACT
import React, { useState } from "react";
//REDUX
import { store } from "../redux/store";
import { addTodo } from "../redux/slices/generalSlice";
//NATIVE-BASE
import { Input, Button, Container } from "native-base";
//ID GENERATOR
import uuid from "react-native-uuid";

const NewTodo = ({ listName }) => {
  const [todo, setTodo] = useState("");

  const onAddTodoHandle = () => {
    store.dispatch(addTodo({ id: uuid.v4(), title: todo, listName }));
    setTodo("");
  };

  return (
    <Container mb={10} w="100%" mt={-10}>
      <Input
        variant="underlined"
        size="md"
        placeholder="Enter Todo"
        w="100%"
        value={todo}
        onChangeText={setTodo}
      />
      <Button mt={5} w="100%" onPress={onAddTodoHandle}>
        Add New Todo
      </Button>
    </Container>
  );
};

export default NewTodo;
