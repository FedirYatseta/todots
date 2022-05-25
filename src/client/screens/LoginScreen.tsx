import React, { SyntheticEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()

        //interact with the back using fetch
        console.log('submitted');

    }
    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <h1 className='my-3'>Login</h1>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen