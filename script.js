document.getElementById('upload').addEventListener('change', function(event) {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Set rotation (in degrees) and scale factor
            const rotation = -12;  // Example: 0 degrees
            const scale = 0.32;   // Example: 1.0 (original size)

            // Set manual position (X and Y coordinates) where the image should be drawn
            const xPos = 90;  // Example: move the image 100px to the right
            const yPos = 120;   // Example: move the image 50px down

            // Clear the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

    reader.readAsDataURL(file);
});


