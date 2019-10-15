let soundVerbose = {'normal heart sounds':"normal heart sounds (S1 and S2, heard as a 'lub dub' sound)",
    'mitral regurgitation':"mitral regurgitation (pan-systolic, high pitched 'whistling' murmur. May hear a third heart sound (S3). Radiates to the left axilla)",
    'mitral stenosis':"mitral stenosis (mid-diastolic, low pitched, rumbling murmur. Loud S1. Loud 'lub' then a 'dub der')",
    'aortic stenosis':"aortic stenosis (ejection-systolic, high-pitched murmur, crescendo-decrescendo character. Radiates to the carotids)",
    'aortic regurgitation':"aortic regurgitation (early diastolic, soft murmur)"
};

let correctCounter = 0, totalCounter = 0;

function quiet () {
    Array.from(document.getElementsByTagName("audio")).forEach((elem) => {elem.pause()});
}

let randomAudio;
function generateAudio () {
    quiet();
    randomAudio = Array.from(document.getElementsByTagName("audio"));
    randomAudio = randomAudio[Math.floor(Math.random()*randomAudio.length)];
}



function changePlayState (state) {
    if (state) {
        document.getElementById("play").innerHTML = "Replay";
    } else {
        document.getElementById("play").innerHTML = "Play";
    }

}

function autoplayEL () {
    play();
}

let autoplayAudio = false;
function changeAutoplayState (state) {
    if (state) {
        document.getElementById("autoplay").innerHTML = "Autoplay: ON";
        Array.from(document.getElementsByClassName("answers")).forEach(function(elem) {
            elem.addEventListener("click", autoplayEL);
        });
    } else {
        document.getElementById("autoplay").innerHTML = "Autoplay: off";
        Array.from(document.getElementsByClassName("answers")).forEach(function(elem) {
            elem.removeEventListener("click", autoplayEL);
        });
    }
}


function play() {
    quiet();
    randomAudio.currentTime = 0;
    randomAudio.play();
    changePlayState(true);
}

function updateScore (diff = 0) {
    correctCounter += diff;
    totalCounter++;
    document.getElementById("counter").innerHTML = "Score: " + correctCounter + "/" + totalCounter;
}


let myAnswer;
function answer () {
    if (myAnswer === randomAudio.className) {
        alert("correct");
        updateScore(1);
        changePlayState(false);
    } else {
        alert("incorrect. Correct answer is " + soundVerbose[randomAudio.className]);
        updateScore();
        changePlayState(false);
    }
}


document.onkeypress = function (event) {

    switch(event.key) {
        case "1":
            document.getElementById("NHS").click();
            break;
        case "2":
            document.getElementById("MS").click();
            break;
        case "3":
            document.getElementById("MR").click();
            break;
        case "4":
            document.getElementById("AS").click();
            break;
        case "5":
            document.getElementById("AR").click();
            break;
    }
};

window.onload = function () {
    generateAudio();
    console.log('works');
    document.getElementById("autoplay").onclick = function () {
        autoplayAudio = !autoplayAudio;
        changeAutoplayState(autoplayAudio);
    }
};
