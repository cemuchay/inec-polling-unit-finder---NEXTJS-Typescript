import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    const wards = Object.values(allnigeria)[0].lgas[0].wards[0].units.map((units: { name: any }) => units.name)

    //get ards for an lga
    if (req.method === 'POST') {
        try {
            const body = req.body

            const wards = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards[body.indexWard].units.map((units: { name: any }) => units.name)

            res.status(200).json({
                data: wards
            })

        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}
