import { verifyPayUHash } from '../../../../lib/payuHash';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      status,
      hash,
      txnid,
      amount,
      email,
      firstname,
      phone,
      productinfo,
    } = data;

    const key = process.env.NEXT_PUBLIC_PAYU_KEY;
    const salt = process.env.PAYU_SALT;

    const isValid = verifyPayUHash(hash, key, salt, txnid, amount, status);

    if (!isValid) {
      console.error('Invalid PayU hash');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (status === 'success') {
      console.log('✅ Payment SUCCESS:', {
        txnid,
        email,
        amount,
        productinfo,
        firstname,
      });
      // TODO: Database mein save karo booking
    } else if (status === 'failed') {
      console.log('❌ Payment FAILED:', txnid);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}