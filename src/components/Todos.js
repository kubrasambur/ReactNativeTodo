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
  HStack,
  Icon,
  IconButton,
} from "native-base";
import { store } from "../redux/store";
import { addTodo, removeTodo } from "../redux/slices/generalSlice";
import uuid from "react-native-uuid";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";


const Todos = ({ title, isOpen, setOpen }) => {
  const todos = useSelector((state) => state?.general?.list);

  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const data = todos.filter((todo) => todo?.title === title)[0]?.todos;

  const deleteTodo = (id) => {
    store.dispatch(
      removeTodo({
        id: id,
        listName: title,
      })
    );
  };

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
              <HStack alignItems="center" justifyContent="space-between" pr={3}>
                <Text color="coolGray.800" bold p={2}>
                  {todo.title}
                </Text>
                <HStack >
                <IconButton onPress={()=>console.log("mark as checked")} icon={<Icon as={AntDesign} name="checkcircleo" color="coolGray.800"/>}/>
                <IconButton onPress={()=>console.log("edit")} icon={<Icon as={Entypo} name="edit" color="coolGray.800"/>}/>
                <IconButton onPress={()=>{
                  deleteTodo(todo.id);
                }} icon={<Icon as={AntDesign} name="delete" color="coolGray.800"/>}/>
                </HStack>
              </HStack>
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
