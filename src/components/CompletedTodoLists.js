import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Text,
  ScrollView,
  VStack,
  Pressable,
  HStack,
  IconButton,
  Icon,
} from "native-base";
import { store } from "../redux/store";
import { removeCompleteList, removeList } from "../redux/slices/generalSlice";
import { AntDesign } from "@expo/vector-icons";
import CustomModalDelete from "./custom/CustomModalDelete";

const CompletedTodoLists = ({ navigation }) => {
  const todoLists = useSelector((state) => state?.general?.list);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [listId, setListId] = useState("");

  const deleteList = (id) => {
    setOpenDeleteModal(true);
    setListId(id);
  };

  const onRemoveCompleteList = (id) => {
    store.dispatch(
      removeCompleteList({
        id: id,
      })
    );
  };

  const onPressHandle = (e) => {
    const val = e.target._internalFiberInstanceHandleDEV.child.memoizedProps;
    navigation.navigate("CompletedTodos", {
      listTitle: val,
    });
  };

  const handleDeleteOnPress = () => {
    store.dispatch(
      removeList({
        id: listId,
      })
    );
    setOpenDeleteModal(false);
  };

  return (
    <Container
      mx={10}
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Completed Lists
      </Text>

      <ScrollView mb={5} w="100%">
        {todoLists?.map((todoList, index) => {
          if (todoList.completed === true)
            return (
              <VStack
                display="flex"
                flexDirection="row"
                w="100%"
                alignItems="center"
                key={index + 4}
                bg="violet.200"
                style={{ opacity: 0.5, backgroundColor: "gray" }}
                mb={2}
                justifyItems="space-between"
                borderRadius={10}
              >
                <Pressable
                  onPress={onPressHandle}
                  flexDirection="row"
                  key={index}
                  w="63%"
                >
                  <Text
                    pl={2}
                    style={
                      todoList.completed
                        ? { textDecorationLine: "line-through" }
                        : null
                    }
                  >
                    {todoList.title}
                  </Text>
                </Pressable>

                <HStack pl={5}>
                  <IconButton
                    key={index + 1}
                    onPress={() => onRemoveCompleteList(todoList.id)}
                    icon={
                      <Icon as={AntDesign} name="back" color="coolGray.800" />
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

      {/* Delete Todo Modal */}
      <CustomModalDelete
        isOpen={openDeleteModal}
        setOpen={() => setOpenDeleteModal(false)}
        handleOnPress={handleDeleteOnPress}
        text="Are you sure you want to delete this list?"
      />
    </Container>
  );
};

export default CompletedTodoLists;
