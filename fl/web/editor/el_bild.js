let comp_id={};
let point_id={};
let id_el_nav;
ve_conf_adc={
"prefix":"t1",
"icon":"ADC",
"name":"ADC",
"point":{
"Top_point":{
"test1":12,
"test2":14,
// "test3":12,
// "test4":14,
// "test5":5,
//   "test6":5,
//   "test7":5
},
"Left_point":{
  "test1":12,
  "test2":14,
  "test3":12,
  "test4":14,
  "test5":5,
  "test6":5,
  "test7":5,
  "test8":5,
  "test9":5,
  // "test10":5
},
"Right_point":{
  "test1":12,
  "test2":14,
  "test3":12,
  "test4":14,
  "test5":5,
  "test6":5,
  "test7":5,
  "test8":5,
  "test9":5,
  "test10":5
},
"Bottom_point":{
  "test1":12,
  "test2":14,
  "test3":12,
  "test4":14,
  "test5":5,
  "test6":5,
  "test7":5,
  "test8":5,
  "test9":5,
  "test11":5,
  "test10":5
},
// "T":5,
}
};

ve_conf_math={
  "prefix":"m1",
  "icon":"Math",
  "name":"Math",
  "point":{
  "Top_point":{
  "test1":12,
  "test2":14,
  // "test3":12,
  // "test4":14,
  // "test5":5,
  //   "test6":5,
  //   "test7":5
  },
  "Left_point":{
    "test1":12,
    "test2":14,
    "test3":12,
    // "test4":14,
    // "test5":5,
    // "test6":5,
    // "test7":5,
    // "test8":5,
    // "test9":5,
    // "test10":5
  },
  "Right_point":{
    "test1":12,
    // "test2":14,
    // "test3":12,
    // "test4":14,
    // "test5":5,
    // "test6":5,
    // "test7":5,
    // "test8":5,
    // "test9":5,
    // "test10":5
  },
  "Bottom_point":{
    "test1":12,
    "test2":14,
    // "test3":12,
    // "test4":14,
    // "test5":5,
    // "test6":5,
    // "test7":5,
    // "test8":5,
    // "test9":5,
    // "test11":5,
    // "test10":5
  },
  // "T":5,
  }
  };




function ve_add_component(config_file, x_el, y_el){//функция добаления одного компонета
let config=window[config_file];//Переводим текст в название обекта
let gird=6;
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
<image id="ve_img" xlink:href="ico/`+config.icon+`.svg" transform="translate(12,10)" width="24" height="24"/>
<rect width=46 height=55 fill-opacity="0.0" transform="translate(0,0)"/>`;
let svg_side_element='<g id="ve_point_side"></g>';
vc_b_svg.insertAdjacentHTML("beforeend", svg_element);//добавляем шаблон в DOM дерево
//id_el_nav=config.prefix in comp_id;
//console.log(comp_id);
id_el_nav=config.prefix+'_'+comp_id[config.prefix];// создаем ID комопнента и вытаскиваем его из джейсона
// console.log(id_el_nav);
ve_element.id=id_el_nav;
ID_element=window[id_el_nav];
ID_element.setAttribute('transform','translate('+x_el+','+y_el+')');
ID_element.insertAdjacentHTML("beforeend", svg_content_element);//добавляем шаблон в DOM дерево
let svg_side = [['T',0,0,0,0],['B',0,14+(c_height*gird),0,1],['L',2,-2,90,1],['R',16+(c_width*gird),-2,90,0]];//параметры для поворота сторон
svg_side.forEach((side,id_st) => {
ID_element.insertAdjacentHTML("beforeend", svg_side_element);//добавляем шаблон в DOM дерево
let ID_side=id_el_nav+'_side_'+side[0];
ve_point_side.id=ID_side;

ID_side=window[ID_side];
let scale='';
if(side[4]==1){scale=' scale(1, -1)'};
ID_side.setAttribute('transform','translate('+side[1]+','+side[2]+') rotate('+side[3]+')'+scale);
// 
ve_add_point(id_el_nav, side[0],config);
})
ve_border.id=id_el_nav+'_border';
ID_border=window[id_el_nav+'_border'];
ID_border.setAttribute('width',6+(c_width*gird));
ID_border.setAttribute('height',6+(c_height*gird));
ve_text.id=id_el_nav+'_text';
ID_text=window[id_el_nav+'_text'];
ID_text.setAttribute('transform','translate('+(((c_width*gird)-24)/2)+','+(10+(c_height*gird))+')');
ve_img.id=id_el_nav+'_img';
ID_img=window[id_el_nav+'_img'];
ID_img.setAttribute('transform','translate('+(((c_width*gird)-6)/2)+','+((c_height*gird)/2-5)+')');

document.getElementById(id_el_nav).onmouseup=vc_onmouseup; // Событие клика - отпускания
document.getElementById(id_el_nav).onmousedown=vc_onmousedown; // Событие клика
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
    let Namber=[point_id[config.prefix]];
    ID_poin_p=id_element+'_point_'+side_s+'_'+Namber;
    ve_point_h.id=ID_poin_p;
    let ID_point=window[ID_poin_p];
    if (Namber & 1 ) {
      rotate_point=0;
      top_point=6;
    } else {
      rotate_point=180;
      top_point=4;
    }
    left_point=12+(Namber*net);
    ID_point.setAttribute('transform','translate('+left_point+','+top_point+') rotate('+rotate_point+')');
    // console.log(ID_poin_p);
  }; 
  
  point_id={};
}

/*vc_b_svg.onmouseleave = function(event) {
  //status_c=false //Выключаем перетаскивание в случае выхода за края
  //console.log('Выход');
  */