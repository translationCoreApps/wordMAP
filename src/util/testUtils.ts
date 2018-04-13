import Algorithm from "../Algorithm";
import CorpusIndex from "../index/CorpusIndex";
import SavedAlignmentsIndex from "../index/SavedAlignmentsIndex";
import Lexer from "../Lexer";
import Alignment from "../structures/Alignment";
import Ngram from "../structures/Ngram";
import Prediction from "../structures/Prediction";
import Token from "../structures/Token";

/**
 * converts some strings into corpus.
 * @param {string} source
 * @param {string} target
 * @return {Token[][][]}
 */
export function makeCorpus(source: string, target: string): Token[][][] {
  const sourceCorpusTokens = Lexer.tokenize(source);
  const targetCorpusTokens = Lexer.tokenize(target);
  return [
    [sourceCorpusTokens],
    [targetCorpusTokens]
  ];
}

/**
 * converts some strings into an unaligned sentence pair
 * @param {string} source
 * @param {string} target
 * @return {Token[][]}
 */
export function makeUnalignedSentence(source: string, target: string): [Token[], Token[]] {
  return [
    tokenizeMockSentence(source),
    tokenizeMockSentence(target)
  ];
}

/**
 * Generates a sample alignment from a sentence
 * @param {String} sentence - a raw sentence from which to generate a mock alignment
 * @return {Array<Alignment>} a mock alignment
 */
export function alignMockSentence(sentence: string): Alignment[] {
  let alignments: Alignment[] = [];
  const tokens = tokenizeMockSentence(sentence);
  while (tokens.length) {
    const ngramLength = randNgramLength(tokens.length, 1);
    alignments = [
      ...alignments,
      alignMockTokens(tokens.slice(0, ngramLength))
    ];
    tokens.splice(0, ngramLength);
  }

  return alignments;
}

/**
 * Creates a mock alignment from two strings.
 * The strings will be tokenized and converted to n-grams in the alignment
 * @param {string} source
 * @param {string} target
 * @return {Alignment}
 */
export function makeMockAlignment(source: string, target: string): Alignment {
  const sourceTokens = Lexer.tokenize(source);
  const targetTokens = Lexer.tokenize(target);
  return new Alignment(new Ngram(sourceTokens), new Ngram(targetTokens));
}

/**
 * Creates a mock prediction from two strings
 * @param {string} source
 * @param {string} target
 * @param {number} confidence - the confidence of the prediction
 * @return {Prediction}
 */
export function makeMockPrediction(source: string, target: string, confidence: number): Prediction {
  const prediction = new Prediction(makeMockAlignment(source, target));
  prediction.setScore("confidence", confidence);
  return prediction;
}

/**
 * Generates a sample alignment
 * @param {Array<Token>} tokens - An array of tokens to align
 * @return {Alignment} a sample alignment
 */
function alignMockTokens(tokens: Token[]): Alignment {
  const source = new Ngram(tokens);
  const flippedTokens: Token[] = [];
  for (const token of tokens) {
    flippedTokens.push(
      new Token(token.toString().split("").reverse().join(""))
    );
  }
  const target = new Ngram(flippedTokens);
  return new Alignment(source, target);
}

/**
 * Reverses the character order of words in a sentence
 * @param {string} sentence
 * @return {string}
 */
export function reverseSentenceWords(sentence: string): string {
  return sentence.split(" ").map((word: string) => {
    return word.split("").reverse().join("");
  }).join(" ");
}

/**
 * Converts a sentence to an array of Tokens
 * @param {String} sentence - a raw sentence to convert into tokens
 * @return {Array<Token>} an array of tokens
 */
export function tokenizeMockSentence(sentence: string): Token[] {
  return Lexer.tokenize(sentence);
}

/**
 * Generates the length of an n-gram.
 * n-grams are limited to lengths of 3.
 * @param {number} numTokens - the number of tokens available for use in the n-gram.
 * @param {number} [maxLength=3] - the maximum length of the n-gram
 * @return {number} an n-gram size
 */
function randNgramLength(numTokens: number, maxLength: number = 3): number {
  const ceiling = Math.min(numTokens, maxLength);
  return Math.floor(Math.random() * ceiling) + 1;
}

export class MockAlgorithm implements Algorithm {
  public name: string = "mock algorithm";

  public execute(predictions: Prediction[], cIndex: CorpusIndex, saIndex: SavedAlignmentsIndex): Prediction[] {
    return predictions;
  }
}