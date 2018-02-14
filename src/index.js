var haruConfig = {
    "model" : "./assets/haru/haru_01.moc",
    "textures" : [
        "assets/haru/haru_01.1024/texture_00.png",
        "assets/haru/haru_01.1024/texture_01.png",
        "assets/haru/haru_01.1024/texture_02.png"
    ]
};

var motions = [
    {
        "id" : "sing",
        "path" : "assets/haru/motions/idle_01.json"
    },
    {
        "id" : "smile",
        "path" : "assets/haru/motions/idle_00.json"
    },
    {
        "id" : "unknown",
        "path" : "assets/haru/motions/idle_02.json"
    }
];

var canvas = document.getElementById("haru");

var vocalAudio = document.getElementById("vocal");

var song = document.getElementById("song");

var haru = null;

var musicPlayer = new MusicPlayer();

musicPlayer.setVocal(vocalAudio);

musicPlayer.setSong(song);

musicPlayer.init();

function initHaru() {
    
    haru = new Haru(haruConfig, canvas, function() {
        haru.subscribe(musicPlayer);
        haru.enableLookAtMouse();
        haru.setMotion(motionMgr.next(), true);

        canvas.addEventListener('click', function() {
            haru.setMotion(motionMgr.getMotionById('sing'), true);
            if (!musicPlayer.isPlaying()) {
                musicPlayer.play();
            }
        });
        animate();
    });
}






var motionMgr = new MotionManager(motions, initHaru);




function animate(seconds) {
    
    if (haru != null && haru.completed) {
        haru.setArmMode(0);
        haru.update(seconds);
        haru.draw();
    }

    var requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;

    requestAnimationFrame(animate);

}

