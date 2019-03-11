import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://localhost:333/graphql'
});

export const queryTodos = () => {
  return client.query({
    query: gql`
      query TodoApp {
        todos {
          id
          text
          completed
        }
      }
    `,
  })
}