root.button={'insert':function (id){ //Функция срабатывает один раз при добалении компонета в ДНА
  let div = document.createElement('button');
  div.className = "ui button";
  div.id=id;
  div.onmousedown=fc_onmousedown_b;
  div.onmouseup=fc_onmouseup_b;
  div.innerHTML = data.name;
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
  },'update':(id)=>{
    document.getElementById(id).innerHTML = data.name
  },
  'del':(id)=>{document.getElementById(id).remove()},
};

//----------------Функции срабатывают по прерываниям--------------------------
function fc_onmousedown_b(echo){//Кнопка нажата
  id=echo.target.id;
  fc_id_set(id)
  link.on(data.s_on)
};

  function fc_onmouseup_b(echo){//Кнопка отпущена
  id=echo.target.id;
  fc_id_set(id)
  link.off(data.s_off)
};    