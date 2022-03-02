this.matrix = {};

function getNumWithMatrix(m, row, col) {
    return m[row][col];
}

function setNumWithMatrix(m, row, col, v) {
    if (m[row] === undefined) {
        m[row] = [];
    }
    m[row][col] = v;
    return m;
}

/**
 * 矩阵乘法, 是: Matrix1(m x p) * Matrix2(p x n), m1/m2 是二维数组.
 */
this.matrix.multiply = function (m1, m2) {
    const mat = [];
    const m = m1.length;
    const n = m2[0].length;
    const p = m1[0].length;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            let num = 0;

            for (let k = 0; k < p; ++k) {
                num += getNumWithMatrix(m1, i, k) * getNumWithMatrix(m2, k, j);
            }

            setNumWithMatrix(mat, i, j, num);
        }
    }

    return mat;
};
