dna={}; // Объект основного дом дерева
id_file=0; // ID файла в DOM для удаления 
option=0; //глобальная переменная для хранения опций всех выделеных комопнентов
fc_id=['',''];
group='';
platform='web';
fc_comp_id=0;
// ----------------------------Читаем JSON c файла index.js в текущей деректории------------------------------------
contentStor={'f':{},'t':{},'c':{}};
  // var vc_downloads={//Обект уже загруженых и подключенных файлов
  //                 // "https://fp/web/button/button.js":{id:'web_js_1',tupe:'js',time:0,stop:0,g:[],c:[]}, //[тип, время до удаления, заморозить удаление(в случае загрузки новой группы), масив групп которые используют данный компонет, масив компонентов которые исп компонент]
  // }
  function fc_main(){     
 }
  // .catch(err => console.log(err));

  function link(ID_link, data){
    let mas_link=dna[group][fc_id[0]][fc_id[1]].link[ID_link]
    if((((dna || {})[group]|| {})[mas_link[0]] || {})[mas_link[1]]!=undefined){
    if (mas_link!=undefined){
    option=dna[group][fc_id[0]][fc_id[1]].option;
    let ID_function=window['fc_'+mas_link[0]+'_'+mas_link[2]];
    fc_id[1]=mas_link[1];
    fc_id[0]=mas_link[0];
    let id=dna[group][fc_id[0]].id[fc_id[1]]
    if (ID_function!=undefined){
    ID_function(data,id);}else {console.log('%c%s', 'color: Orange;','Link: '+ID_link+' ведет на несуществующую функцию '+mas_link[0]+'_'+mas_link[1]+'_'+mas_link[2])}
    }else {console.log('%c%s', 'color: Orange;','Link: '+ID_link+' не существует')}}else{console.log('%c%s', 'color: Orange;','Link: '+ID_link+' не существует в Группе')}
}

// Загрузка схемы в зависимости от условий
window.onload = function() {
  if (typeof mainSchema!='undefined'){
    f_group(mainSchema)
    .then(data =>{
      console.log('%c%s', 'color: Gray;','Загрузка пакета ЗАВЕРШЕНА');
      console.log(contentStor);
      console.log(dna);
      f_group(editorSchema).then(data =>{
        console.log(contentStor);
        console.log(dna);
      })
    })
  }else{
    if (typeof mainFiles=='undefined'){mainFiles=['index','json']}
    loadFile(mainFiles)
    .then(data =>f_group(data))
    .then(data =>{
      console.log('%c%s', 'color: Gray;','Загрузка пакета ЗАВЕРШЕНА');
      console.log(contentStor);
      console.log(dna);
    })
  }
};

//--------------Устанавливает в выдиление компонент по ID--------------
function fc_id_set(id){
 
  let data=contentStor.c.id[id]
  if (typeof data!="undefined"){
  option=dna[data.group][data.class][data.obj].option;
  group=data.group;
  fc_id=[data.class,data.obj];
  return true
  }else{
    return false
  } 
  }