export default class Timer {

    seconds: number = 0
    minutes: number = 0
    hours: number = 0
    formattedTime: string = "00:00:00"
    active: boolean = false
    timerInterval: number = 0;

    clear() {
        this.seconds = 0;
        this.minutes = 0
        this.hours = 0;
        this.active = false;
    }

   updateTimer() {

        //Can be improved
        this.active = true

        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes === 60) {
                this.minutes = 0;
                this.hours++;
            }
        }
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        
    }
}