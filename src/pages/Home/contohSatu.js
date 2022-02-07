import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import Select from "react-select";
import {Button, Table, Card, Modal} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faCheck, faUserPlus, faReply, faUserEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


function Belajar(props) {

    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [indexDelete, setIndexDelete] = useState([])
//GET USER
    const getUser = async () => {
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUser(response.data)
        } catch(e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
//CREATE USER
    const [tambah, setTambah] = useState({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:''
    })
    const tambahSubmit = (values) => {

        const newName = ({
            id: nanoid(),
            name: values.name,
            username: values.username,
            email: values.email,
            website: values.website,
            phone: values.phone
        })
        const saveAs = [...user, newName]
        setUser(saveAs)
        setTambah({
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }
//MODAL CREATE AND MODAL EDIT
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
//SEARCH USER
    const searchUser = (e) => {
        if (e.target.value === "") {
            window.location.reload(true)
            const tempUser = user;
            setUser(tempUser)
            setUser(user)
            return
        }
        const searchResult = user.filter(users => 
            users.name.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.username.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.email.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.website.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.phone.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
        setUser(searchResult);
    }
//EDIT USER
    const editUser = (id) => {
        const ngeFind = user.find((users) => users.id === id)
        setIsEdit(true)
        setIndexEdit(id)
        handleShow(true)
        setTambah(ngeFind)
    }
    const editSubmit = (values) => {

        const maping = user.map((val) => {
            if(val.id === indexEdit) {
                return{
                    id: val.id,
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    website: values.website,
                    phone: values.phone
                }
            }
            return val
        })
        setIsEdit(false)
        setIndexEdit('')
        setUser(maping)
        setTambah({
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }
//DELETE USER
    const deleteUser = (id) => {
        const del = user.filter(users => users.id !== id)
        setUser(del)
        setIndexDelete('')
        delClose(true)
    }
//MODAL DELETE
    const [delShow, setDelShow] = useState(false);

    const delClose = () => setDelShow(false);
    const delShows = (id) => {
        setDelShow(true)
        setIndexDelete(id)
    }
//FORMIK
    const initial = {
        name: isEdit ? tambah.name : '',
        username: isEdit ? tambah.username : '',
        email: isEdit ? tambah.email : '',
        website: isEdit ? tambah.website : '',
        phone: isEdit ? tambah.phone : ''
    }
    const submit = (values) => {
        console.log(values)

        if(isEdit) {
            editSubmit(values)
        } else {
            tambahSubmit(values)
        }
    }
//YUP
    const validation = Yup.object({
        name: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('name is required'),
        username: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('username is required'),
        email: Yup.string()
            .email('email invalid')
            .required('email is required'),
        website: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('website is required'),
        phone: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('phone is required')
    })
//REVERSE
    const reverse = (array) => {
        return array.map((item,idx) => array[array.length-1-idx])
    } 
    reverse(user)
//SELECT
    const options = useMemo(
        () => [
        { value: "ahmad", label: "Ahmad Syariffudin" },
        { value: "alo", label: "Mochammad Alomolo" },
        { value: "biki", label: "Ardi Biki Subandono" },
        { value: "suhandi", label: "Mohandi Akasa Alaska" },
        ],
        []
    );
//STYLE CSS
    const fontAwesome = {
        position:'absolute',
        marginTop:'16px', 
        marginLeft:'14px',
        color:'rgb(179, 179, 179)'
    }
    const inputs = {
        width:'100%',  
        marginBottom:'15px',
        height: '50px',
        fontSize: '10pt',
        float: 'left',
        color: '#63717f',
        paddingLeft: '45px',
        borderRadius: '5px',
    }



    return(
        <div className='container' style={{marginTop:'150px',marginLeft:'auto', marginRight:'auto'}}>
            <Card>
                
                <div>
                    <Button className='mb-3' variant="primary" onClick={handleShow}>
                        Create Data
                    </Button>
                </div>

                <div className="select mb-3">
                    <div className="category">Pilih User</div>
                    <Select placeholder='Select...' options={options} isClearable />
                </div>

                <div className='input'>
                    <FontAwesomeIcon style={fontAwesome} icon={faSearch} />
                    <input 
                        style={inputs}
                        className="form-control"
                        type="text"
                        placeholder="Ketik nama yang ingin anda cari disini..."
                        onChange={searchUser}
                    />
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>

                    <Formik
                        initialValues={initial}
                        validationSchema={validation}
                        onSubmit={submit}>

                        {({touched, errors, isSubmitting, values, handleChange, handleSubmit}) => (

                            <Form onSubmit={handleSubmit}>

                                <Modal.Header closeButton>
                                    <Modal.Title>{isEdit ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label htmlFor='name'>Nama</label>
                                    <Field
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                        autoComplete='off'
                                        type='text'
                                        name='name'
                                        placeholder='Masukkan Nama Anda...'
                                        required='required'
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage name='name' className='error'/>
                                    </p>
                                    <label htmlFor='username'>Username</label>
                                    <Field
                                        className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                                        autoComplete='off'
                                        type='text'
                                        name='username'
                                        placeholder='Masukkan Username...'
                                        required='required'
                                        value={values.username}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage name='username' className='error'/>
                                    </p>
                                    <label htmlFor='email'>Email</label>
                                    <Field
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        autoComplete='off'
                                        type='email'
                                        name='email'
                                        placeholder='Masukkan Email Anda...'
                                        required='required'
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage name='email' className='error'/>
                                    </p>
                                    <label htmlFor='website'>Website</label>
                                    <Field
                                        className={`form-control ${touched.website && errors.website ? "is-invalid" : ""}`}
                                        autoComplete='off'
                                        type='text'
                                        name='website'
                                        placeholder='Masukkan Website Anda...'
                                        required='required'
                                        value={values.website}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage name='website' className='error'/>
                                    </p>
                                    <label htmlFor='phone'>No Handphone</label>
                                    <Field
                                        className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                        autoComplete='off'
                                        type='text'
                                        name='phone'
                                        placeholder='Masukkan No Handphone...'
                                        required='required'
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                    <p className='text-danger'>
                                        <ErrorMessage name='phone' className='error'/>
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        <FontAwesomeIcon icon={faReply}/>
                                    </Button>
                                    <Button variant="primary" type='submit' disabled={isSubmitting} onClick={handleClose}>
                                        <FontAwesomeIcon icon={isEdit ? faCheck : faUserPlus} />
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal>

                <Table bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>No Handphone</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reverse(user).map((users, index) => {
                                return(
                                    <tr key={users.id}>
                                        <td>{index + 1}</td>
                                        <td>{users.name}</td>
                                        <td>{users.username}</td>
                                        <td>{users.email}</td>
                                        <td>{users.website}</td>
                                        <td>{users.phone}</td>
                                        <td style={{textAlign:'center'}} >
                                            <Button variant='warning' className='text-white'
                                                onClick={() => { 
                                                    editUser(users.id) 
                                                    setIsEdit(true) 
                                                    setTambah(users)
                                                }}>
                                                <FontAwesomeIcon icon={faUserEdit} />
                                            </Button>
                                            <Button 
                                                variant='danger' 
                                                style={{marginLeft: '10px'}}  
                                                onClick={() => delShows(users.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
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

                <Modal.Body closeButton>
                    Yakin Hapus ini?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={delClose}>Tidak</Button>
                    <Button variant="primary" onClick={() => deleteUser(indexDelete)}>Yakin</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default Belajar;