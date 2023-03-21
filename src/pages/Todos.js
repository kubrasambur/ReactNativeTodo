// REACT
import React, { useState } from "react";
// REDUX
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import {
  addTodo,
  completeTodo,
  removeTodo,
  editTodo,
} from "../redux/slices/generalSlice";
// LIBRARY
import uuid from "react-native-uuid";
// STYLE
import {
  VStack,
  Text,
  Container,
  ScrollView,
  Divider,
  HStack,
  Icon,
  IconButton,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
// NAVIGATION
import { useNavigation } from "@react-navigation/native";
// COMPONENTS
import CustomModalAddEditTodo from "../components/custom/CustomModalAddEditTodo";
import CustomModalDelete from "../components/custom/CustomModalDelete";
import CustomButton from "../components/custom/CustomButton";

const Todos = ({ route }) => {
  const todos = useSelector((state) => state?.general?.list);

  const { listTitle } = route.params;

  const navigation = useNavigation();

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);

  const data = todos?.filter((todo) => todo?.title === listTitle)[0]?.todos;

  const completedTodos = data.filter((todo) => todo?.completed === true).length;

  const handleAddTodo = () => {
    if (!todoName) return alert("Please enter a todo");
    else {
      setOpen(false);
      store.dispatch(
        addTodo({
          id: uuid.v4(),
          title: todoName,
          listName: listTitle,
          description: todoDescription,
          completed: false,
        })
      );
      setTodoName("");
      setTodoDescription("");
    }
  };

  const deleteTodo = (id) => {
    setOpenDeleteModal(true);
    setTodoId(id);
  };

  const completeTodos = (todo) => {
    store.dispatch(
      completeTodo({
        id: todo?.id,
        listName: listTitle,
      })
    );
  };

  const editTodo = (todo) => {
    if (todo.completed) {
      alert("You can't edit completed todo");
    } else {
      setTodoName(todo.title);
      setTodoDescription(todo.description);
      setEditIsOpen(true);
      setTodoId(todo.id);
    }
  };

  const handleEditOnPress = () => {
    store.dispatch(
      editTodo({
        id: todoId,
        listName: listTitle,
        title: todoName,
        description: todoDescription,
      })
    );
    setTodoName("");
    setTodoDescription("");
    setEditIsOpen(false);
  };

  const handleDeleteOnPress = () => {
    store.dispatch(
      removeTodo({
        id: todoId,
        listName: listTitle,
      })
    );

    setOpenDeleteModal(false);
  };

  return (
    <Container w="100%" ml={10} display="flex" flex={1} alignItems="center">
      <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
        Active Todos
      </Text>
      <ScrollView w="100%" h="73%" mt={5}>
        {data?.map((todo) => {
          if (!todo.completed && !todo.listname?.completed)
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
                      onPress={() => completeTodos(todo)}
                      icon={
                        <Icon
                          as={AntDesign}
                          name="checkcircleo"
                          color="coolGray.800"
                        />
                      }
                    />
                    <IconButton
                      onPress={() => editTodo(todo)}
                      icon={
                        <Icon as={Entypo} name="edit" color="coolGray.800" />
                      }
                    />
                    <IconButton
                      onPress={() => {
                        deleteTodo(todo.id);
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

      {/* Add Todo Modal */}
      <CustomModalAddEditTodo
        Description="Description"
        firstValue={todoName}
        firstOnChangeText={setTodoName}
        secondValue={todoDescription}
        secondOnChangeText={setTodoDescription}
        handleOnPress={handleAddTodo}
        isOpen={open}
        setOpen={() => setOpen(false)}
        headerText="Enter new Todo"
        title="Title"
      />

      {/* Edit Todo Modal */}
      <CustomModalAddEditTodo
        Description="Description"
        firstValue={todoName}
        firstOnChangeText={setTodoName}
        secondValue={todoDescription}
        secondOnChangeText={setTodoDescription}
        handleOnPress={handleEditOnPress}
        isOpen={EditIsOpen}
        setOpen={() => setEditIsOpen(false)}
        headerText="Edit Todo"
        title="Title"
      />

      {/* Delete Todo Modal */}
      <CustomModalDelete
        isOpen={openDeleteModal}
        setOpen={() => setOpenDeleteModal(false)}
        handleOnPress={handleDeleteOnPress}
        text="Are you sure you want to delete this todo?"
      />

      {completedTodos > 0 ? (
        <CustomButton
          title="Check Completed Todos"
          handleOnPress={() =>
            navigation.navigate("CompletedTodos", { title: listTitle })
          }
        />
      ) : null}

      <CustomButton title="Add New Todo " handleOnPress={() => setOpen(true)} />
    </Container>
  );
};

export default Todos;
