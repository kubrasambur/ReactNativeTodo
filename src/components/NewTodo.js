import React from "react";
import { VStack, Input, Button, Container } from "native-base";

const NewTodo = () => {
  return (
    <Container mb={10} w="100%" ml={20}>
      <Input variant="underlined" size="md" placeholder="Enter Todo" w="100%" />
      <Button mt={5} w="100%">
        Add New Todo
      </Button>
    </Container>
  );
};

export default NewTodo;
