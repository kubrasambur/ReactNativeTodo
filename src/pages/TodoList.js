// REACT
import React, { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { addList, removeList } from "../redux/slices/generalSlice";
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
  HStack,
  Icon,
  IconButton,
  VStack,
} from "native-base";
// ID GENERATOR
import uuid from "react-native-uuid";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";

const TodoList = ({ navigation }) => {
  const todoLists = useSelector((state) => state?.general?.list);

  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  const onAddTodoListHandler = () => {
    setOpen(true);
  };

  const onPressHandle = (e) => {
    const val = e.target._internalFiberInstanceHandleDEV.child.memoizedProps;
    navigation.navigate("AddTodo", {
      listTitle: val,
    });
  };

  const deletelist = (id) => {
    store.dispatch(
      removeList({
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
    >
      <ScrollView>
        {todoLists?.map((todoList, index) => {
          return (
            <Container display="flex" flexDirection="row" w="55%" alignItems="center">
              <Pressable
                onPress={onPressHandle}
                flexDirection="row"
                key={index}
              >
                <Text
                  borderRadius={10}
                  pl={2}
                  mt={5}
                  bg="violet.200"
                  w="100%"
                  h="25"
                >
                  {todoList.title}
                  {" List"}
                </Text>
              </Pressable>

              <IconButton
                onPress={() => console.log("mark as checked")}
                icon={
                  <Icon
                    as={AntDesign}
                    name="checkcircleo"
                    color="coolGray.800"
                  />
                }
              />
              <IconButton
                onPress={() => console.log("edit")}
                icon={<Icon as={Entypo} name="edit" color="coolGray.800" />}
              />
              <IconButton
                onPress={() => {
                  deletelist(todoList.id);
                }}
                icon={
                  <Icon as={AntDesign} name="delete" color="coolGray.800" />
                }
              />
            </Container>
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
                    addList({ id: uuid.v4(), title: listName, todos: [] })
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
