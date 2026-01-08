export type TodoStatus =
  | 'PENDING'
  | 'INPROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Todo = {
  id: string;
  title: string;
  description?: string;
  tag?: string;

  createdDate?: Date;
  updatedDate?: Date;
  dueDate?: Date;

  status: TodoStatus;
  subtasks?: SubTask[];
};

export type AddTodoInput = Omit<Todo, "id" | "createdDate">;
