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
                const rotation = -12;  // Example: -12 degrees
                const scale = 0.32;    // Example: scale factor

                // Set manual position (X and Y coordinates) where the image should be drawn
                const xPos = 90;  // X position
                const yPos = 120; // Y position

                // Clear the canvas
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                // Draw background image from canvas-container
                const container = document.getElementById('canvas-container');
                const backgroundImg = new Image();
                backgroundImg.src = getComputedStyle(container).backgroundImage.slice(5, -2); // Extract URL
                backgroundImg.onload = function() {
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
