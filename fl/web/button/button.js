function fc_button_add(data){ //Функция срабатывает один раз при добалении компонета в ДНА
  id=fc_id_in(data);
  if (typeof option.main_id!="undefined"){
  let div = document.createElement('button');
  div.className = "button is-small";
  div.style="margin: 3px";
  div.id =id
  div.onmousedown=fc_onmousedown;
  div.onmouseup=fc_onmouseup;
  div.innerHTML = option.name;
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
  }else{
  document.getElementById(fc_button[id]).onmousedown=fc_onmousedown;
  document.getElementById(fc_button[id]).onmouseup=fc_onmouseup;
  }};
  
//----------------Функции доступные по линками--------------------------
//function vc_button_0(){}; //Функция 1 класса button
//function vc_button_1(){}; //Функция 2 класса button

//----------------Функции срабатывают по прерываниям--------------------------
function fc_onmousedown(echo){//Кнопка нажата
  id=echo.target.id;
  fc_id_set(id)
  link('l0',option.s_on);
};

  function fc_onmouseup(echo){//Кнопка отпущена
  id=echo.target.id;
  fc_id_set(id)
  link('l1',option.s_off);
};


    