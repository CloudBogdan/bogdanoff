// Music
const music_toogle = $(".music-toogle");
const audio = new Audio("/media/music/music2.mp3");
// audio.preload = "auto";
audio.loop = true;

let music_playing = false;

on_click(
    ()=> {

        music_playing = !music_playing;

        if (music_playing)
            audio.play();
        else
            audio.pause();

        console.log(music_playing);
        
    },
music_toogle);

// Analyser
let 
    audio_context = new AudioContext,
    analyser = audio_context.createAnalyser(),
    src = audio_context.createMediaElementSource(audio);
src.connect(analyser);
analyser.connect(audio_context.destination);

// Screen
const fullscreen_toogle = $(".fullscreen-toogle");

let is_full = false;

on_click(
    ()=> {

        is_full = !is_full;

        if (is_full)
            document.querySelector("html").requestFullscreen();
        else
            document.exitFullscreen();
        
    },
fullscreen_toogle);