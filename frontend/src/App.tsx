import * as React from 'react';
import './App.css';
import * as agent from './graphqlAgent'
import { ITodo, ITodos } from './interfaces'

interface IState {
  todos: ITodos;
}

class App extends React.Component<{}, IState> {
  private todoInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = { todos: {} };
    this.todoInput = React.createRef<HTMLInputElement>()
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <input ref={this.todoInput} />
          <button type="submit">
            Add
        </button>
        </form>
        <div className="grid-container">
          {this.renderTodoList()}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    agent.queryTodos().then((todos) => {
      this.setState({ todos })
    })
  }

  private renderTodoList() {
    const todoList: JSX.Element[] = []
    for (const todoKey in this.state.todos) {
      if (this.state.todos.hasOwnProperty(todoKey)) {
        const todo: ITodo = this.state.todos[todoKey];
        const todoElement = (
          <div key={todoKey} className="grid-item">
            <div className="grid-cell"><input
              name="done"
              type="checkbox"
              checked={todo.done}
              onChange={this.doneTodo.bind(this, todoKey)} /></div>
            <div className="grid-cell" style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.todo}</div>
            <div className="grid-cell"><button onClick={this.deleteTodo.bind(this, todoKey)}>Delete</button></div>
          </div>
        )
        todoList.push(todoElement)
      }
    }
    return todoList
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!this.todoInput.current!.value) {
      return
    }
    const inputValue = this.todoInput.current!.value;
    this.createTodo(inputValue)
    this.todoInput.current!.value = ''
  }

  private createTodo = (todo: string) => this.createTodoState(todo);
  private deleteTodo = (id: string) => this.deleteTodoState(id);
  private doneTodo = (id: string) => this.doneTodoState(id);

  private deleteTodoState(id: string) {
    this.setState((prevState: Readonly<IState>) => {
      const currentTodos: ITodos = { ...prevState.todos }
      delete currentTodos[id]
      return { todos: currentTodos };
    });
  }

  private createTodoState(todo: string) {
    agent.createTodo(todo).then((responseTodo) => {
      this.setState((prevState: Readonly<IState>) => {
        const currentTodos: ITodos = { ...prevState.todos }
        currentTodos[responseTodo.id] = responseTodo
        return { todos: currentTodos };
      });
    })
  }

  private doneTodoState(id: string) {
    this.setState((prevState: Readonly<IState>) => {
      const currentTodos: ITodos = { ...prevState.todos }
      currentTodos[id].done = !currentTodos[id].done
      return { todos: currentTodos };
    });
  }
}

export default App;
