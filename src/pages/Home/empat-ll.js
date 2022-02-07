import React, {useState, useEffect} from "react";
import {Button, Card, Table, Modal} from'react-bootstrap';
import { faTrash, faUserEdit, faReply, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {nanoid} from 'nanoid';
import { Eclipse } from "react-loading-io";
import swal from 'sweetalert';

function ListUser(props) {
    const [user, setUser] = useState([])
    const [edit, setEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [loading, setLoading] = useState(false)

    const ambilData = async () => {
        setLoading(true)
        try{
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUser(response.data)
            setLoading(false)
        } catch(event) {
            setLoading(true)
            console.log(event.message)
        }
    }
    useEffect(() => {
        ambilData()
    }, [])

//Modal Create Data
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//Create Data
const [tambah, setTambah] = useState({
    name:'',
    username:'',
    email:'',
    website:'',
    phone:''
})

const menambah = (event) => {
    event.preventDefault()

    const namaNya = event.target.getAttribute('name')
    const valueNya = event.target.value

    const diSimpan = {...tambah}
    diSimpan[namaNya] = valueNya

    setTambah(diSimpan)
}

const klikTambah = (event) => {
    event.preventDefault()

    swal({
        title: "Tambah Data Berhasil",
        text: "Klik tombol untuk kembali !",
        icon: "success",
        button: "Kembali",
    });

    const namaBaru = {
        id: nanoid(),
        name: tambah.name,
        username: tambah.username,
        email: tambah.email,
        website: tambah.website,
        phone: tambah.phone
    }

    const userBaru = [...user, namaBaru]
    setUser(userBaru)
    handleClose(true)
    setTambah({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:''
    })
}

//Cari
    const klikSearch = (event) => {
        if(event.target.value === ""){
            window.location.reload(true)
            const cari = user
            setUser(cari)
            setUser(user)
            return
        }
        const cariUser = user.filter(users => 
            users.name.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
            users.username.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
            users.email.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
            users.website.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
            users.phone.toLowerCase().startsWith(event.target.value.toLowerCase())
        )
        setUser(cariUser)
    }


//Edit Data
    const editData = (id) => {
        const editJika = user.find((users) => users.id === id)
        setIndexEdit(id)
        setEdit(true)
        setTambah(editJika)
        handleShow(true)
    }

    const klikEdit = (event) => {
        event.preventDefault()

        const makaEdit = user.map((val) => {
            if(val.id === indexEdit) {

                swal({
                    title: "Edit Data Berhasil",
                    text: "Klik tombol untuk kembali !",
                    icon: "success",
                    button: "Kembali",
                });

                return{
                    id: val.id,
                    name: tambah.name,
                    username: tambah.username,
                    email: tambah.email,
                    website: tambah.website,
                    phone: tambah.phone
                }
            }
            return val
        })
        setUser(makaEdit)
        setEdit(false)
        setIndexEdit('')
        setTambah({
            name:'',
            usrname:'',
            email:'',
            website:'',
            phone:''
        })
    }

//Hapus Data
    const [indexHapus, setIndexHapus] = useState([])

    const hapus = (id) => {

        swal({
            title: "Hapus Data Berhasil",
            text: "Klik tombol untuk kembali !",
            icon: "success",
            button: "Kembali",
        });

        const dataHapus = user.filter(users => users.id !== id)
        setUser(dataHapus)
        setIndexHapus('')
        deleteKeluar(true)
    }

//Modal Delete Data
    const [hapusShow, setHapusShow] = useState(false);
    
    const deleteKeluar = () => setHapusShow(false);
    const deleteMasuk = (id) => {
        setHapusShow(true)
        setIndexHapus(id)
    }

//Reverse
    const reverse = (array) => {
        return array.map((item,idx) => array[array.length-1-idx])
    } 
    reverse(user)

//bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb


    if(loading) {
        return (
         <Eclipse 
             size={64} 
             style={{marginLeft:'45%'}}
         />
        )
     }

    return (
        <div className="container">
            <Card className="mt-5 mb-5">
                <div style={{padding:'20px'}}>

                    <Button 
                        variant="primary" 
                        style={{float:'right', marginBottom:'10px'}}
                        onClick={handleShow}>
                        Tambah Data
                    </Button>

                    <input 
                        type="text"
                        placeholder="Cari nama..."
                        className="form-control mb-3"
                        onChange={klikSearch}
                    />

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}>

                        <form onSubmit={edit ? klikEdit : klikTambah}>                            
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <label>Nama</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Masukkan Nama Anda...."
                                    required="required"
                                    className="form-control"
                                    value={tambah.name}
                                    onChange={menambah}
                                />
                                <label>Usernama</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Masukkan Username Anda...."
                                    required="required"
                                    className="form-control"
                                    value={tambah.username}
                                    onChange={menambah}
                                />
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Masukkan Email Anda...."
                                    required="required"
                                    className="form-control"
                                    value={tambah.email}
                                    onChange={menambah}
                                />
                                <label>Website</label>
                                <input
                                    name="website"
                                    type="text"
                                    placeholder="Masukkan Website Anda...."
                                    required="required"
                                    className="form-control"
                                    value={tambah.website}
                                    onChange={menambah}
                                />
                                <label>No Handphone</label>
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="Masukkan No Handphone Anda...."
                                    required="required"
                                    className="form-control"
                                    value={tambah.phone}
                                    onChange={menambah}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button 
                                variant="secondary" 
                                onClick={handleClose}>
                                <FontAwesomeIcon icon={faReply}/>
                            </Button>
                            <Button 
                                type="submit"
                                onClick={handleClose}
                                variant="primary">
                                <FontAwesomeIcon icon={faUserPlus}/>
                            </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th>No Handphone</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reverse(user).map((users, index) => {
                                    return(
                                        <tr>
                                            <td>{users.name}</td>
                                            <td>{users.username}</td>
                                            <td>{users.email}</td>
                                            <td>{users.website}</td>
                                            <td>{users.phone}</td>
                                            <td className="text-center">
                                                <Button 
                                                    variant="warning"
                                                    onClick={() => editData(users.id)}
                                                    className="text-white"><FontAwesomeIcon icon={faUserEdit}/>
                                                </Button>
                                                <Button 
                                                    onClick={() => deleteMasuk(users.id)}
                                                    variant="danger"><FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Card>

            <Modal
                show={hapusShow}
                onHide={deleteKeluar}
                keyboard={false}>

                <Modal.Body>
                    <p>Yakin ingin menghapus Nama Ini?</p>                         
                    <Button 
                        style={{float:'right'}}
                        variant="outline-danger"
                        onClick={() => hapus(indexHapus)}>
                        Hapus
                    </Button>
                    <Button 
                        variant="outline-secondary"
                        style={{float:'right', marginRight:'10px'}} 
                        onClick={deleteKeluar}>
                        Batal
                    </Button>
                </Modal.Body>
            </Modal>

        </div>
    )
}
export default ListUser