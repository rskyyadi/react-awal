import React,{useState} from "react";
import {
    Card, 
    Col, 
    Row, 
    Table, 
    Dropdown, 
    Button
} from'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSortUp, faUserPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {nanoid} from 'nanoid';
import swal from 'sweetalert';



function Awal() {
    const [murid, setMurid] = useState([])

//Create Data
    const [tambah, setTambah] = useState({
        name:'',
        tanggal:'',
        order:'',
        jumlah:'',
        kode:''
    })

    const tambahkan = (event) => {
        event.preventDefault()

        const mengembalikanNama = event.target.getAttribute('name')
        const valueNya = event.target.value

        const dataBaru = {...tambah}
        dataBaru[mengembalikanNama] = valueNya

        setTambah(dataBaru)
    }

    const tambahSubmit = (event) => {
        event.preventDefault()

        swal({
            title: "Tambah Data Berhasil",
            icon: "success"
          });

        const masukkanNama = {
            id: nanoid(),
            name: tambah.name,
            tanggal: tambah.tanggal,
            order: tambah.order,
            jumlah: tambah.jumlah,
            kode: tambah.kode
        }

        const baruUser = [...murid, masukkanNama]
        setMurid(baruUser)
        setTambah({
            name:'',
            tanggal:'',
            order:'',
            jumlah:'',
            kode:''
        })
    }

//Delete Data
    const diHapus = (id) => {
        const dataHapus = murid.filter(murids => murids.id !==id);
        setMurid(dataHapus);
    }

//Reverse
    const reverse = (array) => {
        return array.map((item,idx) => array[array.length-1-idx])
} 
reverse(murid)

//Modal Tambah
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

//Style Css
    const pA = {
        color:'rgb(108, 108, 108)'
    }

    const fA = {
        marginRight:'20px',
        marginTop:'7px',
        color:'rgb(108, 108, 108)'
    }

    const card = {
        fontSize:'13px'
    }

    const btDrop = {
        backgroundColor:'white',
        border:'none',
        color:'black',
        marginRight:'20px',
        display:'flex',
        alignItems:'baseline',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px'
    }

    const con = {
        marginTop:'120px'
    }

 
    return (
        <div className="container" style={con}>
            <h5>Halo Mahasiswa</h5>
            <p>Selamat datang di Dashboard semua</p>

            <div style ={{
                    display:'flex', 
                    justifyContent:'space-between', 
                    marginBottom:'20px'
                }}>

                <div style={{display:'flex'}}>
                    <Dropdown>
                        <Dropdown.Toggle 
                            id="dropdown-button-dark-example1" 
                            style={btDrop}> 
                            <p style={{paddingRight:'60px', marginBottom:'0px'}}>Semua Cabang</p>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item 
                                href="#/action-1" 
                                active>
                                Action
                            </Dropdown.Item>

                            <Dropdown.Item 
                                href="#/action-2">
                                Another action
                            </Dropdown.Item>

                            <Dropdown.Item 
                                href="#/action-3">
                                Something else
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item 
                                href="#/action-4">
                                Separated link
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle 
                            id="dropdown-button-dark-example1" 
                            style={btDrop}> 
                            <p style={{paddingRight:'60px', marginBottom:'0px'}}>Bulan Lalu</p>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item 
                                href="#/action-1" 
                                active>
                                Action
                            </Dropdown.Item>

                            <Dropdown.Item 
                                href="#/action-2">
                                Another action
                            </Dropdown.Item>

                            <Dropdown.Item 
                                href="#/action-3">
                                Something else
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item 
                                href="#/action-4">
                                Separated link
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <p style={{fontSize:'12px', marginBottom:'0px'}}>21 Desember 2021 00:00 - 21 Maret 2022 23:59</p>
                </div>
            </div>
            <Row>
                <Col md-4>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <p style={card}>Jumlah Transaksi</p>
                                <p>454 Transaksi</p>
                                <hr/>
                                <div style={{display:'flex'}}>
                                    <FontAwesomeIcon style={fA} icon={faSortUp}/>
                                    <p style={pA}><small>0% Peningkatan</small></p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md-4>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <p style={card}>Total Penjualan</p>
                                <p>Rp.26.400.766.00</p>
                                <hr/>
                                <div style={{display:'flex'}}>
                                    <FontAwesomeIcon style={fA} icon={faSortUp}/>
                                    <p style={pA}><small>0% Peningkatan</small></p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md-4>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <p style={card}>Penjualan Kotor</p>
                                <p>Rp.26.970.566.00</p>
                                <hr/>
                                <div style={{display:'flex'}}>
                                    <FontAwesomeIcon style={fA} icon={faSortUp}/>
                                    <p style={pA}><small>0% Peningkatan</small></p>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card className="mt-4">
                <Card.Header>Form Order</Card.Header>
                <Card.Body style={{paddingBottom:'20px'}}>
                    <form onSubmit={tambahSubmit}>
                        <Row>
                            <Col md-2>
                                <label>Nama</label>
                                <input 
                                    name="name"
                                    type="text"
                                    required="required"
                                    value={tambah.name}
                                    onChange={tambahkan}
                                    className="form-control" 
                                    placeholder="Masukkan Nama.."/>
                            </Col>
                            <Col md-2>
                                <label>Tanggal</label>
                                <input 
                                    name="tanggal"
                                    type="text"
                                    required="required"
                                    value={tambah.tanggal}
                                    onChange={tambahkan}
                                    className="form-control" 
                                    placeholder="Masukkan Tanggal.."/>
                            </Col>
                            <Col md-2>
                                <label>Order</label>
                                <input 
                                    name="order"
                                    type="text"
                                    required="required"
                                    value={tambah.order}
                                    onChange={tambahkan}
                                    className="form-control" 
                                    placeholder="Order.."/>
                            </Col>
                            <Col md-2>
                                <label>Jumlah</label>
                                <input 
                                    name="jumlah"
                                    type="text"
                                    required="required"
                                    value={tambah.jumlah}
                                    onChange={tambahkan}
                                    className="form-control" 
                                    placeholder="Jumlah.."/>
                            </Col>
                            <Col md-2>
                                <label>Kode</label>
                                <input 
                                    name="kode"
                                    type="text"
                                    required="required"
                                    value={tambah.kode}
                                    onChange={tambahkan}
                                    className="form-control" 
                                    placeholder="Kode.."/>
                            </Col>
                            <Col md-2>
                                <Button 
                                    style={{marginTop:'23px', marginLeft:'100px'}}
                                    type="submit" 
                                    className="text-white" 
                                    // onClick={handleShow}
                                    variant="primary">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Button>

                                {/* <Modal show={show} onHide={handleClose}>
                                    <Modal.Body closeButton>
                                        Woohoo, you're reading this text in a modal!
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Batal
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Order
                                        </Button>
                                    </Modal.Footer>
                                </Modal> */}


                            </Col>
                        </Row>
                    </form>
                </Card.Body>
            </Card>
            <Card className='mt-4'>
                <div style={{padding:'20px'}}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Tanggal</th>
                                <th>Order</th>
                                <th>Jumlah</th>
                                <th>Kode</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reverse(murid).map((murids, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{murids.name}</td>
                                            <td>{murids.tanggal}</td>
                                            <td style={{color:'red'}}>{murids.order}</td>
                                            <td>{murids.jumlah}</td>
                                            <td style={{color:'green'}}>{murids.kode}</td>
                                            <td className="text-center">
                                                <Button variant='danger' onClick={() => diHapus(murids.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}
export default Awal