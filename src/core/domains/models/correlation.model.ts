export class Correlation {
  static pearson(x: number[], y: number[]): number {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let denX = 0;
    let denY = 0;

    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }

    return num / Math.sqrt(denX * denY);
  }

  static buildTable(
    matrix: number[][],
    variables: { name: string; column: number }[],
  ): Record<string, number | string>[] {
    const result: Record<string, number | string>[] = [];

    for (let i = 0; i < variables.length; i++) {
      const rowObj: Record<string, number | string> = {
        variable: variables[i].name,
      };

      for (let j = 0; j < variables.length; j++) {
        const colI = variables[i].column;
        const colJ = variables[j].column;

        // row-major → ambil array per kolom
        const arrI = matrix.map((r) => r[colI]);
        const arrJ = matrix.map((r) => r[colJ]);

        const r = Correlation.pearson(arrI, arrJ);
        rowObj[variables[j].name] = r.toFixed(3);
      }

      result.push(rowObj);
    }

    return result;
  }
}
