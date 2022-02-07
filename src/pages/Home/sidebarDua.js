import React from "react";
import {Card, Col, Row, Table} from'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import './statusCard.css';

function Awal() {

const con = {
    marginTop:'120px',
    marginLeft:'auto', marginRight:'auto'
}
const datanya = {
    backgroundColor:'white',
    borderRadius:'15px',
    paddingTop:'15px',
    paddingBottom:'10px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'color 0.5s ease 0s'
}
const emmm = {
    display:'flex', 
    alignItems:'baseline',
    justifyContent:'start',
    paddingLeft:'25px',
    paddingRight:'25px',
    marginTop:'-10px'
}
const data = [
    {
        icon:<FaIcons.FaMale />,
        title: 'Keunggulan menjadi Mahasiswa kami',
        iconku:<FaIcons.FaAngleRight />
    },
    {
        icon:<FaIcons.FaMale />,
        title: 'Keunggulan menjadi Mahasiswa kami',
        iconku:<FaIcons.FaAngleRight />
    },
    {
        icon:<FaIcons.FaMale />,
        title: 'Keunggulan menjadi Mahasiswa kami',
        iconku:<FaIcons.FaAngleRight />
    }
]

    return (
        <div className="container" style={con}>

            <div className="row">
                <div className="col-3">
                    <div className="sidebar1" style={datanya}>
                        <h5 style={{marginLeft:'29px', marginBottom:'30px', zIndex: 1000}}>Mahasiswa</h5>
                        {
                            data.map((datas) => {
                                return(
                                    <div style={emmm}>
                                        <div style={{zIndex: 100}}>{datas.icon}</div>
                                        <div style={{paddingLeft:'25px', zIndex: 100}}>{datas.title}<hr/></div>
                                        <div style={{marginLeft:'auto', zIndex: 100}}>{datas.iconku}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="sidebar2" style={datanya}>
                        <h5 style={{marginLeft:'29px', marginBottom:'30px', textAlign:'center'}}>Mahasiswa</h5>
                        {
                            data.map((datas) => {
                                return(
                                    <div style={emmm}>
                                        <div style={{zIndex: 100}}>{datas.icon}</div>
                                        <div style={{paddingLeft:'25px', zIndex: 100}}>{datas.title}<hr/></div>
                                        <div style={{marginLeft:'auto', zIndex: 100}}>{datas.iconku}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-3">
                    <div className="sidebar3" style={datanya}>
                    <h5 style={{marginLeft:'29px', marginBottom:'30px'}}>Mahasiswa</h5>
                        {
                            data.map((datas) => {
                                return(
                                    <div style={emmm}>
                                        <div style={{zIndex: 100}}>{datas.icon}</div>
                                        <div style={{paddingLeft:'25px', zIndex: 100}}>{datas.title}<hr/></div>
                                        <div style={{marginLeft:'auto', zIndex: 100}}>{datas.iconku}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Card className="mt-4">
                <Card.Header>Form Order</Card.Header>
                <Card.Body style={{paddingBottom:'20px'}}>
                    <Row>
                        <Col md-2>
                            <label>Nama</label>
                            <input className="form-control" placeholder="Masukkan Nama.."/>
                        </Col>
                        <Col md-2>
                            <label>Tanggal</label>
                            <input className="form-control" placeholder="Masukkan Tanggal.."/>
                        </Col>
                        <Col md-2>
                            <label>Order</label>
                            <input className="form-control" placeholder="Order.."/>
                        </Col>
                        <Col md-2>
                            <label>Jumlah</label>
                            <input className="form-control" placeholder="Jumlah.."/>
                        </Col>
                        <Col md-2>
                            <label>Kode</label>
                            <input className="form-control" placeholder="Kode.."/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className="mt-4">
                <Card.Header>Form Order</Card.Header>
                <Card.Body style={{paddingBottom:'20px'}}>
                        <Col md-2>
                            <label>Nama</label>
                            <input style={{width:'200px'}} className="form-control" placeholder="Masukkan Nama.."/>
                        </Col>
                        <Table className="mt-2">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Tanggal</th>
                                    <th>Order</th>
                                    <th>Jumlah</th>
                                    <th>Kode</th>
                                </tr>
                            </thead>
                        </Table>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Awal