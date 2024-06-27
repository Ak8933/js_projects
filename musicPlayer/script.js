const playIcon = document.querySelector('.fa-play');
const currentTimeHtml = document.querySelector(".current-time");
const durationHtml = document.querySelector(".duration");

    this.tracks = [
        {
            name: "Let me down slowly",
            artist: "Alec Benjamin",
            cover: "alec.jpg",
            source: "Let me down slowly.mp3",
        },
        {
            name: "Let me love you",
            artist: "DJ Snake/Justin Beiber",
            cover: "dj.jpg",
            source: "Let me love you.mp3",
        },
        {
            name: "Perfect",
            artist: "Ed Sheeran",
            cover: "ed.jpg",
            source: "Perfect.mp3",
        },
        {
            name: "Kaun Tujhe",
            artist: "Palak Muchhal",
            cover: "Kaun.jpg",
            source: "Kaun Tujhe.mp3",
        },
        {
            name: "Shape of you",
            artist: "Ed Sheeran",
            cover: "ed.jpg",
            source: "Shape of You.mp3",
        },
        {
            name: "Insane",
            artist: "AP Dhillon",
            cover: "ap.jpg",
            source: "Insane.mp3",
        }
        
    ];

// Initial state values
let audio = null
let barWidth = null
let duration = null
let currentTime = null
let isTimerPlaying = false
let currentTrackIndex = 0
let currentTrack = tracks[0]

const img = document.querySelector('.img');
const title = document.querySelector(".audio-title");
const singer = document.querySelector(".audio-singer");

// Set initial state values
audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

const playBtn = document.querySelector(".play");
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

const progressBarContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const progressHead = document.querySelector('.progress-head');
progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;
});

const skipForward = document.querySelector(".skip-forward");
skipForward.addEventListener('click', () => {

    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});
const skipBack = document.querySelector(".skip-back");
skipBack.addEventListener('click', () => {
    // if (currentTrackIndex > 0) {
    //     currentTrackIndex--;
    // } else {
    //     this.currentTrackIndex = this.tracks.length - 1;
    // }
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;

        if (dursec < 10) dursec = "0" + dursec;

        if (curmin < 10) curmin = "0" + curmin;

        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');


        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () { };


























