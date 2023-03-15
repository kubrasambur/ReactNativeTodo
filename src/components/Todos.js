import React from "react";
import {
  HStack,
  FlatList,
  Box,
  VStack,
  Text,
  Spacer,
  Container,
} from "native-base";
import { useSelector } from "react-redux";

const Todos = ({ title }) => {
  const todos = useSelector((state) => state?.general?.list);

  const data = todos.filter((todo) => todo.title === title);

  const todos2 = data[0].todos;

  return (
    <Container w="100%" ml={20}>
      <FlatList
        w="100%"
        data={todos2}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack justifyContent="space-between">
              <VStack bg="violet.200" w="100%" borderRadius={10} pl={2}>
                <Text color="coolGray.800" bold>
                  {item.id}-{item.title}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default Todos;
