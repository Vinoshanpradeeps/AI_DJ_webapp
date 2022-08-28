song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Pose net is initialized.");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + "left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    if(scoreLeftWrist > 0.2){

    fill("#00ffff");
    stroke("000000");
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWrist = Number(leftWristY);
    remove_decimals = floor(inNumberLeftWrist);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
    fill("#00ffff");
    stroke("#000000");

    if(scoreRightWrist > 0.2){

    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5";
        song.rate(0.5);
    }else if(rightWristY > 100 && rightWristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1";
        song.rate(1);
    }else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5";
        song.rate(1.5);
    }else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML  = "Speed = 2";
        song.rate(2);
    }else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5";
        song.rate(2.5);
    }
}
}
function play(){
    song.play();
    song.setVolume(0.9);
    song.rate(1)
}
function stop(){
    song.stop();
}
function pause(){
    song.pause();
}