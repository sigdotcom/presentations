import React, {useState} from 'react';
import './App.css';

import {ITodo, Todo} from "./Todo";

let id: number = 3;
const DefaultTodoList: ITodo[] = [
  {id: "1", name: "Go to Grocery Store"},
  {id: "2", name: "Implement sick feature on mstacm.org", "description": "You know"},
]

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(DefaultTodoList)
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const deleteTodo = (id: string) => {
    return () => {
      const filteredTodos = todos.filter((todo) => {
        return todo.id !== id
      })

      setTodos([...filteredTodos]);
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTodos([...todos, {id: id.toString(), name, description}])
    id += 1;
  }

  const TodoItems: JSX.Element[] = todos.map((todo: ITodo) => {
    return <Todo {...todo} key={todo.id} onDelete={deleteTodo(todo.id)}/>
  })

  return (
    <div className="App">
      <h1>My Todos!</h1>
      <ul>
        {TodoItems}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
