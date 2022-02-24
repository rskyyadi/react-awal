import React, {useContext} from 'react';
import { Button } from '@mui/material';
import { multistepContext } from './StepContex';
import { Col, Row } from 'react-bootstrap';
import {Formik, Field} from 'formik';
import '../Folder-Satu/PageTable.css';

export default function StepSatu() {

    const { setStep, userData, setUserData, initialFormik, validationFormik } = useContext(multistepContext)

  return (
    <div>
        <Formik
            initialValues={initialFormik}
            validationSchema={validationFormik}>

            {({touched, errors, values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Row style={{justifyContent:'center'}}>
                        <Col md={3}>
                            <div>
                                <Field
                                    className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                    name='firstName'
                                    label='First Name'
                                    size='small'
                                    margin='normal' 
                                    variant='outlined' 
                                    color='primary'
                                    defaultValue={values.userData['firstName']} 
                                    onChange={handleChange}
                                    onBlur={(e) => setUserData({...userData, 'firstName' : e.target.value})}
                                />
                            </div>
                            <div>
                                <Field
                                    className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                                    name='lastName'
                                    label='Last Name' 
                                    size='small'
                                    margin='normal' 
                                    variant='outlined' 
                                    color='primary'
                                    defaultValue={values.lastName} 
                                    onChange={handleChange}
                                    onBlur={(e) => setUserData({...userData, 'lastName' : e.target.value})}
                                />
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <Field
                                    className={`form-control ${touched.contact && errors.contact ? "is-invalid" : ""}`}
                                    name='contact'
                                    label='Contact' 
                                    size='small'
                                    margin='normal' 
                                    variant='outlined' 
                                    color='primary' 
                                    defaultValue={values.contact} 
                                    onChange={handleChange}
                                    onBlur={(e) => setUserData({...userData, 'contact' : e.target.value})}
                                />
                            </div>
                            <div>
                                <Field
                                    className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                    name='email'
                                    label='Email' 
                                    size='small'
                                    margin='normal' 
                                    variant='outlined' 
                                    color='primary' 
                                    defaultValue={values.email} 
                                    onChange={handleChange}
                                    onBlur={(e) => setUserData({...userData, 'email' : e.target.value})}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <Button variant='contained' onClick={() => setStep(2)} color='primary'>Next</Button>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}