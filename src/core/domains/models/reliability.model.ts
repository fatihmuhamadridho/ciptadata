export class Reliability {
  static cronbachAlpha(matrix: number[][], variableCols: number[]): number {
    const nItems = variableCols.length;
    if (nItems < 2) return NaN;

    // Ambil data per item
    const itemScores = variableCols.map((col) => matrix.map((row) => row[col]));

    // Varians tiap item
    const itemVariances = itemScores.map((scores) => Reliability.variance(scores));

    // Total score (sum tiap item per responden)
    const totalScores = matrix.map((row) => variableCols.reduce((sum, col) => sum + row[col], 0));

    const totalVariance = Reliability.variance(totalScores);

    return (nItems / (nItems - 1)) * (1 - itemVariances.reduce((a, b) => a + b, 0) / totalVariance);
  }

  private static variance(arr: number[]): number {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (arr.length - 1);
  }
}
