function getSheepTextures(type){
    for (var index in config.settingTypes) {
        if (config.settingTypes[index].type == type){
            return config.settingTypes[index].sheepImages.map(x => 
                Texture.fromImage(x)
            );
        }
    }
    return [];
}

function getPinkTextures(type){
    for (var index in config.settingTypes) {
        if (config.settingTypes[index].type == type){
            return config.settingTypes[index].pinkImages.map(x => 
                Texture.fromImage(x)
            );
        }
    }
    return [];
}