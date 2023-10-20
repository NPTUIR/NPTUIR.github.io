

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
    var UsedModel = document.getElementById('selected-model').value;
    if (UsedModel==='請選擇生成模型'){
        alert('請選擇生成模型');
    }
    else if (UsedModel==='Pix2Pix'){
        const imgElement = document.getElementById('sketch-data');
        const tfImg = tf.browser.fromPixels(imgElement, 3);
        let tensor = tfImg.reshape([1, 256, 256, 3]);
        tensor = tensor.div(tf.scalar(255));
        try{
            alert('123');
            const pix2pix_model = await tf.loadLayersModel('./model/pix2pix_generator/model.json');//Functional 改成 Model
            alert('123');
            let pred = pix2pix_model.predict(tensor);
            alert('123');
            pred = pred.add(tf.scalar(1)).mul(tf.scalar(127.5));
            const data = pred.dataSync();
            const uint8Data = new Uint8ClampedArray(data);
            const alphaData = new Uint8ClampedArray(uint8Data.length / 3 * 4).fill(255);
            const rgbaData = new Uint8ClampedArray(uint8Data.length / 3 * 4);
            for (let i = 0; i < uint8Data.length / 3; i++) {
                rgbaData[i * 4] = uint8Data[i * 3];
                rgbaData[i * 4 + 1] = uint8Data[i * 3 + 1];
                rgbaData[i * 4 + 2] = uint8Data[i * 3 + 2];
                rgbaData[i * 4 + 3] = alphaData[i * 4 + 3];
            }
            const imageData = new ImageData(rgbaData, 256, 256);
            context.putImageData(imageData, 0, 0);
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
