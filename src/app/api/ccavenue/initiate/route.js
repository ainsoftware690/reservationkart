import { encrypt } from "../../../../lib/ccavenue";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Test:       https://test.ccavenue.com/transaction/transaction.do
// Production: https://secure.ccavenue.com/transaction/transaction.do
const CCAVENUE_URL = "https://secure.ccavenue.com/transaction/transaction.do";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("order_id") || `ORDER${Date.now()}`;
  const customerName = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";

  if (!amount) {
    return new NextResponse("Amount is required", { status: 400 });
  }

  const data =
    `merchant_id=${process.env.CCAVENUE_MERCHANT_ID}` +
    `&order_id=${orderId}` +
    `&currency=INR` +
    `&amount=${amount}` +
    `&redirect_url=${process.env.CCAVENUE_REDIRECT_URL}` +
    `&cancel_url=${process.env.CCAVENUE_CANCEL_URL}` +
    `&language=EN` +
    `&billing_name=${customerName}` +
    `&billing_email=${email}` +
    `&billing_tel=${phone}`;

  const encRequest = encrypt(data);

  const html = `
    <html>
      <body onload="document.forms[0].submit()">
        <p>Redirecting to secure payment gateway, please wait...</p>
        <form method="post" action="${CCAVENUE_URL}">
          <input type="hidden" name="encRequest" value="${encRequest}" />
          <input type="hidden" name="access_code" value="${process.env.CCAVENUE_ACCESS_CODE}" />
          <input type="hidden" name="command" value="initiateTransaction" />
        </form>
      </body>
    </html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}