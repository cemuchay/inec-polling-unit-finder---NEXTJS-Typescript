import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    //  const wards = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[body.indexWard].units.map((units: { name: any }) => units.name)

    //get ards for an lga
    if (req.method === 'POST') {
        try {
            const body = req.body

            // loop through every i and search for '28/04/07/11'

            const wardsX = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[0].units.map((units: { name: any }) => units.name)

            // // loop through every i and search for '28/04/07/11'
            // for (let i = 0; i < wards.length; i++) {
            //     if (wards[i].includes('28/04/07/11')) {
            //         console.log(wards[i])
            //     }
            // }

            const wards = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards.map((ward: { name: any }) => ward.name)

            let x = []

            for (let i = 0; i < wards.length; i++) {
                const units = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[i].units.map((units: { name: any }) => units.name)
                for (let j = 0; j < units.length; j++) {
                    if (units[j].includes(body.pucNumber)) {
                        console.log(wards[i])
                        x.push(units[j])
                        x.push(wards[i])
                    }
                    // x.push(units)
                }

                // find the particular item that contains the string

            }


            res.status(200).json({
                data: x
            })

        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}
