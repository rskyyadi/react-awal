import React, {useState, Fragment} from 'react';
import {Button, Card, Table} from 'react-bootstrap';
import { Stepper, StepLabel, Step } from '@mui/material';
import Personal from './Personal';
import Info from './Info';
import Other from './Other';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {nanoid} from 'nanoid';

function MultiStep(){
    const [currentPage, setCurrentPage] = useState(1)
    const [dataUser, setDataUser] = useState([])
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        contact:'',
        alamat:'',
        desa:'',
        banjar:'',
        kode:'',
        deskripsi:''
    })
//STEP LABEL
    const steps = ['Personal','Info','Other']
//SUBMIT
    const submitPage = (values) => {
        const newName = {
            id: nanoid(),
            firstName: values.firstName,
            lastName: values.lastName,
            contact: values.contact,
            alamat: values.alamat,
            desa: values.desa,
            banjar: values.banjar,
            kode: values.kode,
            deskripsi: values.deskripsi
        }
        const saveAs = [...dataUser, newName]
        setDataUser(saveAs)
    }
//FORMIK
    const initialFormik = {
        firstName: '',
        lastName: '',
        contact: '',
        alamat: '',
        desa: '',
        banjar: '',
        kode: '',
        deskripsi: ''
    }
    const submitFormik = (values, {resetForm}) => {
        console.log(values)
        submitPage(values)
        resetForm({
            values: {
                firstName: '',
                lastName: '',
                contact: '',
                alamat: '',
                desa: '',
                banjar: '',
                kode: '',
                deskripsi: ''
            }  
        })
    }
//VALIDATION
    const validationFormik = Yup.object({
        firstName: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        lastName: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        contact: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        alamat: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        desa: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        banjar: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        kode: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
        deskripsi: Yup.string()
            .min(3, 'Minimal 3 Karakter')
            .required('required'),
    })
//STYLE
    const stepper_style = {width:'40%', marginLeft:'auto', marginRight:'auto', marginBottom:'20px'}
    const container = {marginTop:'-500px', marginLeft:'auto', marginRight:'auto', width:'80%'}

    return(
        <div style={container}>
            <Card>
                <div className='stepper'>
                    <Stepper 
                        style={stepper_style} 
                        activeStep={currentPage -1} 
                        orientation='horizontal'>
                        {
                            steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))
                        }
                    </Stepper>
                </div>
                <div className='body'>
                    <Formik
                        initialValues={initialFormik}
                        validationSchema={validationFormik}
                        onSubmit={submitFormik}>

                        {({touched, errors, values, handleChange, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                {currentPage === 1 ?
                                <>
                                    <Personal 
                                        formData={formData} 
                                        setFormData={setFormData} 
                                        initialFormik={initialFormik}
                                        validationFormik={validationFormik}
                                        onSubmit={submitFormik}
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        handleChange={handleChange}
                                    />
                                </>
                                    :''
                                }
                                {currentPage === 2 ? 
                                <>
                                    <Info 
                                        formData={formData} 
                                        setFormData={setFormData} 
                                        initialFormik={initialFormik}
                                        validationFormik={validationFormik}
                                        onSubmit={submitFormik}
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        handleChange={handleChange}
                                    />
                                </>
                                    :''
                                }
                                {currentPage === 3 ?
                                <>
                                    <Other 
                                        formData={formData} 
                                        setFormData={setFormData} 
                                        initialFormik={initialFormik}
                                        validationFormik={validationFormik}
                                        onSubmit={submitFormik}
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        handleChange={handleChange}
                                    />
                                </>
                                    :''
                                }
                                <Button 
                                    style={{marginRight:'20px'}}
                                    disabled={currentPage === 1}
                                    onClick={() => {setCurrentPage((pages) => pages -1)}} 
                                    variant='secondary'>
                                    Prev
                                </Button>
                                {currentPage === steps.length ?
                                    <Button 
                                        type='submit' 
                                        variant='primary'>
                                        Submit
                                    </Button>
                                    :
                                    <Button 
                                        disabled={currentPage === steps.length}
                                        onClick={() => {setCurrentPage((pages) => pages +1)}} 
                                        variant='primary'>
                                        Next
                                    </Button>
                                }
                            </form>
                        )}
                    </Formik>
                </div>
            </Card>
            <Card>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact</th>
                            <th>Alamat</th>
                            <th>Desa</th>
                            <th>Banjar</th>
                            <th>Kode</th>
                            <th>Deskripsi</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            dataUser.map((datas, index) => {
                                return (
                                    dataUser === index[null] ? 
                                    <tr>
                                        <td><p>Tidak Ada Data</p></td>
                                    </tr>
                                    :
                                    <tr key={datas.id}>
                                        <td>{datas.firstName}</td>
                                        <td>{datas.lastName}</td>
                                        <td>{datas.contact}</td>
                                        <td>{datas.alamat}</td>
                                        <td>{datas.desa}</td>
                                        <td>{datas.banjar}</td>
                                        <td>{datas.kode}</td>
                                        <td>{datas.deskripsi}</td>
                                    </tr>
                                )
                            })
                       }
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}
export default MultiStep;

//SUBMIT
    // const submitPage = () => {
    //     setDataUser(dataUser => [...dataUser, formData])
    //     setFormData('')
    //     setCurrentPage(1)
    // }