# NOTES

-   数据缓冲区/顶点数组对象/属性
    -   数据缓冲区: createBuffer/bindBuffer/bufferData
    -   顶点数组对象: createVertexArray
    -   属性: 存在于顶点着色器中
    -   工作数据流: 数据缓冲区 -> 顶点数组 -> 属性
-   activeTexture
    -   按我的理解类似于插槽, 激活该插槽, 然后 bindTexture, 是将纹理放入到该插槽中
    -   只有在插槽中的纹理才能够被 gl 使用
-   gl 中纹理坐标系起始于 `左下角`, 与 PNG/BMP/JPG 等格式图片的坐标系统的 y 轴方向是**相反的**;

    ```javascript
    // 1表示翻转，0表示不翻转
    // 执行这段代码可以保证加载的 PNG 图片到纹理中与我们看到的一致.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    ```

-   gl 裁剪坐标系起始于屏幕正中, 注意, 在类似 cocos 这样的引擎中, 世界坐标系已经被统一为左下角
-   shader 的 texture 返回的颜色数值范围是 [0, 1], 传入的参数坐标也是 [0, 1];
