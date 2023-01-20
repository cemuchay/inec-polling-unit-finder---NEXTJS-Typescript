import allnigeria from "public/allnigeria.json";
import Data from "helpers/responseFormat";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const states = Object.values(allnigeria).map((state) => state.name);

   /* Here is the explanation for the code above:
1. We are using the Object.values method to get the values of the allnigeria object which is an array of objects.
Each object represents a state in Nigeria.
2. We are using the map method to iterate through the array of objects and
pick the name property of each object which is the name of the state.
3. We are storing the returned array of state names in a variable called states which we will be using later. */

   if (req.method === "GET") {
      try {
         res.setHeader(
            "Cache-Control",
            "s-maxage=86400, stale-while-revalidate"
         );
         res.status(200).json({
            data: states,
            success: true,
            message: "States Successfully Fetched",
         });
      } catch (error: any) {
         res.status(500).json({
            data: null,
            success: false,
            message: "States Could not be Fetched, Please try Again",
         });
      }
   }
}
