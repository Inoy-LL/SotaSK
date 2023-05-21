root.panel_c={'insert':function (id){ //Функция срабатывает один раз при добалении компонета в ДНА
    console.log("Боковая паенль "+id)
    console.log(data.main_id);
    // link('l1');


data.element.forEach((element, id) => {//поочередный перебор элементов в масиве
    add_panel_ve(element[0],element[1],id);
  });

  function add_panel_ve(element,name, id_el){
  let div_element='<div class="comp" ondragstart="drag(event)" draggable="true" id="ID_0"><div class="center_c"><img draggable="false" src="/'+f_stack+'/'+data.platform+'/'+element+'/'+element+'.svg"><div class="text_c">'+name+'</div></div></div>'//Шаблон элемена

    if(data.main_id=='body'){
      document.body.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }else{
      let ID_vc_comp=window[data.main_id]; //Создаем имя компонета в который нужно вложить текущий
    if(document.getElementById(data.main_id)==null){ 
      console.log('%c%s', 'color: Orange;','ID компонета: '+data.main_id+' не существует!');
      document.body.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }else{
      ID_vc_comp.insertAdjacentHTML("beforeend", div_element);//добавляем шаблон в DOM дерево
    }
    }
    ID_0.setAttribute('conf',id_el);
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

}};