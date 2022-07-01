import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

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
            const message = 'something went wrong, please try again'
            res.status(500).json({
                error: message,
                success: false
            })
        }
    }
}
