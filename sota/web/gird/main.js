    
root.gird={'insert':function (id){ //Функция срабатывает один раз при добалении компонета в ДНА
 
    //--------Основная область
  let div = document.createElement('div');
  div.className = "wrapper";
  div.id = data.main_id;
  if(typeof data.background!='undefined'){
  div.style='background:url('+data.background+')'
  }
  div.innerHTML;
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

ID_vc_wrapper=window[div.id]; //Создаем имя компонета в который нужно вложить текущий

 //--------Верхняя панель
 div = document.createElement('div');
 div.className = "header";
 div.id = data.top;
 //div.innerHTML = value[1];
 //div.innerHTML = 12;
 (typeof data.top!="undefined")?ID_vc_wrapper.append(div):
 console.log("Область top выключен");
//  document.body.append(div);

   //--------Центральная область
   div = document.createElement('div');
   div.className = "main";
   
   div.id = id;
   div.innerHTML;
   ID_vc_wrapper.append(div);
   ID_vc_main=window[div.id]; //Создаем имя компонета в который нужно вложить текущий
   //document.body.append(div);

   //--------Левая панель
   if (typeof data.left!="undefined"){
  div = document.createElement('div');
  div.className = "vc_box sidebar";
  div.id = data.left.id;
  //div.innerHTML = value[3];
  if (typeof data.left.width!="undefined"){
    div.style='width: 300px'}
  (typeof data.left.id!="undefined")?ID_vc_main.append(div):
  console.log("Область left выключен");}

  //--------Контентная область
  div = document.createElement('div');
  div.className = "vc_box content";
  div.id = data.content;
 
  //div.innerHTML = value[5];
  (typeof data.content!="undefined")?ID_vc_main.append(div):
  console.log("Область right выключен");

  //--------Правая панель
  if (typeof data.right!="undefined"){
  div = document.createElement('div');
  div.className = "vc_box sidebar";
  let rightStyle='';
  div.id = data.right.id;
  if (typeof data.right.width!="undefined"){rightStyle=rightStyle+' width:'+data.right.width+';'};
  if (typeof data.right.background!="undefined"){rightStyle=rightStyle+' background:'+data.right.background+';'}
  div.style=rightStyle;
  // console.log(rightStyle);
  (typeof data.right.id!="undefined")?ID_vc_main.append(div):
  console.log("Область right выключен");
  }
  //--------Подвал
  div = document.createElement('div');
  div.className = "footer";
  div.id = data.footer;
  //div.innerHTML = value[9];
  //div.innerHTML = 11;
  (typeof data.footer!="undefined")?ID_vc_wrapper.append(div):
  console.log("Область footer выключен");

  }}