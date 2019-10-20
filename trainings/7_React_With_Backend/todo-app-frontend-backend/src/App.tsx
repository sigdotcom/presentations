import React, {useState, useEffect} from 'react';
import './App.css';

import {ITodo, Todo} from "./Todo";

const API_URI: string = "http://localhost:8000/todos"

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todos/")
    const receivedTodos = (await response.json() as ITodo[])
    setTodos(receivedTodos);
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  const deleteTodo = (id: string) => {
    return async () => {
      await fetch(`${API_URI}/${id}/`, {method: 'delete'})
      await fetchTodos();
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submitting")
    console.log(await fetch(`${API_URI}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         name,
         description
      })
    }))
    await fetchTodos();
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
