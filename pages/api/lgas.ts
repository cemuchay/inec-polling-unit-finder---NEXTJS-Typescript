import allnigeria from '../../public/allnigeria.json'


export default async function handler(req: any, res: any) {

    //get lgas for a state
    if (req.method === 'POST') {
        try {
            const body = req.body

            const lgas = Object.values(allnigeria)[body.index].lgas.map((lga: { name: any }) => lga.name)

            res.status(200).json({
                data: lgas
            })

        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}

//     if (req.method === 'POST') {
//         try {

//             //save request body to variable
//             const body = req.body


//             // send states back to client
//             res.status(200).json({
//                 data: states
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error
//             })
//         }
//     }
// }
