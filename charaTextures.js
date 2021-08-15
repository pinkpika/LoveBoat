function getSheepTextures(type){
    var textures = [];
    switch (type) {
    case 'N':
        textures.push(Texture.fromImage('http://i.imgur.com/i3mKQEx.png')); //sheep //一般狀態
        textures.push(Texture.fromImage('http://i.imgur.com/qMolVry.png')); //sheepBright //背後光
        textures.push(Texture.fromImage('http://i.imgur.com/kHDTsiU.png')); //sheepLove //滑鼠接觸
        textures.push(Texture.fromImage('http://i.imgur.com/Fxdv48h.gif')); //sheepDrag //滑鼠拖移
        textures.push(Texture.fromImage('http://i.imgur.com/vFVYoEH.png')); //sheepSleep //睡覺時間
        break;
    case 'C':
        textures.push(Texture.fromImage('http://i.imgur.com/d9xILqY.png')); //sheepC
        textures.push(Texture.fromImage('http://i.imgur.com/qMolVry.png')); //sheepBright
        textures.push(Texture.fromImage('http://i.imgur.com/yoHDNdx.png')); //sheepLoveC
        textures.push(Texture.fromImage('http://i.imgur.com/yoHDNdx.png')); //sheepDrag
        textures.push(Texture.fromImage('http://i.imgur.com/mS7iyev.png')); //sheepSleepC
        break;
    case 'W':
        textures.push(Texture.fromImage('https://i.imgur.com/40o2tmj.png')); //sheepwedding
        textures.push(Texture.fromImage('http://i.imgur.com/qMolVry.png')); //sheepBright
        textures.push(Texture.fromImage('https://i.imgur.com/VeHXTO8.png')); //sheepwedding2
        textures.push(Texture.fromImage('https://i.imgur.com/U01Jhix.png')); //sheepwedding3
        textures.push(Texture.fromImage('https://i.imgur.com/VyVR0ln.png')); //sheepweddingsleep
        break;
    }
    return textures;
}

function getPinkTextures(type){
    var textures = [];
    switch (type) {
    case 'N':
        textures.push(Texture.fromImage('http://i.imgur.com/Z5hkuz8.png')); //pink //一般狀態
        textures.push(Texture.fromImage('http://i.imgur.com/ykXk0nY.png')); //pinkBright //背後光
        textures.push(Texture.fromImage('http://i.imgur.com/8ymjOwl.png')); //pinkLove //滑鼠接觸
        textures.push(Texture.fromImage('http://i.imgur.com/ErJ36Xy.gif')); //pinkDrag //滑鼠拖移
        textures.push(Texture.fromImage('http://i.imgur.com/4rRwQpL.png')); //pinkSleep //睡覺時間
        break;
    case 'C':
        textures.push(Texture.fromImage('http://i.imgur.com/AeuARUH.png')); //pinkC
        textures.push(Texture.fromImage('http://i.imgur.com/ykXk0nY.png')); //pinkBright
        textures.push(Texture.fromImage('http://i.imgur.com/ESwJe93.png')); //pinkLoveC
        textures.push(Texture.fromImage('http://i.imgur.com/80A1hdv.png')); //pinkDragC
        textures.push(Texture.fromImage('http://i.imgur.com/fSgszBo.png')); //pinkSleepC
        break;
    case 'W':
        textures.push(Texture.fromImage('https://i.imgur.com/TuaYFI2.png')); //pinkwedding
        textures.push(Texture.fromImage('http://i.imgur.com/ykXk0nY.png')); //pinkBright
        textures.push(Texture.fromImage('https://i.imgur.com/MUeIzsx.png')); //pinkwedding2
        textures.push(Texture.fromImage('https://i.imgur.com/vY0FGlo.png')); //pinkwedding3
        textures.push(Texture.fromImage('https://i.imgur.com/SJPVj6I.png')); //pinkweddingsleep
        break;
    }
    return textures;
}