import allnigeria from '../../public/allnigeria.json'

export default async function handler(req: any, res: any) {

    if (req.method === 'POST') {
        try {
            const body:any = req.body

            let unit: string = ''
            let ward: string = ''

            const wards = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards.map((ward: { name: any }) => ward.name)

            for (let i = 0; i < wards.length; i++) {
                const units = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[i].units.map((units: { name: any }) => units.name)
                for (let j = 0; j < units.length; j++) {
                    if (units[j].includes(body.pucNumber)) {
                        unit = units[j]
                        ward = wards[i]
                    }
                }
            }

            if (unit && ward) {
                return res.status(200).json({
                    message: `Your PUC number is ${body.pucNumber} and it belongs to ${unit} unit in ${ward} ward`,
                    success: true
                })
            }
            else {
                return res.status(200).json({
                    message: 'Invalid PUC Number for selected state and lga',
                    success: false
                })
            }


        } catch (error) {
            const message = 'something went wrong, please try again'
            res.status(500).json({
                error: message,
                success: false
            })
        }
    }
}
