import React from "react";
import {
  Container,
  ScrollView,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  Divider,
} from "native-base";
import { useSelector } from "react-redux";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { store } from "../redux/store";
import { removeCompletedTodo, removeTodo } from "../redux/slices/generalSlice";

const CompletedTodos = ({ route }) => {
  const todos = useSelector((state) => state?.general?.list);

  const { title, listTitle } = route.params;

  const data = todos?.filter((todo) => todo?.title === title || listTitle)[0]
    ?.todos;

  const onDeleteTodo = (id) => {
    store.dispatch(
      removeTodo({
        id: id,
        listName: title,
      })
    );
  };

  const onRemoveCompleteTodo = (todo) => {
    store.dispatch(
      removeCompletedTodo({
        id: todo.id,
        listName: title,
      })
    );
  };

  return (
    <Container w="100%" mt={10} ml={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={5} alignSelf="center">
        Completed Todos
      </Text>
      <ScrollView w="100%" h="100%">
        {data?.map((todo) => {
          if (todo.completed)
            return (
              <VStack
                bg="violet.200"
                w="100%"
                borderRadius={10}
                pl={2}
                mb={3}
                key={todo.id}
                style={
                  todo.completed
                    ? { opacity: 0.5, backgroundColor: "gray" }
                    : { textDecorationLine: "none" }
                }
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  pr={3}
                >
                  <Text
                    color="coolGray.800"
                    bold
                    p={2}
                    style={
                      todo.completed
                        ? { textDecorationLine: "line-through" }
                        : null
                    }
                    w="61%"
                  >
                    {todo.title}
                  </Text>
                  <HStack>
                    <IconButton
                      onPress={() => onRemoveCompleteTodo(todo)}
                      icon={
                        <Icon as={AntDesign} name="back" color="coolGray.800" />
                      }
                    />

                    <IconButton
                      onPress={() => {
                        onDeleteTodo(todo.id);
                      }}
                      icon={
                        <Icon
                          as={AntDesign}
                          name="delete"
                          color="coolGray.800"
                        />
                      }
                    />
                  </HStack>
                </HStack>
                <Divider bg="black" w="94%" ml={2} />
                <Text
                  color="coolGray.800"
                  px={2}
                  pb={2}
                  style={
                    todo.completed
                      ? { textDecorationLine: "line-through" }
                      : null
                  }
                >
                  {todo.description}
                </Text>
              </VStack>
            );
        })}
      </ScrollView>
    </Container>
  );
};

export default CompletedTodos;
