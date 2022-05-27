import React, { FC, useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SingUpScreen from './screens/SingUpScreen';
import LoginScreen from './screens/LoginScreen';
import Footer from './Component/Footer';
import NotFound404 from './screens/NotFound404';
import Header from './Component/Header';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/api'
import AddTodo from './Component/addtodo';
import TodoItem from './Component/TodoItem'




const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    debugger
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo): void => {
    debugger
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    debugger
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  debugger
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/signup' element={<SingUpScreen />} />
            <Route path='/*' element={<NotFound404 />} />
          </Routes>

          <AddTodo saveTodo={handleSaveTodo} />

          {todos?.map((todo: ITodo) => (<TodoItem
            key={todo._id}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
            todo={todo}
          />
          ))}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
