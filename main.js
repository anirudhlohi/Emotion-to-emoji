prediction1 = "";
prediction2 ="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality:90
});
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img src="+data_uri+" id='captured_img'>"
    });
    
}
console.log("ml5 version:", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fXSn2eOMO/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data1 = "The first prediction is "+prediction1;
    var speak_data2 = "And the second prediction is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img,gotResults);
    
}
function gotResults(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        document.getElementById("emotion_name1").innerHTML = prediction1;
        document.getElementById("emotion_name2").innerHTML = prediction2;
        speak();
        if(prediction1 == "Happy"){
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }
        if(prediction1 == "Sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;"
        }
        if(prediction1 == "Angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;"
        }
        if(prediction2 == "Happy"){
            document.getElementById("emoji_2").innerHTML = "&#128522;";
        }
        if(prediction2 == "Sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;"
        }
        if(prediction2 == "Angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;"
        }
    }
}