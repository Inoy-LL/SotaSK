// ------ Перебор груп
function reed_group(data){
    let data_key = Object.keys(data);
    return data_key.reduce(function(p, group){ 
        let sendData={}
        return p.then(inData=>{
        sendData[group]=data[group]
        return reed_comp(sendData);
    })
      }, Promise.resolve());
}

function reed_comp_test(data){
console.log(data)
}

// ------ Перебор компонентов
function reed_comp(data){
    let group=Object.keys(data)[0];
    console.log('Обработка схемы: '+group)
    // console.log(data[group])
    let editor_r=false; //Флаг который активирует загрузку конфигов редактора
// ------- Проверяем есть ли в конфиге укзание типа Фреймворк если нет то устанавливаем по умолчанию web
    if(((((data||{})[group]||{})['main']||{})['main']||{})['edit']!==undefined){editor_r=true}
    if((((((data||{})[group]||{})['main']||{})['main']||{})['data']||{})['platform']!==undefined){
    platform=data[group].main.main.data.platform}else{platform='web'}
    echo_key=Object.keys(data[group]);
// -------Фильтуем компоненты которые должны попасть на перебор 
    let component_m=[];
    if(editor_r){editSend=[false,true]}else{editSend=[false]}
    editSend.map(function(edit_s) {
    echo_key.map(function(key) {
        // console.log(edit_s);
                if(valodatonTupe(platform,key,edit_s)){
                component_m.push([key,edit_s])
            }else{
                console.log('%c%s', 'color: Purple;','Компонент '+platform+'/'+key+' уже загружен'); 
                // console.log('%c%s', 'color: Purple;',group); 
                // console.log(contentStor.d[platform]); 
                if(((contentStor.d||{})[platform]||{})[key]!==undefined){contentStor.d[platform][key].group.push(group)}
                if(((downloadStor.d||{})[platform]||{})[key]!==undefined){downloadStor.d[platform][key].group.push(group)}

                }
             })
    })
    // console.log(component_m);
 // -------Перебираем компоненты которые остались
    return new Promise(function(resolve,reject) {
     if(component_m.length!=0){
        return component_m.reduce(function(p, comp_r) {
          // console.log(comp_r[0],platform,comp_r[1],group)
        return p.then(()=>f_comp(comp_r[0],platform,comp_r[1],group))// Здесь добавляемся для удаления
      }, Promise.resolve())
      .then(test=>{
        contentStor = mergeDeep(downloadStor, contentStor);
        downloadStor={'f':{},'t':{},'c':{},'d':{}};
        // console.log(contentStor)
        add_dna(data[group], group,platform);
          console.log('Схема '+group+' загружена');
        }).then(data=>{resolve(data)})
      .catch(test=>{
          // Удаляем все если ошибка в схеме
keyFile=Object.keys(downloadStor.f);
keyFile.map(function(data){
    let id=downloadStor.f[data].id
    document.getElementById(id).remove();
          });
          downloadStor={'f':{},'t':{},'c':{},'d':{}};

          contentStor_stop.map(function(file){
            // console.log(file)
            contentStor[file[0]][file[1]].stop=0// Отменяем остановку возможного удаленя
          })
          contentStor_stop=[];
          console.log('Ошибка загрузки схемы: '+group);
        //   console.log(JSON.parse('{"'+group+'":"'+test+'"}'))
        })
      }else{
        add_dna(data[group], group,platform);
        console.log('Схема '+group+' загружена');
        resolve(true) 
       }})
}


// ------ Валидация от повторной загрузки
function valodatonTupe(platform, component, edit){
  // console.log (component)
    let faindCont;
    let faindDown
  if(edit){
    faindCont=(((contentStor.c||{})[platform]||{})[component]||{})['edit'];
    faindDown=(((downloadStor.c||{})[platform]||{})[component]||{})['edit'];
  }else{
    faindCont=((contentStor.c||{})[platform]||{})[component];
    faindDown=((downloadStor.c||{})[platform]||{})[component];
  } 
  if(faindCont!==undefined){
  return false  
  }else{
    if(faindDown!==undefined){
        return false
        }else{
        return true
        }}
    }




    
    // ======================================| Конструктор линков |====================================
 function AddLink(f_Group,f_Class,f_Object,f_Function){
  this.f_Group=f_Group
  this.f_Class=f_Class
  this.f_Object=f_Object
  this.f_Function=f_Function
  this.fun=(data_in)=>{
//-----------------/ формирование линков переменных /--------------
  value={};
  value_id=dna[f_Group][f_Class][f_Object].value;
  if(value_id!=undefined){Object.keys(value_id).map(function(key){value[key]=dna[f_Group][value_id[key][0]][value_id[key][1]].data[value_id[key][2]]})}
//-----------------------------------------------------------------    
  link=dna[f_Group][f_Class][f_Object].link
  data=dna[f_Group][f_Class][f_Object].data
  edit=dna[f_Group][f_Class][f_Object].edit
  let id=dna[f_Group][f_Class].id[f_Object]
  root[f_Class][f_Function](data_in,id)
  }
}

// ------ Формируем DNA
function add_dna(data,add_group,platform){
  let componentStor={"insert":[],"update":[]}
  return new Promise(function(resolve) {
      // ------ Если в DNA нет такой группы то добавляем её
              if(typeof dna[add_group]=='undefined'){
      dna[add_group]={}
      } 
      // ------ Если в DNA нет компонента то добавляем его 
  Object.keys(data).map(function(key){
          let componetObj={...contentStor.c[platform][key]}
          if(typeof dna[add_group][key]=='undefined'){
          dna[add_group][key]={"id":{}};}
          Object.keys(data[key]).map(function(key1){
          if(typeof dna[add_group][key][key1]=='undefined'){
          // ------ Добавляем id для поиска
              let data_id=f_prefix_с+fc_comp_id;
              fc_comp_id++
              let fc_text=contentStor.c.id;
              fc_text[data_id]={'group':add_group,'class':key,'obj':key1};
              dna[add_group][key].id[key1]=data_id
              componentStor.insert.push([add_group,key,key1,data_id])
//             // ------------------------------
          dna[add_group][key][key1]=Object.assign({}, componetObj)
                      }
            else{
          // ------ Если компонет есть в ДНА то добавляем в масив для обновления
          let data_id = dna[add_group][key].id[key1]
          componentStor.update.push([add_group,key,key1,data_id])
                      }
                      Object.keys(data[key][key1]).map(function(key2){
                          // ------ Заменяем линки -----------
                          if (key2=='link'){
                          Object.keys(data[key][key1][key2]).map(function(link_id){
                          set_link=[]
                          set_link=data[key][key1][key2][link_id]
                          let set_l=new AddLink(add_group,set_link[0],set_link[1],set_link[2])
                          data[key][key1][key2][link_id]=set_l.fun    
                          })}
                          dna[add_group][key][key1][key2]=Object.assign({}, dna[add_group][key][key1][key2],data[key][key1][key2]) 
                          })
      })
      })

// ------ Запускем функцию старта компонента если она есть 
if(platform=="web"){      
  componentStor.insert.map(function(key){
      if (((root||{})[key[1]]||{})['insert']!==undefined){
      setComp(key[0],key[1],key[2])
      root[key[1]].insert(key[3])
   }
});
// ------ Запускем функцию обновления компонента если она есть 
componentStor.update.map(function(key){
  if (((root||{})[key[1]]||{})['update']!==undefined){
  setComp(key[0],key[1],key[2])
  root[key[1]].update(key[3])
}
})
}
      resolve(true)
// console.log(componentStor)
  })
}