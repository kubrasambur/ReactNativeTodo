//REACT
import React from "react";
//NATIVE-BASE
import { Button, Container } from "native-base";

const NewTodo = ({ openModal }) => {
  const onAddTodoHandle = () => {
    openModal(true);
  };

  return (
    <Container w="100%" mt={-5} mb={35}>
      <Button w="100%" onPress={onAddTodoHandle}>
        Add New Todo
      </Button>
    </Container>
  );
};

export default NewTodo;
