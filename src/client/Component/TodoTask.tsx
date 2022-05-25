import React from 'react'
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ITask } from '../../interface';
interface Props {
    task: ITask;
    completeTask(taskNameDelete: string): void;
}
const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <Container>
            <ListGroup horizontal className='py-2 mb-3'>
                <ListGroupItem>{task.taskName} </ListGroupItem>
                <ListGroupItem>{task.deadLine} </ListGroupItem>
            </ListGroup>
            <Button onClick={() => { completeTask(task.taskName) }}>Delete</Button>

        </Container>
    )
}

export default TodoTask