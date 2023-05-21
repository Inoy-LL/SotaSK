// ------ Перебор груп
    function f_group(echo){
        let data = Object.keys(echo);
        // console.log(data)
        return data.reduce(function(p, deed){ 
            return p.then((data)=>f_group_comp(deed,echo[deed]))
          }, Promise.resolve());
    }

// ------ Перебор компонентов
function f_group_comp(group,echo){
    console.log('Обработка схемы: '+group)

// ------- Проверяем есть ли в конфиге укзание типа библиотеки
    if (typeof echo?.main?.main?.option?.platform !== 'undefined') {
        platform=echo.main.main.option.platform}else{platform='web'}
        echo_key=Object.keys(echo);
        console.log(echo_key);
// -------Фильтуем компоненты которые должны попасть на перебор 
    component_m=[];
    echo_key.map(function(data) {
                if(valodatonTupe('c',platform+'/'+data)){
                component_m.push(data)}
                else{
                console.log('%c%s', 'color: Purple;','Компонент '+platform+'/'+data+' уже загружен'); 
                }
             })
 // -------Перебираем компоненты которые остались
    return new Promise(function(resolve,reject) {
     if(component_m.length!=0){
        return component_m.reduce(function(p, deed) {
            // console.log(deed);
        return p.then(data=>f_comp(deed,platform,echo[deed]))
      }, Promise.resolve())
      .then(test=>{
        Object.assign(contentStor.t, downloadStor.t);
        Object.assign(contentStor.f, downloadStor.f);
        Object.assign(contentStor.c, downloadStor.c);
        downloadStor={'f':{},'t':{},'c':{}};
        add_dna(echo, group,platform);
          console.log('Схема '+group+' загружена');
        })
      .catch(test=>{
          // Удаляем все если ошибка в схеме
keyFile=Object.keys(downloadStor.f);
keyFile.map(function(data){
    let id=downloadStor.f[data].id
    document.getElementById(id).remove();
          });
          downloadStor={'f':{},'t':{},'c':{}};
          console.log('Ошибка загрузки схемы: '+group);
        //   console.log(JSON.parse('{"'+group+'":"'+test+'"}'))
        })
      .then(data=>{resolve(data)})
      }else{
        add_dna(echo, group,platform);
        console.log('Схема '+group+' загружена');
        resolve(true) 
      }})}

 // ------ Загружаем файлы одного компонента
function f_comp(echo,platform,data){
    
    return new Promise(function(resolve,reject) {
                loadFile(['fl/'+platform+'/'+echo+'/'+'conf','json'])
                .then(function(data){
                    // console.log('%c%s', 'color: red;',data["editor"]+" я здесь");
                    if(data["editor"]!=undefined){
                        loadFile(['fl/'+platform+'/'+echo+'/'+'editor','json']);
                        // console.log('%c%s', 'color: red;',echo+" я здесь");
                    }
                // 
                // console.log(echo);
                    return data})
                .then(function(data){
            // console.log(data.file); 
            downloadStor.c[platform+'/'+echo]={'option':{}}
            downloadStor.c[platform+'/'+echo]['option']=data.option;
            downloadStor.c.id={};
             file_m=[];
             data.file.map(function(data) {
                if(data[0]=='c'){url='fl/'+platform+'/'+echo+'/'+data[1]};  
                if(data[0]=='s'){url='fl/'+platform+'/main/'+data[2]+'/'+data[1]};
                if(data[0]=='w'){url=data[1]};
                if(valodatonTupe('f',url+'.'+data[2])){
                file_m.push([url,data[2]])}
                else{
                    console.log('%c%s', 'color: Purple;','Файл '+url+'.'+data[2]+' уже загружен'); 
                }
             })
             if(file_m.length!=0){
    downloadFiles(file_m)
    .then(function(data) {
                            console.log('%c%s', 'color: Blue;','Компонент '+platform+'/'+echo+' успешно загружен'); 
                            resolve(echo);
                        })
                        .catch(function(data) {
                            reject(data)
                        })
                    }else{resolve(true)}})
                    .catch(function(data) {
//---------- Файл не существует или что-то нетак при загрузке(например нет интернета)
                        reject(data)
})})}

// ------ Валидация от повторной загрузки
function valodatonTupe(tupe,data){
if (typeof contentStor[tupe][data]!== 'undefined'){
    return false
}else{
    if (typeof downloadStor[tupe][data]!== 'undefined'){
    return false
    }else{
    return true
    }}
}

// ------ Формируем DNA
function add_dna(masiv_c,add_group,platform){
    // console.log(masiv_c);
    
    return new Promise(function(resolve) {
        dna[add_group]={};
        let keyComponent=Object.keys(masiv_c);
        keyComponent.map(function(data) {
            let componetObj=contentStor.c[platform+'/'+data].option
            dna[add_group][data]={id:{}};
            let shablon={[add_group]:masiv_c}
            let shablon2=data
            keyobj=Object.keys(shablon[add_group][data]);
            keyobj.map(function(data) {
                dna[add_group][shablon2][data]={};
                // ------ Добавляем опции
                let option_dna={};
                dna[add_group][shablon2][data]['option']=componetObj;
                Object.assign(option_dna,dna[add_group][shablon2][data]['option'],masiv_c[shablon2][data].option);
                dna[add_group][shablon2][data]['option']=option_dna;
                // ------ Добавляем линки
                let link_dna={};
                dna[add_group][shablon2][data]['link']={};
                Object.assign(link_dna,dna[add_group][shablon2][data]['link'],masiv_c[shablon2][data].link);
                dna[add_group][shablon2][data]['link']=link_dna;
            })
        })
        // ------ Запускем функцию старта компонента если она есть
        keyComponent.map(function(data_class) {
            let objComponent = Object.keys(masiv_c[data_class])
            objComponent.map(function(data) {
                            let ID_function=window['fc_'+data_class+'_add'];
                            if (ID_function!=undefined){
                                option=dna[add_group][data_class][data]['option']
                                group=add_group;
                                ID_function([data,data_class,group,platform]);
                            }
        })})
        resolve(true)
    })
}

function fc_id_in(data,id){
//----------------Формируем массив комопнента и Входящий ID------------
let data_id=`fc`+fc_comp_id;
// console.log(data);
if (typeof id=="undefined"){
fc_comp_id++}else{data_id=id;}
let fc_text=contentStor.c.id;
fc_text[data_id]={'group':data[2],'class':data[1],'obj':data[0]};
return data_id
}

function fc_id_out(data,id){
    //----------------Формируем массив комопнента и Исходящий ID------------
    let data_id=`fc`+fc_comp_id;
    // console.log(data);
    if (typeof id=="undefined"){
    fc_comp_id++}else{data_id=id;}
    dna[data[2]][data[1]].id[data[0]]=data_id
    // console.log(dna[data[2]][data[1]].id);
    return data_id
    }

