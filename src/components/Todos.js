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
  Spacer,
  Divider,
} from "native-base";
import { store } from "../redux/store";
import { addTodo } from "../redux/slices/generalSlice";
import uuid from "react-native-uuid";

const Todos = ({ title, isOpen, setOpen }) => {
  const todos = useSelector((state) => state?.general?.list);

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const data = todos.filter((todo) => todo?.title === title)[0]?.todos;

  return (
    <Container w="100%">
      <ScrollView w="100%" h="75%" mb={0}>
        {data?.map((todo, index) => {
          return (
            <VStack
              bg="violet.200"
              w="100%"
              borderRadius={10}
              pl={2}
              mb={3}
              key={index}
            >
              <Text color="coolGray.800" bold p={2}>
                {todo.title}
              </Text>
              <Divider bg="black" w="93%" ml={2} />
              <Text color="coolGray.800" px={2} pb={2}>
                {todo.description}
              </Text>
            </VStack>
          );
        })}
      </ScrollView>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} safeAreaTop={true}>
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
                  setOpen(false);
                  store.dispatch(
                    addTodo({
                      id: uuid.v4(),
                      title: todoName,
                      listName: title,
                      description: todoDescription,
                    })
                  );
                  setTodoName("");
                  setTodoDescription("");
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
