import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

//pageSize x pageCount - pageSize + idndex - 1

function Select(){
    const [data, setData] = useState([])
//GET DATA
    const getData = async () => {
        try{
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setData(response.data)
        }catch(e){
            console.log(e.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return(
        <div className='container'>
            <Card> 
                <Table bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((datas, index) => {
                                return(
                                    <tr key={datas.id}>
                                        <td>{index + 1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.gender}</td>
                                        <td>{datas.alamat}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}
export default Select;