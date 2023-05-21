    
root.text={'insert':function (id){ //Функция срабатывает один раз при добалении компонета в ДНА
    if (typeof data.main_id!="undefined"){
    let div = document.createElement('div');
    div.className = "ui message";
    div.id =id;
    div.innerHTML = data.text;
    if(data.main_id=='body'){
      document.body.append(div);
    }else{
      let ID_vc_comp=window[data.main_id]; //Создаем имя компонета в который нужно вложить текущий
    if(document.getElementById(data.main_id)==null){ 
      console.log('%c%s', 'color: Orange;','ID компонета: '+data.main_id+' не существует!');
      document.body.append(div);
    }else{
      ID_vc_comp.append(div)}
    }
  }},'update':(id)=>{
    document.getElementById(id).innerHTML = data.text
  },
  
  'data':function (data_in,id){ //Функция 1 класса text
   if (typeof data_in == 'undefined'){data_in=data.text};
   document.getElementById(id).innerHTML = data_in;
  //  if((value||{})['name']!==undefined){console.log(value.name)}
   }

  }