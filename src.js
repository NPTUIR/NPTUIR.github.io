// import * as tf from '@tensorflow/tfjs';
// async function init(){
//     pix2pix_model= await tf.loadLayersModel('./model/pix2pix_generator/model.json');
//     console.log('load model...');
// }
// const pix2pix_model = await tf.loadLayersModel('./model/pix2pix_model/model.json');
// alert('load!');

function elf_close(){
    const x = document.getElementById('elf');
    const y = document.getElementById('elf-hidden');
     if (x.style.display==="block"){
         x.style.display="none";
         y.style.display="block";
     }
}
function elf_open(){
    const x = document.getElementById('elf');
    const y = document.getElementById('elf-hidden');
     if (y.style.display==="block"){
         x.style.display="block";
         y.style.display="none";
     }
}
function load_SketchImage(){
    const canvas = document.getElementById('sketch-data');
    const context = canvas.getContext('2d');
    // var fs = require('fs');

    var img = new Image();
    var r1 = Math.floor(Math.random()*31+1);
    var s1 = r1.toString();
    img.src = "./sketchdata/"+s1+"_B.jpg";
    img.onload = function() {
      context.drawImage(img, 0, 0);
    };
}

async function transfer_RealImage(){
    const canvas = document.getElementById('real-data');
    const context = canvas.getContext('2d');
    const RealImage = context.createImageData(canvas.width, canvas.height);
    var UsedModel = document.getElementById('selected-model').value;
    if (UsedModel==='請選擇生成模型'){
        alert('請選擇生成模型');
    }
    else if (UsedModel==='Pix2Pix'){
        const imgElement = document.getElementById('sketch-data');
        const tfImg = tf.browser.fromPixels(imgElement, 3);
        let tensor = tfImg.reshape([1, 256, 256, 3]);
        tensor=tensor.div(tf.scalar(255));
        try{
            pix2pix_model = await tf.loadLayersModel('./model/pix2pix_model/model.json');
            const pred = pix2pix_model.predict(tensor);
            context.putImageData(pred, 0, 0);
        }
        catch (error) {
            var blob = new Blob([error], {type: "text/plain;charset=utf-8"});
            alert(error);
            saveAs(blob, "error.txt");

        }

    }
    else{
        alert(UsedModel);
        //tensorflow.js load .h5 predict img
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
