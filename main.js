current_status = false;

objects = [];

function preload(){
}

function setup(){
    canvas = createCanvas(410, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(410,350);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects...";

}

function draw(){
    image(video, 0, 0, 410, 350);
    if(current_status != false){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);

            console.log("Hello World.");
            document.getElementById("status").innerHTML = "Status:Objects detected.";
            document.getElementById("recogniser").innerHTML = "Detector has detected objects.";
            document.getElementById("number").innerHTML = "Number of Objects detected :" + objects.length;
            percent = floor(objects[i].confidence * 100);
            stroke(r,g,b);
            fill(r,g,b);
            strokeWeight(2);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            strokeWeight(4);
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("The model 'CocoSSD' is succesfully initialized.");
    current_status = true;
}

function gotResults(error,results){
    if(error){
        console.error();
        document.getElementById("recogniser").innerHTML = "Error_Code:2271. Check console for details.";
    }else{
        console.log(results);
        objects = results;
        document.getElementById("recogniser").innerHTML = "Recognising complete.";
    }
}