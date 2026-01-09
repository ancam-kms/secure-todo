import { MockTodoRepository } from './mocks/MockTodoRepository';

describe('UpdateTodo', () => {
  it('should update todo', async () => {
    const repo = new MockTodoRepository();
    const createdTodo = await repo.addTodo({
      title: 'Old',
      status: 'PENDING',
    });

    await repo.updateTodo({
      id: createdTodo.id,
      title: 'Updated',
      status: 'COMPLETED',
      updatedDate: new Date(),
    });

    const todo = await repo.getById(createdTodo.id);
    expect(todo?.title).toBe('Updated');
    expect(todo?.status).toBe('COMPLETED');
  });
});
