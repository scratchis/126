Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>"
    })
}
console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/OiOuY27nP/modal.json",modelLoaded);
function modelLoaded(){
    console.log("Modal Loaded!");
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}
function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y1c2slq4W/model.json',modelLoaded);
  }
  
  function modelLoaded() {
      console.log('Model Loaded!');
  }
  
  function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }