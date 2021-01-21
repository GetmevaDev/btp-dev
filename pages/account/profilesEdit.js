import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

const ProfileEditScreen = () => {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [deceaseDate, setDeseaceDate] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`${process.env.BACKEND_URL}`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

return (
    <>
      <FormContainer>
        <h1>Edit Profile</h1>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Birth Date'
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Decease Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Decease Date'
                value={deceaseDate}
                onChange={(e) => setDeseaceDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type='textarea'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default ProfileEditScreen