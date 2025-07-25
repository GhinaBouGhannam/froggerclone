// MusicPlayer sprite to play specific audio on specific volume
class MusicPlayer extends Sprite {
    constructor(src, loop = true, volume = 0.5) {
        super();
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
        this.playing = false;
        this.loop = loop; // check if the audio loops or not
        this.ended = false;
        this.audio.onended = () => {
            this.ended = true;
        };
    }
    // play the audio
    play() {
        this.audio.currentTime = 0; // start from the beginning
        this.audio.play() // try to play the music
            .catch(e => console.error("Audio play failed:", e)); // manage error in case the audio fails to play
        this.playing = true;
    }

    // pause the audio
    pause() {
        this.audio.pause();
        this.playing = false;
    }

    // resume the audio
    resume() {
        this.audio.play()
            .catch(e => console.error("Audio resume failed:", e));// manage error in case the audio fails to play
        this.playing = true;
    }

    // check if the audio ended
    isEnded() {
        return this.hasEnded;
    }

    update(sprites, keys) {
        // case paused pause music
        if (sprites[sprites.length - 1] instanceof PausePage) {
            this.pause();
        }
        // resume the audio if it loops and is no more playing
        else if (!this.playing && this.loop) {
            this.resume()
        }
    }

    draw(ctx) {
    }
}