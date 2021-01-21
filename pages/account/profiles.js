import React from 'react'
import Link from 'next/link'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const ProfileListScreen = () => {
  return (
    <Container className="py-3">
      <Row className='align-items-center'>
        <Col>
          <h1>Profiles</h1>
        </Col>
        <Col className='text-right'>
          <Link href='/account/profilesEdit'>
          <Button className='my-3'>
            <i className='fas fa-plus'></i> Create Profile
          </Button>
          </Link>
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>BIRTH DATE</th>
                <th>DECEASE DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link href='/account/profilesEdit'>
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

export default ProfileListScreen