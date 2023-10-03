import Recorder from "./record"

let recButton = document.querySelector(".recButton")! as HTMLButtonElement


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
        } else if(mediaRecorder.state.match("recording")) {
            recorder.stop()
        }
    }

    }).catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`)
    })
} else {
    console.error("getUserMedia not supported on your browser!")
}