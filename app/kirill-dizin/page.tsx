
"use client";

import { useEffect, useState } from "react";

export default function KirilDizinPage() {
  const [icerik, setIcerik] = useState("");
  const [arama, setArama] = useState("");

  useEffect(() => {
    fetch("/dizin/kiril.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Dosya yüklenemedi");
        return res.text();
      })
      .then(setIcerik)
      .catch(() => setIcerik("Дизин жүктөлгөн жок."));
  }, []);

  const satirlar = icerik.split(/\r?\n/);
  const filtreliSatirlar = arama.trim()
    ? satirlar.filter((satir) =>
        satir.toLocaleLowerCase().includes(
          arama.toLocaleLowerCase()
        )
      )
    : satirlar;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <a
        href="/"
        className="text-sm text-gray-500 hover:text-red-800"
      >
        ← Башкы бетке кайтуу
      </a>

      <h1 className="mt-6 mb-3 text-3xl font-bold text-[#8C2128]">
        Кирилл Арибиндеги Кыргызча Дизин
      </h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Кыргыз сөздөрүнүн түркчө маанилери жана макалдардын номерлери.
      </p>

      <input
        type="search"
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        placeholder="Сөз издөө..."
        className="mb-5 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <pre className="overflow-x-auto whitespace-pre-wrap break-words p-5 text-sm leading-7">
          {filtreliSatirlar.join("\n")}
        </pre>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Көрсөтүлгөн саптар: {filtreliSatirlar.length}
      </p>
    </main>
  );
}
