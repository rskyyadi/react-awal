import React ,{useState, useContext} from 'react';
import {Card} from 'react-bootstrap';
import StepSatu from './StepSatu';
import StepDua from './StepDua';
import StepTiga from './StepTiga';
import { Stepper, StepLabel, Step } from '@mui/material';
import {multistepContext} from './StepContex';
import DisplayData from './DisplayData';
import * as Yup from 'yup';

function App (){
  const [currentStep, setStep] = useState(1)
  const [userData, setUserData] = useState([])
  const [finalData, setFinalData] = useState([])
  const steps = ['Personal', 'Home', 'Alamat']

//STYLE
  const container = {marginTop:'-500px', width:'80%', marginLeft:'auto', marginRight:'auto'}
  const stepper_style = {width:'40%', marginLeft:'auto', marginRight:'auto', marginBottom:'20px'}
  
  function submitData() {
    setFinalData(finalData => [...finalData, userData])
    setUserData('')
    setStep(1)
  }
  const initialFormik = {
    firstName:'',
    lastname:'',
    contact:'',
    email:'',
    kota:'',
    alamat:'',
    daerah:'',
    provinsi:'',
    code:''
  }
  const onSubmitFormik = (values) => {
    console.log(values)
  }
  const validationFormik = Yup.object({
    firstName: Yup.string()
      .min(3, 'minimal 3 Karakter')
      .required('required')
  })

  const MultiFormJs = () => {
    const {currentStep, finalData} = useContext(multistepContext)

    function showStep(step) {
      switch(step) {
        case 1 :
          return <StepSatu />
        case 2 :
          return <StepDua />
        case 3 :
          return <StepTiga />
      }
    }

    return(
      <div style={container}>
        <Card className='text-center'>
          <div className='center-stepper'>
            <Stepper 
              style={stepper_style} 
              activeStep={currentStep -1} 
              orientation='horizontal'>
              {
                steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))
              }
            </Stepper>
          </div>
          {showStep(currentStep)}
        </Card>
          { finalData.length > 0 ? 
            <Card>
              <DisplayData /> 
            </Card>: '' 
          }
      </div>
    )
  }

    return (
      <div>
          <multistepContext.Provider 
            value={{currentStep, setStep, 
              userData, setUserData, 
              finalData, setFinalData, submitData, 
              initialFormik, validationFormik, onSubmitFormik
            }}>
              <MultiFormJs />
          </multistepContext.Provider>
      </div>  
  )
}
export default App