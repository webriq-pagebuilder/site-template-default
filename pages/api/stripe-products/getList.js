import Stripe from 'stripe';
import { decryptKey } from 'utils/secureKey';

export default async (req, res) => {
    const {apiKey} = req.query
    const useKey = decryptKey(apiKey)

    const stripe = new Stripe(useKey)
    const priceList = await stripe.prices.list()   
     
    res.status(200).json(priceList)
}