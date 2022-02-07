import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserEdit, faTrash, faReply, faUserPlus, faCalendar, faHistory} from '@fortawesome/free-solid-svg-icons';
import {Card, Table, Button, Col, Row, Modal, Form} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Select() {
//DATA
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [hapusData, setHapusData] = useState([])

//SET DATE
    const [date, setDate] = useState()
    console.log(date)

    const handleDate = (e) => {
        setDate(e.target.value)
    }
    
    // const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate)

    // const handleDate = (date) => {
    //     setStartDate(date)
    // }
//MODAL DELETE
    const [delShow, setDelShow] = useState(false);

    const delClose = () => setDelShow(false);
    const deleteShow = (id) => {
            setDelShow(true)
            setHapusData(id)
    };
//CREATE DATA
    const [create, setCreate] = useState({
        kode:'',
        judul:'',
        tgl: '',
        peminjaman:'',
        detail:''
    })
    const createData = (event) => {
        event.preventDefault()

        const getName = event.target.getAttribute('name')
        const getValue = event.target.value

        const save = {...create}
        save[getName] = getValue
        setCreate(save)
    }
    const createSubmit = (event) => {
        event.preventDefault()

        const newName = {
            id: nanoid(),
            kode: create.kode,
            judul: create.judul,
            tgl: create.tgl,
            peminjaman: create.peminjaman,
            detail: create.detail
        }
        console.log(newName)
        const saveAs = [...data, newName]
        setData(saveAs)
        setCreate({
            kode:'',
            judul:'',
            tgl: '',
            peminjaman:'',
            detail:''
        })
    }
//EDIT DATA
    const editData = (id) => {
        const ngeFind = data.find((datas) => datas.id === id)
        setCreate(ngeFind)
        setIsEdit(true)
        setIndexEdit(id)
    }
    const editSubmit = (event) => {
        event.preventDefault()

        const maping = data.map((val) => {
            if(val.id === indexEdit) {
                return{
                    id: val,
                    kode: create.kode,
                    judul: create.judul,
                    tgl: create.tgl,
                    peminjaman: create.peminjaman
                }
            }
            return val
        })
        setIsEdit(false)
        setIndexEdit('')
        setData(maping)
        setCreate({
            kode:'',
            judul:'',
            tgl:'',
            peminjaman:''
        })
    }
//DELETE DATA
    const deleteData = (id) => {
        const ngefilter = data.filter(datas => datas.id !== id)
        setData(ngefilter)
        setHapusData('')
        delClose(true)
    }
//CHECKED
    const [checked, setChecked] = useState(true)

    const handleChackbox = (e) => {
        e.preventDefault()

        setChecked({...checked, [e.target.name]:e.target.checked})
    }

//STYLE
    const table_date = {display:'flex'}
    const fa_calendar = {position:'absolute', color:'#9D9D9D', marginLeft:'165px', marginTop:'7px' }


    return(
        <div className='container' style={{marginTop:'150px',marginLeft:'auto', marginRight:'auto'}}>
            <Card>
                <form onSubmit={isEdit ? editSubmit : createSubmit}>
                    <Row>
                        <Col md-2>
                            <label htmlFor='kode'>Kode Buku</label>
                            <input
                                className='form-control'
                                name='kode'
                                type='text'
                                autoComplete='off'
                                required='required'
                                placeholder='Masukkan Kode...'
                                value={create.kode}
                                onChange={createData}
                            />
                        </Col>
                        <Col md-3>
                            <label htmlFor='judul'>Judul Buku</label>
                            <input
                                className='form-control'
                                name='judul'
                                type='text'
                                autoComplete='off'
                                required='required'
                                placeholder='Masukkan Judul...'
                                value={create.judul}
                                onChange={createData}
                            />
                        </Col>
                        <Col md-2>
                            <label htmlFor='tgl'>Tgl Ambil : {date}</label>
                            <input 
                                type='date' 
                                name='tgl'
                                className='form-control'
                                value={create.date}
                                onChange={createData}
                            />
                        </Col>
                        <Col md-3>
                            <label htmlFor='peminjaman'>Peminjaman</label>
                            <select
                                className='form-select'
                                name='peminjaman'
                                component='select'
                                value={create.peminjaman}
                                onChange={createData}>

                                <option value=''>--Piih Waktu Pinjam</option>
                                <option value='1 Hari'>1 Hari</option>
                                <option value='1 Minggu'>1 Minggu</option>
                                <option value='1 Bulan'>1 Bulan</option>
                            </select>
                        </Col>
                        <Col md-1>
                            <input 
                                type='checkbox'
                                name='detail'
                                checked={checked}
                                value='Belum Lulus'
                                onChange={createData}
                            />
                            <label>Belum Lunas</label>
                        </Col>
                        <Col md-1 style={{marginTop:'23px'}}>
                            <Button type='submit' variant="primary">
                                <FontAwesomeIcon icon={faUserPlus}/>
                            </Button>
                        </Col>
                    </Row>
                </form>             

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kode Buku</th>
                            <th>Judul Buku</th>
                            <th>Tgl Ambil</th>
                            <th>Peminjaman</th>
                            <th>Detail</th>
                            <th>Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((datas, index) => {
                                return(
                                    <tr key={datas.id}>
                                        <td>{index + 1}</td>
                                        <td>{datas.kode}</td>
                                        <td>{datas.judul}</td>
                                        <td>{datas.tgl}</td>
                                        <td>{datas.peminjaman}</td>
                                        <td>{datas.detail}</td>
                                        <td className='text-center'>
                                            <Button style={{backgroundColor: '#2EB086', border:'none'}}>
                                                <FontAwesomeIcon icon={faHistory}/>
                                            </Button>
                                            <Button style={{backgroundColor: '#B8405E', border:'none', marginLeft:'8px'}}>
                                                <FontAwesomeIcon icon={faHistory}/>
                                            </Button>
                                            <Button variant='warning' className='text-white' style={{marginLeft:'8px'}}
                                                onClick={() => {
                                                    editData(datas.id)
                                                    setCreate(datas)
                                                    setIsEdit(true)
                                                }}>
                                                <FontAwesomeIcon icon={faUserEdit}/>
                                            </Button>
                                            <Button variant='danger' style={{marginLeft:'8px'}} onClick={() => deleteShow(datas.id)}>
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





// import React, {useState} from 'react';
// import { Card, Button, Table, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleNotch, faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { nanoid } from 'nanoid';

// function Perpustakaan(){
// //DATA BUKU
//     const [data_buku, setData_buku] = useState([])
// //SET DATE
//     const [startDate, setStartDate] = useState(new Date());
// //CREATE DATA
//     const [create, setCreate] = useState({
//         judul_buku:'',
//         tgl_ambil:'',
//         tgl_kembali:'',
//         detail:''
//     })

//     const createData = (event) => {
//         event.preventDefault();

//         const namaKu = event.target.getAttribute('name')
//         const valueKu = event.target.value;

//         const dataBaru = {...create};
//         dataBaru[namaKu] = valueKu;

//         setCreate(dataBaru);

//     };

//     const createSubmit = (event) => {
//         event.preventDefault();

//         const namaBaru = {
//             id: nanoid(),
//             judul_buku:create.judul_buku,
//             tgl_ambil:create.tgl_ambil,
//             tgl_kembali:create.tgl_kembali,
//             detail:create.detail
//         }
//         const baruUser = [...data_buku, namaBaru]
//         setData_buku(baruUser);
//     }


// //STYLE CSS
//     const container = {marginTop:'150px'}
//     const card = {borderRadius:'0px'}
//     const table_create = {padding:'1px'}
//     const table_date = {padding:'1px', display:'flex', justifyContent:'flex-end'}
//     const fa_calendar = {position:'absolute', color:'#9D9D9D', marginRight:'16px', marginTop:'7px' }

//     return(
//         <div className='container' style={container}>
//             <Card style={card}>
//                 <Row>
//                     <Col md-3>
//                         <input 
//                             className='form-control'
//                             name='judul_buku'
//                             type='text'
//                             required='required'
//                             value={create.name}
//                             onChange={createData}
//                         />
//                     </Col>
//                     <Col md-3>
//                         <div style={table_date}>
//                             <div>
//                             <DatePicker 
//                                 className='form-control' 
//                                 selected={startDate}  
//                                 onChange={(date) => setStartDate(date)} 
//                             />
//                             </div>
//                             <div style={fa_calendar}>
//                                 <FontAwesomeIcon icon={faCalendar}/>
//                             </div>
//                         </div>
//                     </Col>
//                     <Col md-3>
//                         <div style={table_date}>
//                             <div>
//                                 <DatePicker 
//                                     className='form-control' 
//                                     selected={startDate} 
//                                     onChange={(date) => setStartDate(date)} 
//                                 />
//                             </div>
//                             <div style={fa_calendar}>
//                                 <FontAwesomeIcon icon={faCalendar}/>
//                             </div>
//                         </div>
//                     </Col>
//                     <Col md-3>
//                         <input 
//                             className='form-control'
//                             name='detail'
//                             type='text'
//                             required='required'
//                             value={create.detail}
//                             onChange={createData}
//                         />
//                         <Button
//                             type='submit' 
//                             variant='primary'>
//                             <FontAwesomeIcon icon={faPlus}/>
//                         </Button>
//                     </Col>
//                 </Row>
//                 <Table bordered hover>
//                     <thead>
//                         <tr className='text-center'>
//                             <th>No</th>
//                             <th>Kode</th>
//                             <th>Judul Buku</th>
//                             <th>Tgl Ambil</th>
//                             <th>Tgl Kembali</th>
//                             <th>Detail</th>
//                             <th>Opsi</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             data_buku.map((datas, index) => {
//                                 return(
//                                     <tr key={datas.id}>
//                                         <td>{index + 1}</td>
//                                         <td>{datas.id}</td>
//                                         <td>{datas.judul_buku}</td>
//                                         <td>{datas.tgl_ambil}</td>
//                                         <td>{datas.tgl_kembali}</td>
//                                         <td>{datas.detail}</td>
//                                         <td>
//                                             <Button variant='warning'>
//                                                 <FontAwesomeIcon icon={faCircleNotch} />
//                                             </Button>
//                                             <Button variant='warning'>
//                                                 <FontAwesomeIcon icon={faCircleNotch} />
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
// export default Perpustakaan;