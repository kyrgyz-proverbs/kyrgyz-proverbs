"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/kyrgyzstan/1.jpg",
  "/images/kyrgyzstan/2.jpg",
  "/images/kyrgyzstan/3.jpg",
  "/images/kyrgyzstan/4.jpg",
  "/images/kyrgyzstan/5.jpg",
  "/images/kyrgyzstan/6.jpg",
  "/images/kyrgyzstan/7.jpg",
  "/images/kyrgyzstan/8.jpg",
  "/images/kyrgyzstan/9.jpg",
  "/images/kyrgyzstan/10.jpg",
  "/images/kyrgyzstan/11.jpg",
  "/images/kyrgyzstan/12.jpg",
  "/images/kyrgyzstan/13.jpg",
  "/images/kyrgyzstan/14.jpg",
  "/images/kyrgyzstan/15.jpg",
];

export default function HeroSlider() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);

  }, []);


  return (
    <div
      style={{
        width: "75%",
        height: 525,
        position: "relative",
        overflow: "hidden",
        borderRadius: 15,
        marginBottom: 30,
      }}
    >

      <Image
        src={images[current]}
        alt="Kırgızistan"
        fill
        style={{
          objectFit: "cover",
        }}
      />


      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
      />


      <div
        style={{
          position: "absolute",
          left: 30,
          bottom: 40,
          color: "white",
        }}
      >

        <h1>
          Kırgız Atasözleri
        </h1>

        <p>
          Kırgız kültüründen gelen atasözleri ve anlamları
        </p>

      </div>


    </div>
  );
}
