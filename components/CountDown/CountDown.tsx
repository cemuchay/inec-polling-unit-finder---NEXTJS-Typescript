import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import styles from "./countDown.module.css";
import electionTT from "public/electionTT.json";

export default function CountDown() {
   const [days, setDays] = useState(Number);
   const [hours, setHours] = useState(Number);
   const [minutes, setMinutes] = useState(Number);
   const [seconds, setSeconds] = useState(Number);
   const [timer, setTimer] = useState(true);

   // Set the date we're counting down to
   const countDownDate = new Date(electionTT.PresidentialAndNA.date).getTime();

   // Update the count down every 1 second
   const calcTimer = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
         Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      //   If the count down is finished, hide timer
      if (distance < 0) {
         clearInterval(calcTimer);
         setTimer(false);
      }
   }, 1000);

   return (
      <>
         {timer ? (
            <Row className="justify-content-center mb-2">
                <hr />
               <span className="h4 text-center">
                  Presidential Election Countdown
               </span>
               <h3 className={`mb-2 ${styles.timer}`}>
                  {`${days}d ${hours}h ${minutes}m ${seconds}s`}
               </h3>
               <hr />
            </Row>
         ) : null}
      </>
   );
}
