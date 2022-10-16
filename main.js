peter_pan = "music2.mp3";
harry_potter = "music.mp3";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftwrist = 0;
song_file = "";

function preload() {
    peter_pan = loadSound("music2.mp3");
    harry_potter = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function draw() {
    image(video,0,0,600,530);

    fill("#00e1ff");
    stroke("#ff0000");

    song_file = peter_pan.isPlaying();

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        harry_potter.spot();
        if(song_file == false){
            peter_pan.play();
        }

}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score; 
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}
}