import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';
// CRIEI UMA FUNÇÃO QUE CARREGA O AUDIO, RETORNA UMA OUTRA FUNÇÃO QUE TOCA O AUDIO
export const loadBeep = () => {
    const audio = new Audio(gravitationalBeep);
    audio.load();

    return () => {
        audio.currentTime = 0;
        audio.play();
    }
}