import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-boost';
import { ITodo, ITodos } from './interfaces'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export const queryTodos = () => {
  return client.query({
    query: gql`
      query TodoApp {
        todos {
          id
          todo
          done
        }
      }
    `,
  }).then((response: ApolloQueryResult<any>) => {
    const todos: ITodo[] = response.data.todos
    const result: ITodos = {}

    todos.forEach((todo) => {
      result[todo.id] = todo
    })

    return result
  })
}