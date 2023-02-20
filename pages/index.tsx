import type { NextPage } from "next";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { SetStateAction, useEffect, useState, useMemo } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import sampleVotersCard from "public/samplevoterscard.jpg";
import HeadComponent from "components/HeadComponent/HeadComponent";
import findIndex from "helpers/findIndex";
import CountDown from "components/CountDown/CountDown";
import FormSelect from "components/Form/Select/Select";

import dynamic from "next/dynamic";
import Loading from "components/Loading";
import Footer from "components/Footer";
import ViewOnMap from "components/ViewOnMap";
import getRequest from "helpers/getRequest";
import Share from "components/ShareButton";

const DynamicModal = dynamic(() => import("components/Modal/Modal"), {
   ssr: false,
});

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

   // FETCH STATES ON PAGE LOAD

   const fetchStates = async () => {
      setLoading(true);

      axios
         .get("/api/states")
         .then((res) => {
            setStateList(res.data.data);
            setLoading(false);
         })
         .catch((err) => {
            setAlert(true);
            setAlertType("danger");
            setAlertMessage(err);
         });
   };

   useEffect(() => {
      fetchStates();
   }, []);

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
      /*
1. The findIndex() function takes in the stateList and the selected state as parameters and
returns the index of a state in stateList.
2. The if statement checks if the index is greater than or equal to 0 to avoid errors.
3. The setLoading() function sets the loading state to true.
4. The setShowLga() function sets the showLga state to true.
5. The axios call gets the list of LGAs from the server and sets the lgaList state to the response data. */
      const stateIndex = findIndex(stateList, state);
      if (stateIndex >= 0) {
         setLoading(true);
         setShowLga(true);
         axios
            .get(`/api/lgas/${stateIndex}`)
            .then((res) => {
               const response = res.data;
               setLgaList(response.data);
               setLoading(false);
            })
            .catch((err) => {
               setAlert(true);
               setAlertType("danger");
               setAlertMessage(err);
            });
      }
   }, [state, stateList]);

   // whenever lga changes fetch ward
   useEffect(() => {
      if (
         lgaList.findIndex((item) => item === lga) >= 0 &&
         stateList.length > 0
      ) {
         setLoading(true);
         setShowWard(true);
         axios
            .post("/api/wards", {
               indexState: findIndex(stateList, state),
               indexLga: findIndex(lgaList, lga),
            })
            .then((res) => {
               setWardList(res.data.data);
               setLoading(false);
            })
            .catch((err) => {
               setAlert(true);
               setAlertType("danger");
               setAlertMessage(err);
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
            indexState: findIndex(stateList, state),
            indexLga: findIndex(lgaList, lga),
            indexWard: findIndex(wardList, ward),
            pucNumber: `/${puNumber}`,
         })
         .then((res) => {
            setLoading(false);
            let response = res.data;
            if (response.success) {
               setAlert(true);
               setAlertMessage(response.message);
               setShowSearch(true);
               setSearch(response.data.unitQuery);
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
      setLga("");
      setWard("");
      setShowLga(false);
   };

   const title = "INEC Polling Unit Finder";

   return (
      <>
         <HeadComponent
            data={{
               title: `${title}`,
               link: "https://inec-polling-unit-finder.vercel.app/",
               description: `${title} is a web app that helps you find your polling unit in Nigeria`,
            }}
         />

         <main>
            <Container className="mb-5">
               <h3 className="h1 text-center mt-5">INEC Polling Unit Finder</h3>

               <Share />

               <CountDown />

               <DynamicModal />

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
                              <FormSelect
                                 label="State"
                                 value={state}
                                 stateChanger={setState}
                                 controlid="selectstate"
                                 datatestid="stateSelect"
                                 list={stateList}
                              />

                              {showLga ? (
                                 <FormSelect
                                    label="LGA"
                                    value={lga}
                                    stateChanger={setLga}
                                    controlid="selectLGA"
                                    datatestid="LgaSelect"
                                    list={lgaList}
                                 />
                              ) : null}

                              {lga ? (
                                 <FormSelect
                                    label="Ward"
                                    value={ward}
                                    stateChanger={setWard}
                                    controlid="selectWard"
                                    datatestid="wardSelect"
                                    list={wardList}
                                 />
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
                                    if (search) newSearch();
                                 }}
                                 dismissible
                              >
                                 {alertMessage}
                              </Alert>
                           </Col>
                        </Row>

                        {showSearch && ward ? (
                           <ViewOnMap searchQuery={search} />
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

                        {loading ? <Loading /> : null}
                     </Form.Group>
                  </Row>
               </Form>

               <hr />

               <Footer />
            </Container>
         </main>
      </>
   );
};

export default Home;
