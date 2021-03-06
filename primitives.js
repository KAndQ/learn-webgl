(function () {
    const primitives = {};

    primitives.create3DFInfo = function (gl) {
        var vertexShaderSource = `#version 300 es
// 属性是输入(in)顶点着色器的，从缓冲区接收数据
in vec4 a_position;
in vec4 a_color;

// 一个用来转换位置的矩阵
uniform mat4 u_matrix;

// 定义一个传递给片段着色器的颜色变量
out vec4 v_color;

// 所有着色器都有一个 main 函数
void main() {
  gl_Position = u_matrix * a_position;
  v_color = a_color;
}`;
        var fragmentShaderSource = `#version 300 es
precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
    outColor = v_color;
}`;

        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        var program = createProgram(gl, vertexShader, fragmentShader);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        const programInfo = { program, positionAttributeLocation, colorAttributeLocation, matrixLocation };

        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionAttributeLocation);
        // 告诉属性怎么从 positionBuffer (ARRAY_BUFFER) 中读取位置
        var size = 3; // 每次迭代使用 3 个单位的数据
        var type = gl.FLOAT; // 单位数据类型是32位的浮点型
        var normalize = false; // 不需要归一化数据
        var stride = 0; // 0 = 移动距离 * 单位距离长度sizeof(type)  每次迭代跳多少距离到下一个数据
        var offset = 0; // 从绑定缓冲的起始处开始
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        // 使用组成 'F' 的数据填充当前 ARRAY_BUFFER 缓冲
        function setGeometry(gl) {
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([
                    // left column front
                    30, 0, 0, 0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0,

                    // top rung front
                    100, 0, 0, 30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0,

                    // middle rung front
                    67, 60, 0, 30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0,

                    // left column back
                    0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

                    // top rung back
                    30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,

                    // middle rung back
                    30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,

                    // top
                    0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

                    // top rung right
                    100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30,

                    // under top rung
                    30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0,

                    // between top rung and middle
                    30, 30, 30, 30, 30, 0, 30, 60, 30, 30, 60, 30, 30, 30, 0, 30, 60, 0,

                    // top of middle rung
                    30, 60, 30, 30, 60, 0, 67, 60, 30, 67, 60, 30, 30, 60, 0, 67, 60, 0,

                    // right of middle rung
                    67, 60, 30, 67, 60, 0, 67, 90, 30, 67, 90, 30, 67, 60, 0, 67, 90, 0,

                    // bottom of middle rung.
                    30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

                    // right of bottom
                    30, 90, 30, 30, 90, 0, 30, 150, 30, 30, 150, 30, 30, 90, 0, 30, 150, 0,

                    // bottom
                    0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0,

                    // left side
                    0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
                ]),
                gl.STATIC_DRAW
            );
        }
        setGeometry(gl);
        gl.bindVertexArray(null);

        gl.bindVertexArray(vao);

        // 创建颜色缓冲区，将其与当前的 ARRAY_BUFFER 绑定
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setColors(gl);

        // 启用颜色属性
        gl.enableVertexAttribArray(colorAttributeLocation);

        // 告诉颜色属性怎么从 colorBuffer (ARRAY_BUFFER) 中读取颜色值
        var size = 3; // 每次迭代使用3个单位的数据
        var type = gl.UNSIGNED_BYTE; // 单位数据类型是无符号 8 位整数
        var normalize = true; // 标准化数据 (从 0-255 转换到 0.0-1.0)
        var stride = 0; // 0 = 移动距离 * 单位距离长度sizeof(type)  每次迭代跳多少距离到下一个数据
        var offset = 0; // 从绑定缓冲的起始处开始
        gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);

        function setColors(gl) {
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Uint8Array([
                    // left column front
                    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,

                    // top rung front
                    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,

                    // middle rung front
                    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,

                    // left column back
                    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,

                    // top rung back
                    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,

                    // middle rung back
                    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,

                    // top
                    70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210,

                    // top rung right
                    200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70,

                    // under top rung
                    210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70,

                    // between top rung and middle
                    210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70,

                    // top of middle rung
                    70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210,

                    // right of middle rung
                    100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,

                    // bottom of middle rung.
                    76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100,

                    // right of bottom
                    140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80,

                    // bottom
                    90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110,

                    // left side
                    160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220,
                ]),
                gl.STATIC_DRAW
            );
        }
        setColors(gl);
        gl.bindVertexArray(null);

        const bufferInfo = { vao, positionBuffer, colorBuffer };

        return { bufferInfo, programInfo, vertexCount: 96 };
    };

    primitives.createXYQuadInfo = function (gl, size) {
        var vertexShaderSource = `#version 300 es
precision highp float;

in vec4 a_position;
in vec2 a_texCoord;

uniform mat4 u_matrix;

out vec2 v_texCoord;

void main() {
  gl_Position = u_matrix * a_position;
  v_texCoord = a_texCoord;
}
`;

        var fragmentShaderSource = `#version 300 es
precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_image;
uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = texture(u_image, v_texCoord) * u_color;
}
`;

        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        var program = createProgram(gl, vertexShader, fragmentShader);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var imageLocation = gl.getUniformLocation(program, "u_image");
        var colorLocation = gl.getUniformLocation(program, "u_color");
        const programInfo = { program, positionAttributeLocation, texCoordAttributeLocation, matrixLocation, imageLocation, colorLocation };

        var vao = gl.createVertexArray();

        // provide texture coordinates for the rectangle.
        gl.bindVertexArray(vao);
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -size * 0.5,
                -size * 0.5,
                0,
                size * 0.5,
                -size * 0.5,
                0,
                -size * 0.5,
                size * 0.5,
                0,
                -size * 0.5,
                size * 0.5,
                0,
                size * 0.5,
                -size * 0.5,
                0,
                size * 0.5,
                size * 0.5,
                0,
            ]),
            gl.STATIC_DRAW
        );
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        gl.bindVertexArray(vao);
        var texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(texCoordAttributeLocation);
        gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        const bufferInfo = { vao, positionBuffer, texCoordBuffer };

        return { bufferInfo, programInfo, vertexCount: 6 };
    };

    this.primitives = primitives;
})();
