
// ---------------------------------| Основные переменные |--------------------------------------
dna={};  // Основной масив объектов
root={}; // Основной масив функций
link={}; // Ссылка на текущие линки
value={};// Ссылка на текущие переменные
data={}; // Ссылка на данные выделеного компонента
edit={}; // Ссылка на данные редактора выделеного компонента
files_tupe=["js","css"];//Какие заголовки считать файлами
fc_comp_id=0;
id_file=0; // ID файла в DOM для удаления 
contentStor={'f':{},'t':{},'c':{"id":{}
// ,"web":{"send":{"edit":{}},"main":{}}
},'d':{}};
contentStor_stop=[]
downloadStor={'f':{},'t':{},'c':{},'d':{}};// Масив загружаемого контента
const f_prefix_с='sc'//Префикс для Компонета
const f_stack='sota'//Каталог с платформами
const mainPhat='/'+f_stack+'/web/main/';// Путь к каталогу основного компонента
frStartEvent=[]//Масив старотвых событий

// ---------------------------------| Список файлов ядра |---------------------------------------
startFiles=[
  [mainPhat+'js/download','js'],
  [mainPhat+'js/insert','js']
]

// --------------------------------| Загрузка одного файла |-------------------------------------
      // loadFile(['index','json'])
      // .then(function(data){
      // console.log(data);
      // })
      // .catch(err => console.log('Ошибка '+err));

      function loadFile(download) {
        return new Promise(function(resolve,reject) {
        let content=["json","txt"];
        let file=download[0]+'.'+download[1];

// ------------------------------ Загрузка файлов в заголовок ---------------------------------
                    if (files_tupe.indexOf(download[1])!=-1){
                        let script = document.createElement('script');//
                        let link = document.createElement('link');//
                        let file_id;
                        
                        if(download[1]=='css'){Tupe_comp=link;link.rel="stylesheet";link.href=download[0]+".css";file_id=link.id='ff'+id_file++};//тут правило фoрмирования ссылки на наш файл для загрузки стилей
                        if(download[1]=='js'){Tupe_comp=script;script.src=download[0]+".js";file_id=script.id='ff'+id_file++};//тут правило фoрмирования ссылки на наш файл для загрузки стилей
                        
                        Tupe_comp.onload = function(){ 
                            downloadStor.f[file]={id:file_id,tupe:download[1],use:{}};//[тип, время до удаления, заморозить удаление(в случае загрузки новой группы), масив групп которые используют данный компонет, масив компонентов которые исп компонент]
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
// ------------------------------ Загрузка текса в масив -------------------------------------
                    if (content.indexOf(download[1])!=-1){
                    let rawFile = new XMLHttpRequest();
                    rawFile.open("GET", file, true);
                    rawFile.send();
                    rawFile.onload = function() {
                                if (rawFile.status == "200"){
                                let readText=rawFile.responseText;
                                if (download[1]=="json"){readText=JSON.parse(rawFile.responseText)}      
                                downloadStor.t[file]={tupe:download[1],use:{}};//[тип, время до удаления, заморозить удаление(в случае загрузки новой группы), масив групп которые используют данный компонет, масив компонентов которые исп компонент]           
                                // downloadStor.t[file]=readText;
                                console.log('%c%s', 'color: green;','Контент файла '+file+' успешно загружен');
                                resolve(readText)
                                }
                                else{
                                console.log('%c%s', 'color: red;',"Ошибка загрузки "+file);// обрабатываем ошибку
                                reject(file);
                                } }
            }
            })}
      
      // -----------------------------Временное хранение масива пакетов записи------------------
      dataStore=[];
      function writeData(data){
      dataStore.push(data)
      }      
      
      function writeFile(data){
      loadFile(data.split('.'))
      .then(function(data){     
      dataStore.push(data)
      })
      .catch(err => console.log('Ошибка '+err));
      }  

      // -----------------------------Масовая загрузка файлов-----------------------------------
      // downloadFiles([
      //     ['fl/web/text/text.vc','js'], 
      //     ['index','json'],
      //     ['index','css']
      //               ])
      //     .then(data =>console.log('Успех! '+data))
      //     .catch(err => console.log('Ошибка '+err));
      // ['fl/web/main/insert','js']
      
      var downloadFiles = function(download) {
        return download.reduce(function(p, deed){ 
            return p.then(()=>loadFile(deed))
          }, Promise.resolve(download));
      }

// -----------------------------Загружаем после полной загрузки страницы-----------------------------------      
      window.onload = function() {
      downloadFiles(startFiles)
  .then(data =>{
    console.log('%c%s', 'color: Gray;','Ядро успешно загружено');
    Object.assign(contentStor.f, downloadStor.f);
    downloadStor={'f':{},'t':{},'c':{},'d':{}};
  }).then(data =>dataStoreMap())
  // .then(data=>console.log(dna))
  .then(data=>{
    // Запуск на подписаные события
    frStartEvent.map(function(data){
      let ID_function=window[data[0]];
      ID_function(data[1],data[2])
    })
// ==========================================| Все загрузилось дальше работаем |============================================
console.log(contentStor)
console.log(dna)
  })
  .catch(err => console.log('%c%s', 'color: Red;','Ошибка загрузки ядра'+err));
}

// -------------------------------| Перебор с ожиданием завершения (все схеммы которые введены до загрузки груп) |-------------------------------- 
function dataStoreMap(data){
  if (dataStore.length!=0){
    return new Promise(function(resolve,reject) {
  dataStore.reduce(async (previous, pacet_in) => {// Перебор с остановкой
  const result = await previous;
  return [...result, await reed_group(pacet_in)];// Должно быть промисом
}, Promise.resolve([])).then(data=>{dataStore=[];resolve()});
  })
}else{
  
  console.log('Схемма не обнаружена');
  // reed_group({"group":{"component":{"component1":{}}}})// Вставка стандарнтой схеммы ели отсутсвует все остальное
}
  }

//---------------/ Упрощаем выдиление линка /-------------
  function setComp(f_Group,f_Class,f_Object){
       //-----------------/ формирование линков переменных /--------------
value={};
value_id=dna[f_Group][f_Class][f_Object].value;
if(value_id!=undefined){Object.keys(value_id).map(function(key){value[key]=dna[f_Group][value_id[key][0]][value_id[key][1]].data[value_id[key][2]]})}
       //-----------------------------------------------------------------   
    link=dna[f_Group][f_Class][f_Object].link
    data=dna[f_Group][f_Class][f_Object].data
    edit=dna[f_Group][f_Class][f_Object].edit
}

//--------------Устанавливает в выдиление компонент по ID--------------
function fc_id_set(id){
  let data=contentStor.c.id[id]
  if (typeof data!="undefined"){
  setComp(data.group,data.class,data.obj)
  return true
  }else{
    return false
  } 
  }

//--------------Функция глубокого слияния--------------

  function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
  }