import React, { useState } from 'react';
import { parseCookies } from "nookies";
import {Button, Card, Col, Form, Alert} from "react-bootstrap";
import  getConfig from "next/config"

function SMSForm ({ profile }) {
    const { jwt } = parseCookies();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [alert,setAlert] = useState(null);


    async function addNumber(){

        const number = {
            number: phoneNumber,
            profile: profile
        }

        const add = await fetch(`${process.env.BACKEND_URL}/reminder-subscribers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(number)
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
                                        Subscribe for Text message reminders
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="Number_Phone"
                                        id="Number_Phone"
                                        placeholder="Phone number"
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
