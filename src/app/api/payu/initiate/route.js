import { generatePayUHash } from '../../../../lib/payuHash';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      employeeName,
      employeeEmail,
      phone,
      destination,
      amount,
      bookingDetails,
    } = body;

    if (!employeeName || !employeeEmail || !phone || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const key = process.env.NEXT_PUBLIC_PAYU_KEY;
    const salt = process.env.PAYU_SALT;
    const txnid = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const productinfo = `Flight Booking - ${destination}`;

    const hash = generatePayUHash(
      key,
      salt,
      txnid,
      amount.toString(),
      productinfo,
      employeeName,
      employeeEmail,
      phone
    );

    return NextResponse.json({
      key,
      txnid,
      hash,
      amount: amount.toString(),
      productinfo,
      firstname: employeeName,
      email: employeeEmail,
      phone,
    });
  } catch (error) {
    console.error('PayU initiate error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}