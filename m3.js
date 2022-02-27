this.m3 = {};

function getNum(m, row, col) {
    return m[row * 3 + col];
}

function setNum(m, row, col, v) {
    m[row * 3 + col] = v;
    return m;
}

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

this.m3.grid = function (m1, m2, row, col) {
    var num = 0;
    for (var i = 0; i < 3; ++i) {
        num += getNum(m1, row, i) * getNum(m2, i, col);
    }
    return num;
};

/**
 * @param m1 3x3 matrix, linear array.
 * @param m2 3x3 matrix, linear array.
 * @return matrix, linear array.
 */
this.m3.multiply2 = function (m1, m2) {
    var m = [];
    for (var row = 0; row < 3; ++row) {
        for (var col = 0; col < 3; ++col) {
            setNum(m, row, col, m3.grid(m1, m2, row, col));
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
