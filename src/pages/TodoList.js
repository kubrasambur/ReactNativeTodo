import React, { useState } from "react";

import {
  Flex,
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Pressable,
  Container,
} from "native-base";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { addList } from "../redux/slices/generalSlice";

const TodoList = ({ navigation, route }) => {
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

  return (
    <Container
      mx={10}
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex>
        {todoLists.map((todoList) => {
          return (
            <Pressable onPress={onPressHandle} flexDirection="row">
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
          );
        })}
      </Flex>

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
                  store.dispatch(addList({ title: [listName] }));
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
