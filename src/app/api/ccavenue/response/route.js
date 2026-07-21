import { decrypt } from "../../../../lib/ccavenue";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const formData = await req.formData();
  const encResp = formData.get("encResp");

  if (!encResp) {
    return NextResponse.redirect("https://reservationkart.com/payment-failed");
  }

  const decrypted = decrypt(encResp);
  const params = new URLSearchParams(decrypted);

  const orderStatus = params.get("order_status");
  const orderId = params.get("order_id");
  const amount = params.get("amount");

  // TODO: update your database/order record here based on orderStatus

  if (orderStatus === "Success") {
    return NextResponse.redirect(
      `https://reservationkart.com/payment-success?order_id=${orderId}&amount=${amount}`
    );
  }

  return NextResponse.redirect(
    `https://reservationkart.com/payment-failed?order_id=${orderId}`
  );
}