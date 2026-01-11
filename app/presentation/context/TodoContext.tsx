import React, { createContext, useEffect, useState } from 'react';
import { AddTodoInput, Todo } from '../../domain/entities/Todo';
import { MMKVTodoRepository } from '../../infrastructure/todo/Todo';
import { AddTodo } from '../../application/usecases/todo/commands/addTodo';
import { UpdateTodo } from '../../application/usecases/todo/commands/updateTodo';
import { DeleteTodo } from '../../application/usecases/todo/commands/deleteTodo';

const repository = new MMKVTodoRepository();

const addTodo = new AddTodo(repository);
const updateTodo = new UpdateTodo(repository);

export const TodoContext = createContext<any>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function refresh() {
    const result = await repository.getTodosPage({ offset: 0, limit: 10 });
    setTodos(result.data);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo: async (todo: AddTodoInput) => {
          await addTodo.execute(todo);
          refresh();
        },
        updateTodo: async (todo: Todo) => {
          await updateTodo.execute(todo);
          refresh();
        },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
