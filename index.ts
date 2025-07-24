// 1. Tokenizer
function tokenize(text: string): string[] {
    return text
        .split(/(\s+|[,.!?])/)
        .filter(t => t.trim().length > 0);
}

// 2. Mock embeddings (3D vectors)
const mockEmbeddings: Record<string, number[]> = {
    king: [0.9, 0.8, 0.2],
    queen: [0.92, 0.82, 0.25],
    man: [0.85, 0.78, 0.18],
    woman: [0.91, 0.81, 0.24],
    throne: [0.95, 0.85, 0.3],
    golden: [0.96, 0.83, 0.28],
    dark: [0.4, 0.2, 0.9],
    cursed: [0.1, 0.3, 0.85],
};

// 3. Dot product
function dot(a: number[], b: number[]): number {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

// 4. Softmax function
function softmax(logits: number[]): number[] {
    const maxLogit = Math.max(...logits);
    const exps = logits.map(l => Math.exp(l - maxLogit));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
}

// 5. Sentence with blank
const sentence = "The king and queen sit in the";
const tokens = tokenize(sentence.toLowerCase());

console.log("🧩 Tokens:", tokens);

// 6. Use last meaningful token that has an embedding
let contextEmbedding: number[] | null = null;
for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (mockEmbeddings[token]) {
        contextEmbedding = mockEmbeddings[token];
        console.log(`📌 Context embedding from "${token}":`, contextEmbedding);
        break;
    }
}

// 7. Project to logits and softmax
if (contextEmbedding) {
    const possibleWords = ["throne", "golden", "dark", "cursed"];
    const weights = possibleWords.map(word => mockEmbeddings[word]);

    const logits = weights.map(w => dot(contextEmbedding!, w));
    const probabilities = softmax(logits);

    console.log("\n📈 Logits:", logits.map(l => l.toFixed(3)));
    console.log("🎲 Probabilities:");
    possibleWords.forEach((word, i) => {
        console.log(`  ${word}: ${probabilities[i].toFixed(3)}`);
    });

    const maxIndex = probabilities.indexOf(Math.max(...probabilities));
    const predictedWord = possibleWords[maxIndex];

    console.log(`\n💬 Predicted phrase: "The king and queen sit in the ${predictedWord}."`);
} else {
    console.log("❌ No valid embedding found in context.");
}
