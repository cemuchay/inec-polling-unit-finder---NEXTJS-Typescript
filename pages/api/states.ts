import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    const states = Object.values(allnigeria).map(state => state.name)

    if (req.method === 'GET') {
        try {
            res.status(200).json({
                data: states
            })

        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}
