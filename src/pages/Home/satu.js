
import { useState } from 'react';
import {Form,Row, Button, Card, Col} from 'react-bootstrap'
import { faTrash, faUserPlus, faPenSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Rskyy(){
//Tempat Tugas
    const [tugas, setTugas] = useState('')
//List Tugas  
    const [listTugas, setListTugas] = useState([])

    const [indexUbah, setIndexUbah] = useState('')
    const [nilaiUbah, setNilaiUbah] = useState('')

//Tambah Tugas - Mengambil salinan di listTugas - yg mengambil salinan Tugas
    const tambahTugas = () => {
        setListTugas([
            ...listTugas,
            tugas,
        ]);
        setTugas('')
    }

//Edit Data
    const editTugas = (idx, val) => {
        setIndexUbah(idx);
        setNilaiUbah(val)
    }

// Submit Data
    const submitEdit = () => {
        const nilaiUbahBaru = listTugas.map((val, idx) => {
            if (idx === indexUbah) {
                return nilaiUbah
            }

            return val
        })

        setListTugas(nilaiUbahBaru)
        setIndexUbah('')
    }
//Hapust Data - Filter (val, - pasti index -)
//idx --> Parameter, !== --> Tidak Sama Dengan
    const hapusTugas = (idx) => {
        const tambahTugas = listTugas.filter((val,index) => index !==idx)
        setListTugas(tambahTugas);
        
    }

//Style Css
    const styleJudul = { fontSize: '18px'}
    const form = {width: '98%', marginBottom: '10px'}

    return (
        <div style={{margin: 'auto', width: '50%'}}>
            <Card style={{ width: '110%', marginTop: '100px', borderRadius: '15px' }}>
                <Card.Header className="text-center"><b>FORM LIST MAHASISWA</b></Card.Header>

                    <Form>
                        <Form.Group as={Row} className="mb-3" style={styleJudul} controlId="formPlaintextEmail">
                            <Row className="mt-5" style={{marginLeft: '0%'}}>  

                                <Col md={11}>
                                    <Form.Control style={form}  placeholder="Masukkan Nama Anda..." value={tugas} 
                                     
                                        onChange={e => {
                                        const value = e.target.value   
                                        setTugas(value);   
                                                                    
                                    }}
                                     />
                                </Col>

                                <Col md={1} style={{textAlign: 'right', marginLeft: '-17px'}}>
                                    <Button onClick={tambahTugas}><FontAwesomeIcon icon={faUserPlus} /></Button>
                                </Col>

                            </Row>
                            
                            <Form.Label style={{marginLeft: '15px', marginTop: '30px'}}><small>List Mahasiswa</small></Form.Label>
                            
                            {listTugas.map((val, index)=> ( 
                                indexUbah === index
                                ? (                               
                                    <Row style={{marginLeft: '0%'}}>
                                        <Col md={11}>
                                            <input className="form-control" style={{width: '98%', marginBottom: '10px'}} value={nilaiUbah} onChange={e => setNilaiUbah(e.target.value)} />
                                        </Col>
                                        <Col md={1} style={{textAlign: 'right', marginLeft: '-17px'}}>
                                            <Button onClick={submitEdit}><FontAwesomeIcon icon={faCheck} /></Button>
                                        </Col>
                                    </Row>
                                ): (
                                    <Row style={{marginLeft: '0%'}}>

                                        <Col md={10}>
                                            <div className="form-control" style={{width: '100%', marginBottom: '10px'}}>
                                                {val}
                                            </div>
                                        </Col>
                                        <Col md={1} style={{marginBottom: '10px', textAlign: 'right'}}>
                                            <Button onClick={() => {editTugas(index, val);}} className="text-white" variant="warning"><FontAwesomeIcon icon={faPenSquare} /></Button>
                                        </Col>
                                        <Col md={1} style={{textAlign: 'right', marginLeft: '-10px'}}>
                                            <Button onClick={() => hapusTugas(index)} variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                        </Col>

                                    </Row>
                                )
                            ))}
                        </Form.Group>
                    </Form>
            </Card>
        </div>
    )
}

export default Rskyy