// REACT
import React from "react";
// REDUX
import { useSelector } from "react-redux";
//NATIVE-BASE
import { VStack, Text, Container, ScrollView } from "native-base";

const Todos = ({ title }) => {
  const todos = useSelector((state) => state?.general?.list);

  const data = todos.filter((todo) => todo?.title === title)[0]?.todos;

  return (
    <Container w="100%">
      <ScrollView w="100%" h="75%" mb={0}>
        {data.map((todo, index) => {
          return (
            <VStack
              bg="violet.200"
              w="100%"
              borderRadius={10}
              pl={2}
              mb={3}
              key={index}
            >
              <Text color="coolGray.800" bold>
                {todo.title}
              </Text>
            </VStack>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Todos;
