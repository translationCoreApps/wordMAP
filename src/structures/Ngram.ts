import Token from "./Token";

/**
 * Represents a set of zero or more tokens from a text.
 */
export default class Ngram {

  private tokens: Token[];

  /**
   * Returns the position (in units of {@link Token} ) at which this n-gram appears in the sentence.
   * @return {number} - the position
   */
  get tokenPosition() {
    if (this.tokens.length) {
      return this.tokens[0].position;
    } else {
      return 0;
    }
  }

  /**
   * Returns the position (in units of character) at which this n-gram appears in the sentence.
   * @return {number} - the position
   */
  get charPosition() {
    if (this.tokens.length) {
      return this.tokens[0].charPosition;
    } else {
      return 0;
    }
  }

  /**
   * @param {Array<Token>} [tokens=[]] - a list of tokens of which this n-gram is composed
   */
  constructor(tokens: Token[] = []) {
    this.tokens = tokens;
  }

  /**
   * Returns a human readable form of the n-gram.
   * @return {string}
   */
  public toString(): string {
    const tokenValues = [];
    for (const token of this.tokens) {
      tokenValues.push(token.toString());
    }
    return tokenValues.join(":");
  }
}
