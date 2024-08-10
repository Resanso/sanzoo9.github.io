document.getElementById('upload').addEventListener('change', function(event) {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const file = event.target.files[0];
    const reader = new FileReader();

    // Define higher resolution
    const scaleFactor = 2; // Example: doubling the resolution
    const canvasWidth = 500 * scaleFactor;
    const canvasHeight = 500 * scaleFactor;

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            // Set rotation (in degrees) and scale factor
            const rotation = -12;  // Example: -12 degrees
            const scale = 0.32 * scaleFactor; // Scale factor adjusted for higher resolution

            // Set manual position (X and Y coordinates) where the image should be drawn
            const xPos = 90 * scaleFactor;  // X position
            const yPos = 120 * scaleFactor; // Y position

            // Clear the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw background image from canvas-container
            const container = document.getElementById('canvas-container');
            const backgroundImg = new Image();
            const backgroundUrl = getComputedStyle(container).backgroundImage.slice(5, -2); // Extract URL

            backgroundImg.src = backgroundUrl;
            backgroundImg.onload = function() {
                // Draw background image on canvas
                ctx.drawImage(backgroundImg, 0, 0, canvasWidth, canvasHeight);

                // Save the current state of the canvas
                ctx.save();

                // Translate the canvas origin to the desired position
                ctx.translate(xPos, yPos);

                // Rotate the image if needed
                ctx.rotate(rotation * Math.PI / 180);

                // Draw the image at the specified position and scale
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                // Restore the canvas to the original state
                ctx.restore();
            };
        };
    };

    reader.readAsDataURL(file);
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('imageCanvas');
    const link = document.createElement('a');
    link.download = 'processed-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
