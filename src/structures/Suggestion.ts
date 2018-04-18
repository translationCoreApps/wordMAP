import Prediction from "./Prediction";

/**
 * A translation suggestion
 */
export default class Suggestion {

  /**
   * Sorts predictions by token position
   * @param {Prediction[]} predictions - the predictions to sort
   * @return {Prediction[]}
   */
  public static sortPredictions(predictions: Prediction[]): Prediction[] {
    return predictions.sort((a, b) => {
      const aPos = a.source.tokenPosition;
      const bPos = b.source.tokenPosition;
      if (aPos < bPos) {
        return -1;
      }
      if (aPos > bPos) {
        return 1;
      }
      return 0;
    });
  }

  private predictions: Prediction[];

  constructor() {
    this.predictions = [];
  }

  /**
   * Adds a prediction to the suggestion.
   * @param {Prediction} prediction
   */
  public addPrediction(prediction: Prediction) {
    this.predictions.push(prediction);
    this.predictions = Suggestion.sortPredictions(this.predictions);
  }

  public getPredictions() {
    return this.predictions;
  }

  /**
   * Returns the compounded confidence score of all predictions within the suggestion.
   * @return {number}
   */
  public compoundConfidence() {
    let confidence = 0;
    for (const p of this.predictions) {
      confidence += p.getScore("confidence");
    }
    return confidence / this.predictions.length;
  }

  /**
   * Prints a user friendly form of the suggestion
   */
  public toString(): string {
    const result: string[] = [];
    for (const p of this.predictions) {
      result.push(`[${p.toString()}]`);
    }
    const confidence = this.compoundConfidence().toString().substring(0, 8);
    return `${confidence} ${result.join(" ")}`;
  }
}
