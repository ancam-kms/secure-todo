import type { NavigationProp } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { DeleteTodo } from "../../../application/usecases/todo/commands/deleteTodo";
import { GetTodosPage } from "../../../application/usecases/todo/queries/getTodosPage";
import { Todo } from "../../../domain/entities/todo";
import type { RootStackParamList } from "../../../index";
import { todoRepository } from "../../../infrastructure";
import TodoList from "../../components/TodoList";
import styles from "./styles";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  onLock?: () => void;
};

const PAGE_SIZE = 10;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  // usecases
  const getTodosPage = useMemo(() => new GetTodosPage(todoRepository), []);
  const deleteTodo = useMemo(() => new DeleteTodo(todoRepository), []);
  // state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const result = await getTodosPage.execute(0, PAGE_SIZE);
    setTodos(result.data);
    setOffset(result.data.length);
    setHasMore(result.hasMore);
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const currentOffset = offset;
    const result = await getTodosPage.execute(currentOffset, PAGE_SIZE);
    setTodos((prev) => [...prev, ...result.data]);
    setOffset(currentOffset + result.data.length);
    setHasMore(result.hasMore);
    setLoading(false);
  };

  const handleAddTodo = () => {
    navigation.navigate("TodoDetail", { todoDetail: undefined });
  };

  const onPressDetail = (todo: Todo) => {
    navigation.navigate("TodoDetail", { todoDetail: todo });
  };

  const handleDelete = async (todo: Todo) => {
    try {
      await deleteTodo.execute(todo.id);
      setTodos((prev) => prev.filter((item) => item.id !== todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TodoList
          todos={todos}
          loading={false}
          onEndReached={loadMore}
          onPressDetail={onPressDetail}
          onDelete={handleDelete}
          onPressAddNew={handleAddTodo}
        />
      </View>
      {todos.length > 0 && (
        <View style={styles.buttonWrapper}>
          <Pressable onPress={handleAddTodo} style={styles.buttonAdd}>
            <Text style={styles.buttonTitle}>+</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
