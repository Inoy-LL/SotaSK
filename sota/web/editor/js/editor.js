       function onMouseMove(data) { //Срабатывает при движении мышки
        let x = data.clientX-box1.left;//Поиск угла SVG поля по X
        let pos_x = (x-x%gird)/gird;//Ищем позицию компонента в простанстве по X
        let y = data.clientY-box1.top;//Поиск угла SVG поля по Y
        let pos_y = (y-y%gird)/gird;//Ищем позицию компонента в простанстве по Y
        if (pos_old[0]!=pos_x|pos_old[1]!=pos_y){
        pos_old=[pos_x,pos_y];
        // console.log(pos_x,pos_y)
        if(mouseEvent){
         id_function=window[mouseEvent+"_muve"];
         id_function([pos_x,pos_y]);
      }}}

      addEventListener("click", function() {// отпускание работает везде - новое
        id_function=window[mouseEvent+"_stop"];
        if(mouseEvent){
        id_function(pos_old);
      }
     mouseEvent=false;
     point_true=true
      });
