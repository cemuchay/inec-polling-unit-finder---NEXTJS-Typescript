import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import {
   Form,
   FloatingLabel,
   Button,
   Alert,
   Container,
   Row,
   Col,
   Spinner,
} from "react-bootstrap";
import axios from "axios";
import sampleVotersCard from "../public/samplevoterscard.jpg";

const Home: NextPage = () => {
   const [state, setState] = useState("");
   const [lga, setLga] = useState("");
   const [ward, setWard] = useState("");
   const [puNumber, setPUnumber] = useState("");
   const [findPU, setFindPU] = useState(true);

   // LOADING
   const [loading, setLoading] = useState(false);
   const [showLga, setShowLga] = useState(false);
   const [showWard, setShowWard] = useState(false);

   // ALERT
   const [alert, setAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState("");
   const [alertType, setAlertType] = useState("info");

   const [stateList, setStateList] = useState([]);
   const [lgaList, setLgaList] = useState([]);
   const [wardList, setWardList] = useState([]);

   // Search on google map
   const [search, setSearch] = useState("");
   const [showSearch, setShowSearch] = useState(false);

   const handleAxiosResponse = (res: any, state: any) => {
      const response = res.data;
      if (response.success) {
         if (state === "state") {
            setStateList(response.data);
         } else if (state === "lga") {
            setLgaList(response.data);
         } else if (state === "ward") {
            setWardList(response.data);
         }
         setLoading(false);
      } else {
         setAlert(true);
         setAlertMessage(response.message);
         setAlertType("danger");
         setLoading(false);
      }
   };

   // FETCH STATES ON PAGE LOAD

   const fetchStates = useCallback(async () => {
      setLoading(true);

      axios
         .get("/api/states")
         .then((res) => {
            handleAxiosResponse(res, "state");
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      fetchStates();
   }, [fetchStates]);

   // function to clear lga list
   const clearLgaList = () => {
      setAlert(false);
      setLga("");
      setWard("");
      setLgaList([]);
      setWardList([]);
      setPUnumber("");
      setShowSearch(false);
   };

   // whenever state changes clear lga
   useEffect(() => {
      clearLgaList();
   }, [state]);

   // whenever lga changes clear puc number
   useEffect(() => {
      setAlert(false);
      setPUnumber("");
   }, [lga]);

   // whenever state changes fetch lga
   useEffect(() => {
      if (stateList.findIndex((item) => item === state) >= 0) {
         setLoading(true);
         setShowLga(true);
         axios
            .post("/api/lgas", {
               index: stateList.findIndex((item) => item === state),
            })
            .then((res) => {
                handleAxiosResponse(res, "lga");
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [state, stateList]);

   // whenever lga changes fetch ward
   useEffect(() => {
      if (lgaList.findIndex((item) => item === lga) >= 0) {
         setLoading(true);
         setShowWard(true);
         axios
            .post("/api/wards", {
               indexState: stateList.findIndex((item) => item === state),
               indexLga: lgaList.findIndex((item) => item === lga),
            })
            .then((res) => {
                handleAxiosResponse(res, "ward");
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [lga, lgaList, state, stateList]);

   // WHENEVER WARD CHANGES HIDE ALERT MESSAGE AND HIDE SHOW SEARCH
   useEffect(() => {
      setAlert(false);
      setShowSearch(false);
   }, [ward]);
   //

   const findPoolingUnit = async (event: { preventDefault: () => void }) => {
      // PREVENTS FORM FROM SUBMITING
      event.preventDefault();

      // set loading to true
      setLoading(true);
      setAlert(false);
      setAlertMessage("");
      setAlertType("info");

      // check if puc number is valid
      if (puNumber.length !== 3 || puNumber.match(/[^0-9]/g)) {
         setAlert(true);
         setAlertMessage("Invalid PU Number");
         setAlertType("danger");
         setLoading(false);
         return;
      }

      axios
         .post("/api/findunit", {
            indexState: stateList.findIndex((item) => item === state),
            indexLga: lgaList.findIndex((item) => item === lga),
            indexWard: wardList.findIndex((item) => item === ward),
            pucNumber: `/${puNumber}`,
         })
         .then((res) => {
            setLoading(false);
            let response = res.data;
            if (response.success) {
               setAlert(true);
               setAlertMessage(response.message);
               setShowSearch(true);
               setSearch(response.unitQuery);
               setFindPU(false);
            } else {
               setAlert(true);
               setAlertType("danger");
               setAlertMessage(response.message);
            }
         })
         .catch((err) => {
            setLoading(false);
            // display error message in alert
            setAlert(true);
            setAlertMessage(err.response.data.message);
            setAlertType("danger");
            setLoading(false);
         });
   };

   const newSearch = () => {
      setFindPU(true);
      setState("");
      fetchStates();
      setShowLga(false);
   };

   return (
      <>
         <Head>
            <title>INEC Polling Unit Finder</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main>
            <Container className="mb-5">
               <h3 className="h1 text-center mt-5">INEC Polling Unit Finder</h3>

               <p className="text-center h6 text-muted">
                  Requirement: Your Polling Unit (PU) Number in your
                  voter&apos;s card (last 3 digits)
               </p>

               <hr />

               <Form onSubmit={findPoolingUnit}>
                  <Row className="justify-content-center mt-3">
                     <Form.Group className="mt-3">
                        {findPU ? (
                           <>
                              <Row className="justify-content-center">
                                 <Col xs={12} md={4}>
                                    <FloatingLabel
                                       className=" pb-3"
                                       controlId="selectstate"
                                       label="State"
                                    >
                                       <Form.Select
                                          aria-label="Select State"
                                          onChange={(e: {
                                             target: {
                                                value: SetStateAction<string>;
                                             };
                                          }) => setState(e.target.value)}
                                          value={state}
                                          required
                                       >
                                          <option value="">Choose State</option>
                                          {stateList.map((state, index) => (
                                             <option key={index} value={state}>
                                                {state}
                                             </option>
                                          ))}
                                       </Form.Select>
                                    </FloatingLabel>
                                 </Col>
                              </Row>
                              {showLga ? (
                                 <Row className="mt-3 justify-content-md-center">
                                    <Col xs={12} md={4}>
                                       <FloatingLabel
                                          className="pb-3"
                                          controlId="selectLGA"
                                          label="LGA"
                                       >
                                          <Form.Select
                                             aria-label="Select LGA"
                                             onChange={(e: {
                                                target: {
                                                   value: SetStateAction<string>;
                                                };
                                             }) => setLga(e.target.value)}
                                             value={lga}
                                             required
                                          >
                                             <option value="">
                                                Choose LGA
                                             </option>
                                             {state
                                                ? lgaList.map((lga, index) => (
                                                     <option
                                                        key={index}
                                                        value={lga}
                                                     >
                                                        {lga}
                                                     </option>
                                                  ))
                                                : null}
                                          </Form.Select>
                                       </FloatingLabel>
                                    </Col>
                                 </Row>
                              ) : null}

                              {lga ? (
                                 <Row className="mt-3 justify-content-md-center">
                                    <Col xs={12} md={4}>
                                       <FloatingLabel
                                          className="pb-3"
                                          controlId="selectWard"
                                          label="Ward"
                                       >
                                          <Form.Select
                                             aria-label="Select Ward"
                                             onChange={(e: {
                                                target: {
                                                   value: SetStateAction<string>;
                                                };
                                             }) => setWard(e.target.value)}
                                             value={ward}
                                             required
                                          >
                                             <option value="">
                                                Choose Ward
                                             </option>
                                             {lga
                                                ? wardList.map(
                                                     (ward, index) => (
                                                        <option
                                                           key={index}
                                                           value={ward}
                                                        >
                                                           {ward}
                                                        </option>
                                                     )
                                                  )
                                                : null}
                                          </Form.Select>
                                       </FloatingLabel>
                                    </Col>
                                 </Row>
                              ) : null}

                              {ward ? (
                                 <Row className="mt-3 text-center justify-content-md-center">
                                    <Col
                                       className={styles.pucInput}
                                       xs={12}
                                       md={4}
                                    >
                                       <div>
                                          <Image
                                             src={sampleVotersCard}
                                             alt="puc number"
                                             className={styles.pucNumberImg}
                                          />

                                          <p className="h6 text-bold">
                                             Enter Only the last 3 digits of
                                             your Code Number
                                          </p>

                                          <p className="h6 text-muted">
                                             We do not store any of your data
                                          </p>

                                          <input
                                             style={{
                                                marginRight: "auto",
                                                marginLeft: "auto",
                                             }}
                                             type="text"
                                             className="form-control w-50 text-center"
                                             id="pucNumber"
                                             name="pucNumber"
                                             placeholder="PU Number"
                                             value={puNumber}
                                             onChange={(e: {
                                                target: {
                                                   value: SetStateAction<string>;
                                                };
                                             }) => setPUnumber(e.target.value)}
                                             required
                                          />
                                       </div>
                                    </Col>
                                 </Row>
                              ) : null}

                              {ward ? (
                                 <Row className="mt-3 justify-content-center">
                                    <Col xs={12} md={4}>
                                       <Button
                                          className="w-100 text-center"
                                          type="submit"
                                          variant="primary"
                                       >
                                          Find Polling Unit
                                       </Button>
                                    </Col>
                                 </Row>
                              ) : null}
                           </>
                        ) : null}

                        <Row className="mt-3 justify-content-center">
                           <Col xs={12} md={4}>
                              <Alert
                                 variant={alertType}
                                 show={alert}
                                 onClose={() => {
                                    setAlert(false);
                                    newSearch();
                                 }}
                                 dismissible
                              >
                                 {alertMessage}
                              </Alert>
                           </Col>
                        </Row>

                        {showSearch && ward ? (
                           <Row className="mt-3 justify-content-center">
                              <Col xs={12} md={4}>
                                 <Button
                                    className="w-100 text-center"
                                    onClick={() =>
                                       window.open(
                                          `https://www.google.com/maps/search/?api=1&query=${search}`,
                                          "_blank"
                                       )
                                    }
                                    variant="primary"
                                 >
                                    See pooling unit on Google Maps
                                 </Button>
                              </Col>
                           </Row>
                        ) : null}

                        {findPU ? null : (
                           <>
                              <Row className="mt-3 justify-content-center">
                                 <Col xs={12} md={4}>
                                    <Button
                                       className="w-100 text-center"
                                       onClick={() => newSearch()}
                                       variant="primary"
                                    >
                                       New Pooling Unit Search
                                    </Button>
                                 </Col>
                              </Row>
                           </>
                        )}

                        {loading ? (
                           <Row className="mt-3 justify-content-center">
                              <Col className="text-center" xs={12} md={4}>
                                 <Spinner
                                    animation="border"
                                    variant="primary"
                                 />
                              </Col>
                           </Row>
                        ) : null}
                     </Form.Group>
                  </Row>
               </Form>

               <hr />

               <footer className={styles.footer}>
                  <a className={styles.footerLink} href="https://rad5.com.ng/">
                     {" "}
                     RAD5 TECH HUB © 2022{" "}
                  </a>
               </footer>
            </Container>
         </main>
      </>
   );
};

export default Home;
