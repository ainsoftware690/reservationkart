import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const wk = process.env.CCAVENUE_WORKING_KEY || "";
  const mid = process.env.CCAVENUE_MERCHANT_ID || "";
  const ac = process.env.CCAVENUE_ACCESS_CODE || "";

  return NextResponse.json({
    working_key_length: wk.length,
    working_key_exists: wk.length > 0,
    merchant_id_length: mid.length,
    access_code_length: ac.length,
  });
}