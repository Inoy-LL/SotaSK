function f_add_contur(id,config_file, pos){//функция добаления одного компонета

    x_el=(pos[0]-1)*gird;
    y_el=(pos[1]-1)*gird+2;
    let config=window[config_file];//Переводим текст в название обекта
    
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