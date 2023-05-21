    
function fc_text_add(data){ //Функция срабатывает один раз при добалении компонета в ДНА
    id=fc_id_out(data);
    if (typeof option.main_id!="undefined"){
    let div = document.createElement('div');
    div.className = "text";
    div.id =id;
    div.innerHTML = option.text;
    if(option.main_id=='body'){
      document.body.append(div);
    }else{
      let ID_vc_comp=window[option.main_id]; //Создаем имя компонета в который нужно вложить текущий
    if(document.getElementById(option.main_id)==null){ 
      console.log('%c%s', 'color: Orange;','ID компонета: '+option.main_id+' не существует!');
      document.body.append(div);
    }else{
      ID_vc_comp.append(div)}
    }
  }};
  
  
  function fc_text_data(data,id){ //Функция 1 класса text
   if (typeof data == 'undefined'){data=option.text};
   document.getElementById(id).innerHTML = data;
   };