import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { ITask } from './interface'
import './bootstrap.min.css'
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './client/screens/HomeScreen';
import SingUpScreen from './client/screens/SingUpScreen';
import LoginScreen from './client/screens/LoginScreen';
import TodoTask from './client/Component/TodoTask';
import Footer from './client/Component/Footer';
import NotFound404 from './client/screens/NotFound404';
import Header from './client/Component/Header';




const App: FC = () => {
  const [task, setTask] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value)
    }
    else {
      setDeadline(Number(event.target.value))
    }
  }

  const addTask = (): void => {
    const newTask = { taskName: task, deadLine: deadline };
    setTodoList([...todoList, newTask])
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameDelete
    }))
  }

  return (<Router>
    <Header />
    <main>
      <Container>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/signup' element={<SingUpScreen />} />
          <Route path='/*' element={<NotFound404 />} />
        </Routes>

        <InputGroup className="py-3">
          <FormControl
            name='task'
            type='text'
            placeholder='Task'
            value={task}
            onChange={handleChange}
          />
          <FormControl
            name='deadline'
            type='number'
            value={deadline}
            placeholder='Deadline (in Days)'
            onChange={handleChange} />
          <Button onClick={addTask}>  Add task</Button>
        </InputGroup>


        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}

      </Container>
    </main>


    <Footer />
  </Router>
  );
}

export default App;
