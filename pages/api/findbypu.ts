import allnigeria from "public/allnigeria.json";
import type { NextApiRequest, NextApiResponse } from "next";
import Data from "helpers/responseFormat";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   if (req.method === "POST") {
      try {
         const body: any = req.body;

         let unit: string = "";
         let ward: string = "";

         const wards = Object.values(allnigeria)[body.indexState].lgas[
            body.indexLga
         ].wards.map((ward: { name: any }) => ward.name);

         for (let i = 0; i < wards.length; i++) {
            const units = Object.values(allnigeria)[body.indexState].lgas[
               body.indexLga
            ].wards[i].units.map((units: { name: any }) => units.name);
            for (let j = 0; j < units.length; j++) {
               if (units[j].includes(body.pucNumber)) {
                  unit = units[j];
                  ward = wards[i];
               }
            }
         }

         if (unit && ward) {
            return res.status(200).json({
               message: `Your PU number is ${body.pucNumber} and it belongs to ${unit} unit in ${ward} ward`,
               success: true,
               data: null,
            });
         } else {
            return res.status(200).json({
               message: "Invalid PU Number for selected state and lga",
               success: false,
               data: null,
            });
         }
      } catch (error: any) {
         const message = "something went wrong, please try again";
         res.status(500).json({
            message: message,
            success: false,
            data: null,
         });
      }
   }
}
