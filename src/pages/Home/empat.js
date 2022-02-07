import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, Card, Table, Modal } from 'react-bootstrap'
import { faTrash, faCheck, faUserPlus, faPlus, faSearch, faReply, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {nanoid} from 'nanoid';
import swal from 'sweetalert';
import { Eclipse } from "react-loading-io";


//Children - mewakili semua child component dari component PageLayout

//DOM berkaitan dengan halaman web (HTML atau XML), dan BOM berkaitan dengan browser
//DOM ada di dalam window object, dimana window object adalah bagian dari BOM

//onclick (user click sebuah element HTML)
//onchange (element HTML mengalami perubahan)
//onload (browser telah selesai load halaman web)
//Event-event di atas bukan bagian dari JavaScript namun merupakan bagian dari HTML DOM API.

//find() - Menampilkan item pertama dari hasil pencarian sesuai dengan kriteria yang sudah ditentukan di dalam sebuah function
//filter() - Menampilkan hasil pencarian sesuai dengan kriteria yang sudah ditentukan di dalam sebuah function. Hasil pencarian disimpan dalam array baru.
//push(item) Menambah data/item dan diletakan di akhir array.
//unshift(...items) Menambah item dan diletakan di awal array kemudian menggeser index item yang lain (dari index 0 ke 1, 1 ke 2 dst).
//pop() Menghapus item terakhir dari array.
//shift() Menghapus item awal dari array kemudian menggeser index item yang lain (dari index 1 ke 0, 2 ke 1 dst).
//splice(pos, deleteCount, ...items) Kita dapat menyisipkan, menghapus dan mengubah item array menggunakan splice.
//slice(start, end) Sama dengan string.slice namun hasilnya adalah array baru.
//forEach(function) Memodifikasi array dengan cara mengeksekusi sebuah function untuk setiap item array.
//map(function) Memodifikasi array dengan cara mengeksekusi sebuah function untuk setiap item array dimana array hasil modifikasinya adalah sebuah array baru.

//getDate() Menampilkan tanggal.
//getMonth() Menampilkan bulan.
//getFullYear() Menampilkan tahun.
//getHours(), getMinutes(), getSeconds(), getMilliseconds() Menampilkan jam, menit, detik dan milidetik.

//Array Method adalah function yang ada pada array yang dapat digunakan untuk memanipulasi array

//Jenis-Jenis Axios :
    //Create -> Post
    //Read   -> Get
    //Update -> Put
    //Delete -> Delete

function App(props) {
    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [indexHapus, setIndexHapus] = useState([])
    const [loading, setLoading] = useState(false)

//Memanggil Data API

//TRY...CATCH Digunakan untuk mengurung eksekusi yang menampilkan error dan dapat membuat program tetap berjalan tanpa dihentikan
    //secara langsung. Error yang ditangani oleh try..catch biasa disebut dengan exception.

    const getUser = async () => {
        setLoading(true)
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUser(response.data)
            setLoading(false)

        } catch(e) {
            setLoading(true)
            console.log(e.message);
        }
    }

//Create Data
    const [tambah, setTambah] = useState({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:''
    })

//getAttribute() -> Mengembalikan nilai atribut pada elemen (data atribut data-color pada button ).
    //Jika atribut yang diberikan tidak ada, nilai yang dikembalikan akan menjadi null / string kosong ( jika data atrubut di dalam tag html tidak ada maka tidak akan ditampilkan ).

    const tambahKan = (event) => {
        event.preventDefault();

        const namaKu = event.target.getAttribute('name')
        const valueKu = event.target.value;

        const dataBaru = {...tambah};
        dataBaru[namaKu] = valueKu;

        setTambah(dataBaru);

    };

//event.preventDefault() - mencegah terjadinya event bawaan dari sebuah DOM ( reload )
    const tambahSubmit = (event) => {
        event.preventDefault();

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
        const baruUser = [...user, namaBaru]
        setUser(baruUser);
        setTambah({ 
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }

//Modal Create Data
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//Search Data
    const handleSearch = (e) => {
        if (e.target.value === "") {
            window.location.reload(true)
            const tempUser = user;
            setUser(tempUser)
            setUser(user)
            return
        }

//toLowerCase digunakan untuk mengubah nilai string ke nilai string yang terdiri dari huruf kecil semua
//Fungsi EndsWith menguji bagaimana satu string teks berakhir dengan yang lain.
//Fungsi StartsWith menguji bagaimana satu teks terikat bermula dengan yang lain.

        const searchResult = user.filter(users => 
            users.name.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.username.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.email.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.website.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            users.phone.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
        setUser(searchResult);
    }

//Edit Data

//find() - melakukan pencarian teks, baik satu karakter teks atau beberapa karakter teks untuk mengetahui posisi relatif teks tersebut

    const editUser = (id) => {
        const tambahin = user.find((users) => users.id === id)
        setIndexEdit(id)
        setTambah(tambahin)
        setIsEdit(true)
        handleShow(true)
    }

//map() - menerapkan fungsi yang diberikan ke setiap item / anggota iterable (list, tuple, dan lain-lain) dan mengembalikannya dalam bentuk objek map.

    const editSubmit = (e) => {
        e.preventDefault()
        const dataEdit = user.map((val) => {
            if (val.id === indexEdit) {

                swal({
                    title: "Edit Data Berhasil",
                    text: "Klik tombol untuk kembali !",
                    icon: "success",
                    button: "Kembali",
                });
                return {
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
        setIsEdit(false)
        setIndexEdit('')
        setUser(dataEdit)
        setTambah({ 
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }

//Delete Data
    const hapusUser = (id) => {
        swal({
            title: "Hapus Data Berhasil",
            text: "Klik tombol untuk kembali !",
            icon: "success",
            button: "Kembali",
          });

        const getUser = user.filter(users => users.id !==id)
        setUser(getUser);
        setIndexHapus('');
        deleteKeluar(true)
           
    }

    useEffect(() => {
        getUser();
    }, [])

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

//Css
    const fm = {width: '100%'}


    if(loading) {
       return (
        <Eclipse 
            size={64} 
            style={{marginLeft:'45%'}}
        />
       )
    }

    return(
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <Card style={{ width: '100%', paddingBottom:'15px' }}>

                            <Card.Header className="text-center"><b>FORM LIST MAHASISWA</b></Card.Header>

                            <div className="container" style={{margin:'10px', marginTop:'50px', marginBottom:'50px'}}>
                                <Button 
                                    style={{float:'right', marginRight:'14px', marginBottom:'15px'}} 
                                    variant="primary" 
                                    onClick={handleShow}>
                                    <FontAwesomeIcon style={{marginRight:'10px'}} icon={faPlus}/>
                                    Tambah Data
                                </Button>

                                <div className='input'>
                                    <FontAwesomeIcon 
                                        style={{
                                            position:'absolute',
                                            marginTop:'70px', 
                                            marginLeft:'10px',
                                            color:'rgb(179, 179, 179)'
                                        }} 
                                        icon={faSearch}
                                    />

                                    <input 
                                        style={{
                                            width:'99%', 
                                            marginLeft:'-5px', 
                                            marginRight:'0px', 
                                            marginBottom:'-35px',
                                            height: '50px',
                                            fontSize: '10pt',
                                            float: 'left',
                                            color: '#63717f',
                                            paddingLeft: '45px',
                                            borderRadius: '5px',
                                        }}
                                        className="form-control"
                                        type="text"
                                        placeholder="Ketik nama yang ingin anda cari disini..."
                                        onChange={handleSearch}
                                    />
                                </div>

                                <Modal show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}>

                                    <form onSubmit={isEdit ? editSubmit : tambahSubmit}>

                                        <Modal.Header closeButton>
                                            <Modal.Title>{isEdit ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <label>Nama</label>
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

                                            <label className='mt-2'>Username</label>
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

                                            <label className='mt-2'>Email</label>
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

                                            <label className='mt-2'>Website</label>
                                            <input 
                                                className="form-control"
                                                name="website"
                                                type="text"
                                                required="required"
                                                placeholder="Masukkan Nama Website Anda..." 
                                                style={fm} 
                                                value={tambah.website}
                                                onChange={tambahKan}
                                            />

                                            <label className='mt-2'>No Handphone</label>
                                            <input 
                                                className="form-control"
                                                name="phone"
                                                type="text"
                                                required="required"
                                                placeholder="Masukkan Nomor Handphone Anda..." 
                                                style={fm} 
                                                value={tambah.phone}
                                                onChange={tambahKan}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button 
                                                variant="secondary" 
                                                onClick={handleClose}>
                                                <FontAwesomeIcon icon={faReply}/>
                                            </Button>
                                            <Button 
                                                onClick={handleClose}
                                                type="submit" 
                                                className="text-white" 
                                                variant={isEdit ?"primary" : "primary"}>
                                                <FontAwesomeIcon icon={isEdit ? faCheck : faUserPlus} />
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>

                            <Table 
                                bordered hover 
                                className="table" 
                                style={{width:'95%', marginLeft:'auto', marginRight:'auto'}}>
                                    
                                <thead className="text-center" style={{color:'rgb(67, 67, 67)'}}>
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
                                                <tr key={index}>
                                                    <td style={{paddingTop:'14px', paddingLeft:'15px'}}>{users.name}</td>
                                                    <td style={{paddingTop:'14px', paddingLeft:'15px'}}>{users.username}</td>
                                                    <td style={{paddingTop:'14px', paddingLeft:'15px'}}>{users.email}</td>
                                                    <td style={{paddingTop:'14px', paddingLeft:'15px'}}>{users.website}</td>
                                                    <td style={{paddingTop:'14px', paddingLeft:'15px'}}>{users.phone}</td>
                                                    <td style={{textAlign:'center'}}>                                                    
                                                        <Button
                                                            onClick={() => editUser(users.id)} 
                                                            className="text-white" 
                                                            title="Edit"
                                                            variant="warning">
                                                            <FontAwesomeIcon icon={faUserEdit} />
                                                        </Button>
                                                        <Button 
                                                            style={{marginLeft: '10px'}} 
                                                            title="Hapus"
                                                            onClick={() => deleteMasuk(users.id)}
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
                    
                        <Modal
                            show={hapusShow}
                            onHide={deleteKeluar}
                            keyboard={false}>

                            <Modal.Body>
                                <p>Yakin ingin menghapus Nama Ini?</p>                         
                                <Button 
                                    style={{float:'right'}}
                                    variant="outline-danger"
                                    onClick={() => hapusUser(indexHapus)}>
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
                </div>
            </div>        
    )
}

export default App