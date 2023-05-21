fc_button_id=0;
let fc_b_id='web/button'
function fc_button_add(vc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
  let fc_button=contentStor.c[fc_b_id].id;
  fc_button['fc_b'+fc_button_id]={'group':group,'obj':vc_obj};
  if (typeof option.main_id!="undefined"){
  let div = document.createElement('button');
  div.className = "button is-small";
  div.style="margin: 3px";
  div.id ='fc_b'+fc_button_id;
  fc_button_id++;
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
  //blok.append(div);
  }else{
  document.getElementById(fc_button['fc_b'+fc_button_id]).onmousedown=vc_onmousedown;
  document.getElementById(fc_button['fc_b'+fc_button_id]).onmouseup=vc_onmouseup;
  fc_button_id++;
  }};
  
//----------------Функции доступные по линками--------------------------
//function vc_button_0(){}; //Функция 1 класса button
//function vc_button_1(){}; //Функция 2 класса button

//----------------Функции срабатывают по прерываниям--------------------------
function fc_onmousedown(id_in){//Кнопка нажата
  fc_id=id_in.target.id;
  let id=contentStor.c[fc_b_id].id[fc_id]
  option=dna[id.group]['button'][id.obj].option;
  group=id.group;
  fc_id=['button',id.obj];
  data=option.s_on;
  link('l0');
};

  function fc_onmouseup(id_in){//Кнопка отпущена
    fc_id=id_in.target.id;
    let id=contentStor.c[fc_b_id].id[fc_id]
    option=dna[id.group]['button'][id.obj].option;
    group=id.group;
    fc_id=['button',id.obj];
  data=option.s_off;
  link('l1');
};


    