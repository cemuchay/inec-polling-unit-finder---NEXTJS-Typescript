import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    const wards = Object.values(allnigeria)[0].lgas[0].wards.map((ward: { name: any }) => ward.name)

    //get ards for an lga
    if (req.method === 'POST') {
        try {
            const body = req.body

            const wards = Object.values(allnigeria)[body.indexState].lgas[body.indexLga].wards.map((ward: { name: any }) => ward.name)

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
