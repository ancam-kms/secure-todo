import DateTimePicker from '@react-native-community/datetimepicker';
import type { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AddTodo } from '../../../application/usecases/todo/commands/addTodo';
import { UpdateTodo } from '../../../application/usecases/todo/commands/updateTodo';
import type {
  AddTodoInput,
  SubTask,
  Todo,
} from '../../../domain/entities/todo';
import type { RootStackParamList } from '../../../index';
import { todoRepository } from '../../../infrastructure';
import styles from './styles';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  route: any;
};

const TodoCreateScreen: React.FC<Props> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const addTodo = new AddTodo(todoRepository);
  const updateTodo = new UpdateTodo(todoRepository);

  const todoDetail = useMemo(() => {
    return route.params?.todoDetail;
  }, [route.params?.todoDetail]);

  const mode = useMemo(() => {
    if (todoDetail?.id) return 'EDIT';
    return 'CREATE';
  }, [todoDetail]);

  const buttonTitle = useMemo(() => {
    if (mode === 'EDIT') return 'UPDATE';
    return 'CREATE';
  }, [mode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === 'CREATE' ? 'Create new Todo' : 'Edit Todo',
    });
  }, [mode, navigation]);

  useEffect(() => {
    if (todoDetail) {
      const { title, description, subtasks, dueDate } = todoDetail;
      setTitle(title);
      if (dueDate) {
        setDueDate(new Date(dueDate));
      }
      setDescription(description);
      setSubtasks(subtasks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    if (mode === 'CREATE') {
      handleSave();
    } else {
      handleUpdateTodo();
    }
  };
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    setLoading(true);
    try {
      const input: AddTodoInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        tag: tag.trim() || undefined,
        dueDate: dueDate || undefined,
        status: 'PENDING',
        subtasks: subtasks.length > 0 ? subtasks : undefined,
      };
      await addTodo.execute(input);
      navigation.goBack(); // Navigate back to Dashboard
    } catch (error) {
      Alert.alert('Error', 'Failed to create todo');
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    setLoading(true);
    try {
      const input: Todo = {
        ...todoDetail,
        title: title.trim(),
        description: description.trim() || undefined,
        tag: tag.trim() || undefined,
        dueDate: dueDate || undefined,
        status: 'PENDING',
        subtasks: subtasks.length > 0 ? subtasks : undefined,
      };
      await updateTodo.execute(input);
      navigation.goBack(); // Navigate back to Dashboard
    } catch (error) {
      Alert.alert('Error', 'Failed to create todo');
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to Dashboard
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setDueDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setDueDate(selectedDate);
      }
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const generateSubtaskId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) {
      return;
    }
    const newSubtask: SubTask = {
      id: generateSubtaskId(),
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map(subtask =>
        subtask.id === id
          ? { ...subtask, completed: !subtask.completed }
          : subtask,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Title - Required */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter todo title"
            placeholderTextColor="#999"
          />
        </View>

        {/* Description */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description (optional)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Tag */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Tag</Text>
          <TextInput
            style={styles.input}
            value={tag}
            onChangeText={setTag}
            placeholder="Enter tag (optional)"
            placeholderTextColor="#999"
          />
        </View>

        {/* Due Date */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Due Date</Text>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dateText, !dueDate && styles.placeholder]}>
              {dueDate ? formatDate(dueDate) : 'Select date (optional)'}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dueDate || new Date()}
              mode="date"
              display="default"
              is24Hour={true}
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Subtasks */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Subtasks</Text>
          <View style={styles.subtaskInputContainer}>
            <TextInput
              style={[styles.input, styles.subtaskInput]}
              value={newSubtaskTitle}
              onChangeText={setNewSubtaskTitle}
              placeholder="Add subtask (optional)"
              placeholderTextColor="#999"
              onSubmitEditing={handleAddSubtask}
            />
            <TouchableOpacity
              style={[
                styles.addSubtaskButton,
                !newSubtaskTitle.trim() && styles.addSubtaskButtonDisabled,
              ]}
              onPress={handleAddSubtask}
              disabled={!newSubtaskTitle.trim()}
            >
              <Text
                style={[
                  styles.addSubtaskButtonText,
                  !newSubtaskTitle.trim() &&
                    styles.addSubtaskButtonTextDisabled,
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
          {subtasks?.length > 0 && (
            <View style={styles.subtasksList}>
              {subtasks.map(subtask => (
                <View key={subtask.id} style={styles.subtaskItem}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleToggleSubtask(subtask.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        subtask.completed && styles.checkboxChecked,
                      ]}
                    >
                      {subtask.completed && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.subtaskTitle,
                        subtask.completed && styles.subtaskTitleCompleted,
                      ]}
                    >
                      {subtask.title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemoveSubtask(subtask.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} color="#666" />
          <View style={styles.buttonSpacer} />
          <Button
            title={loading ? 'Saving...' : buttonTitle}
            onPress={onSubmit}
            color="#841584"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoCreateScreen;
