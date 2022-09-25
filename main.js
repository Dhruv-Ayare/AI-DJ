song="";

leftwristX=0;
leftwristY=0;

rightwrsitX=0;
rightwristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = "+scoreLeftWrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftwristX+", Left Wrist Y = "+leftwristY);

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightwristX+", Right Wrist Y = "+rightwristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreRightWrist>0.2){

    
    circle(rightwrsitX,rightwristY,20);
    if(rightwristY>0 && rightwristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightwristY>100 && rightwristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightwristY>200 && rightwristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }else if(rightwristY>400){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist>0.2){

        circle(leftwristX,leftwristY,20);
    inNumberleftwristY=Number(leftwristY);
    removeDecimals=floor(inNumberleftwristY);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}