// REACT
import React, { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
//NATIVE-BASE
import {
  VStack,
  Text,
  Container,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
} from "native-base";
import { store } from "../redux/store";
import {
  addTodo,
  completeTodo,
  removeTodo,
  editTodo,
} from "../redux/slices/generalSlice";
import uuid from "react-native-uuid";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Todos = ({ title, isOpen, setOpen }) => {
  const todos = useSelector((state) => state?.general?.list);

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [todoId, setTodoId] = useState("");

  const data = todos.filter((todo) => todo?.title === title)[0]?.todos;

  const onAddTodo = () => {
    setOpen(false);
    store.dispatch(
      addTodo({
        id: uuid.v4(),
        title: todoName,
        listName: title,
        description: todoDescription,
        completed: false,
      })
    );
    setTodoName("");
    setTodoDescription("");
  };

  const onDeleteTodo = (id) => {
    store.dispatch(
      removeTodo({
        id: id,
        listName: title,
      })
    );
  };

  const onCompleteTodo = (todo) => {
    store.dispatch(
      completeTodo({
        id: todo.id,
        listName: title,
      })
    );
  };

  const onEditTodo = (todo) => {
    if (todo.completed) {
      alert("You can't edit completed todo");
    } else {
      setTodoName(todo.title);
      setTodoDescription(todo.description);
      setEditIsOpen(true);
      setTodoId(todo.id);
    }
  };

  return (
    <Container w="100%">
      <ScrollView w="100%" h="75%" mb={0}>
        {data?.map((todo) => {
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
              <HStack alignItems="center" justifyContent="space-between" pr={3}>
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
                    onPress={() => onCompleteTodo(todo)}
                    icon={
                      <Icon
                        as={AntDesign}
                        name="checkcircleo"
                        color="coolGray.800"
                      />
                    }
                  />
                  <IconButton
                    onPress={() => onEditTodo(todo)}
                    icon={<Icon as={Entypo} name="edit" color="coolGray.800" />}
                  />
                  <IconButton
                    onPress={() => {
                      onDeleteTodo(todo.id);
                    }}
                    icon={
                      <Icon as={AntDesign} name="delete" color="coolGray.800" />
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
                  todo.completed ? { textDecorationLine: "line-through" } : null
                }
              >
                {todo.description}
              </Text>
            </VStack>
          );
        })}
      </ScrollView>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Enter new Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={todoName} onChangeText={setTodoName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                value={todoDescription}
                onChangeText={setTodoDescription}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  onAddTodo();
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={EditIsOpen}
        onClose={() => setEditIsOpen(false)}
        safeAreaTop={true}
      >
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Edit Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={todoName} onChangeText={setTodoName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                value={todoDescription}
                onChangeText={setTodoDescription}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setEditIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  store.dispatch(
                    editTodo({
                      id: todoId,
                      listName: title,
                      title: todoName,
                      description: todoDescription,
                    })
                  );
                  setTodoName("");
                  setTodoDescription("");
                  setEditIsOpen(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Todos;
