
"use client";

import { useEffect, useState } from "react";

export default function LatinDizinPage() {
  const [icerik, setIcerik] = useState("");
  const [arama, setArama] = useState("");

  useEffect(() => {
    fetch("/dizin/latin.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Dosya yüklenemedi");
        return res.text();
      })
      .then(setIcerik)
      .catch(() => setIcerik("Dizin yüklenemedi."));
  }, []);

  const satirlar = icerik.split(/\r?\n/);
  const filtreliSatirlar = arama.trim()
    ? satirlar.filter((satir) =>
        satir.toLocaleLowerCase("tr").includes(
          arama.toLocaleLowerCase("tr")
        )
      )
    : satirlar;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <a
        href="/"
        className="text-sm text-gray-500 hover:text-red-800"
      >
        ← Ana sayfaya dön
      </a>

      <h1 className="mt-6 mb-3 text-3xl font-bold text-[#8C2128]">
        Latin Alfabesiyle Kırgızca Dizin
      </h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Kırgızca kelimelerin Türkçe karşılıkları ve ilgili atasözü
        numaraları.
      </p>

      <input
        type="search"
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        placeholder="Dizinde kelime ara..."
        className="mb-5 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <pre className="overflow-x-auto whitespace-pre-wrap break-words p-5 text-sm leading-7">
          {filtreliSatirlar.join("\n")}
        </pre>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Gösterilen satır sayısı: {filtreliSatirlar.length}
      </p>
    </main>
  );
}
