function Node() {
    this.localMatrix = m4.indentity(); // 当前节点的局部矩阵
    this.worldMatrix = m4.indentity(); // 当前结点的世界矩阵
    this.children = []; // 子节点序列
    this.thingToDraw = undefined; // 当前节点需要绘制的物体
}

Node.prototype.setParent = function (parent) {
    // 从父节点中移除
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
            this.parent.children.splice(ndx, 1);
        }
    }

    // 添加到新的父节点上
    if (parent) {
        parent.children.append(this);
    }
    this.parent = parent;
};

Node.prototype.updateWorldMatrix = function (parentWorldMatrix) {
    if (parentWorldMatrix) {
        // 传入一个矩阵计算出世界矩阵并存入 `this.worldMatrix`。
        m4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
    } else {
        // 没有矩阵传入，直接将局部矩阵拷贝到世界矩阵
        m4.copy(this.localMatrix, this.worldMatrix);
    }

    // 计算所有的子节点
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function (child) {
        child.updateWorldMatrix(worldMatrix);
    });
};
