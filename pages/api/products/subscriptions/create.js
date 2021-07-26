import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SKEY)

export default async (req, res) => {
    const {plans, section} = req.body
    // const plansMetaData = plans.map((plan) => plan.planIncludes.map((include, index) => {return {planIncludes: include}}))
    const productListHolder = [];
    const products = [];

    // Get Products from stripe
    const productsList = await stripe.products.list()
    const priceList = await stripe.prices.list()

    productsList.data.map(product => 
        productListHolder.push(product.id),    
    )
      
    try {
        await plans.map(plan =>
            !productListHolder.includes(`dxpstudio-${section}-${plan._key}-${plan.planType}`) &&
            stripe.products.create({
                id: `dxpstudio-${section}-${plan._key}-${plan.planType}`,
                name: plan.planType,
                description: plan.description
            })
            .then(data =>           
                {
                stripe.prices.create({
                    product: data.id,
                    unit_amount: (plan.price * 100) * 12,
                    currency: 'usd',
                    recurring: {
                        interval: 'year'
                    },
                    metadata: plan.planIncludes
                }),
                stripe.prices.create({
                    product: data.id,
                    unit_amount: plan.price * 100,
                    currency: 'usd',
                    recurring: {
                        interval: 'month'
                    },
                    metadata: plan.planIncludes
                })
            })       
            .catch(err => console.log(err))
        )
    } catch (error) {
        res.status(200).json({message: "Pricing not set! Products not created"})
    }

    productsList.data.map(product =>         
        priceList.data.map(price =>
            product.id === price.product && products.push({name: product.name, product, price}),                      
            )
    )
    res.status(200).json(products)
}