function fc_editor_add(data){ //Функция срабатывает один раз при добалении компонета в ДНА
  id=fc_id_out(data);
  if (typeof option.main_id!="undefined"){
  let div = document.createElement('div');
  div.className = "workList";
  div.id =id;
  div.innerHTML = `<div style="vertical-align: middle;display:table-cell;text-align: center;"><svg id="vc_b_svg" width="800" height="500" onmousedown="return false" onselectstart="return false" ondrop="drop(event, this)" ondragover="allowDrow(event)"></svg><div>`;
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
  let svg_defs_element='<defs><path id="ve_point" stroke="#005400" fill="green" d="M-1 -2 A2 4 0 0 1 1 -2 L3 0 A4 2 0 0 1 3 2 H-3 A4 2 0 0 1 -3 0 L-1 -2" stroke-width="1"/></defs>';
  vc_b_svg.insertAdjacentHTML("beforeend", svg_defs_element);//добавляем шаблон в DOM дерево
  vc_b_svg.addEventListener('mousemove', onMouseMove); 
  ve_add_component('ve_conf_adc',60,60);//-- тестовый вызов добаления одного компнента
ve_add_component('ve_conf_math',10,160);//-- тестовый вызов добаления одного компнента
}};


function fc_editor_data(data,id){ //Функция 1 класса text
 if (typeof data == 'undefined'){data=option.text};
 document.getElementById(id).innerHTML = data;
 };