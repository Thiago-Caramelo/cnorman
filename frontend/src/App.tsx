import * as React from 'react';
import * as v1 from 'uuid/v1';
import './App.css';

interface ITodo {
  todo: string
  done: boolean
}

interface ITodos {
  [key: string]: ITodo;
};

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
        <div>
          {this.renderTodoList()}
        </div>
        <div className="grid-container">
          <div className="grid-item">1</div>
          <div className="grid-item">2</div>
          <div className="grid-item">3</div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    // load data from server
  }

  private renderTodoList() {
    const result: string[] = []
    for (const key in this.state.todos) {
      if (this.state.todos.hasOwnProperty(key)) {
        const element: ITodo = this.state.todos[key];
        result.push(element.todo)
      }
    }
    return JSON.stringify(result)
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
  // private deleteTodo = (id: string) => this.deleteTodoState(id);
  // private doneTodo = (id: string) => this.doneTodoState(id);

  // private deleteTodoState(id: string) {
  //   this.setState((prevState: Readonly<IState>) => {
  //     const currentTodos: ITodos = { ...prevState.todos }
  //     delete currentTodos[id]
  //     return { todos: currentTodos };
  //   });
  // }

  private createTodoState(todo: string) {
    this.setState((prevState: Readonly<IState>) => {
      const currentTodos: ITodos = { ...prevState.todos }
      currentTodos[v1()] = { todo, done: false }
      return { todos: currentTodos };
    });
  }

  // private doneTodoState(id: string) {
  //   this.setState((prevState: Readonly<IState>) => {
  //     const currentTodos: ITodos = { ...prevState.todos }
  //     currentTodos[id].done = !currentTodos[id].done
  //     return { todos: currentTodos };
  //   });
  // }
}

export default App;
