import React from "react";
import axios from 'axios'
import { initiateCheckout } from "lib/checkout";

function VariantA({ caption, title, description, plans, projectId, documentId, published, stripePKey, NEXT_PUBLIC_DXP_STUDIO_ADDRESS }) {
  const [plan, setPlan] = React.useState("monthly");
  const [subscriptionProducts, setSubscriptionProducts] = React.useState(null)

  React.useEffect(() => {  
     async function getList () {
        try {
          const getProductList = await axios.get(`${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/stripe/get-products`, {
            params: {    
              projectId,
              documentId
            } 
          })       
          setSubscriptionProducts(getProductList.data.data)
        } catch (error) {
          console.log(error.message)
        }
    };  
    published && getList()
  }, [projectId, published])

  React.useEffect(() => {
    if(subscriptionProducts){
      subscriptionProducts?.map(price => {
        plans?.map(plan => {
          price?.product === `dxpstudio-pricing-${plan?._key}-${plan?.planType?.replace(/ /g, "-")}` && 
          price?.recurring.interval === 'month' ? plan['monthly_price']  = price?.id : null
  
          price?.product === `dxpstudio-pricing-${plan?._key}-${plan?.planType?.replace(/ /g, "-")}` && 
          price?.recurring.interval === 'year' ? plan['yearly_price']  = price?.id : null
        })
      })  
    }      
  }, [subscriptionProducts])
  
  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-webriq-darkblue font-bold">
              {caption && caption}
            </span>
            <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title && title}
            </h2>
            <p className="mb-6 text-gray-500">{description && description}</p>
            {plans?.[0]?.monthlyPrice && (
              <div className="inline-block py-1 px-1 bg-white rounded-lg">
                <button
                  className={`mr-1 text-sm py-2 px-4 ${plan === "monthly"
                    ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                    : "text-gray-500"
                    } hover:text-gray-900 font-bold focus:outline-none`}
                  onClick={() => setPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`text-sm py-2 px-4 ${plan === "yearly"
                    ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                    : "text-gray-500"
                    } font-bold focus:outline-none`}
                  onClick={() => setPlan("yearly")}
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {plans?.[0]?.monthlyPrice && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {plans?.[0]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(plans?.[0]?.monthlyPrice))
                      ? plans?.[0]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? plans?.[0]?.yearlyPrice
                            : plans?.[0]?.monthlyPrice
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[0]?.monthlyPrice)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {plans?.[0]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {plans?.[0]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{include}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                      className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 cursor-pointer ${!subscriptionProducts && 'disabled:opacity-50 cursor-not-allowed'}`} disabled={!subscriptionProducts}
                      onClick={() => {initiateCheckout({
                        lineItems: [
                          {
                            price: plan === 'monthly' ? plans[0].monthly_price : plans[0].yearly_price,
                            quantity: 1                          
                          }
                        ]
                      }, stripePKey, NEXT_PUBLIC_DXP_STUDIO_ADDRESS, true)}}
                    >
                      {plans?.[0]?.checkoutButtonName}
                    </button>
                </div>
              </div>
            )}
            {plans?.[1] && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-webriq-darkblue shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold text-white">
                    {plans?.[1]?.planType}
                  </h4>
                  <span className="text-6xl font-bold text-white">
                    {isNaN(parseInt(plans?.[1]?.monthlyPrice))
                      ? plans?.[1]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? plans?.[1]?.yearlyPrice
                            : plans?.[1]?.monthlyPrice
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[1]?.monthlyPrice)) && (
                    <span className="text-gray-50 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 leading-loose text-gray-50">
                    {plans?.[1]?.description}
                  </p>
                  <ul className="mb-6 text-gray-50">
                    {plans?.[1]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-babyblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{include}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                      className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-white hover:bg-gray-50 font-bold leading-loose transition duration-200 cursor-pointer ${!subscriptionProducts && 'disabled:opacity-50 cursor-not-allowed'}`} disabled={!subscriptionProducts}
                      onClick={() => {initiateCheckout({
                        lineItems: [
                          {
                            price: plan === 'monthly' ? plans[1].monthly_price : plans[1].yearly_price,
                            quantity: 1                          
                          }
                        ]
                      }, stripePKey, NEXT_PUBLIC_DXP_STUDIO_ADDRESS, true)}}
                    >
                      {plans?.[1]?.checkoutButtonName}
                    </button>
                </div>
              </div>
            )}
            {(plans?.[2]) && (
              <div className="w-full lg:w-1/3 px-4">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {plans?.[2]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(plans?.[2]?.monthlyPrice))
                      ? plans?.[2]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? plans?.[2]?.yearlyPrice
                            : plans?.[2]?.monthlyPrice
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[2]?.monthlyPrice)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {plans?.[2]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {plans?.[2]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{include}</span>
                      </li>
                    ))}
                  </ul>
                 <button
                    className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 cursor-pointer ${!subscriptionProducts && 'disabled:opacity-50 cursor-not-allowed'}`} disabled={!subscriptionProducts}
                    onClick={() => {initiateCheckout({
                      lineItems: [
                        {
                          price: plan === 'monthly' ? plans[2].monthly_price : plans[2].yearly_price,
                          quantity: 1                          
                        }
                      ]
                    }, stripePKey, NEXT_PUBLIC_DXP_STUDIO_ADDRESS, true)}}
                  >
                  {plans?.[2]?.checkoutButtonName}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section> 
  );
}
export default React.memo(VariantA);
