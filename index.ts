// 1. Tokenizer (simple whitespace and punctuation)
function tokenize(text: string): string[] {
    return text
      .split(/(\s+|[,.!?])/)
      .filter(t => t.trim().length > 0);
  }
  
  // 2. Embeddings (mock 3D vectors for demo)
  const mockEmbeddings: Record<string, number[]> = {
    king: [0.9, 0.8, 0.2],
    queen: [0.92, 0.82, 0.25],
    man: [0.85, 0.78, 0.18],
    woman: [0.91, 0.81, 0.24],
    apple: [0.1, 0.3, 0.9],
  };
  
  // 3. Cosine similarity function
  function cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
  }
  
  // 4. Run demo
  const sentence = "The king and queen ate an apple.";
  const tokens = tokenize(sentence);
  
  console.log("🧩 Tokens:", tokens);
  
  tokens.forEach(token => {
    const lower = token.toLowerCase();
    if (mockEmbeddings[lower]) {
      console.log(`📌 Embedding for "${token}":`, mockEmbeddings[lower]);
    }
  });
  
  // 5. Compare similarities
  console.log("\n📊 Cosine Similarities:");
  const pairs: [string, string][] = [
    ["king", "queen"],
    ["king", "man"],
    ["queen", "woman"],
    ["king", "apple"],
    ["queen", "apple"],
  ];
  
  for (const [a, b] of pairs) {
    const embA = mockEmbeddings[a];
    const embB = mockEmbeddings[b];
    const similarity = cosineSimilarity(embA, embB);
    console.log(`${a} vs ${b} → ${similarity.toFixed(3)}`);
  }