// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import Message from "../../components/Message";
// import {
//     Container,
//     Row,
//     Col,
//     Image,
//     Form,
//     Card,
//     Button,
//     Alert,
//     ListGroup,
//     Spinner,
// } from "react-bootstrap";
// import styles from "../../styles/Profile.module.css";
//
//
//
// class sendSmsInput extends React.Component{
//     render(){
//         return(
//             <Card>
//           <Card.Body>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>
//                 Subscribe for WhatsApp reminders
//               </Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="WhatsApp number"
//                 value={number}
//                 onChange={(e) => setNumber(e.target.value)}
//               />
//             </Form.Group>
//             <Button className="mb-2" onClick={handleSubscribe}>
//               Subscribe
//             </Button>
//           </Card.Body>
//         </Card>
//         )
//     }
// }
//
//
// export default sendSmsInput