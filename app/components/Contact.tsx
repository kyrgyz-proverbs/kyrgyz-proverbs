export default function Contact() {
  return (
    <div
      style={{
        marginTop: 60,
        borderTop: "2px solid #ddd",
        paddingTop: 30,
        textAlign: "center",
      }}
    >

      <h2>📩 İletişim</h2>

      <p>
        Öneri, hata bildirimi veya katkı için bize ulaşabilirsiniz.
      </p>

      <p
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        ✉️{" "}
        <a
          href="mailto:info@kyrgyzproverbs.com"
          style={{
            color: "#222",
            textDecoration: "none",
          }}
        >
          lakapmakal@gmail.com
        </a>
      </p>


      <hr style={{ margin: "30px 0" }} />


      <p style={{ color: "gray" }}>
        © 2026 Kırgız Atasözleri
      </p>

    </div>
  );
}