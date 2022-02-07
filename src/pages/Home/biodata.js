import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserEdit, faTrash, faReply, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Card, Table, Button, Modal} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {nanoid} from 'nanoid';

function Select() {
//DATA
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [hapusData, setHapusData] = useState([])
//MODAL CREATE DAN EDIT
    const [show, setShow] = useState(false);
//MODAL DELETE
    const [delShow, setDelShow] = useState(false);

    const delClose = () => setDelShow(false);
    const deleteShow = (id) => {
            setDelShow(true)
            setHapusData(id)
    };
//CREATE DATA
    const [create, setCreate] = useState({
        name:'',
        kelamin:'',
        hobi:'',
        alamat:''
    })
    const createSubmit = (values) => {
        const newName = {
            id: nanoid(),
            name: values.name,
            kelamin: values.kelamin,
            hobi: values.hobi,
            alamat: values.alamat
        }
        const saveAs = [...data, newName]
        setData(saveAs)
        setShow(false)
        setCreate({
            name:'',
            kelamin:'',
            hobi:'',
            alamat:''
        })
    }
//EDIT DATA
    const editData = (id) => {
        const ngeFind = data.find((datas) => datas.id === id)
        setCreate(ngeFind)
        setShow(true)
        setIsEdit(true)
        setIndexEdit(id)
    }
    const editSubmit = (values) => {
        const maping = data.map((val) => {
            if(val.id === indexEdit) {
                return{
                    id: val.id,
                    name: values.name,
                    kelamin: values.kelamin,
                    hobi: values.hobi,
                    alamat: values.alamat
                }
            }
            return val
        })
        setIsEdit(false)
        setIndexEdit('')
        setShow(false)
        setData(maping)
        setCreate({
            name:'',
            kelamin:'',
            hobi:'',
            alamat:''
        })
    }
//DELETE DATA
    const deleteData = (id) => {
        const ngefilter = data.filter(datas => datas.id !== id)
        setData(ngefilter)
        setHapusData('')
        delClose(true)
    }
//FORMIK
    const initial = {
        name: isEdit ? create.name : '',
        kelamin: isEdit ? create.kelamin : '',
        hobi: isEdit ? create.hobi : '',
        alamat: isEdit ? create.alamat : ''
    }
    const submit = (values) => {
        console.log(values)

        if(isEdit) {
            editSubmit(values)
        } else {
            createSubmit(values)
        }
    }
//VALIDATION
    const validation = Yup.object({
        name: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('Nama tidak boleh kosong !'),
        kelamin: Yup.string()
            .required('Pilih jenis kelamin anda !'),
        hobi: Yup.string()
            .required('Pilih jenis kelamin anda !'),
        alamat: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('Alamat tidak boleh kosong !')
    })

    return(
        <div className='container' style={{marginTop:'150px',marginLeft:'auto', marginRight:'auto'}}>
            <Card>
                <div style={{marginBottom:'10px'}}>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        Create Data
                    </Button>
                </div>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}>

                    <Formik 
                        initialValues={initial}
                        validationSchema={validation}
                        onSubmit={submit}>

                        {({touched, errors, isSubmitting, values, handleChange, handleSubmit}) => (

                            <form onSubmit={handleSubmit}>

                                <Modal.Header closeButton>
                                    <Modal.Title>{isEdit ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label htmlFor='name'>Nama</label>
                                    <Field
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                        name='name'
                                        type='text'
                                        autoComplete='off'
                                        required='required'
                                        placeholder='Masukkan Nama...'
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage className='error' name='name'/>
                                    </p>
                                    <label htmlFor='kelamin'>Kelamin</label>
                                    <Field
                                        className={`form-select ${touched.kelamin && errors.kelamin ? "is-invalid" : ""}`}
                                        name='kelamin'
                                        component='select'
                                        value={values.kelamin}
                                        onChange={handleChange}>

                                        <option value=''>--Piih Kelamin</option>
                                        <option value='Pria'>Pria</option>
                                        <option value='Wanita'>Wanita</option>
                                        </Field>
                                    <p className='text-danger'>
                                        <ErrorMessage className='error' name='kelamin'/>
                                    </p>
                                    <label htmlFor='hobi'>Hobi</label>
                                    <Field
                                        className={`form-select ${touched.hobi && errors.hobi ? "is-invalid" : ""}`}
                                        name='hobi'
                                        component='select'
                                        value={values.hobi}
                                        onChange={handleChange}>

                                        <option value=''>--Piih Hobi</option>
                                        <option value='Sepak Bola'>Sepak Bola</option>
                                        <option value='Basket'>Basket</option>
                                        <option value='Voli'>Voli</option>
                                        <option value='Renang'>Renang</option>
                                        </Field>
                                    <p className='text-danger'>
                                        <ErrorMessage className='error' name='hobi'/>
                                    </p>
                                    <label htmlFor='alamat'>Alamat</label>
                                    <Field
                                        as='textarea'
                                        className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
                                        name='alamat'
                                        type='text'
                                        autoComplete='off'
                                        required='required'
                                        placeholder='Masukkan Alamat...'
                                        value={values.alamat}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage className='error' name='alamat'/>
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShow(false)}>
                                        <FontAwesomeIcon icon={faReply}/>
                                    </Button>
                                    <Button type='submit' disabled={isSubmitting} variant="primary">
                                        <FontAwesomeIcon icon={faUserPlus}/>
                                    </Button>
                                </Modal.Footer>
                            </form>
                        )}
                    </Formik>
                </Modal>

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                            <th>Hobi</th>
                            <th>Alamat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((datas, index) => {
                                return(
                                    <tr key={datas.id}>
                                        <td>{index + 1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.kelamin}</td>
                                        <td>{datas.hobi}</td>
                                        <td>{datas.alamat}</td>
                                        <td className='text-center'>
                                            <Button variant='warning' className='text-white'
                                                onClick={() => {
                                                    editData(datas.id)
                                                    setCreate(datas)
                                                    setIsEdit(true)
                                                }}>
                                                <FontAwesomeIcon icon={faUserEdit}/>
                                            </Button>
                                            <Button variant='danger' style={{marginLeft:'10px'}} onClick={() => deleteShow(datas.id)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card>
            <Modal
                show={delShow}
                onHide={delClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Body>
                    Yakin Hapus ini ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={delClose}>
                        <FontAwesomeIcon icon={faReply}/>
                    </Button>
                    <Button variant="primary" onClick={() => deleteData(hapusData)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Select;