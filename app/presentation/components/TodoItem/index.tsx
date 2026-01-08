import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Alert, Pressable, Text, View } from 'react-native';
import { Todo } from '../../../domain/entities/todo';
import styles from './styles';

type Props = {
  todo: Todo;
  onPressDetail: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

const RightAction = ({
  drag,
  onPressDelete,
}: {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPressDelete: () => void;
}) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 30 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction} onPress={onPressDelete}>
        <Text style={styles.rightDeleteText}>Delete</Text>
      </Pressable>
    </Reanimated.View>
  );
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onPressDetail,
  onDelete,
}) => {
  const _onPressDetail = () => {
    if (typeof onPressDetail === 'function') {
      onPressDetail(todo);
    }
  };

  const _onPressDelete = () => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (typeof onDelete === 'function') {
              onDelete(todo);
            }
          },
        },
      ],
    );
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={10}
        renderRightActions={(
          prog: SharedValue<number>,
          drag: SharedValue<number>,
        ) => (
          <RightAction prog={prog} drag={drag} onPressDelete={_onPressDelete} />
        )}
      >
        <Pressable onPress={_onPressDetail}>
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{todo.title}</Text>
            </View>

            {todo.description && (
              <Text style={styles.description}>{todo.description}</Text>
            )}

            {/* <View style={styles.datesRow}>
              {todo.dueDate && (
                <Text style={styles.dueDate}>Due: {todo.dueDate}</Text>
              )}
            </View> */}
            <View style={styles.datesRow}>
              {todo.subtasks?.length > 0 && (
                <Text style={styles.dueDate}>
                  Subtasks: {todo.subtasks.length}
                </Text>
              )}
            </View>
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};
