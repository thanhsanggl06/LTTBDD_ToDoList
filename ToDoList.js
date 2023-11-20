import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, deleteTodo, fetchTodos, updateTodo } from "./todosSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(addNewTodo("New Todo"));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, title, status) => {
    dispatch(updateTodo({ id, title, status }));
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", fontSize: 40 }}>ToDo List</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput style={{ borderWidth: 1, borderColor: "#ccc", height: 30, width: "300px" }}></TextInput>
        <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: "aqua", alignItems: "center", justifyContent: "center" }} onPress={handleAddTodo}>
          Thêm
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{item.title}</Text>
                <Text> - </Text>
                <Text>Status: {item.status ? "Completed" : "Incomplete"}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>Xóa</TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdateTodo(item.id, item.title, true)}>Đã hoàn thành</TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ToDoList;
