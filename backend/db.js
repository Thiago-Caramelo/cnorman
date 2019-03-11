const _ = require('lodash')
const uuidv1 = require('uuid/v1');

const todos = {
  '1c1efa8d-71fe-44d3-93ad-981720e21898': { id: '1c1efa8d-71fe-44d3-93ad-981720e21898', todo: 'First Todo', done: false },
  '97d9cfb7-c303-40db-8744-63712c074086': { id: '97d9cfb7-c303-40db-8744-63712c074086', todo: 'Second Todo', done: false },
}

const findAllTodos = () => {
  return _.values(todos)
}

const createTodo = (todo) => {
  const newTodo = {
    id: uuidv1(),
    todo,
    done: false,
  }
  todos[newTodo.id] = newTodo
  return newTodo
}

const deleteTodo = (id) => {
  if (todos[id]) {
    delete todos[id]
    return true
  }
  return false
}

const updateTodo = (id) => {
  if (todos[id]) {
    todos[id].done = !todos[id].done
    return todos[id]
  }
  return null
}

module.exports = {
  findAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
}