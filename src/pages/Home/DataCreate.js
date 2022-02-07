import {useState} from "react";
import {Button} from 'react-bootstrap'

function dataCreate(props){
    const [getInput, setInput]= useState('')

    function inputnya(event){
        setInput(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()

        const dataBaru={
            id: Math.floor(Math.random()* 100) +1,
            title: getInput
        }
        props.onCreateData(dataBaru)

        setInput('')
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={getInput} onChange={inputnya}/>
            <Button className="p-1 mb-3 mt-3" variant="primary" type="submit">Kirim</Button>
        </form>
    )
}

export default RskyyCreate