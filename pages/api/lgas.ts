import allnigeria from '../../public/allnigeria.json'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    success: boolean,
    data: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    //get lgas for a state
    if (req.method === 'POST') {
        try {
            const body = req.body

            const lgas = Object.values(allnigeria)[body.index].lgas.map((lga: { name: any }) => lga.name)

            res.status(200).json({
                data: lgas,
                success: true
            })

        } catch (error) {
            const message = 'Something went wrong, please try again'
            res.status(500).json({
                success: false,
                data: { message }
            })
        }
    }
}