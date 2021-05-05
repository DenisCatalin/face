const video = document.getElementById('video')

const
    burger = document.querySelector(".burger-btn"),
    options = document.querySelector(".options"),
    option = document.querySelectorAll(".option"),
    bodyy = document.querySelector("body"),
    title = document.querySelector(".title"),
    darkmodeText = document.querySelector(".dark-mode h1"),
    header = document.querySelector(".header"),
    darkmode = document.querySelector("input");
let 
    optionsToggle = 0,
    rectangleToggle = 0,
    landmarksToggle = 0,
    expressionsToggle = 0,
    darkmodeOn = 0;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
    )
}

video.addEventListener('play', () => {
    console.log(faceapi.nets)
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi
        .detectAllFaces(video, new faceapi.
            TinyFaceDetectorOptions()).
            withFaceLandmarks().
            withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        if(rectangleToggle === 1) faceapi.draw.drawDetections(canvas, resizedDetections);
        else { }
        if(landmarksToggle === 1) faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        else { }
        if(expressionsToggle === 1) faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        else { }
    }, 500)
});

burger.addEventListener("click", () => {
    if(optionsToggle === 0) {
        optionsToggle = 1;
        options.style.left = "71%";
    } else {
        optionsToggle = 0;
        options.style.left = "100%";
    }
});

option.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
        switch(index) {
            case 0: {
                if(rectangleToggle === 0) {
                    toggle.classList.remove("off");
                    toggle.classList.add("on");
                    rectangleToggle = 1;
                } else {
                    toggle.classList.remove("on");
                    toggle.classList.add("off");
                    rectangleToggle = 0;
                }    
                break;
            }
            case 1: {
                if(landmarksToggle === 0) {
                    toggle.classList.remove("off");
                    toggle.classList.add("on");
                    landmarksToggle = 1;
                } else {
                    toggle.classList.remove("on");
                    toggle.classList.add("off");
                    landmarksToggle = 0;
                }   
                break;
            }
            case 2: {
                if(expressionsToggle === 0) {
                    toggle.classList.remove("off");
                    toggle.classList.add("on");
                    expressionsToggle = 1;
                } else {
                    toggle.classList.remove("on");
                    toggle.classList.add("off");
                    expressionsToggle = 0;
                }   
                break;
            }
        }
    });
});

darkmode.addEventListener("click", () => {
    if(darkmode.checked == true) {
        header.style.backgroundColor = "rgb(53, 53, 53)";
        title.style.color = "rgb(241, 241, 241)";
        darkmodeText.style.color = "rgb(241, 241, 241)";
        bodyy.style.background = "rgb(38, 38, 38)";
    } else {
        header.style.backgroundColor = "rgb(244, 244, 244)";
        title.style.color = "rgb(53, 53, 53)";
        darkmodeText.style.color = "rgb(53, 53, 53)";
        bodyy.style.background = "rgb(250, 250, 250)";
    }
});