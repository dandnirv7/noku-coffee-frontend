"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateProductDescription(data: {
  name: string;
  category: string;
  origin: string;
  roastLevel: string;
  process: string;
}) {
  if (!data.name) {
    throw new Error("Nama produk wajib diisi untuk generate deskripsi.");
  }

  const prompt = `
    Buatkan deskripsi produk untuk toko kopi "Noku Coffee".
    - Nama: ${data.name}
    - Kategori: ${data.category}
    - Asal: ${data.origin}
    - Sangrai: ${data.roastLevel}
    - Proses: ${data.process}

    Tulis dalam 1 paragraf singkat (maksimal 3 kalimat) berbahasa Indonesia yang profesional, fokus pada profil rasa dan aroma. Jangan ada teks pengantar seperti "Berikut adalah deskripsi...". Langsung ke deskripsinya saja.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq Generation Error:", error);
    throw new Error("Gagal menghubungi layanan AI.");
  }
}
