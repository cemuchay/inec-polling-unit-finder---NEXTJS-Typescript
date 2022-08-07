import allnigeria from '../../public/allnigeria.json'

export default async function handler(req: any, res: any) {

    if (req.method === 'POST') {
        try {
            const body = req.body

            let unit = ''
            let unitQuery = ''

            const units = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[body.indexWard].units.map((units: { name: any }) => units.name)
            for (let i = 0; i < units.length; i++) {
                if (units[i].includes(body.pucNumber)) {
                    unit = units[i]

                    if (unit.includes('-')) {
                        unitQuery = unit.replace(/\-.+/, '').replace(/\s/g, '+').slice(0, -2) + '+' + Object.values(allnigeria)[body.indexState].name.replace(/\s/g, '+') + '+' + 'State'
                    }
                    else {
                        unitQuery = unit.replace(/\(.+/, '').replace(/\s/g, '+').slice(0, -2) + '+' + Object.values(allnigeria)[body.indexState].name.replace(/\s/g, '+') + '+' + 'State'
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
