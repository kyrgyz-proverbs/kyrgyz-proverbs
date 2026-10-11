"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { alphabetProverbs, categoryProverbs } from "../data/proverbs";
import HeroSlider from "./components/HeroSlider";
import CommentSection from "./components/CommentSection";
import Contact from "./components/Contact";
import { useRouter } from "next/navigation";


export default function Home() {
  const [showCategories, setShowCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {

  const check = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  check();

  window.addEventListener("resize", check);

  return () => window.removeEventListener("resize", check);

}, []);
  const router = useRouter();
  
  const getRandomProverbs = () => {
  const now = new Date();

  const seed =
    now.getFullYear() * 100000 +
    now.getMonth() * 1000 +
    now.getDate() * 100 +
    now.getHours();

  const shuffled = [...alphabetProverbs];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed + i * 37) % (i + 1);

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 10);
};

const randomHomepageProverbs = getRandomProverbs();

  const letters = "ABCÇDEFGHIİJKLMNOÖPRSTUÜVYZ".split("");

  // SAĞ - KATEGORİ
  const categoryGrouped = categoryProverbs.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categoryGrouped).sort();

  const goToCategory = (category: string) => {
  setShowCategories(false);
  router.push(`/category/${category}`);
};

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
    <HeroSlider />
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 20,
    marginBottom: 30,
  }}
>

  <Link
    href="/onsoz"
    style={{
      textDecoration: "none",
      color: "inherit"
    }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        cursor: "pointer",
        background: "#fff"
      }}
    >
      <h2>📖 Önsöz</h2>

      <p>
        Altın Bulak kitabı hakkında giriş ve açıklamalar...
      </p>

      <b>Devamını oku →</b>
    </div>
  </Link>

  <Link
    href="/tarihten-gunumuze-atasozu"
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        cursor: "pointer",
        background: "#fff",
      }}
    >
      <h2>📚 Tarihten Günümüze Atasözü, Makal ve Lakap</h2>

      <p>
        Atasözü, makal ve lakap kavramlarının tarihsel gelişimi...
      </p>

      <b>Devamını oku →</b>
    </div>
  </Link>
 <Link
    href="/sources"
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        cursor: "pointer",
        background: "#fff",
      }}
    >
      <h2>📚 Kaynaklar</h2>

      <p>
        Makallakap'ta kullanılan kitaplar, sözlükler ve diğer kaynaklar.
      </p>

      <b>Kaynakları görüntüle →</b>
    </div>
  </Link>

</div>

<h1 style={{ textAlign: "center", marginBottom: 30 }}>
  Kırgız Atasözleri
</h1>

      {/* ÜST MENÜ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* SOL A-Z (ARTIK ROUTE) */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 8,
            padding: 10,
            whiteSpace: "nowrap",
            borderBottom: "1px solid #ddd",
            maxWidth: "100%",
          }}
        >
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() =>
                (window.location.href = `/letter/${letter.toLowerCase()}`)
              }
              style={{
                padding: 8,
                minWidth: 40,
                cursor: "pointer",
                background: "#eee",
                border: "1px solid #ccc",
                flexShrink: 0,
              }}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* SAĞ KATEGORİ DROPDOWN */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowCategories(!showCategories)}
            style={{
              padding: 10,
              cursor: "pointer",
            }}
          >
            Kategoriler ▼
          </button>

          {showCategories && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 45,
                width: 200,
                maxHeight: 200,
                overflowY: "auto",
                border: "1px solid #ccc",
                background: "white",
                padding: 10,
                zIndex: 1000,
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => goToCategory(cat)}
                  style={{
                    padding: 8,
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      ```tsx
{/* İKİ SÜTUN */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: 20,
    alignItems: "start",
  }}
>
  {/* SOL SÜTUN: ÖNE ÇIKANLAR */}
  <div
    style={{
      height: "80vh",
      overflowY: "auto",
      border: "1px solid #ddd",
      padding: 15,
    }}
  >
    <h2>Öne Çıkanlar</h2>

    {randomHomepageProverbs.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <strong>{item.kyrgyz}</strong>
        <p>{item.turkish}</p>
      </div>
    ))}
  </div>

  {/* SAĞ SÜTUN: KATEGORİLER VE DİZİNLER */}
  <div style={{ minWidth: 0 }}>
    {/* TÜM KATEGORİLER */}
    <Link
      href="/categories"
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 10,
          background: "#fff",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <h2>📂 Tüm Kategorileri Gör</h2>

        <p>
          Atasözlerini konularına göre inceleyebilirsiniz.
        </p>

        <b>Devam Et →</b>
      </div>
    </Link>

    {/* LATİN VE KİRİL DİZİNLERİ: SAĞ SÜTUNDA, KATEGORİLERİN ALTINDA */}
    <div className="mt-6 grid grid-cols-1 gap-4">
      <Link
        href="/latin-dizin"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="rounded-xl border border-gray-200 p-5 shadow-sm transition hover:border-[#8C2128] hover:shadow-md dark:border-gray-700">
          <h2 className="font-bold text-[#8C2128]">
            Latin Alfabesiyle Dizin
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Latin harfleriyle alfabetik Kırgızca dizin
          </p>

          <b className="mt-3 inline-block text-sm">
            İncele →
          </b>
        </div>
      </Link>

      <Link
        href="/kirill-dizin"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="rounded-xl border border-gray-200 p-5 shadow-sm transition hover:border-[#8C2128] hover:shadow-md dark:border-gray-700">
          <h2 className="font-bold text-[#8C2128]">
            Кирилл Арибиндеги Дизин
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Кыргызча сөздөрдүн алфавиттик көрсөткүчү
          </p>

          <b className="mt-3 inline-block text-sm">
            Көрүү →
          </b>
        </div>
      </Link>
    </div>
  </div>
</div>

      <CommentSection />
      <Contact />
      </div>
  );
}