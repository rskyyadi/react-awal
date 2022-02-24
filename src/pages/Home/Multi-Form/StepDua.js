import React, { useContext } from 'react'
import { Button, TextField } from '@mui/material';
import { multistepContext } from './StepContex';

export default function StepDua() {

    const { setStep, userData, setUserData } = useContext(multistepContext)

    return (
    <div>
            <div>
            <TextField 
                label='Kota' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='secondary' 
                defaultValue={userData['kota']} 
                onBlur={(e) => setUserData({...userData, 'kota' : e.target.value})}
            />
        </div>
        <div>
            <TextField 
                label='Alamat' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary' 
                defaultValue={userData['alamat']} 
                onBlur={(e) => setUserData({...userData, 'alamat' : e.target.value})}
            />
        </div>
        <div>
            <TextField 
                label='Daerah' 
                size='small'
                margin='normal' 
                variant='outlined' 
                color='primary' 
                defaultValue={userData['daerah']} 
                onBlur={(e) => setUserData({...userData, 'daerah' : e.target.value})}
            />
        </div>
        <div>
            <Button style={{marginRight:'80px'}} variant='contained' onClick={() => setStep(1)} color='secondary'>Back</Button><span></span>
            <Button variant='contained' onClick={() => setStep(3)} color='primary'>Next</Button>
        </div>
    </div>
    )
    }
