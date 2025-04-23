import axios from "axios";
export const refund=async(order)=>{
     // 1. Authentication - Get Paymob auth token
     const authResponse = await axios.post(
        "https://accept.paymob.com/api/auth/tokens",
        {
          api_key: process.env.PAYMOB_API_KEY,
        }
      );
      
      const authToken = authResponse.data.token;
      
      // 2. Make refund request (works for both card and wallet)
      const refundResponse = await axios.post(
        "https://accept.paymob.com/api/acceptance/void_refund/refund",
        {
          auth_token: authToken,
          transaction_id:order.transaction_id,
          amount_cents:order.totalAmount * 100,
          refund_reason: "Customer request" 
        }
      );
      return refundResponse.data;
}