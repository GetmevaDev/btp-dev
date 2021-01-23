import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";

const PominkisEditScreen = () => {
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [relatedProfileName, setRelatedProfileName] = useState("");
  const [eventDate, setEventDate] = useState(0);
  const [eventTimeStart, setEventTimeStart] = useState(0);
  const [eventTimeEnd, setEventTimeEnd] = useState(0);
  const [location, setLocation] = useState("");

  return (
    <>
      {
        <FormContainer>
          <h2>Edit Pominkis</h2>

          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="textarea"
                placeholder=""
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Related Profile Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Related Profile Name"
                value={relatedProfileName}
                onChange={(e) => setRelatedProfileName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Event Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Time Start</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Event Time Start"
                value={eventTimeStart}
                onChange={(e) => setEventTimeStart(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Time End</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Event Time End"
                value={eventTimeEnd}
                onChange={(e) => setEventTimeEnd(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default PominkisEditScreen;
