// app/api/initiate-payment.js
import axios from 'axios';
import { db } from '@/utils/firebase_config';
import { doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, packageName, userId, email, name, phone_number } = req.body;

    // Replace with your Onetapay API credentials and endpoint
    const apiKey = '32|laravel_sanctum_f2pSAP2PXBOMYsgx9wdfgyGrr6nUrf0NCnXRaIga58eb61e5'
    // const apiKey = process.env.ONETAPAY_API_KEY;
    const secretKey = '65d74ecaea5f6'
    // const secretKey = process.env.ONETAPAY_SECRET_KEY;
    const apiEndpoint = 'https://onetapay.com/pp/MjA0' 
    // const apiEndpoint = process.env.ONETAPAY_API_ENDPOINT; 

    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}`;

    // Create the payload for Onetapay API
    const payload = {
      api_key: apiKey,
      order_id: transactionId,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      description: `Payment for ${packageName} package`,
      customer_name: name,
      customer_email: email,
      customer_phone: phone_number,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,
      webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`
    };

    // Generate signature (adjust this according to Onetapay's specific requirements)
    const signaturePayload = `${apiKey}|${transactionId}|${payload.amount}|${payload.currency}|${secretKey}`;
    const signature = crypto.createHash('sha256').update(signaturePayload).digest('hex');

    payload.signature = signature;

    try {
      // Create a new transaction document in Firestore
      await setDoc(doc(db, 'transactions', transactionId), {
        userId,
        amount: amount,
        packageName,
        status: 'initiated',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Make API call to Onetapay
      const response = await axios.post(apiEndpoint, payload);

      // Return the payment URL and transaction ID to the client
      res.status(200).json({ 
        paymentUrl: response.data.payment_url, // Adjust this based on actual Onetapay response
        transactionId 
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ error: 'Failed to initiate payment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}