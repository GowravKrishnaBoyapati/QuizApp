import React from 'react'
import './EditQuiz.css'
import { Button } from 'reactstrap'
import { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
function EditQuiz() {
    const [qCount,setQcount] = useState(1)
    const [indexer, setIndexer] = useState(0)
    const [value,setValue] = useState(0)
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='edit-quiz-main'>
            <div className="questions-edit-quiz q-no">
                Questions:
                <ul>
                    {[...Array(qCount)].map((x, i) =>
                        <li className={'option '} ><p>{i + 1}</p></li>
                    )}
                </ul>
                <Button className='add-q' onClick={()=>setQcount(qCount+1)} disabled={qCount>9?true:false} >Add a question</Button>
            </div>
            <div className='q-cont faculty-quiz-add' >
                {(indexer < 9) ? (
                    <>
                        <div className='question' >
                            Question - {indexer + 1}
                            <h2>QUestion: { indexer }</h2>
                        </div>
                        <div className='options'>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={value}
                                onChange={handleRadioChange}
                                style={{ width: '100%', marginLeft: '100px' }}
                            >
                                <FormControlLabel value='a' control={<Radio />} label='Apple' />
                                {/* {options?.map((i) =>
                                    <FormControlLabel value={i} control={<Radio />} label={i} />
                                )} */}

                            </RadioGroup>
                        </div>
                        {value == '' ? (<button className='' disabled >Next Question ▶  </button>) :
                            (<button className='' >Next Question ▶  </button>)}
                    </>
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
                        You have reached the end of Quiz!!<br></br>
                        Your score for this Quiz: 
                    </div>
                )}


            </div>
        </div>
    )
}

export default EditQuiz