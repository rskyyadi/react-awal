import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrash, faReply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Switch } from '@headlessui/react';
import '../sidebar/sidebar_2.css';



function Select(){
    const [data, setData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])
    const [currentPage, setCurentPage] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
//MODAL
    const [show, setShow] = useState(false)
//CREATE
    const [add, setAdd] = useState({
        name:'',
        gender:'',
        alamant:''
    })
//GET DATA
    const getData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            //  setData(response.data)
            const map = response.data.map((val) => {
                return{
                    id: nanoid(),
                    name: val.name,
                    gender: val.gender,
                    alamat: val.alamat,
                    checked: false
                }
            })
            setData(map)
            setPaginatedData(_(response.data).slice(0).take(itemPerPages).value())
            
        } catch(e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])

//TOGGLE SWITCH
    const toggler = (id) => {
        const main_toggler = data.map((datas) => {
            if(datas.id === id) {
                return{
                    ...datas, 
                    checked: !datas.checked
                }
            }
            return datas
        })
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(main_toggler).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
        setData(main_toggler)
    } 
//PAGINATION
    const itemPerPages = 4
    const pageCount = data? data.length/itemPerPages : 0
    const pages = _.range(1, pageCount+1)
    
    const pagination = (pageNo) => {
        setCurentPage(pageNo)
        const startIndex = (pageNo - 1) * itemPerPages
        const paginatedPost = _(data).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
    }
//JUMLAH DATA DAN PAGES
    const jumlah_data = data.length
    const onclick_page = currentPage
    const jumlah_page = pages.length
//CREATE DATA
    const createSubmit = (values) => {

        const newName = {
            id: nanoid(),
            name: values.name,
            gender: values.gender,
            alamat: values.alamat
        }
        const saveAs = [...data, newName]
        setData(saveAs)
        setShow(false)
        setAdd({
            name:'',
            gender:'',
            alamant:''
        })
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(saveAs).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
    }
//EDIT DATA
    const editData = (id) => {
        const finds = data.find((datas) => datas.id === id)
        setIsEdit(true)
        setIndexEdit(id)
        setShow(true)
        setAdd(finds)
    }
    const editSubmit = (values) => {

        const maping = data.map((val) => {
            if(val.id === indexEdit){
                return{
                    id: val.id,
                    name: values.name,
                    gender: values.gender,
                    alamat: values.alamat
                }
            }
            return val
        })
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(maping).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)

        setIsEdit(false)
        setShow(false)
        setIndexEdit('')
        setData(maping)
        setAdd({
            name:'',
            gender:'',
            alamant:''
        })
    }
//SEARCH
    const handleSearch = (e) => {
        if (e.target.value === ''){
            window.location.reload(true)
            const search_data = data
            setData(search_data)
            setData(data)
            return
        }
        const searchResult = paginatedData.filter(datas => 
            datas.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
        setPaginatedData(searchResult);
    }
//FORMIK
    const initialVal = {
        name: isEdit ? add.name : '',
        gender: isEdit ? add.gender : '',
        alamat: isEdit ? add.alamat : ''
    }
    const submit = (values) => {
        console.log(values)

        if(isEdit){
            editSubmit(values)
        }else{
            createSubmit(values)
        }
    }
//YUP
    const validation = Yup.object({
        name: Yup.string()
            .min(3,'Minimal 3 Karakter!')
            .max(30,'Maksimal 30 Karakter!')
            .required('Masukkan Nama !'),
        gender: Yup.string()
            .required('Masukkan Gender !'),
        alamat: Yup.string()
            .min(3,'Minimal 3 Karakter!')
            .max(30,'Maksimal 30 Karakter!')
            .required('Masukkan Alamat !')
    })
//DELETE
    const deleteData = (id) => {
        const filters = data.filter(datas => datas.id !== id)
        setData(filters)
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(filters).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
    }
//STYLE CSS
    const side_open = {marginTop:'-550px', marginLeft:'auto', marginRight:'auto', position:'relative'}
    const card = {width:'95%'}
    const add_button = {marginBottom:'10px'}
    const pagination_style = {display:'flex', justifyContent:'flex-end'}
    const toggle_switch = {marginLeft:'auto', marginRight:'auto'}
    const data_page = {display:'flex'}
    const data_pages = {display:'flex', marginTop:'-15px'}
    const titik = {marginRight:'10px'}
    const search_input = {marginBottom:'10px'}
    const fa_search = {position:'absolute', marginTop:'12px', marginLeft:'-8px', color:'#99A799', fontSize:'15px'}
    const input_search = {paddingLeft:'40px'}



    return(
        <div className='container' style={side_open}>
            <Card style={card}>
                <div style={add_button}>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        + Tambah Data
                    </Button>
                </div>

                <div className='data-pages'>
                    <div style={data_page}>
                        <div>
                            <p style={{marginRight:'34px'}}>Jumlah Data</p>
                        </div>
                        <div>
                            <p style={titik}>:</p>
                        </div>
                        <div>
                            <p>{jumlah_data} Data</p>
                        </div>
                    </div>
                    <div style={data_pages}>
                        <div>
                            <p style={{marginRight:'80px'}}>Pages</p>
                        </div>
                        <div>
                            <p style={titik}>:</p>
                        </div>
                        <div>
                            <p>{onclick_page} - {jumlah_page} Page</p>
                        </div>
                    </div>
                </div>

                <div style={search_input}>
                    <FontAwesomeIcon style={fa_search} icon={faSearch}/>
                    <input 
                        style={input_search}
                        className='form-control'
                        type='text'
                        name='search'
                        placeholder='Cari Nama Anda Disini....'
                        onChange={handleSearch}
                    />
                </div>

                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}>

                    <Formik
                        initialValues={initialVal}
                        validationSchema={validation}
                        onSubmit={submit}>

                        {({touched, errors, isSubmitting, values, handleChange, handleSubmit}) => (

                        <form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <label>Nama</label>
                                <Field  
                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                    name='name'
                                    type='text'
                                    required='required'
                                    placeholder='Masukkan Nama...'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage name='name' className='error'/>
                                </p>
                                <label>Gender</label>
                                <Field
                                    className={`form-select ${touched.gender && errors.gender ? "is-invalid" : ""}`}
                                    name='gender'
                                    component='select'
                                    value={values.gender}
                                    onChange={handleChange}>
                                    
                                    <option value=''>--Pilih Gender--</option>
                                    <option value='Pria'>Pria</option>
                                    <option value='Wanita'>Wanita</option>
                                </Field>
                                <p className='text-danger'>
                                    <ErrorMessage name='gender' className='error'/>
                                </p>
                                <label>Alamat</label>
                                <Field
                                    as='textarea'  
                                    className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
                                    name='alamat'
                                    type='text'
                                    required='required'
                                    placeholder='Masukkan Alamat...'
                                    value={values.alamat}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage name='alamat' className='error'/>
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShow(false)}>
                                    <FontAwesomeIcon icon={faReply}/>
                                </Button>
                                <Button type='submit' disabled={isSubmitting} variant="primary">+</Button>
                            </Modal.Footer>
                        </form>
                        )}
                    </Formik>
                </Modal>

               <from>
                    <Table bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Gender</th>
                                <th>Alamat</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paginatedData.map((datas, index) => {
                                    return(
                                        <tr key={datas.id}>
                                            <td>{currentPage * itemPerPages + index - itemPerPages + 1}</td>
                                            <td>{datas.name}</td>
                                            <td>{datas.gender}</td>
                                            <td>{datas.alamat}</td>
                                            <td style={{width:'120px'}}className='text-center'>
                                                <Switch
                                                    style={toggle_switch}
                                                    checked={datas.checked}
                                                    onChange={() => toggler(datas.id)}
                                                    className={`${datas.checked ? 'background-satu' : 'background-dua'} switch-toggle`}>
                            
                                                    <span className="sr-only">Use setting</span>
                                                    <span 
                                                        aria-hidden="true" 
                                                        className={`${datas.checked ? 'button-satu' : 'button-dua'} switch-dua`}
                                                    />
                                                </Switch>                      
                                                {
                                                    datas.checked ? 
                                                            
                                                    <div className='button-flex'>
                                                        <Button variant='warning' 
                                                            className='text-white'
                                                            onClick={() => {
                                                                editData(datas.id)
                                                                setIsEdit(true)
                                                                setAdd(datas)}}>
                                                            <FontAwesomeIcon icon={faUserEdit}/>
                                                        </Button>
                                                        <Button 
                                                            style={{marginLeft:'10px'}} 
                                                            variant='danger' 
                                                            onClick={() => deleteData(datas.id)}>
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </Button>
                                                    </div> 
                                                    : <span></span>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </from> 
                <nav style={pagination_style}>
                    <ul className='pagination' style={{cursor:'pointer'}}>
                        <li className='page-item'>
                            <button className='page-link' 
                                onClick={() => pagination(currentPage -1)} 
                                disabled={currentPage === pages[0] ? true : false}>
                                Prev.
                            </button>
                        </li>
                        {
                            pages.map((page) => (
                                <li className={page === currentPage ? 'page-item active' : 'page-item'}>
                                    <button className='page-link' onClick={() => pagination(page)}>{page}</button>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <button className='page-link' 
                                onClick={() => pagination(currentPage +1)}
                                disabled={currentPage === pages[pages.length - 1] ? true : false}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </Card>
        </div>
    )
}
export default Select;