"use client";

import Link from "next/link";
import { categoryProverbs } from "@/data/proverbs";

export default function CategoriesPage() {
  // Kategorileri grupla
  const grouped = categoryProverbs.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        📂 Tüm Kategoriler
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: 30,
        }}
      >
        Atasözlerini konularına göre inceleyebilirsiniz.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 20,
                background: "#fff",
                transition: "0.2s",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  textTransform: "capitalize",
                }}
              >
                📚 {category}
              </h2>

              <p
                style={{
                  color: "#666",
                  marginBottom: 20,
                }}
              >
                Toplam <b>{grouped[category].length}</b> atasözü bulunmaktadır.
              </p>

              <b style={{ color: "#0d6efd" }}>
                Atasözlerini Gör →
              </b>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
