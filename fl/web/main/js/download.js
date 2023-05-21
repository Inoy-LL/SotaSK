downloadStor={'f':{},'t':{},'c':{
    // 'web/text':{},
    // 'web/button':{}
}};

// ------------------------------Загрузка одного файла----------------------------------------
        // loadFile(['index','json'])
        // .then(function(data){
        // console.log(data);
        // })
        // .catch(err => console.log('Ошибка '+err));

function loadFile(download) {
    return new Promise(function(resolve,reject) {
    let content=["json","txt"];
    let files=["js","css"];
    let file=download[0]+'.'+download[1];
// ------------------------------Загрузка файлов в заголовок----------------------------------
                if (files.indexOf(download[1])!=-1){
                    let script = document.createElement('script');//
                    let link = document.createElement('link');//
                    let file_id;
                    if(download[1]=='css'){Tupe_comp=link;link.rel="stylesheet";link.href=download[0]+".css";file_id=link.id='ff'+id_file++};//тут правило фoрмирования ссылки на наш файл для загрузки стилей
                    if(download[1]=='js'){Tupe_comp=script;script.src=download[0]+".js";file_id=script.id='ff'+id_file++};//тут правило фoрмирования ссылки на наш файл для загрузки стилей
                    Tupe_comp.onload = function(){ 
                        downloadStor.f[file]={id:file_id};
                        console.log('%c%s', 'color: green;','Файл '+file+' успешно загружен');  
                    resolve(true);
                    }
                    Tupe_comp.onerror = function(){  
                    document.getElementById(file_id).remove();//Удаляем если незагрузилось
                    console.log('%c%s', 'color: red;',"Ошибка загрузки файла "+file);// обрабатываем ошибку
                    reject(file);
                    }
                document.getElementsByTagName('head')[0].appendChild(Tupe_comp)//Добавляем в html заголовок файл, после этого он сам подгрузится 
                 }
// ------------------------------Загрузка текса в масив----------------------------------
                if (content.indexOf(download[1])!=-1){
                let rawFile = new XMLHttpRequest();
                rawFile.open("GET", file, true);
                rawFile.send();
                rawFile.onload = function() {
                            if (rawFile.status == "200"){
                            let readText=rawFile.responseText;
                            if (download[1]=="json"){readText=JSON.parse(rawFile.responseText)}                 
                            downloadStor.t[file]=readText;
                            console.log('%c%s', 'color: green;','Контент файла '+file+' успешно загружен');
                            resolve(readText)
                            }
                            else{
                            console.log('%c%s', 'color: red;',"Ошибка загрузки "+file);// обрабатываем ошибку
                            reject(file);
                            } }
        }
        })}

// -----------------------------Масовая загрузка файлов-----------------------------------
// downloadFiles([
//     ['fl/web/text/text.vc','js'], 
//     ['index','json'],
//     ['index','css']
//               ])
//     .then(data =>console.log('Успех! '+data))
//     .catch(err => console.log('Ошибка '+err));

var downloadFiles = function(download) {
    return download.reduce(function(p, deed){ 
        return p.then(()=>loadFile(deed))
      }, Promise.resolve());
}
