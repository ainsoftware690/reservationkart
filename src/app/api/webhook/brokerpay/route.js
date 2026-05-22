// app/api/webhook/brokerpay/route.js

export async function POST(request) {
  try {
    // ====================================
    // STEP 1 — SECRET HASH VERIFY KARO
    // BrokerPay "x-secret-hash" header me bhejta hai
    // ====================================
    const secretHash = request.headers.get("x-secret-hash");
    const expectedHash = process.env.BROKERPAY_SECRET_HASH; // Dashboard se milega

    if (!secretHash || secretHash !== expectedHash) {
      console.error("Webhook rejected — invalid secret hash");
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ====================================
    // STEP 2 — BODY PARSE KARO
    // ====================================
    const body = await request.json();
    console.log("BrokerPay Webhook Received:", JSON.stringify(body, null, 2));

    // ====================================
    // STEP 3 — TRANSACTION DATA NIKALO
    // ====================================
    const {
      transaction_id,
      order_id,
      status,       // "success" | "failed" | "pending"
      amount,
      currency,
    } = body?.transaction?.result
      ? {
          transaction_id: body.transaction?.transaction_id,
          order_id:       body.transaction?.order_id,
          status:         body.transaction?.result?.status,
          amount:         body.transaction?.order?.amount,
          currency:       body.transaction?.order?.currency,
        }
      : body; // Flat format agar alag ho

    // ====================================
    // STEP 4 — STATUS KE HISAAB SE HANDLE
    // ====================================
    switch (status) {
      case "success":
        console.log(`✅ Payment Success — Order: ${order_id}, TxnID: ${transaction_id}`);
        // TODO: DB me order status update karo
        // await updateOrderStatus(order_id, "paid");
        break;

      case "failed":
        console.log(`❌ Payment Failed — Order: ${order_id}`);
        // TODO: DB me order status update karo
        // await updateOrderStatus(order_id, "failed");
        break;

      case "pending":
        console.log(`⏳ Payment Pending — Order: ${order_id}`);
        // BrokerPay ~2 min me final status bhejega
        // await updateOrderStatus(order_id, "pending");
        break;

      default:
        console.log(`⚠️ Unknown status: ${status}`);
    }

    // ====================================
    // STEP 5 — 200 OK ZAROOR BHEJO
    // Warna BrokerPay retry karta rehega
    // ====================================
    return Response.json({ success: true, received: true });

  } catch (error) {
    console.error("Webhook Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}