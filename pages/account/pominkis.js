import React from 'react'
import Link from 'next/link'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const PominkisListScreen = () => {

  return (
    <Container className="py-3">
      <Row className='align-items-center'>
        <Col>
          <h1>Pominkis</h1>
        </Col>
        <Col className='text-right'>
        <Link href='/account/pominkisEdit'>
          <Button className='my-3'>
            <i className='fas fa-plus'></i> Create Pominkis
          </Button>
          </Link>
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>EVENT DATE</th>
                <th>EVENT TIME START</th>
                <th>EVENT TIME END</th>
                <th>LOCATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 <td>
                    <Link href='/account/pominkisEdit'>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
            </tbody>
          </Table>
        </>
    </Container>
  )
}

export default PominkisListScreen