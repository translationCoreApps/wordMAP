import Algorithm from "../Algorithm";
import EngineIndex from "../index/EngineIndex";
import Index from "../index/Index";
import Alignment from "../structures/Alignment";
import Prediction from "../structures/Prediction";
import Token from "../structures/Token";

/**
 * This algorithm calculates the relative position of n-grams in a sentence.
 * Only literal translations are supported.
 */
export default class AlignmentPosition implements Algorithm {
  public name = "alignment position";

  public execute(predictions: Prediction[], corpusIndex: EngineIndex, savedAlignmentsIndex: EngineIndex, unalignedSentencePair: [Token[], Token[]]): Prediction[] {
    // TODO: is the position based on units of n-gram, token, or character?
    // const alignments = predictions.read("alignments") as Alignment[];
    //
    // for (const a of alignments) {
    //   const delta = Math.abs(a.source.tokenPosition - a.target.tokenPosition);
    //   const weight = 1 - delta;
    //
    //   // TODO: store this in the frequencies index we generated in the ngram frequency algorithm.
    // }

    return predictions;
  }

}