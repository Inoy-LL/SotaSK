fc_panel_f_id=0;
let fc_pf_id='web/panel_f'
function fc_panel_f_add(fc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
  let fc_panel_f=contentStor.c[fc_pf_id].id;
  fc_panel_f[fc_obj]='fc_t'+fc_panel_f_id;
if (typeof option.main_id!="undefined"){
let div = document.createElement('div');
div.className = "vc_panel_f";
div.id ='blocks';
fc_panel_f_id++;
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


