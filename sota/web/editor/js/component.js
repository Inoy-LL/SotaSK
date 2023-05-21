let comp_id={};
let point_id={};
let id_el_nav;
var shiftX;
var shiftY;
point_oll={};
point_true=true

// box1 = main_svg.getBoundingClientRect();
let svg_defs_element='<defs><path id="ve_point" stroke="#005400" fill="green" d="M-1 -2 A2 4 0 0 1 1 -2 L3 0 A4 2 0 0 1 3 2 H-3 A4 2 0 0 1 -3 0 L-1 -2" stroke-width="1"/></defs>';


function ve_add_component(id,config_file, pos){//функция добаления одного компонета

x_el=(pos[0]-1)*gird;
y_el=(pos[1]-1)*gird+2;
let config=config_file;//Переводим текст в название обекта

let c_height=5;
let c_width=5;
// ---------------- Расчитываем растягивание
Top_point=Object.keys(config.point.Top_point)
Bottom_point=Object.keys(config.point.Bottom_point)
Left_point=Object.keys(config.point.Left_point)
Right_point=Object.keys(config.point.Right_point)
// console.log(Top_point.length%2);
if(Top_point.length<=5&Bottom_point.length<=5){c_width=5}else{
  if(Top_point.length>=Bottom_point.length){
    c_width=Top_point.length
  }else{c_width=Bottom_point.length}
  if (c_width%2==0){c_width=c_width+1;
    // console.log(c_width);
  }
}
if(Left_point.length<=5&Right_point.length<=5){c_height=5}else{
  if(Left_point.length>=Right_point.length){c_height=Left_point.length}else{c_height=Right_point.length}
  if (c_height%2==0){c_height=c_height+1;
    // console.log(c_height)
  }
}
// -----------------------------------------------

// let config=config_file;//Переводим текст в название обекта
// console.log(config.icon);
// console.log(config.prefix);

// let icon_el=config.icon;// создаем картинку комопнента и вытаскиваем его из джейсона


//-------добавляем шаблон комопнента
if ((config.prefix in comp_id)==true){comp_id[config.prefix]++}else{comp_id[config.prefix]=0};
let svg_element='<g id="ve_element"></g>';
let svg_content_element=`<foreignObject id="ve_text" transform="translate(-8,22)" width="46" height="22">
<div style="font-size: 11px; text-align: center; color: rgb(0, 0, 0);">`+config.name+` `+comp_id[config.prefix]+`</div>
</foreignObject>
<rect id="ve_border" transform="translate(6,4)" width=36 height=36 rx=2 ry=2 stroke="#696969" fill="white" stroke-width="1" fill-opacity="1.0"/>
<image id="ve_img" xlink:href="/ico/`+config.icon+`.svg" transform="translate(12,10)" width="24" height="24"/>
<rect width=46 height=55 fill-opacity="0.0" transform="translate(0,0)"/>`;
let svg_side_element='<g id="ve_point_side"></g>';
main_svg.insertAdjacentHTML("beforeend", svg_element);//добавляем шаблон в DOM дерево
//id_el_nav=config.prefix in comp_id;
//console.log(comp_id);
// id_el_nav=config.prefix+'_'+comp_id[config.prefix];// создаем ID комопнента и вытаскиваем его из джейсона
// console.log(id_el_nav);
ve_element.id=id;
ID_element=window[id];
ID_element.setAttribute('transform','translate('+x_el+','+y_el+')');
ID_element.insertAdjacentHTML("beforeend", svg_content_element);//добавляем шаблон в DOM дерево
let svg_side = [['T',0,0,0,0],['B',0,14+(c_height*gird),0,1],['L',2,-2,90,1],['R',16+(c_width*gird),-2,90,0]];//параметры для поворота сторон
svg_side.forEach((side,id_st) => {
ID_element.insertAdjacentHTML("beforeend", svg_side_element);//добавляем шаблон в DOM дерево
let ID_side=id+'_side_'+side[0];
ve_point_side.id=ID_side;

ID_side=window[ID_side];
let scale='';
if(side[4]==1){scale=' scale(1, -1)'};
ID_side.setAttribute('transform','translate('+side[1]+','+side[2]+') rotate('+side[3]+')'+scale);
// 
ve_add_point(id, side[0],config);
})
ve_border.id=id+'_border';
ID_border=window[id+'_border'];
ID_border.setAttribute('width',gird+(c_width*gird));
ID_border.setAttribute('height',gird+(c_height*gird));
ve_text.id=id+'_text';
ID_text=window[id+'_text'];
ID_text.setAttribute('transform','translate('+(((c_width*gird)-24)/2)+','+(10+(c_height*gird))+')');
ve_img.id=id+'_img';
ID_img=window[id+'_img'];
ID_img.setAttribute('transform','translate('+(((c_width*gird)-6)/2)+','+((c_height*gird)/2-5)+')');

document.getElementById(id).onmouseup=fc_onmouseup; // Событие клика - отпускания
document.getElementById(id).onmousedown=fc_onmousedown; // Событие клика
}

//ve_add_point('id_element', 'L');
function ve_add_point(id_element, side_s, config){
  let side = { //масив i
    T:"Top_point", //верх
    L:"Left_point", //лево
    R:"Right_point", // право
    B:"Bottom_point"//низ  
  }
  id_storona=side[side_s];
  let svg_point_element='<use xlink:href="#ve_point" id="ve_point_h"/>';
  id_side=id_element+'_side_'+side_s;
  // console.log(id_side);
  let ID_side=window[id_side];
  let left_point=0;
  let top_point=0;
  let rotate_point=0;
  for (let key in config.point[id_storona]) {
    // console.log(config.point[id_storona][key]);
    ID_side.insertAdjacentHTML("beforeend", svg_point_element);//добавляем шаблон в DOM дерев
    //проверяем есть ли внутри обекта ключь со значением если нет то добавляем в него ключь и значение 0
    // если есть то добаляем ++
    if ((config.prefix in point_id)==true){point_id[config.prefix]++}else{point_id[config.prefix]=0};//проверяем есть ли внутри обекта ключь со значением если нет то добавляем в него ключь и значение 0
    let Namber=point_id[config.prefix];
    ID_poin_p=id_element+'_point_'+side_s+'_'+Namber;
    // Формирования масива точек чтоб можно было создавать линки мышкой
    let tupe_link="";
    let tupe_vector="";
    // console.log(side_s);
    if (side_s=="R"|side_s=="L"){tupe_link="H"}else{tupe_link="V"}
    // console.log(tupe_link);
    if (side_s=="T"|side_s=="L"){tupe_vector="p1"}else{tupe_vector="p0"}
    point_oll[ID_poin_p]=[id_element,tupe_link,tupe_vector,Namber+1]
    // --------------------------------------------------------------
    ve_point_h.id=ID_poin_p;
    let ID_point=window[ID_poin_p];
    if (Namber & 1 ) {
      rotate_point=0;
      top_point=6;
    } else {
      rotate_point=180;
      top_point=4;
    }
    left_point=12+(Namber*gird);
    ID_point.setAttribute('transform','translate('+left_point+','+top_point+') rotate('+rotate_point+')');
    document.getElementById(ID_poin_p).onmouseup=fp_onmouseup; // Событие клика - отпускания
    document.getElementById(ID_poin_p).onmousedown=fp_onmousedown; // Событие клика
    // console.log(ID_poin_p);
  }; 
  
  point_id={};
  // console.log(point_oll);
}

function fc_onmouseup(data){
  console.log(this.id);
  mouseEvent=false;
  // point_true=false
  let x = data.clientX-box1.left;//Поиск угла SVG поля по X
  pos_x = (x-x%gird);//Ищем позицию компонента в простанстве по X
  let y = data.clientY-box1.top;//Поиск угла SVG поля по Y
  pos_y = (y-y%gird);//Ищем позицию компонента в простанстве по Y 
  // console.log(pos_x/6,pos_y/6);
}

function fc_onmousedown(data){
  if(point_true){
  mouseEvent="f_component";
  muve_id=this.id
  console.log(this.id);
  ID_comp=window[this.id]
  shiftX = data.clientX - ID_comp.getBoundingClientRect().left;// смещение мышки относительно элемента по Х
  shiftX = (shiftX-shiftX%gird); // сокращаем относительно сетки, чтоб элемент всегда ходил по ней
  shiftY = data.clientY - ID_comp.getBoundingClientRect().top;// смещение мышки относительно элемента по Y
  shiftY = (shiftY-shiftY%gird);// сокращаем относительно сетки, чтоб элемента всегда ходил по ней
  // console.log(shiftX,shiftY);
  }
}

function f_component_muve(pos){
  ve_muve(muve_id,[(pos[0]-shiftX/gird),(pos[1]-shiftY/gird)])
  id_comp=window[muve_id];
  id_comp.setAttribute('transform','translate('+((pos[0]*gird)-shiftX)+','+((pos[1]*gird+2)-shiftY)+')');
  // console.log(pos);
}

function f_component_stop(pos){
  console.log("Кнопка отпущена");
  console.log(pos);
  point_true=true
}


function fp_onmouseup(data){
  // console.log(this.id);
  // point_true=true
  let x = data.clientX-box1.left;//Поиск угла SVG поля по X
  pos_x = (x-x%gird);//Ищем позицию компонента в простанстве по X
  let y = data.clientY-box1.top;//Поиск угла SVG поля по Y
  pos_y = (y-y%gird);//Ищем позицию компонента в простанстве по Y 
  // console.log(pos_x/6,pos_y/6);
}

function fp_onmousedown(data){
  console.log(this.id);
  mouseEvent="f_point"
  point_true=false
  let x = data.clientX-box1.left;//Поиск угла SVG поля по X
  pos_x = (x-x%gird);//Ищем позицию компонента в простанстве по X
  let y = data.clientY-box1.top;//Поиск угла SVG поля по Y
  pos_y = (y-y%gird);//Ищем позицию компонента в простанстве по Y 
  console.log([pos_x/6,pos_y/6]);
  console.log([pos_x/6,pos_y/6]);
  
  let link_tupe = point_oll[this.id][1]
  let link_poz = point_oll[this.id][3]
  let link_vector = point_oll[this.id][2]
  let comp_id=point_oll[this.id][0]
  let comp_pos=com_link[comp_id].pos
  let comp_l=com_link[comp_id].l
  let comp_h=com_link[comp_id].h
  console.log(point_oll[this.id])
  let pos_l =[]
  if(link_tupe=="H"){
    if(link_vector=="p0"){
      pos_l=[comp_pos[0]+comp_h+1,comp_pos[1]+link_poz]
      link_add("link_svg","l77_"+this.id,[link_tupe,pos_l,[pos_x/6,pos_y/6]]);
      muve_id=["l77_"+this.id,"p1"]
    }else{
      pos_l=[comp_pos[0],comp_pos[1]+link_poz]
      link_add("link_svg","l77_"+this.id,[link_tupe,[pos_x/6,pos_y/6],pos_l]);
      muve_id=["l77_"+this.id,"p0"]
    }
  }else{
    if(link_vector=="p0"){
      pos_l=[comp_pos[0]+link_poz,comp_pos[1]+comp_l+1]
      link_add("link_svg","l77_"+this.id,[link_tupe,pos_l,[pos_x/6,pos_y/6]]);
      muve_id=["l77_"+this.id,"p1"]
    }else{
      pos_l=[comp_pos[0],comp_pos[1]]
      console.log("pos")
      link_add("link_svg","l77_"+this.id,[link_tupe,pos_l,[pos_x/6,pos_y/6]]);
      muve_id=["l77_"+this.id,"p0"]
    }
  }
  
}

function f_point_muve(pos){
  console.log(pos)
console.log(muve_id)
link_edit(muve_id[0],{[muve_id[1]]:pos})

}

function f_point_stop(pos){

}


/*main_svg.onmouseleave = function(event) {
  //status_c=false //Выключаем перетаскивание в случае выхода за края
  //console.log('Выход');
  */