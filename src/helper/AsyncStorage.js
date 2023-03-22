import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAsyncStorage } from "../redux/slices/generalSlice";
import { store } from "../redux/store";

export const StoreData = async (todoLists) => {
  try {
    await AsyncStorage.setItem("todoLists", JSON.stringify(todoLists));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("todoLists");
    if (value !== null) {
      store.dispatch(setAsyncStorage(JSON.parse(value)));
    } else {
      console.log("value is null");
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeItem = async (listId) => {
  try {
    let allList = await AsyncStorage.getItem("todoLists");
    allList = JSON.parse(allList);
    const newList = allList.filter((list) => list.id !== listId);
    await AsyncStorage.setItem("todoLists", JSON.stringify(newList));
  } catch (error) {
    console.log(error);
  }
};
