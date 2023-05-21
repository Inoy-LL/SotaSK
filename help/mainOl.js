                // ----------------------------Читаем JSON c файла index.js в текущей деректории------------------------------------
contentStor={'f':{},'t':{},'c':{}};
                var vc_downloads={//Обект уже загруженых и подключенных файлов
                  // "https://fp/web/button/button.js":{id:'web_js_1',tupe:'js',time:0,stop:0,g:[],c:[]}, //[тип, время до удаления, заморозить удаление(в случае загрузки новой группы), масив групп которые используют данный компонет, масив компонентов которые исп компонент]
  }
          console.log(vc_downloads);

var readJSON = function(echo){
    return new Promise(function(resolve){
        loadFile(['index','json']).then(function(data){
        data=JSON.parse(data[1]);
        // console.log(data);
            resolve(data)});
    });
}

var doComand = function(echo) {
    return new Promise(function(resolve){
        let comand = Object.keys(echo);
        let comandID={
    'i':f_component_add,
    // 'd':f_component_del,
    // 'r':f_component_reed,
    // 'w':f_component_write
        }
        comand=comand.map(function(name) {          
return comandID[name];
});
// console.log(comand);
            seqRunner(comand,echo).then(function(echo){
                // console.log('done');
                // console.log(echo);
                resolve("Загрузка успешна");
                });
})}



var seqRunner = function(deeds,data) {
  return deeds.reduce(function(p, deed) {
    return p.then(deed);
  }, Promise.resolve(data));
}
    
seqRunner([readJSON, doComand]).then(function(echo) {
  console.log('done');
  // console.log(echo);
  console.log(downloadStor);
});