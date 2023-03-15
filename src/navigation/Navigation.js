import React, { useState } from "react";
import { Flex, Text, Pressable } from "native-base";

const Navigation = () => {
  const [todoLists, setTodoLists] = useState([
    { id: 1, title: "Todo 1", description: "This is a description" },
    { id: 2, title: "Todo 2", description: "This is a description" },
    { id: 3, title: "Todo 3", description: "This is a description" },
  ]);
  const onPressHandle = () => {
    alert("Pressed");
  };
  return (
    <Flex direction="column" flex={1} mx={10}>
      {todoLists.map((todoList) => {
        return (
          <Flex direction="column" flex={1} mx={10}>
            <Pressable onPress={onPressHandle}>
              <Text>
                {todoList.id} {todoList.title} {todoList.description}
              </Text>
            </Pressable>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Navigation;
