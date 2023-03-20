import React from "react";
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
  Flex,
} from "native-base";
import { store } from "../redux/store";
import { removeCompleteList, removeList } from "../redux/slices/generalSlice";
import { AntDesign, Entypo } from "@expo/vector-icons";

const CompletedTodoLists = ({ navigation }) => {
  const todoLists = useSelector((state) => state?.general?.list);

  const deleteList = (id) => {
    store.dispatch(
      removeList({
        id: id,
      })
    );
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

  return (
    <Container
      mx={10}
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      mt={10}
      w="100%"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Completed Lists
      </Text>
      <ScrollView mb={5}>
        {todoLists?.map((todoList, index) => {
          if (todoList.completed === true)
            return (
              <VStack
                display="flex"
                flexDirection="row"
                w="74%"
                alignItems="center"
                key={index + 4}
                bg="violet.200"
                style={{ opacity: 0.5, backgroundColor: "gray" }}
                mb={2}
                justifyItems="space-between"
                borderTopLeftRadius={10}
                borderBottomLeftRadius={10}
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
                  style={{
                    backgroundColor: "gray",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  w="40%"
                  pr={20}
                >
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
    </Container>
  );
};

export default CompletedTodoLists;
