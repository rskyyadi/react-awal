import {Form, Button, Card, Col} from 'react-bootstrap'
import { useState } from 'react';
import Det from './DataList'
import Dot from './DataCreate'

const Home = () => {

//Data
    const [getdata, setdata] = useState([
        {id: 1, title: 'Muhammad'},
    ])

    const dataKu = (dat) => {
    setdata(getdata.concat(dat))
    }

//Create
    
    return(
    <div className="p-5">   
        <Col md={6}>   
            <Card>
                <Card.Header className="text-center">Rskyy List.</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Dot onCreateData={dataKu}/>
                                <Det dataList={getdata} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
            </Card>
        </Col>
    </div>
    )

}

export default Home