import type { NextPage } from 'next'
import axios from 'axios'
import { SetStateAction, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const FindByPU: NextPage = () => {
    const [state, setState] = useState('')
    const [lga, setLga] = useState('')
    const [ward, setWard] = useState('')
    const [unit, setUnit] = useState('')

    const [unitList, setUnitList] = useState([])

    const x = () => {
        axios.post('/api/findbypu', {
            indexState: parseInt(state),
            indexLga: parseInt(lga),
            indexWard: parseInt(ward),
            indexUnit: parseInt(unit)
        }
        ).then(res => {
            // setUnitList(res.data.data)
            console.log(res.data.data)
        }

        ).catch(err => {
            console.log(err)
        }
        )
    }


    return (
        <>
            <div>
                <h1>Find By PU</h1>
                <input type="number" maxLength={2} placeholder='first number' onChange={(e) => { setState(e.target.value) }} />/
                <input type="number" maxLength={2} placeholder='second number' onChange={(e) => { setLga(e.target.value) }} />/
                <input type="number" maxLength={2} placeholder='third number' onChange={(e) => { setWard(e.target.value) }} />
                /<input type="number" maxLength={2} placeholder='fourth number' onChange={(e) => { setUnit(e.target.value) }} />
            </div>

            <button onClick={x}>
                find
            </button>

            {
                unitList ? <FloatingLabel className="pb-3" controlId="selectUnit" label="Units">
                    <Form.Select aria-label="Select Ward"
                        onChange={
                            (e: { target: { value: SetStateAction<string> } }) => setUnit(e.target.value)
                        } value={unit} required>
                        <option value=''>Units</option>
                        {
                            unitList ? unitList.map((unit, index) => <option key={index} value={unit}>{unit}</option>) : null
                        }
                    </Form.Select>
                </FloatingLabel> : null
            }
        </>
    )
}

export default FindByPU
