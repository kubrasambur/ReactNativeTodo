// REACT
import React, { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import {
  addList,
  completeList,
  editListName,
  removeList,
} from "../redux/slices/generalSlice";
// NATIVE-BASE
import {
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  Pressable,
  Container,
  ScrollView,
  Icon,
  IconButton,
  HStack,
  VStack,
} from "native-base";
// ID GENERATOR
import uuid from "react-native-uuid";
import { AntDesign, Entypo } from "@expo/vector-icons";

const TodoList = ({ navigation }) => {
  const todoLists = useSelector((state) => state?.general?.list);

  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [listId, setListId] = useState("");

  const onAddTodoListHandler = () => {
    setOpen(true);
  };

  const onPressHandle = (e) => {
    const val = e.target._internalFiberInstanceHandleDEV.child.memoizedProps;
    navigation.navigate("AddTodo", {
      listTitle: val,
    });
  };

  const deleteList = (id) => {
    store.dispatch(
      removeList({
        id: id,
      })
    );
  };

  const onEditListName = (todoList) => {
    console.log(todoList.id);
    if (todoList.completed) {
      alert("You can't edit a completed list");
    } else {
      store.dispatch(
        editListName({
          id: todoList.id,
          title: todoList.title,
        })
      );
      setListName(todoList.title);
      setEditIsOpen(true);
      setListId(todoList.id);
    }
  };

  const onCompleteList = (id) => {
    store.dispatch(
      completeList({
        id: id,
      })
    );
  };

  return (
    <Container
      mx={10}
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      mt={8}
    >
      <ScrollView>
        {todoLists?.map((todoList, index) => {
          return (
            <VStack
              display="flex"
              flexDirection="row"
              w="60%"
              alignItems="center"
              key={index + 4}
              bg="violet.200"
              style={
                todoList.completed
                  ? { opacity: 0.5, backgroundColor: "gray" }
                  : { textDecorationLine: "none" }
              }
              borderTopLeftRadius={10}
              borderBottomLeftRadius={10}
              mt={2}
            >
              <Pressable
                onPress={onPressHandle}
                flexDirection="row"
                key={index}
              >
                <Text
                  pl={2}
                  w="100%"
                  style={
                    todoList.completed
                      ? { textDecorationLine: "line-through" }
                      : null
                  }
                >
                  {todoList.title}
                  {" List"}
                </Text>
              </Pressable>

              <HStack
                style={
                  todoList.completed
                    ? {
                        backgroundColor: "gray",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }
                    : {
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }
                }
                bg="violet.200"
              >
                <IconButton
                  key={index + 2}
                  onPress={() => onEditListName(todoList)}
                  icon={<Icon as={Entypo} name="edit" color="coolGray.800" />}
                />

                <IconButton
                  key={index + 1}
                  onPress={() => onCompleteList(todoList.id)}
                  icon={
                    <Icon
                      as={AntDesign}
                      name="checkcircleo"
                      color="coolGray.800"
                    />
                  }
                />

                <IconButton
                  key={index + 3}
                  onPress={() => {
                    deleteList(todoList.id);
                  }}
                  icon={
                    <Icon as={AntDesign} name="delete" color="coolGray.800" />
                  }
                />
              </HStack>
            </VStack>
          );
        })}
      </ScrollView>

      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Type new list's name</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input value={listName} onChangeText={setListName} />
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
                    addList({
                      id: uuid.v4(),
                      title: listName,
                      todos: [],
                      completed: false,
                    })
                  );
                  setListName("");
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
          <Modal.Header>Edit List Name</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input value={listName} onChangeText={setListName} />
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
                  setEditIsOpen(false);
                  store.dispatch(
                    editListName({
                      id: listId,
                      title: listName,
                    })
                  );
                  setListName("");
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Button
        _text={{ fontSize: "20" }}
        p={1}
        mb={10}
        w="100%"
        onPress={onAddTodoListHandler}
      >
        Add new list
      </Button>
    </Container>
  );
};

export default TodoList;
