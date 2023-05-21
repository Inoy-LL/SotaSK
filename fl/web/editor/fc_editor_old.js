var shiftX;
      var shiftY;
      var ID_comp;
      var ID_com;
      var po_x
      var po_y
      var net=6; //Шаг сетки в px.
      var status_c=false;       // передвигаем компонент при событии mousemove
       function onMouseMove(event) { //Срабатывает при движении мышки
        // console.log(event.clientX,event.clientY);
           if(status_c==true){
            let x = event.clientX-box1.left;//Поиск угла SVG поля по X
            pos_x = (x-x%net-shiftX);//Ищем позицию компонента в простанстве по X
            let y = event.clientY-box1.top;//Поиск угла SVG поля по Y
            pos_y = (y-y%net-shiftY);//Ищем позицию компонента в простанстве по Y  
          if(pos_x>=0 && po_x!=pos_x){ // Ограничение - чтоб компонент не вылетал за левое поле
            po_x=pos_x;//Ищем позицию компонента в простанстве по X
            ID_comp.setAttribute('transform','translate('+pos_x+','+pos_y+') ');
          
          }else{
          if(pos_y>=0&& po_y!=pos_y){ // Ограничение - чтоб компонент не вылетал за верх
            po_y=pos_y;//Ищем позицию компонента в простанстве по Y
            ID_comp.setAttribute('transform','translate('+pos_x+','+pos_y+') ');
            
           }}

        }
       }

    function vc_onmouseup(id){//Кнопка отпущена - можно удалить (работает только в приделах SVG)
    //console.log('Компонет отпущен '+this.id)
    //status_c=false;
    };

addEventListener("click", function() {// отпускание работает везде - новое
    status_c=false;// отпускаем компонет
    //console.log("Щёлк!");
  });

function vc_onmousedown(id){//Кнопка нажата
    box1 = vc_b_svg.getBoundingClientRect();
    ID_comp=window[this.id]; //Переводим текст в название функции
    shiftX = event.clientX - ID_comp.getBoundingClientRect().left;// смещение мышки относительно элемента по Х
    shiftX = (shiftX-shiftX%net); // сокращаем относительно сетки, чтоб элемент всегда ходил по ней
    shiftY = event.clientY - ID_comp.getBoundingClientRect().top;// смещение мышки относительно элемента по Y
    shiftY = (shiftY-shiftY%net);// сокращаем относительно сетки, чтоб элемента всегда ходил по ней
    status_c=true; // Включаем перемещение элемента
};
       
            function allowDrow(ev) {
                ev.preventDefault();
            }
