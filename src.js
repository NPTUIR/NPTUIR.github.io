
var img = new Image();

function load_SketchImage(){
    const canvas = document.getElementById('sketch-data');
    const context = canvas.getContext('2d');
    // var fs = require('fs');
    var r1 = Math.floor(Math.random()*31+1);
    var s1 = r1.toString();
    img.src = "./docs/sketchdata/"+s1+"_B.jpg";
    img.onload = function() {
      context.drawImage(img, 0, 0);
    };
}

function transfer_RealImage(){
    const canvas = document.getElementById('real-data');
    const context = canvas.getContext('2d');
    const RealImage = context.createImageData(canvas.width, canvas.height);
    var UsedModel = document.getElementById('selected-model').value;
    if (UsedModel==='請選擇生成模型'){
        alert('請選擇生成模型');
    }
    else if (UsedModel==="Pix2Pix"){
        img.src = img.src.replace('sketchdata', 'generated_data/Pix2Pix');
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
    }
    else if (UsedModel==="CVAE"){
        img.src = img.src.replace('sketchdata', 'generated_data/CVAE');
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
    }
    else if (UsedModel==="Cycle-GAN"){
        img.src = img.src.replace('sketchdata', 'generated_data/Cycle-GAN');
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
    }
    else if (UsedModel==="CGAN"){
        img.src = img.src.replace('sketchdata', 'generated_data/CGAN');
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
    }
    else{
        alert(UsedModel);
        for (let i = 0; i < RealImage.data.length; i += 4) {
              const randomValue = Math.floor(Math.random() * 256);
              RealImage.data[i] = randomValue;
              RealImage.data[i + 1] = randomValue;
              RealImage.data[i + 2] = randomValue;
              RealImage.data[i + 3] = 255;
            }
        //
        context.putImageData(RealImage, 0, 0);
    }

}
