import React, { useState, SyntheticEvent, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'
import { Form as FormFinal, Field as FieldFinal } from 'react-final-form'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../api/api'
import TodoItem from './TodoItem'




const AddTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSaveTodo = (values: any) => {
    debugger
    addTodo(values)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
      })
      .catch((err) => console.log(err))
  }




  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => {
        setTodos(todos)
      })

      .catch((err: Error) => console.log(err))
  }


  const handleUpdateTodo = (todo: ITodo): void => {
    debugger
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200 && status !== 201) {
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
        if (status !== 200 && status !== 201) {
          throw new Error('Error! Todo not deleted')
        }
        debugger
        setTodos(data.todos)

      })
      .catch((err) => console.log(err))
  }


  return (
    <FormContainer>
      <FormFinal onSubmit={handleSaveTodo}
        validate={values => {
          const errors: any = {}
          if (!values) {
            errors.name = 'Required'
          }
          if (!values) {
            errors.description = 'Required'
          }
          if (!values) {
            errors.deadline = 'Required'
          }
          return errors
        }} render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center justify-content-center mb-2">
              <Col xs="auto">
                <FieldFinal name="name">
                  {({ input, meta }) => (
                    <Form.Group className='d-flex align-item-center my-2'>
                      <Form.Label htmlFor='name'></Form.Label>
                      <Form.Control {...input} type="text" placeholder="name" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </Form.Group>
                  )}
                </FieldFinal>
              </Col>
              <Col xs="auto" >
                <FieldFinal name="description">
                  {({ input, meta }) => (
                    <Form.Group className='d-flex align-item-center my-2'>
                      <Form.Label htmlFor='description'></Form.Label>
                      <Form.Control {...input} type="text" placeholder="description" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </Form.Group>
                  )}
                </FieldFinal>
              </Col>
              <Col xs="auto">
                <FieldFinal name="deadline">
                  {({ input, meta }) => (
                    <Form.Group className='d-flex align-item-center my-2'>
                      <Form.Label htmlFor='deadline'></Form.Label>
                      <Form.Control {...input} type="date" placeholder="deadline" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </Form.Group>
                  )}
                </FieldFinal>
              </Col>
              <Col xs="auto">
                <Button type="submit" >Add Todo</Button>
              </Col>

            </Row>
          </Form>
        )

        } />
      {todos?.map((todo: ITodo) => (<TodoItem
        key={todo._id}
        updateTodo={handleUpdateTodo}
        deleteTodo={handleDeleteTodo}
        todo={todo}
      />
      ))}
    </FormContainer>


  )

}
export default AddTodo
