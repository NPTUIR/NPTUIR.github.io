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
    const SketchImage = context.createImageData(canvas.width, canvas.height);

    // 打開新視窗載入草圖
    for (let i = 0; i < SketchImage.data.length; i += 4) {
          const randomValue = Math.floor(Math.random() * 256);
          SketchImage.data[i] = randomValue;
          SketchImage.data[i + 1] = randomValue;
          SketchImage.data[i + 2] = randomValue;
          SketchImage.data[i + 3] = 255;
        }
    //
    context.putImageData(SketchImage, 0, 0);
}

function transfer_RealImage(){
    const canvas = document.getElementById('real-data');
    const context = canvas.getContext('2d');
    const RealImage = context.createImageData(canvas.width, canvas.height);
    var UsedModel = document.getElementById('selected-model').value;
    if (UsedModel==='請選擇生成模型'){
        alert('請選擇生成模型');
    }
    else{
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
