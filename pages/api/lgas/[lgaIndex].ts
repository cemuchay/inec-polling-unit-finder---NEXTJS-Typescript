import allnigeria from "public/allnigeria.json";
import type { NextApiRequest, NextApiResponse } from "next";
import Data from "helpers/responseFormat";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   //get lgas for a state
   if (req.method === "GET") {
      try {
        /* Getting the lgaIndex from the query string and then converting it to a number. */
         const { lgaIndex } = req.query;

         const index = parseInt(lgaIndex as string);

       /* Getting the lgas for a state. */
         const lgas = Object.values(allnigeria)[index].lgas.map(
            (lga: { name: string }) => lga.name
         );

       /* Sending a response to the client. */
         res.status(200).json({
            data: lgas,
            success: true,
            message: "LGAs Successfully Fetched",
         });
      } catch (error) {
         const message = "Something went wrong, please try again";
         res.status(500).json({
            success: false,
            data: null,
            message,
         });
      }
   }
}
