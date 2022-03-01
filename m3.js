this.m3 = {};

function getNum(m, row, col) {
    return m[row * 3 + col];
}

function setNum(m, row, col, v) {
    m[row * 3 + col] = v;
    return m;
}

function grid(m1, m2, row, col) {
    var num = 0;
    for (var i = 0; i < 3; ++i) {
        num += getNum(m1, row, i) * getNum(m2, i, col);
    }
    return num;
}

/**
 * 注意这里的计算顺序, 是: MatrixB(m x p) * MatrixA(p x n)
 */
this.m3.multiply = function (a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];

    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];

    return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,

        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,

        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
    ];
};

/**
 * 注意这里的计算顺序, 是: Matrix1(m x p) * Matrix2(p x n)
 */
this.m3.multiply1 = function (m1, m2) {
    var m1_00 = m1[0 * 3 + 0];
    var m1_01 = m1[0 * 3 + 1];
    var m1_02 = m1[0 * 3 + 2];
    var m1_10 = m1[1 * 3 + 0];
    var m1_11 = m1[1 * 3 + 1];
    var m1_12 = m1[1 * 3 + 2];
    var m1_20 = m1[2 * 3 + 0];
    var m1_21 = m1[2 * 3 + 1];
    var m1_22 = m1[2 * 3 + 2];

    var m2_00 = m2[0 * 3 + 0];
    var m2_01 = m2[0 * 3 + 1];
    var m2_02 = m2[0 * 3 + 2];
    var m2_10 = m2[1 * 3 + 0];
    var m2_11 = m2[1 * 3 + 1];
    var m2_12 = m2[1 * 3 + 2];
    var m2_20 = m2[2 * 3 + 0];
    var m2_21 = m2[2 * 3 + 1];
    var m2_22 = m2[2 * 3 + 2];

    return [
        // i($k), ($k)j
        m1_00 * m2_00 + m1_01 * m2_10 + m1_02 * m2_20, // i = 0, j = 0
        m1_00 * m2_01 + m1_01 * m2_11 + m1_02 * m2_21, // i = 0, j = 1
        m1_00 * m2_02 + m1_01 * m2_12 + m1_02 * m2_22, // i = 0, j = 2

        m1_10 * m2_00 + m1_11 * m2_10 + m1_12 * m2_20, // i = 1, j = 0
        m1_10 * m2_01 + m1_11 * m2_11 + m1_12 * m2_21, // i = 1, j = 1
        m1_10 * m2_02 + m1_11 * m2_12 + m1_12 * m2_22, // i = 1, j = 2

        m1_20 * m2_00 + m1_21 * m2_10 + m1_22 * m2_20, // i = 2, j = 0
        m1_20 * m2_01 + m1_21 * m2_11 + m1_22 * m2_21, // i = 2, j = 1
        m1_20 * m2_02 + m1_21 * m2_12 + m1_22 * m2_22, // i = 2, j = 2
    ];
};

/**
 * 注意这里的计算顺序, 是: Matrix1(m x p) * Matrix2(p x n)
 * 与 multiply1 的意思一样, 只是实现方式不同
 */
this.m3.multiply2 = function (m1, m2) {
    var m = [];
    for (var row = 0; row < 3; ++row) {
        for (var col = 0; col < 3; ++col) {
            setNum(m, row, col, grid(m1, m2, row, col));
        }
    }
    return m;
};

this.m3.print = function (m) {
    var s = "== matrix ==\n";
    for (var row = 0; row < 3; ++row) {
        for (var col = 0; col < 3; ++col) {
            s += getNum(m, row, col);
            if (col !== 2) {
                s += ", ";
            }
        }
        s += "\n";
    }
    s += "===========";
    console.log(s);
};

this.m3.translation = function (tx, ty) {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
};

this.m3.rotation = function (radian) {
    var c = Math.cos(radian);
    var s = Math.sin(radian);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
};

this.m3.scaling = function (sx, sy) {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
};

this.m3.identity = function () {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
};

this.m3.projection = function (width, height) {
    // 注意：这个矩阵翻转了 Y 轴，所以 0 在上方
    return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
};

this.m3.translate = function (m, tx, ty) {
    return m3.multiply(m, m3.translation(tx, ty));
};

this.m3.rotate = function (m, radian) {
    return m3.multiply(m, m3.rotation(radian));
};

this.m3.scale = function (m, sx, sy) {
    return m3.multiply(m, m3.scaling(sx, sy));
};
