var playing = false;
const media = document.querySelector('#station_9_video');
$('#videoWelcomePlayBtn').click(function (event){
    event.preventDefault(); 
    PlayWelcome();
})

media.addEventListener('ended', (event) => {
    media.pause();
    $("#videoWelcomePlayBtn").html("<strong>Replay</strong>")
    playing = false;
});

function PlayWelcome(){
    if (!playing){
        media.play();
        $("#videoWelcomePlayBtn").html("<strong>Pause</strong>")
        playing = true;
    } else {
        media.pause();
        $("#videoWelcomePlayBtn").html("<strong>Play</strong>")
        playing = false;
    }
}

