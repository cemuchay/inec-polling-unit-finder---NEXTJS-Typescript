import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SetStateAction, useEffect, useState } from 'react'
import { Form, FloatingLabel, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from 'axios'
import sampleVotersCard from '../public/samplevoterscard.jpg'

const Home: NextPage = () => {
  const [state, setState] = useState('')
  const [lga, setLga] = useState('')
  const [pucNumber, setPUCnumber] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
  })

  // LOADING 
  const [loading, setLoading] = useState(false)
  const [showLga, setShowLga] = useState(false)

  // ALERT
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('info')

  const [stateList, setStateList] = useState([])
  const [lgaList, setLgaList] = useState([])

  useEffect(() => {

    setLoading(true)

    axios.get('/api/states').then(res => {
      setStateList(res.data.data)
      setLoading(false)
    }

    ).catch(err => {
      console.log(err)
      setLoading(false)
    }
    )
  }
    , [])

  // function to clear lga list
  const clearLgaList = () => {
    setAlert(false)
    setLga('')
    setLgaList([])
    setPUCnumber({
      first: '',
      second: '',
      third: '',
      fourth: '',
    })
  }

  // whenever state changes clear lga
  useEffect(() => {
    clearLgaList()
  }
    , [state])

  // whenever lga changes clear puc number
  useEffect(() => {
    setAlert(false)
    setPUCnumber({
      first: '',
      second: '',
      third: '',
      fourth: '',
    })
  }
    , [lga])



  // whenever state changes fetch lga
  useEffect(() => {
    if (stateList.findIndex(item => item === state) >= 0) {
      setLoading(true)
      setShowLga(true)
      axios.post('/api/lgas', {
        index: stateList.findIndex(item => item === state)
      }
      ).then(res => {
        setLgaList(res.data.data)
        setLoading(false)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      }
      )
    }
  }, [state, stateList])

  const findPoolingUnit = async (event: { preventDefault: () => void }) => {

    // prevent form from submitting
    event.preventDefault()

    // set loading to true
    setLoading(true)
    setAlert(false)
    setAlertMessage('')
    setAlertType('info')



    // check if puc number is valid
    if (pucNumber.first.length !== 2 || pucNumber.second.length !== 2 || pucNumber.third.length !== 2 || pucNumber.fourth.length !== 3 || pucNumber.first.match(/[^0-9]/g) || pucNumber.second.match(/[^0-9]/g) || pucNumber.third.match(/[^0-9]/g) || pucNumber.fourth.match(/[^0-9]/g)) {
      setAlert(true)
      setAlertMessage('Invalid PU Number')
      setAlertType('danger')
      setLoading(false)
      return;
    }

    axios.post('/api/findbypu', {
      indexState: stateList.findIndex(item => item === state),
      indexLga: lgaList.findIndex(item => item === lga),
      pucNumber: `${pucNumber.first}/${pucNumber.second}/${pucNumber.third}/${pucNumber.fourth}`

    }
    ).then(res => {
      setLoading(false)
      let response = res.data
      if (response.success) {
        setAlert(true)
        setAlertMessage(response.message)
      }
      else {
        setAlert(true)
        setAlertType('danger')
        setAlertMessage(response.message)
      }
    }

    ).catch(err => {
      setLoading(false)
      console.log(err.message)
    }
    )
  }

  // make sure pu numbers are not more than 2 digits
  // const handlePUCnumberChange = (event: { target: { name: string; value: string; }; }) => {
  //   if (event.target.value.length > 2) {
  //     event.target.value = event.target.value.slice(0, 2)
  //   }
  //   setPUCnumber({
  //     ...pucNumber,
  //     [event.target.name]: event.target.value
  //   })
  // }


  return (
    <div className={styles.container}>
      <Head>
        <title>INEC Polling Unit Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <main className={styles.main}>
          <h3 className='h1 text-center mt-5'>
            INEC Polling Unit Finder
          </h3>

          <p className='text-center h6 text-muted' >
            Requirement: Your Polling Unit (PU) Number in your voter&apos;s card
          </p>

          <hr />

          <Form onSubmit={findPoolingUnit}>
            <Row className='justify-content-center mt-3'>
              <Form.Group className="mt-3 mb-3">

                <Row className='justify-content-center'>
                  <Col xs={12} md={4}>
                    <FloatingLabel className=" pb-3" controlId="selectstate" label="State">
                      <Form.Select aria-label="Select State" onChange={
                        (e: { target: { value: SetStateAction<string> } }) => setState(e.target.value)
                      } value={state} required>
                        <option value=''>Choose State</option>
                        {stateList.map((state, index) => <option key={index} value={state}>{state}</option>)}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                </Row>
                {
                  showLga ?
                    <Row className='mt-3 justify-content-md-center'>
                      <Col xs={12} md={4}>
                        <FloatingLabel className="pb-3" controlId="selectLGA" label="State">
                          <Form.Select aria-label="Select LGA" onChange={
                            (e: { target: { value: SetStateAction<string> } }) => setLga(e.target.value)
                          } value={lga} required>
                            <option value=''>Choose LGA</option>
                            {
                              state ? lgaList.map((lga, index) => <option key={index} value={lga}>{lga}</option>) : null
                            }
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                    </Row>
                    : null
                }
                {
                  lga ?
                    <Row className='mt-3 justify-content-md-center'>
                      <Col className={styles.pucInput} xs={12} md={4}>
                        <div>
                          <Image src={sampleVotersCard} alt="puc number" className={styles.pucNumberImg} />

                          <p className='h6' >
                            Enter your PU number below
                          </p>
                          <input type="text" maxLength={2} placeholder='04'
                            onChange={
                              (e: { target: { value: string } }) => setPUCnumber({
                                ...pucNumber,
                                first: e.target.value,
                              })
                            } value={pucNumber.first} required />  {' / '}
                          <input type="text" maxLength={2} placeholder='07'
                            onChange={
                              (e: { target: { value: string } }) => setPUCnumber({
                                ...pucNumber,
                                second: e.target.value,
                              })
                            } value={pucNumber.second} required />  {' / '}
                          <input type="text" maxLength={2} placeholder='02' onChange={(e: { target: { value: string } }) => setPUCnumber({
                            ...pucNumber, third: e.target.value,
                          })
                          } value={pucNumber.third} required /> {' / '}
                          <input type="text" maxLength={3} placeholder='001' onChange={(e: { target: { value: string } }) => setPUCnumber({
                            ...pucNumber, fourth: e.target.value,
                          })} value={pucNumber.fourth} required />
                        </div>
                      </Col>
                    </Row>
                    : null
                }


                {
                  lga ?
                    <Row className='mt-3 justify-content-center'>
                      <Col xs={12} md={4}>
                        <Button className='w-100 text-center' type="submit" variant="primary" >
                          Find Polling Unit
                        </Button>
                      </Col>
                    </Row>
                    : null
                }

                <Row className='mt-3 justify-content-center'>
                  <Col xs={12} md={4}>
                    <Alert variant={alertType} show={alert} onClose={() => setAlert(false)} dismissible>
                      {alertMessage}
                    </Alert>
                  </Col>
                </Row>

                {
                  loading ? <Row className='mt-3 justify-content-center'>
                    <Col className='text-center' xs={12} md={4}>
                      <Spinner animation="border" variant="primary"
                      />
                    </Col>
                  </Row> : null
                }

              </Form.Group>
            </Row>
          </Form>

          <hr />

        </ main>
      </Container >

    </div >

  )
}

export default Home
