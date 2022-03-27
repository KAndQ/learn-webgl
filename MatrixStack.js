
function MatrixStack() {
    this.stack = [];

    // 因为栈是空的，需要放入一个初始化矩阵
    this.restore();
}

// 抛出顶部的矩阵，重置为前一个矩阵
MatrixStack.prototype.restore = function () {
    this.stack.pop();
    // 永远不要让栈为空
    if (this.stack.length < 1) {
        this.stack[0] = m4.identity();
    }
};

// 将当前矩阵备份到栈中
MatrixStack.prototype.save = function () {
    this.stack.push(this.getCurrentMatrix());
};

// 获取当前矩阵（栈顶的矩阵）
MatrixStack.prototype.getCurrentMatrix = function () {
    // makes a copy
    // matrix 是个数组, 所以这里是对 matrix 这个数组进行复制
    return this.stack[this.stack.length - 1].slice();
};

// 设置当前矩阵
MatrixStack.prototype.setCurrentMatrix = function (m) {
    return (this.stack[this.stack.length - 1] = m);
};

// 平移当前矩阵
MatrixStack.prototype.translate = function (x, y, z) {
    if (z === undefined) {
        z = 0;
    }
    var m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.translate(m, x, y, z));
};

// 旋转当前矩阵
MatrixStack.prototype.rotateZ = function (angleInRadians) {
    var m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.zRotate(m, angleInRadians));
};

// 缩放当前矩阵
MatrixStack.prototype.scale = function (x, y, z) {
    if (z === undefined) {
        z = 1;
    }
    var m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.scale(m, x, y, z));
};

this.MatrixStack = MatrixStack;
