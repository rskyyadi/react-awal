import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Form,Row, Button, Card, Col} from 'react-bootstrap'
import { style } from 'dom-helpers';


function App(props) {
    const [identifikasi, setIdentifikasi] = useState(1);
    const [users, setUsers] = useState([])
//Membuat Loading Cepat
    const [loading, setLoading] = useState(false)
//Ambil Data - Sumber
    const getUsers = async () => {
        setLoading(true)
//Jika menggunakan async maka menggunakan try
        try {
//Membuat /Users terakhir dinamis
            let response = await axios.get(`https://jsonplaceholder.typicode.com/users/${identifikasi}`)
            //console.log(response.data);
            setUsers(response.data)
//Ketika data sudah ada
            setLoading(false)
        } catch(e) {
//Ketika data error
            setLoading(true)
//Menetapkan data yang didapat dari API ke user
            console.log(e.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, [identifikasi])

//CSS
const input = {width: '98%', marginTop: '20px',  marginBottom: '20px'}

    return(
        <div className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <Card>
                        <Card.Header className="text-center"><b>FORM LIST MAHASISWA</b></Card.Header>

                        <input type="text" name="identifikasi" style={input} className="form-control" value={identifikasi} onChange={(e) => setIdentifikasi(e.target.value)} />

{/* Sebelum kita dapat data kita masukan loading dulu */}
{/* Jika ada loading kita masukkan div Jika data ada kita akan render */}
                        {
                            loading ?<div>Loading...</div> :

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Website</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>

                                                <tr>
                                                    <td>{users.name}</td>
                                                    <td>{users.username}</td>
                                                    <td>{users.email}</td>
                                                    <td>{users.website}</td>
                                                    <td>{users.phone}</td>
                                                </tr>

                                </tbody>
                        </table>

                        }

                    </Card>
                    </div>
                </div>
            </div>        
        </div>
    )
}

{/* {
                                    user.map((users, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{users.name}</td>
                                                <td>{users.username}</td>
                                                <td>{users.email}</td>
                                                <td>{users.website}</td>
                                                <td>{users.phone}</td>
                                            </tr>
                                        )
                                    })
                                } */}

export default App
// import React, {useMemo, useState} from 'react';
// import {Card, Button, Table, Form} from 'react-bootstrap';
// import Select from 'react-select';
// import {nanoid} from 'nanoid';
// import {Formik, Field, ErrorMessage} from 'formik';
// import * as Yup from 'yup';

// function Biodata() {
// //DATA
//     const [user, setUser] = useState([])
//     const [isEdit, setIsEdit] = useState(false)
//     const [indexEdit, setIndexEdit] = useState(null)
// //SELECT HOBBY
//     const listHobby = useMemo(
//         () => [
//         { value: 'sepakbola', label: 'Sepak Bola' },
//         { value: 'bulutangkis', label: 'Bulu Tangkis' },
//         { value: 'voli', label: 'Voli' },
//         { value: 'renang', label: 'Renang' },
//         ],
//         []
//     )
// //SUBMIT HOBBY
//     const [selectHobby, setSelectHobby] = useState('')
//     const hobbynya = (e) => {
//         const selected = e.label
//         setSelectHobby(selected)
//     }
// //SELECT GENDER
//     const listGender = useMemo(
//         () => [
//             { value: 'pria', label: 'Pria' },
//             { value: 'wanita', label: 'Wanita'},
//             { value: 'waria', label: 'Waria'}
//         ],
//         []
//     )
// //SUBMIT HOBBY
//     const [selectGender, setSelectGender] = useState('')
//     const gendernya = (e) => {
//         const selecteds = e.label
//         setSelectGender(selecteds)
//     }
// //CREATE DATA
//     const [tambah, setTambah] = useState({
//         name:'',
//         alamat:'',
//         hobby: '',
//         gender: ''
//     })
//     // const tambahData = (event) => {
//     //     event.preventDefault()

//     //     const getName = event.target.getAttribute('name')
//     //     const getValues = event.target.value

//     //     const saveName = {...tambah}
//     //     saveName[getName] = getValues
//     //     setTambah(saveName)
//     // }
//     const tambahSubmit = (values) => {

//         const newName = ({
//             id: nanoid(),
//             name: values.name,
//             alamat: values.alamat,
//             hobby: selectHobby,
//             gender: selectGender
//         })
//         const saveAs = [...user, newName]
//         setUser(saveAs)
//         setTambah({
//             name:'',
//             alamat:''
//         })
//         setSelectHobby('')
//         setSelectHobby('')
//     }
// //EDIT
// const editUser = (id) => {
//     const ngeFind = user.find((users) => users.id === id)
//     setIsEdit(true)
//     setIndexEdit(id)
//     setTambah(ngeFind)
// }
// const editSubmit = (values) => {

//     const maping = user.map((val) => {
//         if(val.id === indexEdit) {
//             return{
//                 id: val.id,
//                 name: values.name,
//                 username: values.username,
//                 email: values.email,
//                 website: values.website,
//                 phone: values.phone
//             }
//         }
//         return val
//     })
//     setIsEdit(false)
//     setIndexEdit('')
//     setUser(maping)
//     setTambah({
//         name:'',
//         username:''
//     })
// }
// //FORMIK
//     const initialValue = {
//         name:'',
//         alamat:'',
//         selectHobby:'',
//         selectGender:''
//     }
//     const submit = (values) => {
//         console.log(values)
//         if(isEdit) {
//             tambahSubmit(values)
//         } else {
//             editSubmit(values)
//         }
//     }
// //YUP
//     const validation = Yup.object({
//         name: Yup.string()
//             .min(3,'Minimal 3 Karakter')
//             .max(30,'Maksimal 30 Karakter')
//             .required('name is required'),
//         alamat: Yup.string()
//             .min(3,'Minimal 3 Karakter')
//             .max(30,'Maksimal 30 Karakter')
//             .required('alamat is required'),
//         selectHobby: Yup.string()
//             .required('required'),
//         selectGender: Yup.string()
//             .required('required')
//     })
// //REVERSE
//     const reverse = (array) => {
//         return array.map((item,idx) => array[array.length-1-idx])
//     } 
//     reverse(user)

//     return(
//         <div className='container' style={{marginTop:'150px'}}>
//             <Card>
//                 <Formik
//                     initialValues={initialValue}
//                     validationSchema={validation}
//                     onSubmit={submit}>

//                     {({touched, errors, isSubmitting, values, handleChange, handleSubmit}) => (

//                     <Form onSubmit={handleSubmit}>
//                         <label>Nama</label>
//                         <Field  
//                             className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
//                             name='name'
//                             type='text'
//                             required='required'
//                             placeholder='Masukkan Nama...'
//                             value={values.name}
//                             onChange={handleChange}
//                         />
//                         <p className='text-danger'>
//                             <ErrorMessage name='name' className='error'/>
//                         </p>
//                         <label>Alamat</label>
//                         <textarea 
//                             className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
//                             name='alamat'
//                             type='text'
//                             required='required'
//                             placeholder='Masukkan Alamat...'
//                             value={values.alamat}
//                             onChange={handleChange}
//                         />
//                         <p className='text-danger'>
//                             <ErrorMessage name='alamat' className='error'/>
//                         </p>
//                         <label>Hobby</label>
//                         <Select 
//                             placeholder='Hobby...' 
//                             options={listHobby} 
//                             isClearable
//                             onChange={handleChange}
//                         />
//                         <label>Gender</label>
//                         <Select 
//                             placeholder='Hobby...' 
//                             options={listGender} 
//                             isClearable 
//                             onChange={handleChange}
//                         />
//                         <Button type='submit' disable={isSubmitting} variant='primary'>Submit</Button>
//                     </Form>
//                     )}
//                 </Formik>
//                 <Table bordered hover>
//                     <thead>
//                         <tr className='text-center'>
//                             <th>No</th>
//                             <th>Nama</th>
//                             <th>Alamat</th>
//                             <th>Hobby</th>
//                             <th>Gender</th>
//                             <th>Aksi</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             reverse(user).map((users, index) => {
//                                 return(
//                                     <tr key={users.id}>
//                                         <td>{index + 1}</td>
//                                         <td>{users.name}</td>
//                                         <td>{users.alamat}</td>
//                                         <td>{users.hobby}</td>
//                                         <td>{users.gender}</td>
//                                         <td>
//                                         <Button variant='warning' className='text-white'
//                                                 onClick={() => { 
//                                                     editUser(users.id) 
//                                                     setIsEdit(true) 
//                                                     setTambah(users)
//                                                 }}>
//                                                 Edit
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </Table>
//             </Card>
//         </div>
//     )
// }
// export default Biodata;