let soundVerbose = {'normal heart sounds':"normal heart sounds (S1 and S2, heard as a 'lub dub' sound)",
    'mitral regurgitation':"mitral regurgitation (pan-systolic, high pitched 'whistling' murmur. May hear a third heart sound (S3). Radiates to the left axilla)",
    'mitral stenosis':"mitral stenosis (mid-diastolic, low pitched, rumbling murmur. Loud S1. Loud 'lub' then a 'dub der')",
    'aortic stenosis':"aortic stenosis (ejection-systolic, high-pitched murmur, crescendo-decrescendo character. Radiates to the carotids)",
    'aortic regurgitation':"aortic regurgitation (early diastolic, soft murmur)",
    'S3': 'S3: Sounds like lub de dub (Kentucky cadence), heard roughly 0.1 seconds after the second heart sound. Caused by rapid ventricular filling, causing the chordae tendinae to pull to their full length and twang like a guitar string.  indicates heart failure because the ventricles and chordae are stiff and weak and reach their limit much quicker than normal.',
    'S4': ' heard before S1, sounds like le lub dub (Tenesse cadence). Caused by turbulent flow from an atria contracting against a non-compliant (stiff or hypertrophic) ventricle'
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
        document.getElementById("play").innerHTML = "Replay (p)";
    } else {
        document.getElementById("play").innerHTML = "Play (p)";
    }

}

function autoplayEL () {
    play();
}

let autoplayAudio = false;
function changeAutoplayState (state) {
    if (state) {
        document.getElementById("autoplay").innerHTML = "Autoplay: ON (a)";
        Array.from(document.getElementsByClassName("answers")).forEach(function(elem) {
            elem.addEventListener("click", autoplayEL);
        });
    } else {
        document.getElementById("autoplay").innerHTML = "Autoplay: off (a)";
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

function giveInfo (info = "correct") {
        document.getElementById("murmur-information").innerHTML = info;
        document.getElementById("information").style.visibility = "visible";
}

let myAnswer;
let answer = function() {
    if (myAnswer === randomAudio.className) {
        alert("correct");
        updateScore(1);
        changePlayState(false);
    } else {
        alert("incorrect. Correct answer was " + soundVerbose[randomAudio.className]);
        updateScore();
        changePlayState(false);
    }
};

//just adds keybindings to answers
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
        case "6":
            document.getElementById("S3").click();
            break;
        case "7":
            document.getElementById("S4").click();
            break;
        case "p":
            document.getElementById("play").click();
            break;
        case "a":
            document.getElementById("autoplay").click();
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
