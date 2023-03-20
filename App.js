import { NativeBaseProvider } from "native-base";
import Header from "./src/components/Header";
import AddTodoButton from "./src/components/AddTodoButton";
import Todos from "./src/components/Todos";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "./src/pages/TodoList";
import AddTodo from "./src/pages/AddTodo";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import CompletedTodos from "./src/components/CompletedTodos";
import CompletedTodoLists from "./src/components/CompletedTodoLists";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TodoLists"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Header" component={Header} />
            <Stack.Screen name="Todos" component={Todos} />
            <Stack.Screen name="AddTodoButton" component={AddTodoButton} />
            <Stack.Screen name="TodoLists" component={TodoList} />
            <Stack.Screen name="AddTodo" component={AddTodo} />
            <Stack.Screen
              name="CompletedTodoLists"
              component={CompletedTodoLists}
            />
            <Stack.Screen name="CompletedTodos" component={CompletedTodos} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
