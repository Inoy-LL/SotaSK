function delData(data){
    scheme_key=Object.keys(data)
    if( typeof data!== 'object'||scheme_key.length===0){
        dataStor={'scheme_id':[],'class_id':[],'object_id':[]}
        dataStor.scheme_id=Object.keys(dna)
        Object.keys(dna).map(function(key){
        Object.keys(dna[key]).map(function(key1){
        Object.keys(dna[key][key1]).map(function(key2){
            if(key2!="id"){
            if (((root||{})[key1]||{})['del']!==undefined){
                comp_id=dna[key][key1].id[key2]
                setComp(key,key1,key2)
                root[key1].del(comp_id)
            }

                console.log('%c%s', 'color: Blue;','Компонент '+key+'/'+key1+'/'+key2+' удален'); 
            }
        })
        console.log('%c%s', 'color: Blue;','Класс '+key+'/'+key1+' удален'); 
        let platform="";
        if((((((data||{})[key]||{})['main']||{})['main']||{})['data']||{})['platform']!==undefined){
            platform=data[key].main.main.data.platform}else{platform='web'}
            let group=key
        mas_flies=contentStor.d[platform][key1].file
        delFiles(platform,key1,group,mas_flies)
        })
        console.log('%c%s', 'color: Blue;','Схема '+key+' удалена'); 
        })
    dna={}}
    scheme_key.map(function(key){
        let platform="";
        if((((((data||{})[key]||{})['main']||{})['main']||{})['data']||{})['platform']!==undefined){
            platform=data[key].main.main.data.platform}else{platform='web'}
            let group=key
    class_key=Object.keys(data[key])
    if(typeof dna[key]!='undefined'){
    if( typeof data[key]!== 'object'||class_key.length===0){
        Object.keys(dna[key]).map(function(key1){
            Object.keys(dna[key][key1]).map(function(key2){
                if(key2!="id"){
                if (((root||{})[key1]||{})['del']!==undefined){
                    comp_id=dna[key][key1].id[key2]
                    setComp(key,key1,key2)
                    root[key1].del(comp_id)
                }
                    console.log('%c%s', 'color: Blue;','Компонент '+key+'/'+key1+'/'+key2+' удален'); 
                }
            })
            console.log('%c%s', 'color: Blue;','Класс '+key+'/'+key1+' удален'); 
            mas_flies=contentStor.d[platform][key1].file
            delFiles(platform,key1,group,mas_flies)
            })
    console.log('%c%s', 'color: Blue;','Схема '+key+' удалена'); 
    delete dna[key]}
    Object.keys(data[key]).map(function(key1){
    if(typeof dna[key][key1]!='undefined'){
    if( typeof data[key][key1]!== 'object'||Object.keys(data[key][key1]).length===0){
        Object.keys(dna[key][key1]).map(function(key2){
            if(key2!="id"){
            if (((root||{})[key1]||{})['del']!==undefined){
                comp_id=dna[key][key1].id[key2]
                setComp(key,key1,key2)
                root[key1].del(comp_id)
            }
                console.log('%c%s', 'color: Blue;','Компонент '+key+'/'+key1+'/'+key2+' удален'); 
            }
        })
    console.log('%c%s', 'color: Blue;','Класс '+key+'/'+key1+' удален'); 
    delete dna[key][key1]}
    Object.keys(data[key][key1]).map(function(key2){
    if(typeof dna[key][key1][key2]!='undefined'){
    if( typeof data[key][key1][key2]!== 'object'||Object.keys(data[key][key1][key2]).length===0){
        if(key2!="id"){
            if (((root||{})[key1]||{})['del']!==undefined){
                comp_id=dna[key][key1].id[key2]
                setComp(key,key1,key2)
                root[key1].del(comp_id)
            }
                console.log('%c%s', 'color: Blue;','Компонент '+key+'/'+key1+'/'+key2+' удален'); 
            }
    delete dna[key][key1][key2]
    delete dna[key][key1].id[key2]
    dna_copi={...dna[key][key1]}
    delete dna_copi.id
if(Object.keys(dna_copi).length===0){
    delete dna[key][key1]
    // Удаление компонета
    groups = contentStor.d[platform][key1].group
    let group_id = groups.findIndex(item => item == group);
    if(group_id!=undefined){
    groups.splice(group_id, 1); // начиная с позиции 1, удалить 1 элемент
    // delete groups[group_id]
     if(groups[0]==undefined){contentStor.d[platform][key1].group=[]}
}
    // console.log(contentStor.d[platform][key1].group)
    mas_flies=contentStor.d[platform][key1].file
    delFiles(platform,key1,group,mas_flies)
    console.log(contentStor)
    console.log('%c%s', 'color: Blue;','Класс '+key+'/'+key1+' удален из за отсуцтвия компонетов');  

}
}
    Object.keys(data[key][key1][key2]).map(function(key3){
    if(typeof dna[key][key1][key2][key3]!='undefined'){
    if( typeof data[key][key1][key2][key3]!== 'object'||Object.keys(data[key][key1][key2][key3]).length===0){delete dna[key][key1][key2][key3]}
    Object.keys(data[key][key1][key2][key3]).map(function(key4){
    if( typeof data[key][key1][key2][key3][key4]!== 'object'||Object.keys(data[key][key1][key2][key3][key4]).length===0){delete dna[key][key1][key2][key3][key4]}
    })}})}})}})
    }})
}

// Удаление файлов
function delFiles(platform,comp_id,group,mas_flies){
    mas_flies.map(function(key){
        let comp_use=contentStor[key[0]][key[1]].use[platform][group]
        let comp_id_f = comp_use.findIndex(item => item == comp_id);
        comp_use.splice(comp_id_f, 1); // начиная с позиции 1, удалить 1 элемент
        // console.log(comp_use)
        if(comp_use.length==0){
            delete contentStor[key[0]][key[1]].use[platform][group]
        if(Object.keys(contentStor[key[0]][key[1]].use[platform]).length===0){
            delete contentStor[key[0]][key[1]].use[platform]
        }
            if(contentStor[key[0]][key[1]].use[platform]==undefined){
                delete contentStor[key[0]][key[1]].use[platform]
                if(Object.keys(contentStor[key[0]][key[1]].use).length===0){
                    
                    console.log('%c%s', 'color: Blue;','Файл '+key[1]+' отключен так как он никем не используется');
                    if(key[0]=="f"){
                        let file_id=contentStor[key[0]][key[1]].id
                        // console.log(file_id)
                        document.getElementById(file_id).remove()};//Удаляем если это файл
                    delete contentStor[key[0]][key[1]]
                }
                // console.log(contentStor[key[0]])
            }
            
        }
        // console.log(comp_id_f)
    })
    // console.log(contentStor)
    // console.log(mas_flies)
}