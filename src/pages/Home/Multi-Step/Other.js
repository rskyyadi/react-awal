import React from 'react';
import { Field } from 'formik';

function Other({touched, errors, values, handleChange}) {
  return (
    <div className='text-center'>
        <div className='mb-3 mt-5'>
            <Field
                className={`form-control ${touched.kode && errors.kode ? "is-invalid" : ""}`}
                placeholder='Kode...'
                name='kode' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary'
                value={values.kode}
                onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <Field
                className={`form-control ${touched.deskripsi && errors.deskripsi ? "is-invalid" : ""}`}
                placeholder='Deskripsi...'
                name='deskripsi' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary'
                value={values.deskripsi}
                onChange={handleChange}
            />
        </div>
    </div>
  )
}

export default Other