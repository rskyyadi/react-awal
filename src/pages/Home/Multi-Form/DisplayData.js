import React, { useContext } from 'react';
import {Table} from 'react-bootstrap'
import { multistepContext } from './StepContex';

export default function DisplayData() {

    const {finalData} = useContext(multistepContext)

    return (
        <div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>Daerah</th>
                        <th>Kota</th>
                        <th>Provinsi</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {finalData.map((data) => (
                        <tr key={data.email}>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.contact}</td>
                            <td>{data.email}</td>
                            <td>{data.alamat}</td>
                            <td>{data.daerah}</td>
                            <td>{data.kota}</td>
                            <td>{data.provinsi}</td>
                            <td>{data.code}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}



//https://www.youtube.com/watch?v=csYfX6u2FHo&list=PL5X0rgxaTIuM1NAhVEBYYdnBXxm37AJYw&index=4https://www.youtube.com/watch?v=csYfX6u2FHo&list=PL5X0rgxaTIuM1NAhVEBYYdnBXxm37AJYw&index=4