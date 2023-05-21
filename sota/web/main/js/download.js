 // ------ Загружаем файлы одного компонента
 function f_comp(echo,platform,edit,group){
  let readFiles=[]
  let downloadStorC=[]
  if(edit){
readFiles=['/'+f_stack+'/'+platform+'/'+echo+'/'+'edit','json']
}else{
readFiles=['/'+f_stack+'/'+platform+'/'+echo+'/'+'conf','json'] 
}  
downloadStorC.push(['t',readFiles[0]+'.'+readFiles[1]]) 
  return new Promise(function(resolve,reject) {
              loadFile(readFiles)
              .then(function(data){
    //---------- Добавление поля кто использует данную информацию для возможности удаления
                let downloadFile=downloadStor.t[readFiles[0]+'.'+readFiles[1]].use
                if(typeof downloadFile[platform]=='undefined'){
                    downloadFile[platform]={}
                } 
                if(typeof downloadFile[platform][group]=='undefined'){
                    downloadFile[platform][group]=[]
                }
                downloadFile[platform][group].push(echo)
//------------------------------------------------------------------------------------------------------
          if(typeof downloadStor.c[platform]=='undefined'){downloadStor.c[platform]={}}
          if(typeof downloadStor.d[platform]=='undefined'){downloadStor.d[platform]={}}
          let config_data={...data}// копируем обект
          delete config_data.file// Удаляем список файлов зависимости
        //   config_data.file=[]
        // //   
        //   downloadStor.d[platform][echo]={"group":[]}
          downloadStor.d[platform][echo]={}
          downloadStor.c[platform][echo]=Object.assign({},downloadStor.c[platform][echo], config_data);
           let file_m=[];
           if(typeof data.file!=='undefined'){
           data.file.map(function(data) {
              if(data[0]=='c'){url='/'+f_stack+'/'+platform+'/'+echo+'/'+data[1]};  
              if(data[0]=='s'){url='/'+f_stack+'/'+platform+'/main/'+data[2]+'/'+data[1]};
              if(data[0]=='w'){url=data[1]};
              let tupe='f'
              if (files_tupe.indexOf(data[2])!=-1){tupe='f'}else{tupe='t'}
              downloadStorC.push([tupe,url+'.'+data[2]])
              if(valodatonTupe_file(url+'.'+data[2],tupe)){
              file_m.push([url,data[2],tupe])}
              else{
                  //---------- Добавление поля кто использует данную информацию для возможности удаления
                if(typeof contentStor[tupe][url+'.'+data[2]]!=='undefined'){downloadFile=contentStor[tupe][url+'.'+data[2]].use}
                if(typeof downloadStor[tupe][url+'.'+data[2]]!=='undefined'){downloadFile=downloadStor[tupe][url+'.'+data[2]].use}
                if(typeof downloadFile[platform]=='undefined'){
                    downloadFile[platform]={}
                } 
                if(typeof downloadFile[platform][group]=='undefined'){
                    downloadFile[platform][group]=[]
                }
                downloadFile[platform][group].push(echo)
                //------------------------------------------------------------------------------------------------------ 
                  console.log('%c%s', 'color: Purple;','Файл '+url+'.'+data[2]+' уже загружен'); 
                  
              }
           })}
           if(file_m.length!=0){
  downloadFiles(file_m)
  .then(function(data) {
//---------- Добавление поля кто использует данную информацию для возможности удаления
    file_m.map(function(file_in){
        let downloadFile=downloadStor[file_in[2]][file_in[0]+'.'+file_in[1]].use
        if(typeof downloadFile[platform]=='undefined'){
            downloadFile[platform]={}
        } 
        if(typeof downloadFile[platform][group]=='undefined'){
            downloadFile[platform][group]=[]
        }
        downloadFile[platform][group].push(echo)
        // console.log(downloadFile)
    }) 
//------------------------------------------------------------------------------------------------------ 
    
                          console.log('%c%s', 'color: Blue;','Компонент '+platform+'/'+echo+' успешно загружен'); 
                          downloadStor.d[platform][echo].group=[group]
                        //   console.log(downloadStor.d[platform][echo])
                          downloadStor.d[platform][echo].file=downloadStorC
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
function valodatonTupe_file(data,tupe){
    if (typeof contentStor[tupe][data]!== 'undefined'){
        contentStor[tupe][data].stop=1 ;// Блокируем возможность уделения файла во время загрузки новой схеммы
        contentStor_stop.push([tupe,data])// Сохраняем блокировку чтоб её выключить после загрузки
        return false
    }else{
        if (typeof downloadStor[tupe][data]!== 'undefined'){  
        return false
        }else{
              
        return true
        }}
    }