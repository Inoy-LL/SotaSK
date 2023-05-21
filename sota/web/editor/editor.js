var gird=6; //Шаг сетки в px.
var muve_id;
pos_old=[]; //Прошлая  позиция
mouseEvent=false;
var box1;
root.editor={'insert':function (id){ //Функция срабатывает один раз при добалении компонета в ДНА
    console.log('%c%s', 'color: Orange;',id)
  if (typeof data.main_id!="undefined"){
  let div = document.createElement('div');
  div.className = "workList";
  div.id =id;
  line_d = line_bild([[120,3],[130,3],[130,80],[3,80],[3,3],[85,3]]);
  div.innerHTML = `<div style="vertical-align: middle;display:table-cell;text-align: center;">

  <svg  id="main_svg" width="800" height="500" onmousedown="return false" onselectstart="return false" ondrop="drop(event, this)" ondragover="allowDrow(event)">
  <g id="link_svg"></g>
  <path  id="`+id+`" d="`+line_d[0]+`" stroke="#696969" stroke-width="1" fill="transparent"/>
    <path  id="`+id+`_mask" d="`+line_d[1]+`" stroke="Black" opacity="0.00" stroke-width="6" fill="transparent"/>
    <g transform="translate(`+85*gird+`,`+(2*gird-3)+`)">
    <rect id="`+id+`_ve_border"  width=`+35*gird+` height=`+3*gird+` rx=3 ry=3 stroke="#696969" fill="white" stroke-width="1" fill-opacity="0.7"/>
    <text x="76" y="13" class="small">Sota SK</text></g>
    <g id="`+id+`_edit" transform="translate(`+(128*gird-3)+`,`+(78*gird-3)+`)">
    <path id="`+id+`_edit_1" stroke="#838080" d="M0,12 L12,0" stroke-width="1.1"/>
    <path id="`+id+`_edit_2" stroke="#838080" d="M5,12 L12,5" stroke-width="1.1"/>
    <path id="`+id+`_edit_3" stroke="#838080" d="M10,12 L12,10" stroke-width="1.1"/>
    </g> 
  </svg><div>`;
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
  let svg_defs_element='<defs><path id="ve_point" stroke="#005400" fill="green" d="M-1 -2 A2 4 0 0 1 1 -2 L3 0 A4 2 0 0 1 3 2 H-3 A4 2 0 0 1 -3 0 L-1 -2" stroke-width="1"/></defs>';
  main_svg.insertAdjacentHTML("beforeend", svg_defs_element);//добавляем шаблон в DOM дерево
  main_svg.addEventListener('mousemove', onMouseMove); 
  box1 = main_svg.getBoundingClientRect();
  main_svg.addEventListener('mousemove', onMouseMove); 
  main_svg.insertAdjacentHTML("beforeend", svg_defs_element);//добавляем шаблон в DOM дерево
  if (typeof data.url=="undefined"){fc_editor_data()}else{
          loadFile([data.url,data.tupe])
      .then(function(data){
        editor_pars(data);
      // console.log(data);
      })
      .catch(err => console.log('Ошибка '+err));
  }
}}};


function fc_editor_data(data,id){ //Функция 1 класса text

 };

 

  