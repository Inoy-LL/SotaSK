    fc_text_id=0;
    let fc_t_id='web/text'
    function fc_text_add(vc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
      let fc_text=contentStor.c[fc_t_id].id;
      fc_text[vc_obj]='fc_t'+fc_text_id;
    if (typeof option.main_id!="undefined"){
    let div = document.createElement('div');
    div.className = "text";
    div.id ='fc_t'+fc_text_id;
    fc_text_id++;
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
    //vc_c_content;
    //blok.append(div);
  }};
  
  
  function fc_text_data(data){ //Функция 1 класса text
  let id_text =contentStor.c[fc_t_id].id[fc_id[1]]
   if (typeof data == 'undefined'){data_in=option.text};
   document.getElementById(id_text).innerHTML = data;
   };