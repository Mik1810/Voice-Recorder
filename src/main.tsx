import Recorder from "./record"
import Timer from "./timer"

let timer = new Timer();
let timerInterval: number = 0;

let recButton = document.querySelector(".recButton")! as HTMLButtonElement
const timerText = document.querySelector("#timer")!


if(navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.")

    const constraints = { audio: true }
    let chunks: Blob[] = []

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        recButton.disabled = false

        const mediaRecorder = new MediaRecorder(stream)
        const recorder = new Recorder(mediaRecorder, chunks)

    
    recButton.onclick = () => {
        if(mediaRecorder.state.match("inactive")) {
            recorder.start()
            timerText.innerHTML = "00:00:00"
            timer.clear()
            timerInterval = setInterval(()=>{
                timerText.innerHTML = timer.updateTimer()
            },1000)
        } else if(mediaRecorder.state.match("recording")) {
            recorder.stop()
            clearInterval(timerInterval)
        }
    }
    }).catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`)
    })
} else {
    console.error("getUserMedia not supported on your browser!")
}