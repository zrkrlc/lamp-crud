import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [label, setLabel] = useState("")
  const [status, setStatus] = useState("")
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchTask()
  },[])

  const fetchTask = async () => {
    await axios.get(`http://localhost:8000/api/tasks/${id}`).then(({data})=>{
      const { label, status } = data.task
      setLabel(label)
      setStatus(status)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }


  const updateTask = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('label', label)
    formData.append('status', status)

    await axios.post(`http://localhost:8000/api/tasks/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Task</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateTask}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Label</Form.Label>
                            <Form.Control type="text" value={label} onChange={(event)=>{
                              setLabel(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(event)=>{
                              setStatus(event.target.value)
                            }}>
                                <option value='0'>Todo</option>
                                <option value='1'>Done</option>
                            </Form.Select> 
                        </Form.Group>
                      </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}