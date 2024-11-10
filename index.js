let recorder;
let recordedAudio = [];

async function setup() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    })

    recorder = new MediaRecorder(stream);

    recorder.ondataavailable(ev => {
        recordedAudio.push(ev.data);
    })
}

async function startRecording() {
    recorder.start();
}

async function stopRecording() {
    recorder.stop();
}

function performSpeechRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        document.getElementById("recording-button").setAttribute("src", "./recording.svg");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("results").innerHTML = `You said: "${transcript}"`
    };

    recognition.onend = () => {
        document.getElementById("recording-button").setAttribute("src", "./mic.svg");
    };

    document.getElementById("recording-button").addEventListener('click', () => {
        recognition.start();
    });
}

window.onload = () => {
    performSpeechRecognition();
}