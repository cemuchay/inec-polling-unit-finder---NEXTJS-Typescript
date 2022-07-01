import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    const states = Object.values(allnigeria).map(state => state.name)

    if (req.method === 'GET') {
        try {
            // const x = Object.values(allnigeria)
            // const y = x[0].name

            // const states = Object.values(allnigeria)[0].name

            // loop through Object.values(allnigeria) and return name property

            // send states back to client
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
