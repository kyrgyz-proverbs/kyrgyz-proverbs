"use client";

import { useParams } from "next/navigation";
import { alphabetProverbs } from "@/data/proverbs";
import { useState } from "react";

export default function LetterPage() {
  const params = useParams();
const letter = decodeURIComponent(String(params?.letter || ""));

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);

  // 🔧 daha güçlü arama için normalize fonksiyonu
  const normalizeText = (text: string) => {
    return text
      .toLocaleLowerCase("tr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g");
  };

  // harfe göre filtre
  const filtered = alphabetProverbs.filter(
    (p) => p.letter.toLowerCase() === letter.toLowerCase()
  );

  const normalizedSearch = normalizeText(search);

  // 🔧 hem TR hem KYR hem comment + hatalı yazım toleransı
  const searched = filtered.filter((item) => {
    const kyrgyz = normalizeText(item.kyrgyz || "");
    const turkish = normalizeText(item.turkish || "");
    const comment = normalizeText(item.comment || "");

    return (
      kyrgyz.includes(normalizedSearch) ||
      turkish.includes(normalizedSearch) ||
      comment.includes(normalizedSearch)
    );
  });

  const visibleItems = searched.slice(0, visibleCount);

  return (
    <div
  style={{
    padding: 20,
    fontFamily: "Arial",
    background: "white",
    color: "#111",
    minHeight: "100vh",
  }}
>
      <h1 style={{ marginBottom: 20 }}>
        {letter.toUpperCase()} Harfi
      </h1>

      {/* ARAMA */}
      <input
        type="text"
        placeholder="Atasözü ara..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleCount(50); // reset
        }}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          border: "1px solid #ccc",
          borderRadius: 6,
          fontSize: 16,
        }}
      />

      {searched.length === 0 ? (
        <p>Bu harfte atasözü yok</p>
      ) : (
        <>
          {visibleItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                marginBottom: 10,
                borderRadius: 6,
                backgroundColor: "#fff",
                color: "#111",
              }}
            >
              <strong style={{ display: "block", marginBottom: 5 }}>
                {item.kyrgyz}
              </strong>

              <p style={{ margin: 0, color: "#333" }}>
                {item.turkish}
              </p>

              {item.comment && (
               <p
  style={{
    marginTop: 5,
    color: "#555",
    fontSize: 13,
  }}
>
                  {item.comment}
                </p>
              )}
            </div>
          ))}

          {/* DAHA FAZLA */}
          {visibleCount < searched.length && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 50)}
                style={{
                  padding: "12px 20px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  background: "#eee",
                  borderRadius: 6,
                  fontSize: 16,
                }}
              >
                Daha Fazla Göster ({searched.length - visibleCount} kaldı)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
