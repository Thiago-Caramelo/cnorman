export interface ITodo {
  id: string
  todo: string
  done: boolean
}

export interface ITodos {
  [key: string]: ITodo;
};