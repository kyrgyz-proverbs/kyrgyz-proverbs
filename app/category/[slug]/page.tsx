"use client";

import { useParams } from "next/navigation";
import { categoryProverbs } from "@/data/proverbs";
import { useState } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = decodeURIComponent(String(params?.slug || ""));

  const [search, setSearch] = useState("");

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


  // Büyük kategoriye göre filtre
  const filteredCategory = categoryProverbs.filter(
    (item) =>
      item.category.toLowerCase() === slug.toLowerCase()
  );


  const normalizedSearch = normalizeText(search);


  const searched = filteredCategory.filter((item) => {
    const kyrgyz = normalizeText(item.kyrgyz || "");
    const turkish = normalizeText(item.turkish || "");
    const comment = normalizeText(item.comment || "");

    return (
      kyrgyz.includes(normalizedSearch) ||
      turkish.includes(normalizedSearch) ||
      comment.includes(normalizedSearch)
    );
  });


  // ⭐ SUBCATEGORY GRUPLAMA
  const grouped = searched.reduce((acc: any, item) => {

    const sub = item.subCategory || "Diğer";

    if (!acc[sub]) {
      acc[sub] = [];
    }

    acc[sub].push(item);

    return acc;

  }, {});


  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >

      <h1 style={{ marginBottom: 10 }}>
        📚 {slug}
      </h1>


      <p style={{ color:"#666", marginBottom:20 }}>
        Toplam <b>{searched.length}</b> atasözü bulundu.
      </p>


      <input
        type="text"
        placeholder="Bu kategoride ara..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          width:"100%",
          padding:12,
          marginBottom:25,
          border:"1px solid #ccc",
          borderRadius:8,
          fontSize:16
        }}
      />


      {
        Object.keys(grouped).map((subCategory)=>(

          <div key={subCategory}>

            {/* ALT BAŞLIK */}
            <h2
              style={{
                marginTop:35,
                paddingBottom:10,
                borderBottom:"2px solid #ddd"
              }}
            >
              {subCategory}
            </h2>


            {
              grouped[subCategory].map((item:any)=>(

                <div
                  key={item.id}
                  style={{
                    border:"1px solid #ddd",
                    borderRadius:10,
                    padding:15,
                    marginBottom:15,
                    background:"#fff"
                  }}
                >

                  <strong
                    style={{
                      display:"block",
                      fontSize:17,
                      marginBottom:8
                    }}
                  >
                    {item.kyrgyz}
                  </strong>


                  <p style={{margin:0,color:"#444"}}>
                    {item.turkish}
                  </p>


                  {
                    item.comment && (
                      <div
                        style={{
                          marginTop:12,
                          padding:10,
                          background:"#f8f8f8",
                          borderLeft:"4px solid #0d6efd"
                        }}
                      >
                        💬 {item.comment}
                      </div>
                    )
                  }


                </div>

              ))
            }

          </div>

        ))
      }


    </div>
  );
}