export default class Recorder {

    recorder: MediaRecorder
    chunks: Blob[] = []

    constructor(mediaRecorder: MediaRecorder, chunks: Blob[]) {

        this.recorder = mediaRecorder
        this.chunks = chunks


        this.getDataAvailable()


        this.recorder.onstop = function() {
            console.log("Data available after MediaRecorder.stop() called")

            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus"} )
            chunks = []
            const audioURL = window.URL.createObjectURL(blob)
            console.log("Recorder stopped")

            // This part of the function is dedicated to the download of the recorded file
            const a = document.createElement('a')
            a.href = audioURL
            a.download = "test.ogg"
            a.click()
            window.URL.revokeObjectURL(audioURL)
        }
        
    }

    getDataAvailable() {
        this.recorder.ondataavailable = (e:BlobEvent) => {
            this.chunks.push(e.data)
        }
    }

    start() {
        this.recorder.start();
    }

    pause() {
        this.recorder.pause();
    }

    resume() {
        this.recorder.resume();
    }

    stop() {
        this.recorder.stop();
    }

}