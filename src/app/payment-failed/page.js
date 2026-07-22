export default function PaymentFailed({ searchParams }) {
  return (
    <div style={{ textAlign: "center", padding: 60, fontFamily: "sans-serif" }}>
      <h1 style={{ color: "red" }}>❌ Payment Failed</h1>
      <p>Order ID: {searchParams.order_id}</p>
      <p>Please try again or contact support.</p>
    </div>
  );
}