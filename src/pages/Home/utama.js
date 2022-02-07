import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Card, Table, Modal, Row, Col } from 'react-bootstrap'
import { faTrash, faCheck, faUserPlus, faPlus, faSearch, faReply, faUserEdit, faEye, 
    faExclamationTriangle, faTimes, faUserAlt, faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {nanoid} from 'nanoid';
import swal from 'sweetalert';
import { Eclipse } from "react-loading-io";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import './statusCard.css';
import { Switch } from '@headlessui/react';

//TRY...CATCH - mengurung eksekusi yang menampilkan error dan dapat membuat program tetap berjalan tanpa dihentikan secara langsung.
//Error yang ditangani oleh try..catch biasa disebut dengan exception.

//getAttribute() -> Mengembalikan nilai atribut pada elemen (data atribut data-color pada button ).
//Jika atribut yang diberikan tidak ada, nilai yang dikembalikan menjadi null / string kosong ( jika data atrubut di dalam tag html tidak ada maka tidak akan ditampilkan ).

//event.preventDefault() - mencegah terjadinya event bawaan dari sebuah DOM ( reload )

//toLowerCase digunakan untuk mengubah nilai string ke nilai string yang terdiri dari huruf kecil semua
//Fungsi EndsWith menguji bagaimana satu string teks berakhir dengan yang lain.
//Fungsi StartsWith menguji bagaimana satu teks terikat bermula dengan yang lain.

//find() - melakukan pencarian teks, baik satu karakter teks atau beberapa karakter teks untuk mengetahui posisi relatif teks tersebut

//map() - menerapkan fungsi yang diberikan ke setiap item / anggota iterable (list, tuple, dan lain-lain) dan mengembalikannya dalam bentuk objek map.

function App(props) {
    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [indexHapus, setIndexHapus] = useState([])
    const [loading, setLoading] = useState(false)

//GET DATA
    const getUser = async () => {
        setLoading(true)
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            const map = response.data.map((val) => {
                return{
                    id: nanoid(),
                    name: val.name,
                    username: val.username,
                    email: val.email,
                    website: val.website,
                    phone: val.phone,
                    checked: false
                }
            })
            setUser(map)
            setLoading(false)

        } catch(e) {
            setLoading(true)
            console.log(e.message);
        }
    }
    useEffect(() => {
        getUser();
    }, [])

//CREATE DATA
    const [tambah, setTambah] = useState({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:'',
        gender:'',
        agama:'',
        hobby:'',
        alamat:''
    })

    const tambahSubmit = (values) => {

        swal({
            title: "Tambah Data Berhasil",
            text: "Klik tombol untuk kembali !",
            icon: "success",
            button: "Kembali",
          });

        const namaBaru = {
            id: nanoid(),
            name: values.name,
            username: values.username,
            email: values.email,
            website: values.website,
            phone: values.phone,
            gender: values.gender
        }
        const baruUser = [...user, namaBaru]
        setUser(baruUser);
        handleClose(true)
        setTambah({ 
            name:'',
            username:'',
            email:'',
            website:'',
            phone:'',
            gender:''
        })
    }
//MODAL DETAIL
    const [detailShow, setDetailShow] = useState(false)
//DETAIL
    const detailUser = (id) => {
        const dettt = user.find((users) => users.id === id)
        setTambah(dettt)
        setDetailShow(true)
    }
    //MODAL CREATE DAN EDIT
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setIsEdit(false)
    }

    //SEARCH DATA
    const handleSearch = (e) => {
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

    //EDIT DATA
    const editUser = (id) => {
        const tambahin = user.find((users) => users.id === id)
        setIndexEdit(id)
        setTambah(tambahin)
        setIsEdit(true)
        handleShow(true)
    }
    
    const editSubmit = (values) => {      
        const dataEdit = user.map((val) => {
            if (val.id === indexEdit) {
                
                swal({
                    title: "Edit Data Berhasil",
                    text: "Klik tombol untuk kembali !",
                    icon: "success",
                    button: "Kembali",
                });
                return {
                    id: val.id,
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    website: values.website,
                    phone: values.phone,
                    gender: values.gender
                } 
            }
            return val
        })
        setIsEdit(false)
        handleClose(true)
        setIndexEdit('')
        setUser(dataEdit)
        setTambah({ 
            name:'',
            username:'',
            email:'',
            website:'',
            phone:'',
            gender:''
        })
    }

    //DELETE DATA
    const hapusUser = (id) => {
        swal({
            title: "Hapus Data Berhasil",
            text: "Klik tombol untuk kembali !",
            icon: "success",
            button: "Kembali",
        });
        
        const getUser = user.filter(users => users.id !==id)
        setUser(getUser);
        setIndexHapus('');
        deleteKeluar(true)
        
    }
    //DELETE DETAIL
    const deleteDetail = (id) => {
        const delete_detail = user.find((users) => users.id === id)
        setTambah(delete_detail)
    }
    
    //MODAL DELETE
    const [hapusShow, setHapusShow] = useState(false);
    
    const deleteKeluar = () => setHapusShow(false);
    const deleteMasuk = (id) => {
        setHapusShow(true)
        setIndexHapus(id)
    }

//REVERSE
const reverse = (array) => {
    return array.map((item,idx) => array[array.length-1-idx])
    } 
reverse(user)

//FORMIK
const formiknya = {
    name: isEdit ? tambah.name : '',
    username: isEdit ? tambah.username : '',
    email: isEdit ? tambah.email : '',
    website: isEdit ? tambah.website : '',
    phone: isEdit ? tambah.phone : '',
    gender: isEdit ? tambah.gender : ''
}
const submitFormik = (values) => {
    console.log(values)

    if(isEdit) {
        editSubmit(values)
    } else {
        tambahSubmit(values)
    }
}
//VALIDATION
const valid = Yup.object({
    name: Yup.string()
    .min(3,'Minimal 3 Karakter')
    .max(30,'Maksimal 30 Karakter')
    .required('name is required'),
    username: Yup.string()
    .min(5,'Minimal 5 Karakter')
    .max(20,'Maksimal 20 Karakter')
    .required('Username is required'),
    email: Yup.string()
    .min(5,'Minimal 5 Karakter')
    .email('Email tidak valid')
    .required('Email is required'),
    website: Yup.string()
    .min(5,'Minimal 5 Karakter')
    .max(15,'Maksimal 15 Karakter')
    .required('Website is required'),
    phone: Yup.string()
    .min(10,'Minimal 10 Karakter')
        .max(15,'Maksimal 15 Karakter')
        .required('Phone is required'),
    gender: Yup.string()
    .required('Pilih Gender !'),
})
//TOGGLE SWITCH
    const toggler = (id) => {
        const main_toggler = user.map((users) => {
            if(users.id === id) {
                return{
                    ...users, 
                    checked: !users.checked
                }
            }
            return users
        })
        setUser(main_toggler)
    }   
//JUMLAH DATA
    const jumlah_data = [user.length]
//CHACKED
    const [chacked, setChacked] = useState(true)
//CSS
    const container = {marginTop:'120px', marginBottom:'50px', marginLeft:'auto', marginRight:'auto'}
    const card = {width: '100%', paddingBottom:'15px'}
    const container_card = {margin:'10px', marginTop:'50px', marginBottom:'50px'}
    const input_button = {marginRight:'14px', marginBottom:'15px', marginTop:'-10px'}
    const fa_input = {marginRight:'10px'}
    const search = {position:'absolute', marginTop:'18px', marginLeft:'-10px', color:'rgb(179, 179, 179)'}
    const search_input = {width:'91%', marginLeft:'-5px', marginRight:'0px', marginBottom:'-35px', height: '50px',
        fontSize: '10pt', float: 'left', color: '#63717f', paddingLeft: '45px', borderRadius: '5px',
    }
    const detStyle = {marginLeft:'-20px', fontSize:'20px'}
    const tabel = {fontSize:'2vh'}
    const main_table = {width:'95%', marginLeft:'auto', marginRight:'auto', marginBottom:'40px'}
    const button = {borderRadius:'0', width:'45px'}
    const fa_delete = {color:'red', width:'100%', fontSize:'100px', marginTop:'25px', marginBottom:'15px'}
    const text_delete = {textAlign:'center', color:'red', fontSize:'13px'}
    const text_delete2 = {textAlign:'center', marginTop:'-12px'}
    const button_delete = {display:'flex', justifyContent:'center', marginBottom:'25px'}
    const delete_name = {textAlign:'center', fontSize:'29px', marginTop:'-10px'}
    const border = {border:'1px solid red', borderRadius:'4px'}
    const detail_header = {backgroundColor:'#24A19C', color:'white'}
    const detail_body = {backgroundColor:'#96CEB4'}
    const detail_profil = {position:'absolute', backgroundColor:'#FAEEE7', padding:'20px', borderRadius:'50px', 
        marginLeft:'320px', marginTop:'-60px',border:'1px solid white'
    }
    const fa_user = {fontSize:'60px', color:'#DBCBBD'}
    const label_detail = {marginLeft:'-20px'}
    const button_td = {textAlign:'center', display:'column'}
    const logo_list = {display:'flex', justifyContent:'flex-start'}
    const fa_users = {fontSize:'30px', marginRight:'10px'}
    const toggle_switch = {marginLeft:'auto', marginRight:'auto'}


    if(loading) {
       return (
        <Eclipse size={64} style={{marginLeft:'45%'}}/>
       )
    }

    return(
        <div className="container" style={container}>
            <Row>
                <Col md-12>
                    <Card style={card}>

                        <div className="container" style={container_card}>

                            <div style={logo_list}>
                                <FontAwesomeIcon style={fa_users} icon={faUsers}/>
                                <h5>Daftar List Mahasiswa</h5>
                            </div>

                            <p className='mt-3'>Jumlah Data : {jumlah_data} data</p>

                            <Button 
                                style={input_button} 
                                variant="primary" 
                                onClick={handleShow}>
                                <FontAwesomeIcon style={fa_input} icon={faPlus}/>
                                Tambah Data
                            </Button>

                            <div className='input'>
                                <FontAwesomeIcon style={search} icon={faSearch}/>
                                <input 
                                    style={search_input}
                                    className="form-control"
                                    type="text"
                                    placeholder="Ketik nama yang ingin anda cari disini..."
                                    onChange={handleSearch}
                                />
                            </div>

                            <Modal
                                size='lg'
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}>

                                <Formik
                                    initialValues={formiknya}
                                    validationSchema={valid}
                                    onSubmit={submitFormik}>

                                    {({ touched, errors, isSubmitting, values, handleChange, handleSubmit}) =>
                                        !isSubmitting ? ( 

                                    <Form onSubmit={handleSubmit}>

                                        <Modal.Header closeButton>
                                            <Modal.Title>{isEdit ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Row className='row_input'>
                                                <Col md-5>
                                                    <label htmlFor='name'>Nama</label>
                                                    <Field
                                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                        name="name"
                                                        autoComplete='off'
                                                        type="text"
                                                        required="required"
                                                        placeholder="Masukkan Nama Anda..."
                                                        value={values.name}
                                                        onChange={handleChange}
                                                    />
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="name" />
                                                    </p>

                                                    <label htmlFor='username'>Username</label>
                                                    <Field
                                                        as='textarea'
                                                        className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                                                        name="username"
                                                        autoComplete="off"
                                                        type="text"
                                                        required="required"
                                                        placeholder="Masukkan Username Anda..."  
                                                        value={values.username}
                                                        onChange={handleChange}
                                                    />
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="username" />
                                                    </p>

                                                    <label htmlFor='email'>Email</label>
                                                    <Field 
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                        name="email"
                                                        autoComplete="off"
                                                        type="email"
                                                        required="required"
                                                        placeholder="Masukkan Email Anda..."  
                                                        value={values.email}
                                                        onChange={handleChange}
                                                    />
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="email" />
                                                    </p>
                                                </Col>
                                                <Col md-5>
                                                    <label htmlFor='website'>Website</label>
                                                    <Field
                                                        className={`form-control ${touched.website && errors.website ? "is-invalid" : ""}`}
                                                        name="website"
                                                        autoComplete="off"
                                                        type="text"
                                                        required="required"
                                                        placeholder="Masukkan Nama Website Anda..."  
                                                        value={values.website}
                                                        onChange={handleChange}
                                                    />
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="website" />
                                                    </p>
                                                    <label htmlFor='phone'>No Handphone</label>
                                                    <Field
                                                        className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                                        name="phone"
                                                        autoComplete="off"
                                                        type="text"
                                                        required="required"
                                                        placeholder="Masukkan Nomor Handphone Anda..."  
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                    />
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="phone" />
                                                    </p>
                                                    <label htmlFor='gender'>Gender</label>
                                                    <Field
                                                        className={`form-select ${touched.gender && errors.gender ? "is-invalid" : ""}`}
                                                        component='select'
                                                        name='gender'
                                                        value={values.gender}
                                                        onChange={handleChange}>
                                                        
                                                        <option value=''>--Pilih Gender</option>
                                                        <option value='Pria'>Pria</option>
                                                        <option value='Wanita'>Wanita</option>
                                                    </Field>
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="gender" />
                                                    </p> 
                                                    <Field
                                                        className={`form-checked ${touched.gender && errors.gender ? "is-invalid" : ""}`}
                                                        name="gender"
                                                        autoComplete='off'
                                                        checked={chacked}
                                                        type="checkbox"
                                                        required="required"
                                                        value={values.gender}
                                                        onChange={() => setChacked(!chacked)}
                                                    />
                                                    <label htmlFor='name'>Pria</label>
                                                    <p className='text-danger'>
                                                        <ErrorMessage className='error' name="gender" />
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button 
                                                variant="secondary" 
                                                onClick={handleClose}>
                                                <FontAwesomeIcon icon={faReply}/>
                                            </Button>
                                            <Button 
                                                type="submit"
                                                className="text-white" 
                                                variant={isEdit ?"primary" : "primary"}>
                                                <FontAwesomeIcon icon={isEdit ? faCheck : faUserPlus} />
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                    ) : (
                                        <div>
                                            <h1 className="p-3 mt-5">Form Submitted</h1>
                        
                                            <div className="alert alert-success mt-3">
                                                Terima Kasih!
                                            </div>
                                            <ul className="list-group">
                                                <li className="list-group-item">Nama: {values.name}</li>
                                                <li className="list-group-item">Username: {values.username}</li>
                                                <li className="list-group-item">Email: {values.email}</li>
                                                <li className="list-group-item">Website: {values.website}</li>
                                                <li className="list-group-item">Phone: {values.phone}</li>
                                            </ul>
                                            <Button onClick={handleClose}>Kembali</Button>
                                        </div>
                                    )
                                }
                                </Formik>
                            </Modal>
                        </div>
                        <div className='detail'>
                            <Modal
                                centered={true}
                                show={detailShow}
                                onHide={() => setDetailShow(false)}
                                backdrop="static"
                                keyboard={false}>

                                <Modal.Header style={detail_header} closeButton closeVariant='white'>
                                    <Modal.Title>{tambah.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={detail_body}>
                                    <div style={detail_profil}>
                                        <FontAwesomeIcon style={fa_user} icon={faUserAlt}/>
                                    </div>
                                    <Row className='mt-5'>
                                        <Col md={4}>
                                            <label>Username</label>
                                        </Col>
                                        <Col md={1}>
                                            <label style={label_detail}>:</label>
                                        </Col>
                                        <Col md={6}>
                                            <h5 style={detStyle}>{tambah.username}</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <label>Email</label>
                                        </Col>
                                        <Col md={1}>
                                            <label style={label_detail}>:</label>
                                        </Col>
                                        <Col md={6}>
                                            <h5 style={detStyle}>{tambah.email}</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <label>Website</label>
                                        </Col>
                                        <Col md={1}>
                                            <label style={label_detail}>:</label>
                                        </Col>
                                        <Col md={6}>
                                            <h5 style={detStyle}>{tambah.website}</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <label>No Handphone</label>
                                        </Col>
                                        <Col md={1}>
                                            <label style={label_detail}>:</label>
                                        </Col>
                                        <Col md={6}>
                                            <h5 style={detStyle}>{tambah.phone}</h5>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                        </div>

                        <Table 
                            responsive='lg'
                            bordered hover 
                            className="table" 
                            style={main_table}>
                                
                            <thead 
                                className="text-center" 
                                style={{color:'rgb(67, 67, 67)'}}>

                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Website</th>
                                    <th>No Handphone</th>
                                    <th>Gender</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    reverse(user).map((users, index) => {
                                        return(
                                            <tr key={index}>
                                                <td style={tabel}>{index + 1}</td>
                                                <td style={tabel}>{users.name}</td>
                                                <td style={tabel}>{users.username}</td>
                                                <td style={tabel}>{users.email}</td>
                                                <td style={tabel}>{users.website}</td>
                                                <td style={tabel}>{users.phone}</td>
                                                <td style={tabel}>{users.gender}</td>
                                                <td style={button_td}>
                                                    <Switch
                                                        style={toggle_switch}
                                                        checked={users.checked}
                                                        onChange={() => toggler(users.id)}
                                                        className={`${users.checked ? 'background-satu' : 'background-dua'} switch-toggle`}>

                                                        <span className="sr-only">Use setting</span>
                                                        <span 
                                                            aria-hidden="true" 
                                                            className={`${users.checked ? 'button-satu' : 'button-dua'} switch-dua`}
                                                        />
                                                    </Switch>
                                                    {
                                                        users.checked ? 
                                                        
                                                        <div className='button-flex'>
                                                            <Button 
                                                                style={button}
                                                                title="Detail"
                                                                onClick={() => detailUser(users.id)}
                                                                variant="success">
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </Button>                                                   
                                                            <Button
                                                                onClick={() => {
                                                                    editUser(users.id)
                                                                    setIsEdit(true)
                                                                    setTambah(users)
                                                                }}
                                                                style={button}
                                                                className="text-white" 
                                                                title="Edit"
                                                                variant="warning">
                                                                <FontAwesomeIcon icon={faUserEdit} />
                                                            </Button>
                                                            <Button 
                                                                style={button}
                                                                title="Hapus"
                                                                onClick={() => deleteMasuk(users.id) ?? deleteDetail(users.id)}
                                                                variant="danger">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </div>

                                                        : <span></span>}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>
                
                    <Modal
                        show={hapusShow}
                        onHide={deleteKeluar}
                        keyboard={false}>

                        <Modal.Body>
                            <div style={border}>
                                <FontAwesomeIcon style={fa_delete} icon={faExclamationTriangle}/>
                                <p style={text_delete}>Anda tidak akan dapat mengembalikan data ini !</p>
                                <p style={delete_name}>{tambah.name}</p>                  
                                <p style={text_delete2}>Yakin ingin hapus ?</p>
                                <div style={button_delete}>
                                    <Button 
                                        variant="outline-secondary"
                                        title='Batal'
                                        style={{marginRight:'10px'}} 
                                        onClick={deleteKeluar}>
                                        <FontAwesomeIcon style={{fontSize:'20px'}} icon={faTimes}/>
                                    </Button>
                                    <Button 
                                        variant="outline-danger"
                                        title='Hapus'
                                        onClick={() => hapusUser(indexHapus)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </div>        
    )
}

export default App

    // const tambahKan = (event) => {
    //     event.preventDefault();

    //     const namaKu = event.target.getAttribute('name')
    //     const valueKu = event.target.value;

    //     const dataBaru = {...tambah};
    //     dataBaru[namaKu] = valueKu;

    //     setTambah(dataBaru);

    // };