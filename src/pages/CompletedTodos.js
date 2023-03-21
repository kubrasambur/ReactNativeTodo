// REACT
import React, { useState } from "react";
// REDUX
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import { removeCompletedTodo, removeTodo } from "../redux/slices/generalSlice";
// STYLE
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
import { AntDesign } from "@expo/vector-icons";
// COMPONENTS
import CustomModalDelete from "../components/custom/CustomModalDelete";

const CompletedTodos = ({ route }) => {
  const todos = useSelector((state) => state?.general?.list);

  const { title, listTitle } = route.params;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [todoId, setTodoId] = React.useState("");

  const data = todos?.filter((todo) => todo?.title === title || listTitle)[0]
    ?.todos;

  const deleteCompletedTodo = (id) => {
    setOpenDeleteModal(true);
    setTodoId(id);
  };

  const removeCompletedTodos = (todo) => {
    store.dispatch(
      removeCompletedTodo({
        id: todo.id,
        listName: title,
      })
    );
  };

  const handleDeleteOnPress = () => {
    store.dispatch(
      removeTodo({
        id: todoId,
        listName: title,
      })
    );
    setOpenDeleteModal(false);
  };

  return (
    <Container w="100%" ml={10}>
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
                style={{ opacity: 0.5, backgroundColor: "gray" }}
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
                      onPress={() => removeCompletedTodos(todo)}
                      icon={
                        <Icon as={AntDesign} name="back" color="coolGray.800" />
                      }
                    />

                    <IconButton
                      onPress={() => {
                        deleteCompletedTodo(todo.id);
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

      {/* Delete Todo Modal */}
      <CustomModalDelete
        isOpen={openDeleteModal}
        setOpen={() => setOpenDeleteModal(false)}
        handleOnPress={handleDeleteOnPress}
        text="Are you sure you want to delete this todo?"
      />
    </Container>
  );
};

export default CompletedTodos;
