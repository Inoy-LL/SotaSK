  function fc_grid_add(data){
    id=fc_id_in(data);
    // console.log("Добавилась сетка ID "+id);
    // console.log(option.main_id);
    
    //--------Основная область
  let div = document.createElement('div');
  div.className = "wrapper";
  div.id = option.main_id;
  div.innerHTML;
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
ID_vc_wrapper=window[div.id]; //Создаем имя компонета в который нужно вложить текущий

 //--------Верхняя панель
 div = document.createElement('div');
 div.className = "header";
 div.id = option.top;
 //div.innerHTML = value[1];
 //div.innerHTML = 12;
 (typeof option.top!="undefined")?ID_vc_wrapper.append(div):
 console.log("Область top выключен");
 //document.body.append(div);

   //--------Центральная область
   div = document.createElement('div');
   div.className = "main";
   
   div.id = id;
   div.innerHTML;
   ID_vc_wrapper.append(div);
   ID_vc_main=window[div.id]; //Создаем имя компонета в который нужно вложить текущий
   //document.body.append(div);

   //--------Левая панель
  div = document.createElement('div');
  div.className = "vc_box sidebar";
  div.id = option.left;
  //div.innerHTML = value[3];
  (typeof option.left!="undefined")?ID_vc_main.append(div):
  console.log("Область left выключен");

  //--------Контентная область
  div = document.createElement('div');
  div.className = "vc_box content";
  div.id = option.content;
 
  //div.innerHTML = value[5];
  (typeof option.content!="undefined")?ID_vc_main.append(div):
  console.log("Область right выключен");

  //--------Правая панель
  div = document.createElement('div');
  div.className = "vc_box sidebar";
  div.id = option.right;
  //div.innerHTML = value[7];
  (typeof option.right!="undefined")?ID_vc_main.append(div):
  console.log("Область right выключен");

  //--------Подвал
  div = document.createElement('div');
  div.className = "footer";
  div.id = option.footer;
  //div.innerHTML = value[9];
  //div.innerHTML = 11;
  (typeof option.footer!="undefined")?ID_vc_wrapper.append(div):
  console.log("Область footer выключен");

};


//function vc_grid_0(){}; //Функция 1 класса button

//function vc_grid_1(){}; //Функция 2 класса button