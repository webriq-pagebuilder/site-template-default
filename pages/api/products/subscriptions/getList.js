import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51JDL3ZLisY7c4Rog1d5sPV3O7yTjNOv402Nzy2kWq3tM67lCzLFC2PoW4zLcyXtQkasunU83nGCWyYS9HFrAJXRf00cwhVejxf")

export default async (req, res) => {
    if(req.method !== "GET") {
        res.status(501).json('INVALID HEADER')
    }
    const productList = await stripe.products.list()
    if(!productList) {
        res.status(404).json({message: "List Not Found"})
    }
    res.status(200).json({data: productList})
}