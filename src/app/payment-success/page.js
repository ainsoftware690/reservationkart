export default function PaymentSuccess({ searchParams }) {
  return (
    <div style={{ textAlign: "center", padding: 60, fontFamily: "sans-serif" }}>
      <h1 style={{ color: "green" }}>✅ Payment Successful</h1>
      <p>Order ID: {searchParams.order_id}</p>
      <p>Amount: {searchParams.amount} USD</p>
      <p>Thank you! Your booking is confirmed.</p>
    </div>
  );
}