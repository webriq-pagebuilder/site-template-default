import Stripe from 'stripe';

export default async (req, res) => {
    const {apiKey} = req.query
    const stripe = new Stripe(apiKey)
    const priceList = await stripe.prices.list()   
     
    res.status(200).json(priceList)
}