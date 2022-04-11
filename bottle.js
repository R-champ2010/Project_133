function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

img="";
objects=[];

function preload(){
    img= loadImage('botle.jpg');
    
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(img, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML= "Status : Object detected";
            document.getElementById("no_objects_detected").innerHTML= "No of Objects Detected are:" + objects.length;          
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }



}

function gotResults(error, results){
    if (error) {
        console.log(error);
    }
    objects=results;
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img, gotResults);
}