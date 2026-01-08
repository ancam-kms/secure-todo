import { LocalAuthRepository } from "@/app/domain/repositories/auth/LocalAuthRepository";
import { TodoRepository } from "@/app/domain/repositories/todo/TodoRepository";

import { LocalAuthentication } from "./auth/LocalAuthentication";
import { MMKVTodoRepository } from "./todo/Todo";

export const localAuthRepository: LocalAuthRepository =
  new LocalAuthentication();
export const todoRepository: TodoRepository = new MMKVTodoRepository();
