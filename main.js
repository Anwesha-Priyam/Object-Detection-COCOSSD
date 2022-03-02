Status="";

Objects=[];

function preload()
{
    friends=loadImage("testimage.png");
}

function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Staus: Detecting objects..."
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    Status=true;

    objectDetector.detect(friends, gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        Objects=results
    }
}

function draw()
{
    image(friends, 0, 0, 400, 400);
    if(Status != "")
    {
        for(i = 0 ; i < Objects.length ; i++)
        {
            document.getElementById("status").innerHTML="Staus: Objects Detected";
            fill("#AB8E7C");
            percent=floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%", Objects[i].x, Objects[i].y);
            noFill();
            stroke("Skyblue");
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}