const density = "@#W$9876543210?!abc;:+=-,._                     ";

let video;
let asciiDiv;

function setup() 
{
    noCanvas();
    video = createCapture(VIDEO);
    video.size(110, 52);
    asciiDiv = createDiv();
}

function draw() 
{
    video.loadPixels();
    let asciiImage = "";

    for (let j = 0; j < video.height; j++) 
    {
        for (let i = 0; i < video.width; i++) 
        {
            // get pixel array and map rgb values of each pixels to a character
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            
            const avg = (r + g + b) / 3; // look at brightness value of each pixels
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, 0, len));
            const c = density.charAt(charIndex);

            if (c == " ") asciiImage += "&nbsp;";
            else asciiImage += c;
        }

        asciiImage += '<br/>'; // line break after each rows
    }

    asciiDiv.html(asciiImage);
}
