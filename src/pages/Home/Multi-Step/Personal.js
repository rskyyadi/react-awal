import React from 'react';
import { Field } from 'formik';

function Personal({touched, errors, values, handleChange}) {
    console.log(values)
  return (
    <div className='text-center'>
        <div className='mb-3 mt-5'>
            <Field 
                className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                placeholder='First Name...' 
                name='firstName'
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary'
                value={values.firstName}
                onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <Field 
                className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                placeholder='Last Name...'
                name='lastName' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary'
                value={values.lastName}
                onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <Field 
                className={`form-control ${touched.contact && errors.contact ? "is-invalid" : ""}`}
                placeholder='Contact...' 
                name='contact'
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary'
                value={values.contact}
                onChange={handleChange}
            />
        </div>
    </div>
  )
}

export default Personal