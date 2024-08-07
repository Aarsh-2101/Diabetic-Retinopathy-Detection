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
        document.querySelectorAll('.color-radio span').forEach((span) => {
            span.classList.remove('selected-color');
        });
        c.nextElementSibling.classList.add('selected-color');
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

    // Box size
    const boxSizeElement = document.querySelector("#blockSize");
    let gridSize = boxSizeElement.value;
    boxSizeElement.oninput = (e) => {
        gridSize = e.target.value;
    };

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
        if (e.button === 0) { // Left mouse button clicked
            isDrawing = true;
            getPosition(e);
            drawGridBox(context, coord.x, coord.y, gridSize);
        }
        
        
    };

    canvasElement.onmousemove = (e) => {
        if (isDrawing && e.buttons === 1) {
            getPosition(e);
            drawGridBox(context, coord.x, coord.y, gridSize);
        }
    };

    canvasElement.onmouseup = function () {
        isDrawing = false;
    };

    canvasElement.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default right-click menu
        getPosition(e);
        eraseGridBox(context, coord.x, coord.y, gridSize);
    });

    function drawGridBox(ctx, x, y, size) {
        const gridX = Math.floor(x / size) * size;
        const gridY = Math.floor(y / size) * size;
        ctx.fillStyle = color;
        ctx.fillRect(gridX, gridY, size, size);
    }

    function eraseGridBox(ctx, x, y, size) {
        const gridX = Math.floor(x / size) * size;
        const gridY = Math.floor(y / size) * size;
        ctx.clearRect(gridX, gridY, size, size);
    }
}

$(document).ready(function() {
    let image = document.getElementById("original_image");
    if (image.complete) {
        console.log('Image already loaded');
        drawOnImage(image);
    } else {
        image.onload = () => {
            console.log('Image loaded');
            drawOnImage(image);
        };
    }
    // Draw the initial grid
    drawGrid(blockSizeSlider.value);
});

// Get the grid canvas and context
var gridCanvas = document.getElementById('grid-canvas');
var gridContext = gridCanvas.getContext('2d');
// Get the block size slider
var blockSizeSlider = document.getElementById('blockSize');

// Function to draw grid lines
function drawGrid(blockSize) {
    canvas = document.getElementById('canvas');
    gridCanvas.width = canvas.width;
    gridCanvas.height = canvas.height;
    gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    // Draw the grid lines
    for (var x = 0; x <= gridCanvas.width; x += Number(blockSize)) {
        gridContext.moveTo(x, 0);
        gridContext.lineTo(x, gridCanvas.height);
    }
    for (var y = 0; y <= gridCanvas.height; y += Number(blockSize)) {
        gridContext.moveTo(0, y);
        gridContext.lineTo(gridCanvas.width, y);
    }
    gridContext.strokeStyle = 'black';
    gridContext.stroke();
}
// Listen for changes to the block size slider
blockSizeSlider.addEventListener('input', function() {
    drawGrid(blockSizeSlider.value);
});

// Check if the canvas is blank
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return !pixelBuffer.some(color => color !== 0);
}

function areAllColorsUsed(canvas) {
    // Get the colors from the color radio buttons
    const colorElements = document.getElementsByName("colorRadio");
    const availableColors = Array.from(colorElements).map(c => c.value);
    // console.log(availableColors);
    // Get the colors drawn on the canvas
    const drawnColors = getCanvasColors(canvas);
    // console.log(drawnColors);
    // Check if all available colors are used
    return availableColors.every(color => drawnColors.includes(color));
}

function getCanvasColors(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const colors = {};

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        const color = rgbToHex(red, green, blue);

        if (alpha !== 0) { // Ignore transparent pixels
            colors[color] = true;
        }
    }

    return Object.keys(colors);
}

function rgbToHex(red, green, blue) {
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

// Save the canvas image
document.getElementById("prediction-form").addEventListener("submit", function (event) {
    const canvasElement = document.getElementById("canvas");
    // console.log(areAllColorsUsed(canvasElement));
    if (!isCanvasBlank(canvasElement)) {
        event.preventDefault(); // Prevent the form from submitting normally
        if (areAllColorsUsed(canvasElement)) {

            // Get the current URL
            let url = window.location.href;
            // Use the URL API to parse the URL
            let urlObj = new URL(url);
            // Get the submission_id
            let parts = urlObj.pathname.split('/');
            let submissionId = parts[parts.length - 2];

            const imageDataUrl = canvasElement.toDataURL(); // Convert canvas to data URL

            fetch('/update_canvas_image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val(),
                },
                body: JSON.stringify({ imageDataUrl: imageDataUrl, submissionId: submissionId })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Image uploaded successfully');
                        event.target.submit(); // Submit the form after the image is saved
                    } else {
                        console.error('Failed to upload image');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please use all available colors before submitting.');
        }
    } else {
        console.log('Canvas is blank');
    }
});
