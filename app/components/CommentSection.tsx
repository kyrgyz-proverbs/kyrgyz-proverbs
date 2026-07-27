"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommentSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setComments(data || []);
  };


  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Lütfen adınızı ve yorumunuzu yazın.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("comments")
      .insert([
        {
          name,
          email,
          message,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("Yorum gönderilemedi.");
      console.error(error);
      return;
    }

    alert("Yorum başarıyla gönderildi!");

    setName("");
    setEmail("");
    setMessage("");

    getComments();
  };


  return (
    <div
      style={{
        marginTop: 50,
        borderTop: "2px solid #ddd",
        paddingTop: 30,
      }}
    >

      <h2>💬 Yorumlar</h2>


      <input
        type="text"
        placeholder="Adınız"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />


      <input
        type="email"
        placeholder="E-posta (İsteğe bağlı)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />


      <textarea
        placeholder="Yorumunuzu yazın..."
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />


      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "12px 25px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 16,
          borderRadius: 8,
          border: "none",
          background: "#222",
          color: "white",
        }}
      >
        {loading ? "Gönderiliyor..." : "YORUMU GÖNDER"}
      </button>



      <hr style={{ margin: "30px 0" }} />


      <h3>
        Gelen Yorumlar ({comments.length})
      </h3>


      {/* TÜM YORUMLARIN ANA KUTUSU */}
      <div
        style={{
          maxHeight: 550,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          background: "#fafafa",
        }}
      >

        {comments.length === 0 ? (
          <p>Henüz yorum yok.</p>
        ) : (

          comments.map((comment) => (

            <div
              key={comment.id}
              style={{
                border: "1px solid #ddd",
                padding: 15,
                marginBottom: 15,
                borderRadius: 8,
                background: "#fff",
              }}
            >

              <strong>
                👤 {comment.name}
              </strong>


              <p
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {comment.message}
              </p>


              <small style={{ color: "gray" }}>
                {new Date(comment.created_at).toLocaleString("tr-TR")}
              </small>


            </div>

          ))

        )}

      </div>


    </div>
  );
}