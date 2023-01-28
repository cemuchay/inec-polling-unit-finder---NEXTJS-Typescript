import Data from "helpers/responseFormat";
import type { NextApiRequest, NextApiResponse } from "next";
import electionTT from "public/electionTT.json";

/**
 * @swagger
 * /api/states:
 *   get:
 *     description: Get all states in Nigeria
 *     responses:
 *       200:
 *         description: Success
 */

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   if (req.method === "GET") {
      try {
   
         // fetch date in lagos from worldtimeapi
         const response = await fetch(
            "https://www.worldtimeapi.org/api/timezone/Africa/Lagos"
         );

         const currentDate = await response.json();

         const countDownDate = new Date(electionTT.PresidentialAndNA.date).getTime();

         res.status(200).json({
            data: {
               countDownDate,
               currentDate: new Date(currentDate.utc_datetime).getTime(),
               presidentialDate: electionTT.PresidentialAndNA.date,
               governorshipDate: electionTT.GovernorshipAndSA.date,
            },
            success: true,
            message: "Dates Successfully Fetched",
         });
      } catch (error: any) {
         res.status(500).json({
            data: null,
            success: false,
            message: "Dates Could not be Fetched, Please try Again",
         });
      }
   }
}
