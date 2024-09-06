document.getElementById('imageInput').addEventListener('change', handleImage, false);
document.getElementById('removeBackground').addEventListener('click', removeBackground, false);
document.getElementById('download').addEventListener('click', downloadImage, false);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let imgElement;

function handleImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        imgElement = new Image();
        imgElement.onload = function() {
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);
        }
        imgElement.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function removeBackground() {
    if (!imgElement) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Simple color thresholding example: Replace white background with transparency
        if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
            data[i + 3] = 0; // Set alpha to 0 for transparency
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'image-without-background.png';
    link.click();
}
