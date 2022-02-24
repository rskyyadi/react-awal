import React from 'react';
import { Field } from 'formik';

function Info({touched, errors, values, handleChange}) {
  return (
    <div className='text-center'>
        <div className='mb-3 mt-5'>
            <Field 
                className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
                placeholder='Alamat...' 
                name='alamat'
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary'
                value={values.alamat}
                onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <Field 
                className={`form-control ${touched.desa && errors.desa ? "is-invalid" : ""}`}
                placeholder='Desa...' 
                name='desa'
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary'
                value={values.desa}
                onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <Field 
                className={`form-control ${touched.banjar && errors.banjar ? "is-invalid" : ""}`}
                placeholder='Banjar...'
                name='banjar' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary'
                value={values.banjar}
                onChange={handleChange}
            />
        </div>
    </div>
  )
}

export default Info