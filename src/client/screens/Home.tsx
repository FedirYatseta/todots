import React from 'react'
import { Container } from 'react-bootstrap'
import AddTodo from '../Component/addtodo'

const Home = () => {
    return (
        <div>
            <h1 className='text-center py-3'>Welcome to Home Page</h1>
            <AddTodo />
        </div>


    )
}

export default Home