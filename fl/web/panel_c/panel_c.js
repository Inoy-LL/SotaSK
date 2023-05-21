  function fc_panel_c_add(data){
    id=fc_id_out(data);
    console.log("Боковая паенль "+id)
    console.log(option.main_id);
    // link('l1');
  

  var el_pr=[
    ['ADC','ve_conf_adc','ADC.svg'],
    ['And','ve_conf_and','And.svg'],
    ['Button','ve_conf_adc','Button.svg'],
    ['Buzzer','ve_conf_adc','Buzzer.svg'],
    ['CDA','ve_conf_adc','CDA.svg'],
    ['Delay','ve_conf_adc','Delay.svg'],
    ['Digital Output','ve_conf_adc','DigitalOutput.svg'],
    ['HYST','ve_conf_adc','HYST.svg'],
    ['Input','ve_conf_adc','Input.svg'],
    ['LED','ve_conf_adc','LED.svg'],
    ['Math','ve_conf_adc','Math.svg'],
    ['Relay','ve_conf_adc','Relay.svg'],
];

el_pr.forEach((element, id) => {//поочередный перебор элементов в масиве
    add_panel_ve(element[0],element[1],element[2],id);
  });

  function add_panel_ve(name_el, config_file_el, icon_el, id_el){
    //let div_element='<div class="element_p" ondragstart="drag(event)" draggable="true" id="ID_0"><div class="element_p_img"><img draggable="false"  class="element_p_im" src="ico/'+icon_el+'"></div><div class="element_p_text">'+name_el+'</div></div>'
    let div_element='<section class="element_p  hero is-medium" ondragstart="drag(event)" draggable="true" id="ID_0"><div class="container" style="top:14px"><figure class="image is-24x24"><img draggable="false" src="ico/'+icon_el+'"></figure></div><div class="container" style="line-height:1;padding-top:3px">'+name_el+'</div></section>'
    
    //let div_element='<div class="element_p" ondragstart="drag(event)" draggable="true" id="ID_0">'+name_el+'</div>';//Шаблон элемена
    
    if(option.main_id=='body'){
      document.body.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }else{
      let ID_vc_comp=window[option.main_id]; //Создаем имя компонета в который нужно вложить текущий
    if(document.getElementById(option.main_id)==null){ 
      console.log('%c%s', 'color: Orange;','ID компонета: '+option.main_id+' не существует!');
      document.body.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }else{
      ID_vc_comp.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }
    }
    ID_0.setAttribute('conf',config_file_el);
    ID_0.id = 'vc_b_svg_'+id_el; 
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("content", ev.target.getAttribute('conf'));
    console.log(ev.target.getAttribute('conf'));
    //console.log(ev.target.id+' '+ev.target.textContent);
}

function drop(ev, block) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var content = ev.dataTransfer.getData("content");
    let box1 = vc_b_svg.getBoundingClientRect();
    let x_p = ev.clientX-box1.left-25;
    let y_p = ev.clientY-box1.top-25;
    ve_add_component(content,(x_p-x_p%net),(y_p-y_p%net));
}

};