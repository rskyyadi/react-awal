import React from "react";
import {Button, Dropdown, Card, Row, Col} from'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSortUp} from '@fortawesome/free-solid-svg-icons';


function Awalan() {

//Style Css
const btDrop = {
    backgroundColor:'white',
    border:'none',
    color:'black',
    display:'flex',
    alignItems:'baseline',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px'
}

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

const con = {
    marginTop:'120px',
    marginLeft:'auto', marginRight:'auto'
}


    return (
        <div className="container" style={con}>
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
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:'20px'}}>
                <div>
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Hari Ini
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Kemarin
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Minggu Lalu
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Bulan Lalu
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Minggu Berjalan
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Bulan Berjalan
                    </Button>{' '}
                    <Button 
                        style={{marginRight:'10px'}} 
                        variant="outline-secondary">
                        Custome
                    </Button>{' '}
                </div>
                <div>
                    <p style={{fontSize:'12px'}}>21 Desember 2021 00:00 - 21 Maret 2022 23:59</p>
                </div>
            </div>
            <div className='mt-4'>
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
                <Row className='mt-4'>
                <Col md-4>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <p style={card}>Rata-Rata Per Transaksi</p>
                                    <p>Rp.58.554</p>
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
                                    <p style={card}>Penggratisan Penjualan</p>
                                    <p>0</p>
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
                                    <p style={card}>Jumlah Tamu</p>
                                    <p>592 Tamu</p>
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
            </div>
        </div>
    )
}
export default Awalan