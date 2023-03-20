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
import { useNavigation } from "@react-navigation/native";

const Todos = ({ title, isOpen, setOpen }) => {
  const todos = useSelector((state) => state?.general?.list);

  const navigation = useNavigation();

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const data = todos?.filter((todo) => todo?.title === title)[0]?.todos;

  const onAddTodo = () => {
    if (!todoName) return alert("Please enter a todo");
    else {
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
    }
  };

  const onDeleteTodo = (id) => {
    setOpenDeleteModal(true)
    setTodoId(id)
  };

  const onCompleteTodo = (todo) => {
    store.dispatch(
      completeTodo({
        id: todo?.id,
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

  const completedTodos = data.filter((todo) => todo?.completed === true).length;

  return (
    <Container w="100%" mt={10}>
      <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
        Active Todos
      </Text>
      <ScrollView w="100%" h="80%" mt={5}>
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
                      icon={
                        <Icon as={Entypo} name="edit" color="coolGray.800" />
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

      {completedTodos > 0 ? (
        <Button
          onPress={() =>
            navigation.navigate("CompletedTodos", { title: title })
          }
          w="100%"
          _text={{ fontSize: "15" }}
          mt="3%"
        >
          Check Completed Todos
        </Button>
      ) : null}

      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Enter new Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
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

      <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Body>
            <Text fontSize="18" fontWeight="bold" mr={4} alignSelf="center" >
            Are you sure you want to delete this todo?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpenDeleteModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  store.dispatch(
                    removeTodo({
                      id: todoId,
                      listName: title,
                    })
                  );
                  
                  setOpenDeleteModal(false);
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </Container>
  );
};

export default Todos;
