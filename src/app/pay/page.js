"use client";
import { useState, useEffect } from "react";

function generateOrderId() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `RSK${yyyy}${mm}${dd}${random}`;
}

export default function PayPage() {
  const [form, setForm] = useState({
    amount: "",
    order_id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, order_id: generateOrderId() }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    window.location.href = `/api/ccavenue/initiate?${params}`;
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h2>Create Payment Link</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Amount (USD) *</label>
          <input
            type="number"
            name="amount"
            required
            value={form.amount}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Order ID / PNR *</label>
          <input
            type="text"
            name="order_id"
            required
            value={form.order_id}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Customer Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#f97316",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}