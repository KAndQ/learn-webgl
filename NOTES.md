# NOTES

-   数据缓冲区/顶点数组对象/属性
    -   数据缓冲区: createBuffer/bindBuffer/bufferData
    -   顶点数组对象: createVertexArray
    -   属性: 存在于顶点着色器中
    -   工作数据流: 数据缓冲区 -> 顶点数组 -> 属性
-   activeTexture
    -   按我的理解类似于插槽, 激活该插槽, 然后 bindTexture, 是将纹理放入到该插槽中
    -   只有在插槽中的纹理才能够被 gl 使用
-   gl 中纹理坐标系起始于 `左上角`, _所以会对纹理的 y 坐标做处理_;
-   gl 裁剪坐标系起始于屏幕正中, 注意, 在类似 cocos 这样的引擎中, 世界坐标系已经被统一为左下角
