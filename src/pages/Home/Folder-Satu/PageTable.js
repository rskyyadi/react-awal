import React, { useState, useEffect, Fragment } from 'react';
import { Card, Table, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrash, faSearch, faCheck, faReply, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Switch } from '@headlessui/react';
import './PageTable.css';
import ReactLoading from "react-loading";


function Select(){
    const [data, setData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])
    const [currentPage, setCurentPage] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const [indexHapus, setIndexHapus] = useState([])
//CREATE
    const [add, setAdd] = useState({
        name:'',
        gender:'',
        alamant:''
    })
//GET DATA
    const getData = async () => {
        setLoading(true)
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
            setLoading(false)
            setPaginatedData(_(response.data).slice(0).take(itemPerPages).value())
            
        } catch(e) {
            setLoading(true)
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

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Data Sukses',
            text: 'Klik tombol untuk kembali !',
            showConfirmButton: false,
            timer: 1500
          })
        const newName = {
            id: nanoid(),
            name: values.name,
            gender: values.gender,
            alamat: values.alamat
        }
        const saveAs = [...data, newName]
        setData(saveAs)
        setAdd({
            name:'',
            gender:'',
            alamat:''
        })
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(saveAs).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
    }
//EDIT DATA
    const editData = (id, index) => {
        const finds = data.find((datas) => datas.id === id)
        setIsEdit(true)
        setIndexEdit(id)
        setAdd({...finds, index})
    }
    const editSubmit = (values) => {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Edit Data Sukses',
            text: 'Klik tombol untuk kembali !',
            showConfirmButton: false,
            timer: 1500
          })
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
        setIndexEdit('')
        setData(maping)
        setAdd({
            name:'',
            gender:'',
            alamat:''
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
    const inisial = {
        name: isEdit ? add.name : '',
        gender: isEdit ? add.gender : '',
        alamat: isEdit ? add.alamat : ''
    }
    const onSubmit = (values, {resetForm}) => {
        console.log(values)

        if(isEdit){
            editSubmit(values)
        }else{
            createSubmit(values)
        }
        resetForm({
            values: {
                name:'',
                gender:'',
                alamat:''
            }
        })
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

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Hapus Data Sukses',
            text: 'Klik tombol untuk kembali !',
            showConfirmButton: false,
            timer: 1500
          })
        const filters = data.filter(datas => datas.id !== id)
        setData(filters)
        deleteKeluar(true)
        const startIndex = (currentPage - 1) * itemPerPages
        const paginatedPost = _(filters).slice(startIndex).take(itemPerPages).value()
        setPaginatedData(paginatedPost)
    }
//DELETE DETAIL
    const deleteDetail = (id) => {
        const delete_detail = data.find((datas) => datas.id === id)
        setAdd(delete_detail)
    }
//MODAL DELETE
    const [hapusShow, setHapusShow] = useState(false);
    
    const deleteKeluar = () => setHapusShow(false);
    const deleteMasuk = (id) => {
        setHapusShow(true)
        setIndexHapus(id)
    }
//STYLE CSS
    const side_open = {marginTop:'-500px', marginLeft:'13vw', position:'relative'}
    const card = {width:'95%'}
    const pagination_style = {display:'flex', justifyContent:'space-between',alignItems:'baseline'}
    const toggle_switch = {marginLeft:'auto', marginRight:'auto'}
    const data_page = {display:'flex'}
    const data_pages = {display:'flex'}
    const titik = {marginRight:'10px'}
    const search_input = {marginBottom:'10px'}
    const fa_search = {position:'absolute', marginTop:'12px', marginLeft:'-8px', color:'#99A799', fontSize:'15px'}
    const input_search = {paddingLeft:'40px'}
    const tabelDraw = {padding:'1px'}
    const field = {marginBottom:'0px'}
    const buttonField = {width:'100%', marginBottom:'0px', marginTop:'0px'}
    const buttonField1 = {width:'48%', marginBottom:'0px', marginTop:'0px'}
    const buttonField2 = {width:'48%', marginBottom:'0px', marginTop:'0px', marginLeft:'4px'}
    const jumlahData = {marginRight:'24px'}
    const style_pages = {marginRight:'8px'}
    const style_dari = {marginRight:'8px', marginLeft:'8px'}
    const react_loading = {display:'flex', justifyContent:'center', alignItems:'baseline', position:'absolute', width:'100%'}
    const loading_icon = {height: "35px", width: "35px"}
    const tr_hilang = {display:'none'}
    const tr_tampil = {marginTop:0}
    const png_loading = {marginLeft:'-7px'}
    const border = {border:'1px solid red', borderRadius:'4px'}
    const fa_delete = {color:'red', width:'100%', fontSize:'100px', marginTop:'25px', marginBottom:'15px'}
    const text_delete = {textAlign:'center', color:'red', fontSize:'13px'}
    const text_delete2 = {textAlign:'center', marginTop:'-12px'}
    const delete_name = {textAlign:'center', fontSize:'29px', marginTop:'-10px'}
    const button_delete = {display:'flex', justifyContent:'center', marginBottom:'25px'}



    return(
        <div className='container' style={side_open}>
            <Card style={card}>

                <div className='data-pages'>
                    <div style={data_page}>
                        <div> <p style={jumlahData}>Jumlah Data</p> </div>
                        <div> <p style={titik}>:</p> </div>
                        <div> <p>{jumlah_data} Data</p> </div>
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

                <Formik
                    enableReinitialize
                    initialValues={inisial}
                    validationSchema={validation}
                    onSubmit={onSubmit}>

                    {({touched, errors, values, handleChange, handleSubmit}) => (

                    <form onSubmit={handleSubmit}>

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
                                <tr style={isEdit ? tr_hilang : tr_tampil}>
                                    <td></td>
                                    <td style={tabelDraw}>
                                        <Field  
                                            className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                            style={field}
                                            autoComplete='off'
                                            name='name'
                                            type='text'
                                            required='required'
                                            placeholder='Masukkan Nama...'
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td style={tabelDraw}>
                                        <Field
                                            className={`form-select ${touched.gender && errors.gender ? "is-invalid" : ""}`}
                                            style={field}
                                            autoComplete='off'
                                            name='gender'
                                            component='select'
                                            value={values.gender}
                                            onChange={handleChange}>
                                            
                                            <option value=''>--Pilih Gender--</option>
                                            <option value='Pria'>Pria</option>
                                            <option value='Wanita'>Wanita</option>
                                        </Field>
                                    </td>
                                    <td style={tabelDraw}>
                                        <Field
                                            className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
                                            style={field}
                                            autoComplete='off'
                                            name='alamat'
                                            type='text'
                                            required='required'
                                            placeholder='Masukkan Alamat...'
                                            value={values.alamat}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className='text-center' style={tabelDraw}>
                                        <Button 
                                            type='submit'
                                            style={buttonField}
                                            variant="primary">
                                            +
                                        </Button>
                                    </td>
                                </tr>
                                { 
                                    loading ? 

                                    <div style={react_loading}>
                                        <ReactLoading
                                            style={loading_icon}
                                            type="spin"
                                            color="#fff"
                                        />
                                        <p style={png_loading}>Memuat...</p>
                                    </div>
                                    :
                                    paginatedData.map((datas, index) => {
                                        return(
                                            <>
                                            {
                                                (isEdit && add.index === index)
                                                ?
                                                <tr>
                                                    <td className='text-center'>
                                                        {currentPage * itemPerPages + index - itemPerPages + 1}
                                                    </td>
                                                    <td style={tabelDraw}>
                                                        <Field  
                                                            className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                            style={field}
                                                            autoComplete='off'
                                                            name='name'
                                                            type='text'
                                                            required='required'
                                                            placeholder='Masukkan Nama...'
                                                            value={values.name}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td style={tabelDraw}>
                                                        <Field
                                                            className={`form-select ${touched.gender && errors.gender ? "is-invalid" : ""}`}
                                                            style={field}
                                                            autoComplete='off'
                                                            name='gender'
                                                            component='select'
                                                            value={values.gender}
                                                            onChange={handleChange}>
                                                            
                                                            <option value=''>--Pilih Gender--</option>
                                                            <option value='Pria'>Pria</option>
                                                            <option value='Wanita'>Wanita</option>
                                                        </Field>
                                                    </td>
                                                    <td style={tabelDraw}>
                                                        <Field
                                                            className={`form-control ${touched.alamat && errors.alamat ? "is-invalid" : ""}`}
                                                            style={field}
                                                            autoComplete='off'
                                                            name='alamat'
                                                            type='text'
                                                            required='required'
                                                            placeholder='Masukkan Alamat...'
                                                            value={values.alamat}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td className='text-center' style={tabelDraw}>
                                                        <Button
                                                            onClick={() => setIsEdit(false) && toggler(datas.id)}
                                                            style={buttonField1}
                                                            variant="danger">
                                                            <FontAwesomeIcon icon={faReply}/>
                                                        </Button>
                                                        <Button 
                                                            className='text-white'
                                                            type='submit'
                                                            style={buttonField2}
                                                            variant="warning">
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </Button>
                                                    </td>
                                                </tr>
                                                :
                                                <tr key={datas.id}>
                                                    <td className='text-center'>{currentPage * itemPerPages + index - itemPerPages + 1}</td>
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
                                                                        editData(datas.id, index)
                                                                        // setIsEdit(true)
                                                                        // setAdd(datas)
                                                                    }}>
                                                                    <FontAwesomeIcon icon={faUserEdit}/>
                                                                </Button>
                                                                <Button 
                                                                    style={{marginLeft:'10px'}} 
                                                                    variant='danger' 
                                                                    onClick={() => deleteMasuk(datas.id) ?? deleteDetail(datas.id)}>
                                                                    <FontAwesomeIcon icon={faTrash}/>
                                                                </Button>
                                                            </div> 
                                                            : <span></span>
                                                        }
                                                    </td>
                                                </tr>
                                            }
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </form> 
                    )}
                </Formik>
                <nav style={pagination_style}>

                    <div style={data_pages}>
                        <p style={style_pages}>Menampilkan</p>
                        <p>{onclick_page}</p>
                        <p style={style_dari}>dari</p>
                        <p style={style_pages}>{jumlah_page}</p>
                        <p style={style_pages}>Page</p>
                    </div>

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
            <Modal
                show={hapusShow}
                onHide={deleteKeluar}
                keyboard={false}>

                <Modal.Body>
                    <div style={border}>
                        <FontAwesomeIcon style={fa_delete} icon={faExclamationTriangle}/>
                        <p style={text_delete}>Anda tidak akan dapat mengembalikan data ini !</p>
                        <p style={delete_name}>{add.name}</p>                  
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
                                onClick={() => deleteData(indexHapus)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Select;