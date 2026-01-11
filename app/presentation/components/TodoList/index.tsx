import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Todo } from '../../../domain/entities/todo';
import { TodoItem } from '../TodoItem';
import styles from './styles';
import AppText from '../AppText';
const TodoList: React.FC<{
  todos: Todo[];
  loading: boolean;
  onEndReached: () => void;
  onPressDetail: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onPressAddNew: () => void;
}> = ({
  todos,
  loading,
  onEndReached,
  onPressDetail,
  onDelete,
  onPressAddNew,
}) => {
  const renderEmptyList = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>{"Oops! It's Empty"}</AppText>
        <AppText style={styles.emptyTextDesc}>
          {"Looks like you don't have anything in  your list"}
        </AppText>
        <Pressable style={styles.buttonAddNew} onPress={onPressAddNew}>
          <AppText variant="h2" style={styles.buttonAddTitle}>
            + AddNew
          </AppText>
        </Pressable>
      </View>
    );
  };
  const renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onPressDetail={onPressDetail}
          onDelete={onDelete}
        />
      )}
      style={styles.contentContainerList}
      ItemSeparatorComponent={renderItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      ListEmptyComponent={renderEmptyList}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};

export default TodoList;
