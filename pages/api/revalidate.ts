import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const path = Array.isArray(req.query?.path) ? req.query.path[0] : req.query?.path || ""
    try {
        if(!path) {
            throw new Error("Empty path")
        }
        console.info("revalidating path", path)
        await res.revalidate(path)
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}