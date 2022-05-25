import React, { Children, FC, ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

type Props = {
    children?: React.ReactNode
};


const FormContainer: FC<Props> = ({ children }) => {
    return (
        <Container>
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    )
}

export default FormContainer