import axios from "axios";
export const createPayment=async(user,order,integration_id)=>{
    try{
        const authResponse = await axios.post("https://accept.paymob.com/api/auth/tokens", {
            api_key: process.env.PAYMOB_API_KEY,
          });
        
          const token = authResponse.data.token;
          const orderResponse = await axios.post("https://accept.paymob.com/api/ecommerce/orders", {
            auth_token: token,
            delivery_needed: false,
            amount_cents: order.totalAmount * 100, // Make sure it's a number
            currency: "EGP",
            items: order.orderItems.map(item => ({
              name: item.name,
              amount_cents: item.price * 100,  // item price in cents
              description: item.name,
              quantity: item.quantity
            }))
          });
    
          const paymobOrderId = orderResponse.data.id;
           
        
          const paymentKeyResponse = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
            auth_token: token,
            amount_cents: order.totalAmount * 100,
            expiration: 3600,
            order_id: paymobOrderId,
            billing_data: {
              apartment: "NA",
              email: user.email,
              floor: "NA",
              first_name: user.name,
              street: "NA",
              building: "NA",
              phone_number: order.phoneNumber[0],
              shipping_method: "NA",
              postal_code: order.shippingAddress[0].zipCode,
              city: order.shippingAddress[0].city,
              country: "EG",
              last_name:"NA",
              state: order.shippingAddress[0].state,
            },
            currency: "EGP",
            integration_id,
          });
    
          const paymentToken = paymentKeyResponse.data.token;
          return {
            paymentToken,
            paymobOrderId
          }
    }catch(error){
        throw new AppError(error.message,500);
    }
}