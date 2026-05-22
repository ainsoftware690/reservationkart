// app/api/brokerpay-test/route.js

import crypto from "crypto";

if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function POST(request) {
  try {
    // ====================================
    // ENV VARIABLES
    // ====================================
    const AES_KEY    = process.env.BROKERPAY_AES_KEY;
    const HMAC_KEY   = process.env.BROKERPAY_HMAC_KEY;
    const SECRET_KEY = process.env.BROKERPAY_SECRET_KEY;

    if (!AES_KEY || !HMAC_KEY || !SECRET_KEY) {
      return Response.json({
        success: false,
        error: "Missing env variables: BROKERPAY_AES_KEY, BROKERPAY_HMAC_KEY, BROKERPAY_SECRET_KEY",
      });
    }

    // ====================================
    // BROKERPAY SANDBOX ENDPOINT
    // ====================================
    const API_URL = "https://brokerpay.net/v1/test/transaction"; 

    // ====================================
    // STEP 1 — PAYLOAD
    // (Test scenarios doc ke hisaab se fields)
    // ====================================
   const payload = {
  amount: 100,
  currency: "INR",
  first_name: "Shahid",        // ✅ first_name
  last_name: "Shah",           // ✅ last_name
  email: "test@example.com",
  mobile: "9999999999",
  order_id: `ORD_${Date.now()}`,
  card_number: "4111222233334444",
  country: "US",
  webhook_url: "https://webhook.site/bdfee29f-63e1-4fae-a68b-99dcb34e2a03",
  response_url: "https://webhook.site/bdfee29f-63e1-4fae-a68b-99dcb34e2a03",
};

    const payloadString = JSON.stringify(payload);

    // ====================================
    // STEP 2 — AES KEY DECODE
    // Doc: "AES Key (Base64)" → Base64 decode
    // ====================================
    const aesKey = Buffer.from(AES_KEY.trim(), "base64");

    if (aesKey.length !== 32) {
      return Response.json({
        success: false,
        error: `AES key invalid: ${aesKey.length} bytes mila, 32 chahiye. .env check karo.`,
      });
    }

    // ====================================
    // STEP 3 — HMAC KEY DECODE
    // Doc: "HMAC Key (Base64)" → Base64 decode ZAROORI
    // ====================================
    const hmacKey = Buffer.from(HMAC_KEY.trim(), "base64");

    if (hmacKey.length === 0) {
      return Response.json({
        success: false,
        error: "HMAC key decode failed. .env me HMAC key check karo.",
      });
    }

    // ====================================
    // STEP 4 — RANDOM 16-BYTE IV
    // ====================================
    const iv = crypto.randomBytes(16);

    // ====================================
    // STEP 5 — AES-256-CBC ENCRYPTION
    // ====================================
    const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
    const encryptedBuffer = Buffer.concat([
      cipher.update(payloadString, "utf8"),
      cipher.final(),
    ]);

    // ====================================
    // STEP 6 — BASE64 ENCODE encrypted data
    // ====================================
    const encrypted_data = encryptedBuffer.toString("base64");

    // ====================================
    // STEP 7 — IV TO HEX
    // ====================================
    const iv_hex = iv.toString("hex");

    // ====================================
    // STEP 8 — HMAC-SHA256 SIGNATURE
    // Doc: "HMAC-SHA256 on encrypted_data"
    // Key: Base64 decoded HMAC key
    //
    // Dono format try ho rahe hain — ek sahi hoga
    // ====================================
    const signature_hex    = crypto.createHmac("sha256", hmacKey).update(encrypted_data).digest("hex");
    const signature_base64 = crypto.createHmac("sha256", hmacKey).update(encrypted_data).digest("base64");

    // ← Pehle hex try karo, agar fail to base64 try karo
    const signature = signature_hex;

    // ====================================
    // STEP 9 — REQUEST BODY
    // ====================================
    const requestBody = {
      encrypted_data,
      iv: iv_hex,
      signature,
    };

    // ====================================
    // API CALL
    // ====================================
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const rawText = await response.text();
    let data;
    try { data = JSON.parse(rawText); }
    catch { data = rawText; }

    // ====================================
    // RESPONSE
    // ====================================
    return Response.json({
      success: true,
      payload,
      sent: requestBody,
      brokerpayStatus: response.status,
      brokerpayResponse: data,
      debug: {
        aesKeyLength:  aesKey.length,
        hmacKeyLength: hmacKey.length,
        signature_hex,
        signature_base64,
        note: "Agar 401 aaye to signature_base64 use karo: `const signature = signature_base64`",
      },
    });

  } catch (error) {
    console.error("BROKERPAY ERROR:", error);
    return Response.json({ success: false, error: error.message });
  }
}