import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
//import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'


type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    const checkTodo: string = todo.status ? `line-through` : ''
    return (
        <FormContainer>
            <Form className='Card'>
                <ListGroup className='Card--text'>
                    <h1 className={checkTodo}>{todo.name}</h1>
                    <span className={checkTodo}>{todo.description}</span>
                    <div className='Card--deadline'>
                        <span className={checkTodo}>{todo.deadline}</span>
                    </div>
                </ListGroup>

                <div className='Card--button'>
                    <button
                        onClick={() => updateTodo(todo)}
                        className={todo.status ? `hide-button` : 'Card--button__done'}
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => deleteTodo(todo._id)}
                        className='Card--button__delete'
                    >
                        Delete
                    </button>
                </div>
            </Form>
        </FormContainer>
    )

}
export default Todo;