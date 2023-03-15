import { NativeBaseProvider } from "native-base";
import Header from "./src/components/Header";
import NewTodo from "./src/components/NewTodo";
import Todos from "./src/components/Todos";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "./src/pages/TodoList";
import AddTodo from "./src/pages/AddTodo";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TodoLists">
            <Stack.Screen name="Header" component={Header} />
            <Stack.Screen name="Todos" component={Todos} />
            <Stack.Screen name="NewTodo" component={NewTodo} />
            <Stack.Screen name="TodoLists" component={TodoList} />
            <Stack.Screen name="AddTodo" component={AddTodo} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
