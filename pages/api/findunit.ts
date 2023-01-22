import allnigeria from 'public/allnigeria.json'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    success: boolean,
    message: string,
    unit: string,
    unitQuery: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        try {

            const {indexState, indexLga, indexWard,pucNumber} = req.body

            let unit: string = ''
            let unitQuery: string = ''

            const units = Object.values(allnigeria)[indexState].lgas[indexLga].wards[indexWard].units.map((units: { name: any }) => units.name)

            for (let i = 0; i < units.length; i++) {
                if (units[i].includes(pucNumber)) {
                    unit = units[i]

                    if (unit.includes('-')) {
                        unitQuery = unit.replace(/\-.+/, '').replace(/\s/g, '+').slice(0, -2) + '+' + Object.values(allnigeria)[indexState].name.replace(/\s/g, '+') + '+' + 'State'
                    }
                    else {
                        unitQuery = unit.replace(/\(.+/, '').replace(/\s/g, '+').slice(0, -2) + '+' + Object.values(allnigeria)[indexState].name.replace(/\s/g, '+') + '+' + 'State'
                    }

                }
            }

            if (unit) {
                return res.status(200).json({
                    message: `Your Polling Unit is ${unit}`,
                    unit,
                    unitQuery,
                    success: true
                })
            }
            else {
                return res.status(200).json({
                    message: 'Invalid Pooling Unit number for selected ward',
                    success: false,
                    unit: '',
                    unitQuery: ''
                })
            }

        } catch (error) {
            const message = 'Something went wrong, please try again'
            res.status(500).json({
                message,
                success: false,
                unit: '',
                unitQuery: ''
            })
        }
    }
}
