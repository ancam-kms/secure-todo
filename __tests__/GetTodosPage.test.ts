import { MockTodoRepository } from './mocks/MockTodoRepository';

describe('GetTodosPage', () => {
  it('should return paginated result', async () => {
    const repo = new MockTodoRepository();

    repo.seed(
      Array.from({ length: 25 }).map((_, i) => ({
        id: `${i}`,
        title: `Todo ${i}`,
        status: 'PENDING',
        createdDate: new Date(),
        updatedDate:  new Date(),
      })),
    );

    const result = await repo.getTodosPage({
      offset: 0,
      limit: 10,
    });

    expect(result.data.length).toBe(10);
    expect(result.hasMore).toBe(true);
    expect(result.total).toBe(25);
  });
});
