// pages/api/payment-webhook.js
import { db } from '@/utils/firebase_config';
import { doc, updateDoc } from 'firebase/firestore';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id, transaction_id, status, amount } = req.body;

    // Verify the webhook signature
    const signature = req.headers['x-onetapay-signature'];
    const secretKey = process.env.ONETAPAY_SECRET_KEY;
    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    try {
      const transactionRef = doc(db, 'transactions', order_id);
      
      await updateDoc(transactionRef, {
        status: status === 'PAID' ? 'success' : 'failure',
        providerTransactionId: transaction_id,
        amount: amount / 100, // Convert back to rupees
        updatedAt: new Date()
      });

      res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Failed to process webhook' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}