import ApolloClient, { FetchResult } from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-boost';
import { ITodo, ITodos } from './interfaces'

const client = new ApolloClient({
  uri: `http://${process.env.HOST_IP}/graphql`
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

export const createTodo = (todo: string) => {
  return client.mutate({
    variables: { todo },
    mutation: gql`
    mutation CreateTodo($todo: String!) {
      createTodo(todo: $todo) {
        id
        todo
        done
      }
    }
  `
  }).then((response: FetchResult) => {
    const responseTodo: ITodo = response.data!.createTodo
    return responseTodo
  })
}

export const deleteTodo = (id: string) => {
  return client.mutate({
    variables: { id },
    mutation: gql`
    mutation DeleteTodo($id: ID!) {
      deleteTodo(id: $id)
    }
  `
  }).then(() => {
    return true
  })
}

export const updateTodo = (id: string) => {
  return client.mutate({
    variables: { id },
    mutation: gql`
    mutation UpdateTodo($id: ID!) {
      updateTodo(id: $id) {
        id
        todo
        done
      }
    }
  `
  }).then((response: FetchResult) => {
    const responseTodo: ITodo = response.data!.updateTodo
    return responseTodo
  })
}