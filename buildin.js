this.createShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

this.createProgram = function (gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
};

this.setRectangle = function (gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
};

this.createAndSetupTexture = function (gl) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 设置材质，这样我们可以对任意大小的图像进行像素操作
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    return texture;
};

this.getGL = function (name) {
    name = name ? name : "#c";
    var canvas = document.querySelector(name);
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        return null;
    }
    return gl;
};

this.loadImage = function (url, callback) {
    var image = new Image();
    image.src = url;
    image.onload = callback;
    return image;
};

this.loadImages = function (urls, callback) {
    var images = [];
    var imagesToLoad = urls.length;

    // 每个图像加载完成后调用一次
    var onImageLoad = function () {
        --imagesToLoad;
        // 如果所有图像都加载完成就调用回调函数
        if (imagesToLoad === 0) {
            callback(images);
        }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) {
        var image = loadImage(urls[ii], onImageLoad);
        images.push(image);
    }
};

this.drawArrays = function (gl, count, primitiveType, offset) {
    primitiveType = primitiveType ? primitiveType : gl.TRIANGLES;
    offset = offset === undefined ? 0 : offset;
    gl.drawArrays(primitiveType, offset, count);
};
