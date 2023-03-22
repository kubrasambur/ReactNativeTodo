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
// LIBRARY
import uuid from "react-native-uuid";
// STYLE
import {
  Text,
  Pressable,
  Container,
  ScrollView,
  Icon,
  IconButton,
  HStack,
  VStack,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
// COMPONENTS
import CustomModalAddEditTodoList from "../components/custom/CustomModalAddEditTodoList";
import CustomModalDelete from "../components/custom/CustomModalDelete";
import CustomButton from "../components/custom/CustomButton";

const TodoList = ({ navigation }) => {
  const todoLists = useSelector((state) => state?.general?.list);

  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [listId, setListId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const completedList = todoLists?.filter(
    (todoList) => todoList?.completed === true
  ).length;

  const onPressHandle = (listsName) => {
    navigation.navigate("Todos", {
      listTitle: listsName,
    });
  };

  const deleteList = (id) => {
    setOpenDeleteModal(true);
    setListId(id);
  };

  const editListsName = (todoList) => {
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

  const completeLists = (id) => {
    store.dispatch(
      completeList({
        id,
      })
    );
  };

  const onSaveTodoList = () => {
    if (listName === "") {
      alert("Please enter a list name");
    } else {
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
    }
  };

  const handleOnEditListName = () => {
    setEditIsOpen(false);
    store.dispatch(
      editListName({
        id: listId,
        title: listName,
      })
    );
    setListName("");
  };

  handleDeleteList = () => {
    store.dispatch(
      removeList({
        id: listId,
      })
    );
    setOpenDeleteModal(false);
  };

  return (
    <Container ml={10} display="flex" flex={1} alignItems="center">
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Active Lists
      </Text>
      <ScrollView mb={3}>
        {todoLists?.map((todoList, index) => {
          if (todoList.completed === false)
            return (
              <VStack
                display="flex"
                flexDirection="row"
                w="61%"
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
                mb={2}
              >
                <Pressable
                  onPress={() => onPressHandle(todoList.title)}
                  flexDirection="row"
                  key={index}
                >
                  <Text
                    pl={4}
                    w="100%"
                    style={
                      todoList.completed
                        ? { textDecorationLine: "line-through" }
                        : null
                    }
                  >
                    {todoList.title}
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
                    onPress={() => editListsName(todoList)}
                    icon={<Icon as={Entypo} name="edit" color="coolGray.800" />}
                  />

                  <IconButton
                    key={index + 1}
                    onPress={() => completeLists(todoList.id)}
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

      {/* Add Todo  List */}
      <CustomModalAddEditTodoList
        isOpen={open}
        setOpen={() => setOpen(false)}
        headerText="Type a list name"
        value={listName}
        onChangeText={setListName}
        handleOnPress={() => onSaveTodoList()}
      />

      {/* Edit Todo  List */}
      <CustomModalAddEditTodoList
        isOpen={EditIsOpen}
        setOpen={() => setEditIsOpen(false)}
        headerText="Type a list name"
        value={listName}
        onChangeText={setListName}
        handleOnPress={() => handleOnEditListName()}
      />

      {/* Delete Todo  List */}
      <CustomModalDelete
        isOpen={openDeleteModal}
        setOpen={() => setOpenDeleteModal(false)}
        text="Are you sure you want to delete this list?"
        handleOnPress={() => handleDeleteList()}
      />
      {completedList > 0 ? (
        <CustomButton
          title="Check Completed Lists"
          handleOnPress={() => navigation.navigate("CompletedTodoLists")}
        />
      ) : null}

      <CustomButton title="Add new list" handleOnPress={() => setOpen(true)} />
    </Container>
  );
};

export default TodoList;
