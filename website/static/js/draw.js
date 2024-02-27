let coord = {x:0 , y:0};  

function getPosition(event){ 
    const rect = canvas.getBoundingClientRect();
    coord.x = event.clientX - rect.left; 
    coord.y = event.clientY - rect.top; 
} 
    
const colorElement = document.getElementsByName("colorRadio");
let color;
colorElement.forEach((c) => {
    if (c.checked) color = c.value;
});

colorElement.forEach((c) => {
    c.onclick = () => {
        color = c.value;
    };
});

// Transparency
const transparencyElement = document.querySelector("#transparency");
let transparency = transparencyElement.value;
transparencyElement.oninput = (e) => {
    transparency = e.target.value;
    document.getElementById("shap_image").style.opacity = transparency;
};

function drawOnImage(image = null) {
    const canvasElement = document.getElementById("canvas");
    const context = canvasElement.getContext("2d");

    // if an image is present,
    // the image passed as parameter is drawn in the canvas
    if (image) {
        const imageWidth = image.width;
        const imageHeight = image.height;

        // rescaling the canvas element
        canvasElement.width = imageWidth;
        canvasElement.height = imageHeight;
        // context.drawImage(image, 0, 0, imageWidth, imageHeight);
        context.globalAlpha = 0; // Change this value to adjust the transparency
        context.drawImage(image, 0, 0, imageWidth, imageHeight);
        context.globalAlpha = 1; // Reset the transparency to the default value
    }

    let isDrawing;

    canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.lineCap = "round";
        getPosition(e);
        context.moveTo(coord.x, coord.y);
    };

    canvasElement.onmousemove = (e) => {
        if (isDrawing) {
            getPosition(e);
            context.lineTo(coord.x, coord.y);
            context.stroke();
        }
    };

    canvasElement.onmouseup = function () {
        isDrawing = false;
        context.closePath();
    };
}

$(document).ready(function() {
    let image = document.getElementById("original_image");
    image.onload = () => {
        drawOnImage(image);
    };
});