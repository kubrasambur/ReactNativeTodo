import { NativeBaseProvider } from "native-base";
import Todos from "./src/pages/Todos";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "./src/pages/TodoList";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import CompletedTodos from "./src/pages/CompletedTodos";
import CompletedTodoLists from "./src/pages/CompletedTodoLists";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TodoLists"
            screenOptions={{
              headerTitleAlign: "center",
              headerTitleStyle: {
                color: "white",
              },
            }}
          >
            <Stack.Screen name="Todos" component={Todos} />
            <Stack.Screen name="TodoLists" component={TodoList} />
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
