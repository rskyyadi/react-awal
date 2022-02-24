import React, { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { multistepContext } from './StepContex';

export default function StepTiga() {

    const { setStep, userData, setUserData, submitData } = useContext(multistepContext)

    return (
    <div>
        <div>
            <TextField 
                label='Provinsi' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary' 
                defaultValue={userData['provinsi']} 
                onBlur={(e) => setUserData({...userData, 'provinsi' : e.target.value})}
            />
        </div>
        <div>
            <TextField 
                label='Code' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary' 
                defaultValue={userData['code']} 
                onBlur={(e) => setUserData({...userData, 'code' : e.target.value})}
            />
        </div>
        <div>
            <Button style={{marginRight:'65px'}} variant='contained' onClick={() => setStep(2)} color='secondary'>Back</Button><span></span>
            <Button variant='contained' onClick={submitData} color='primary'>Submit</Button>
        </div>
    </div>
    )
}
