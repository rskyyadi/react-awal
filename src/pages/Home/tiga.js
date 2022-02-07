import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Card, Col, Row, Table } from 'react-bootstrap'
import { faTrash, faPenSquare, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {nanoid} from 'nanoid';

// set edit ke true, set state index edit
// rubah form,
// edit submit = cari index kalau sama di replace -> set state edit ke false & set state index edit 

function App(props) {
    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
//Add
    const [tambah, setTambah] = useState({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:''
    })

    const tambahKan = (event) => {
        event.preventDefault();

        const namaKu = event.target.getAttribute('name')
        const valueKu = event.target.value;

        const dataBaru = {...tambah};
        dataBaru[namaKu] = valueKu;

        setTambah(dataBaru);

    };

    const tambahSubmit = (event) => {
        event.preventDefault();

        const namaBaru = {
            id: nanoid(),
            name: tambah.name,
            username: tambah.username,
            email: tambah.email,
            website: tambah.website,
            phone: tambah.phone
        }
        const baruUser = [...user, namaBaru]
        setUser(baruUser);
    }

//Edit
    const editUser = (idx, val) => {
        setIsEdit(true)
        setIndexEdit(idx)
        setTambah(val)
    }

    const editSubmit = (e) => {
        e.preventDefault()
        const dataEdit = user.map((val, idx) => {
            if (idx === indexEdit) {
                return {
                    id: tambah.id,
                    name: tambah.name,
                    username: tambah.username,
                    email: tambah.email,
                    website: tambah.website,
                    phone: tambah.phone
                } 
            }

            return val
        })
        setIsEdit(false)
        setIndexEdit('')
        setUser(dataEdit)
        setTambah({ name:'',
        username:'',
        email:'',
        website:'',
        phone:''})
    }

    
//Ambil Data - Sumber
    const getUser = async () => {
//Jika menggunakan async maka menggunakan try
        try {
//Membuat /Users terakhir dinamis
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            //console.log(response.data);
            setUser(response.data)
//Ketika data sudah ada
        } catch(e) {
//Menetapkan data yang didapat dari API ke user
            console.log(e.message);
        }
    }

//Delete
    const hapusUser = (idx) => {
        const getUser = user.filter((val,index) => index !==idx)
        setUser(getUser);       
    }

    useEffect(() => {
        getUser();
    }, [])

    //CSS
    const hps = {marginLeft: '10px'}
    const fm = {width: '100%'}


    return(
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Card style={{width: '100%'}}>
                        <Card.Header className="text-center"><b>FORM LIST MAHASISWA</b></Card.Header>

                            <div className="container" style={{margin:'10px', marginTop:'50px', marginBottom:'50px'}}>
                                <form onSubmit={isEdit ? editSubmit : tambahSubmit}>
                                <Row>
                                    <Col md={3}>
                                        <label>Name</label>
                                        <input 
                                            className="form-control"
                                            name="name"
                                            type="text"
                                            required="required"
                                            placeholder="Masukkan Nama Anda..." 
                                            style={fm}
                                            value={tambah.name}
                                            onChange={tambahKan}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <label>Username</label>
                                        <input 
                                            className="form-control"
                                            name="username"
                                            type="text"
                                            required="required"
                                            placeholder="Masukkan Username Anda..." 
                                            style={fm} 
                                            value={tambah.username}
                                            onChange={tambahKan}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <label>Email</label>
                                        <input 
                                            className="form-control"
                                            name="email"
                                            type="email"
                                            required="required"
                                            placeholder="Masukkan Email Anda..." 
                                            style={fm} 
                                            value={tambah.email}
                                            onChange={tambahKan}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <label>Website</label>
                                        <input 
                                            className="form-control"
                                            name="website"
                                            type="text"
                                            required="required"
                                            placeholder="Masukkan Website Anda..." 
                                            style={fm} 
                                            value={tambah.website}
                                            onChange={tambahKan}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <label>Phone</label>
                                        <input 
                                            className="form-control"
                                            name="phone"
                                            type="text"
                                            required="required"
                                            placeholder="Masukkan Phone Anda..." 
                                            style={fm} 
                                            value={tambah.phone}
                                            onChange={tambahKan}
                                        />
                                    </Col>
                                    <Col md={1}>
                                            <Button 
                                                type="submit" 
                                                className="mt-4 text-white" 
                                                variant={isEdit ?"warning" : "primary"}>
                                                <FontAwesomeIcon icon={isEdit ? faPenSquare : faUserPlus} />
                                            </Button>
                                    </Col>
                                </Row>
                                </form>
                            </div>

                            <Table striped bordered hover className="table" style={{width:'95%', marginLeft:'auto', marginRight:'auto'}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Website</th>
                                        <th>Phone</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {
                                    user.map((users, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{users.name}</td>
                                                <td>{users.username}</td>
                                                <td>{users.email}</td>
                                                <td>{users.website}</td>
                                                <td>{users.phone}</td>
                                                <td style={{textAlign:'center'}}>
                                                    <Button 
                                                        onClick={() => editUser(index, users)} 
                                                        className="text-white" 
                                                        variant="warning">
                                                        <FontAwesomeIcon icon={faPenSquare} />
                                                    </Button>
                                                    <Button 
                                                        style={hps} onClick={() => hapusUser(index)} 
                                                        variant="danger">
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
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default App

// const hapusUser = (idx) => {
//     Modal.confirm({
//         title:'Yakin'
//         onOk: () => {
//             const getUser = user.filter((val,index) => index !==idx)
//             setUser(getUser); 
//         }
//     });             
// }

function handleSearch(e){
    if (e.target.value === "") {
        window.location.reload(true)
        const tempUser = user;
        setUser(tempUser)
        setUser(user)
        return
    }
    const searchResult = user.filter(users => users.name.toLowerCase().startsWith(e.targer.value.toLowerCase()))
    setUser(searchResult);
}//onChange{handleSearch}

//Edit Data
const editUser = (id) => {
    let tambahin = user.find((users) => users.id === id);
    setIndexEdit(id)
    setTambah({
        name: tambahin.name,
        username: tambahin.username,
        email: tambahin.email,
        website: tambahin.website,
        phone: tambahin.phone
    });
    setIsEdit(true)
    handleShow(true)
}

// const editSubmit = (e, id) => {
//     e.preventDefault()
//     const dataEdit = user.forEach((users, val) => {
//         if (users.id === indexEdit.id)