const { findAllTodos, createTodo, deleteTodo, updateTodo } = require('./db')

module.exports = {
  Query: {
    todos: () => findAllTodos()
  },
  Mutation: {
    createTodo: (_, { todo }) => createTodo(todo),
    deleteTodo: (_, { id }) => deleteTodo(id),
    updateTodo: (_, { id, body }) => updateTodo(id, body),
  }
}