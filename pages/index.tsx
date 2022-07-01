import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SetStateAction, useEffect, useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import axios from 'axios'


const Home: NextPage = () => {
  const [state, setState] = useState('')
  const [lga, setLga] = useState('')
  // const [ward, setWard] = useState('')
  // const [unit, setUnit] = useState('')
  const [pucNumber, setPUCnumber] = useState('')

  const [stateList, setStateList] = useState([])
  const [lgaList, setLgaList] = useState([])
  // const [wardList, setWardList] = useState([])
  // const [unitList, setUnitList] = useState([])

  const [showWard, setShowWard] = useState(false)

  useEffect(() => {
    axios.get('/api/states').then(res => {
      setStateList(res.data.data)
    }

    ).catch(err => {
      console.log(err)
    }
    )
  }

    , [])

  // whenever the state is changed, update state index no
  // useEffect(() => {
  //   const index = stateList.findIndex(item => item === state)
  //   setStateIndex(index)
  // }
  //   , [state, stateList])

  // whenever state changes clear lga and ward
  useEffect(() => {
    setLga('')
    // setWard('')
    // setUnit('')
    setLgaList([])
    // setWardList([])
    // setUnitList([])
  }
    , [state])


  // whenever state changes fetch lga
  useEffect(() => {
    if (stateList.findIndex(item => item === state) >= 0) {
      axios.post('/api/lgas', {
        index: stateList.findIndex(item => item === state)
      }
      ).then(res => {
        setLgaList(res.data.data)
      }).catch(err => {
        console.log(err)
      }
      )
    }
  }, [state, stateList])

  // whenever lga changes fetch ward
  // useEffect(() => {
  //   if (lgaList.findIndex(item => item === lga) >= 0) {
  //     axios.post('/api/wards', {
  //       indexState: stateList.findIndex(item => item === state),
  //       indexLga: lgaList.findIndex(item => item === lga)
  //     }
  //     ).then(res => {
  //       setWardList(res.data.data)
  //     }

  //     ).catch(err => {
  //       console.log(err)
  //     }
  //     )
  //   }
  // }
  //   , [lga, lgaList, state, stateList])

  // whenever ward changes fetch units
  // useEffect(() => {
  //   if (wardList.findIndex(item => item === ward) >= 0) {
  //     axios.post('/api/units', {
  //       indexState: stateList.findIndex(item => item === state),
  //       indexLga: lgaList.findIndex(item => item === lga),
  //       indexWard: wardList.findIndex(item => item === ward)
  //     }
  //     ).then(res => {
  //       setUnitList(res.data.data)
  //     }

  //     ).catch(err => {
  //       console.log(err)
  //     }
  //     )
  //   }
  // }
  //   , [ward, wardList, lga, lgaList, state, stateList])




  // for any selected stae in staelist return its index
  const getStateIndex = (state: string) => {
    return stateList.findIndex(item => item === state)
  }

  const [yy, setyy] = useState('')

  const x = () => {

    console.log(pucNumber)

    axios.post('/api/findbypu', {
      indexState: stateList.findIndex(item => item === state),
      indexLga: lgaList.findIndex(item => item === lga),
      pucNumber: pucNumber

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

  // whenever there is a value in unit, find any 3 digists together in it
  const getUnitIndex = (unit: string) => {
    const unitIndex = unit.match(/\d{3}/g)
    if (unitIndex) {
      return unitIndex.join('')
    }
    return ''
  }





  return (
    <div className={styles.container}>
      <Head>
        <title>INEC Polling Unit Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          INEC Polling Unit Finder
        </h1>




        <>
          <Form.Group className="mb-3">
            <FloatingLabel className="pb-3" controlId="selectstate" label="State">
              <Form.Select aria-label="Select State" onChange={
                (e: { target: { value: SetStateAction<string> } }) => setState(e.target.value)
              } value={state} required>
                <option value=''>Choose State</option>
                {stateList.map((state, index) => <option key={index} value={state}>{state}</option>)}
              </Form.Select>
            </FloatingLabel>

            {
              state ? <FloatingLabel className="pb-3" controlId="selectLGA" label="State">
                <Form.Select aria-label="Select LGA" onChange={
                  (e: { target: { value: SetStateAction<string> } }) => setLga(e.target.value)
                } value={lga} required>
                  <option value=''>Choose LGA</option>
                  {
                    state ? lgaList.map((lga, index) => <option key={index} value={lga}>{lga}</option>) : null
                  }
                </Form.Select>
              </FloatingLabel> : null
            }

            <div>
              <h1>Find By PU</h1>
              {/* <input type="number" maxLength={2} placeholder='first number' onChange={(e) => { setState(e.target.value) }} />/
              <input type="number" maxLength={2} placeholder='second number' onChange={(e) => { setLga(e.target.value) }} />/
              <input type="number" maxLength={2} placeholder='third number' onChange={(e) => { setWard(e.target.value) }} /> */}
              /<input type="text" maxLength={12} placeholder='fourth number' value={pucNumber} onChange={(e) => { setPUCnumber(e.target.value) }} />
            </div>

            <button onClick={x}>
              find
            </button>




            {/* 
            {
              lga ? <FloatingLabel className="pb-3" controlId="selectWard" label="Ward">
                <Form.Select aria-label="Select Ward" onChange={
                  (e: { target: { value: SetStateAction<string> } }) => setWard(e.target.value)
                } value={ward} required>
                  <option value=''>Choose Ward</option>
                  {
                    lga ? wardList.map((ward, index) => <option key={index} value={ward}>{ward}</option>) : null
                  }
                </Form.Select>
              </FloatingLabel> : null
            } */}

            {/* {
              ward ?
                <>
                  <Button variant="primary" type="submit" onClick={() => { setShowWard(true) }}>
                    Show Ward List
                  </Button>

                  <input type="text" placeholder="Search Ward by Ward Number" onChange={(e) => {
                    setWard(e.target.value)
                  }
                  } />
                </> : null
            } */}



            {/* {
              showWard ? <FloatingLabel className="pb-3" controlId="selectUnit" label="Units">
                <Form.Select aria-label="Select Ward"
                  onChange={
                    (e: { target: { value: SetStateAction<string> } }) => setUnit(e.target.value)
                  } value={unit} required>
                  <option value=''>Units</option>
                  {
                    ward ? unitList.map((unit, index) => <option key={index} value={unit}>{unit}</option>) : null
                  }
                </Form.Select>
              </FloatingLabel> : null
            } */}

          </Form.Group>
        </>

      </ main>
    </div>

  )
}

export default Home
