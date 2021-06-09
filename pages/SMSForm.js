import React, { useState } from 'react';

import {Button, Card, Col, Form, Alert} from "react-bootstrap";
import  getConfig from "next/config"

function SMSForm ({ profileId }) {


    const [phoneNumber, setPhoneNumber] = useState('');
    const [alert,setAlert] = useState(null);


    async function addNumber(){

        const profileInfo = {
            phoneNumber: phoneNumber
        }

        const add = await fetch(`${process.env.BACKEND_URL}/profiles/${profileId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmI2YTRhM2E0NDNmMWExNDVjZjRkZCIsImlhdCI6MTYyMzA1ODI3NSwiZXhwIjoxNzQ5MjAyMjc1fQ.3r98ZU_0ImdYh1faPmHCEpMC4if8B1i7_U2npP7rzG8`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileInfo)
        }).then(res => {
            setPhoneNumber('')
            setAlert({
                text: "Successfully subscribed!",
                variant: "success",
            })
        })
          .catch(err => {

              console.log(err.message)
              setAlert({
                  text: err.message,
                  variant: "danger",
              })
        })


    }

        return (
            <Form>
                <Form.Row className="align-items-center">
                    <Col md={3} sm={12}>
                        <Card>
                            <Card.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>
                                        Subscribe for WhatsApp reminders
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="Number_Phone"
                                        id="Number_Phone"
                                        placeholder="WhatsApp number"
                                        value={phoneNumber}
                                        onChange={e => {setPhoneNumber(e.target.value)}}
                                    />
                                </Form.Group>
                                <Button onClick={() => addNumber()} type={`button`} className="mb-2" >
                                    Subscribe
                                </Button>
                            </Card.Body>

                        </Card>
                        {alert && (
                            <Alert className="mt-2" variant={alert.variant}>
                                {alert.text}
                            </Alert>
                        )}{" "}
                    </Col>
                </Form.Row>
            </Form>
        )
    // }
}

export default SMSForm;
