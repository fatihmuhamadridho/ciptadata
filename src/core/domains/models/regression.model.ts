// src/core/domains/models/regression.model.ts
export class Regression {
  static fit(matrix: number[][], xCols: number[], yCol: number) {
    const y = matrix.map((row) => row[yCol]);
    const X = matrix.map((row) => xCols.map((c) => row[c]));

    // Tambah kolom konstanta
    const Xb = X.map((row) => [1, ...row]);
    const XT = this.transpose(Xb);
    const XTX = this.multiply(XT, Xb);
    const XTXInv = this.inverse(XTX);
    const XTy = this.multiply(
      XT,
      y.map((v) => [v]),
    );
    const beta = this.multiply(XTXInv, XTy).map((b) => b[0]);

    // Prediksi & residuals
    const yHat = Xb.map((row) => row.reduce((sum, val, j) => sum + val * beta[j], 0));
    const residuals = y.map((val, i) => val - yHat[i]);

    // Hitung R²
    const meanY = y.reduce((a, b) => a + b, 0) / y.length;
    const ssTot = y.reduce((s, yi) => s + (yi - meanY) ** 2, 0);
    const ssRes = residuals.reduce((s, e) => s + e ** 2, 0);
    const r2 = 1 - ssRes / ssTot;

    return { beta, yHat, residuals, r2 };
  }

  private static transpose(A: number[][]) {
    return A[0].map((_, i) => A.map((row) => row[i]));
  }
  private static multiply(A: number[][], B: number[][]) {
    return A.map((row) => B[0].map((_, j) => row.reduce((sum, val, k) => sum + val * B[k][j], 0)));
  }
  private static inverse(A: number[][]) {
    const n = A.length;
    const M = A.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);

    for (let i = 0; i < n; i++) {
      const diag = M[i][i];
      for (let j = 0; j < 2 * n; j++) M[i][j] /= diag;
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = M[k][i];
          for (let j = 0; j < 2 * n; j++) M[k][j] -= factor * M[i][j];
        }
      }
    }

    return M.map((row) => row.slice(n));
  }
}
