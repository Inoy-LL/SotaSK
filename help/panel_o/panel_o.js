fc_panel_o_id=0;
let fc_po_id='web/panel_o'
function fc_panel_o_add(fc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
  let fc_panel_o=contentStor.c[fc_po_id].id;
  fc_panel_o[fc_obj]='fc_to'+fc_panel_o_id;
if (typeof option.main_id!="undefined"){
let div = document.createElement('div');
div.className = "vc_panel_o";
div.id ='option';
fc_panel_o_id++;
// div.innerHTML = option.text;
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


