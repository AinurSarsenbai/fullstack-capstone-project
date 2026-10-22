
const natural = require("natural");

const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

function analyzeSentiment(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text || "");

  if (!tokens || tokens.length === 0) {
    return { score: 0, sentiment: "neutral" };
  }

  const score = analyzer.getSentiment(tokens);

  let sentiment = "neutral";

  if (score > 0) {
    sentiment = "positive";
  } else if (score < 0) {
    sentiment = "negative";
  }

  return { score, sentiment };
}

module.exports = { analyzeSentiment };
