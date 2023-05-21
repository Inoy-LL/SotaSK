l_edit=[]
link_oll={}
let option_l=[
  {"C":"Black","T":1.5,"R":3,"t_mask":6},
  {"C":"FireBrick","T":1.5,"R":3,"t_mask":6},
  {"C":"FireBrick","T":1.5,"R":3},
  {"C":"Black","T":1.5,"t_mask":6},
]

function link_add(canvas,id,data){
  link_oll[id]=data
  let id_canvas=window[canvas]; //Переводим текст в название функции
  option_add={}
  line_d = link_tracing(id);
    if (data[0]=="H"){
      option_add=option_l[0]
   }
   if (data[0]=="V"){
      option_add=option_l[1]
    }
    let svg_line=`<path  id="`+id+`" d="`+line_d[0]+`" stroke="`+option_add.C+`" stroke-width="`+option_add.T+`" fill="transparent"/>`
    let svg_mask=`<path  id="`+id+`_mask" d="`+line_d[1]+`" stroke="Black" opacity="0.00" stroke-width="`+option_add.t_mask+`" fill="transparent"/>`
    id_canvas.insertAdjacentHTML("beforeend", svg_line);//добавляем шаблон в DOM 
    id_canvas.insertAdjacentHTML("beforeend", svg_mask);//добавляем шаблон в DOM
}

function link_edit(id,data){
    let ID_comp=window[id]; //Переводим текст в название функции
    let ID_comp_mask=window[id+`_mask`]; //Переводим текст в название функции
    Object.assign(link_oll[id][1],data.p0);
    Object.assign(link_oll[id][2],data.p1);
    line_d = link_tracing(id);
    ID_comp.setAttribute('d',line_d[0]);
    ID_comp_mask.setAttribute('d',line_d[1]); 
}

function link_del(id){
  let ID_comp=window[id]; //Переводим текст в название функции
  let ID_comp_mask=window[id+`_mask`]; //Переводим текст в название функции
  delete link_oll[id];
  ID_comp_mask.remove();
  ID_comp.remove()
}

function link_read(id){
  return link_oll[id];
}

//--------------------------Трасировщик линий--------------------------
function link_tracing(id){
  const blok=1;// Блокировать при ближениии на N ячеек
let tracing=[];
let dot_1=link_oll[id][1];
let dot_2=link_oll[id][2];
let xm=dot_2[0]-dot_1[0]
let ym=dot_2[1]-dot_1[1]
// console.log(xm,ym)
//---------------Срабатывет когда точки на растоянии 1 или 0
if(xm<=1&xm>=-1&ym<=1&ym>=-1){
  tracing=[dot_1,[dot_2[0],dot_2[1],4]];
}else{
  if(link_oll[id][0]=="H"){
  if(dot_1[0]<dot_2[0]){//запрещяем ходить с обратной стороны
    if(dot_1[1]==dot_2[1]){//Когда идем по прямой
      tracing=[dot_1,[dot_2[0],dot_2[1],4]];
    }else{
      let pol
      if(dot_2[0]-dot_1[0]>1){
      pol=(dot_2[0]+dot_1[0])/2 //Высчитываем половину (может быть с дробной частью)
      pol=pol-pol%1//Убираем дробную часть
        tracing=[dot_1,[pol,dot_1[1],2],[pol,dot_2[1],3],[dot_2[0],dot_2[1],4]];
  }else{
    let pol=(dot_2[1]+dot_1[1])/2 //Высчитываем половину (может быть с дробной частью)
    pol=pol-pol%1//Убираем дробную часть
    tracing=[dot_1,[dot_1[0]+blok,dot_1[1]],[dot_1[0]+blok,pol],[dot_2[0]-blok,pol],[dot_2[0]-blok,dot_2[1]],[dot_2[0],dot_2[1],4]];
  }
    }
  }else{
    let ym=dot_2[1]-dot_1[1]
    if(ym<=1&ym>=-1){
      let visota = () => {if(dot_1[1]>dot_2[1]){return dot_2[1]-2}else{return dot_1[1]-2}}
    tracing=[dot_1,[dot_1[0]+blok,dot_1[1]],[dot_1[0]+blok,visota()],[dot_2[0]-blok,visota()],[dot_2[0]-blok,dot_2[1]],[dot_2[0],dot_2[1],4]];
    }else{
    let pol=(dot_2[1]+dot_1[1])/2 //Высчитываем половину (может быть с дробной частью)
    pol=pol-pol%1//Убираем дробную часть
    tracing=[dot_1,[dot_1[0]+blok,dot_1[1]],[dot_1[0]+blok,pol],[dot_2[0]-1,pol],[dot_2[0]-blok,dot_2[1]],[dot_2[0],dot_2[1],4]];
  }
  }
}
if(link_oll[id][0]=="V"){
  if(dot_1[1]<dot_2[1]){//запрещяем ходить с обратной стороны
  if(dot_1[0]==dot_2[0]){//запрещяем ходить с обратной стороны
    tracing=[dot_1,dot_2];
    }else{
      if(dot_2[1]-dot_1[1]>1){
        let pol=(dot_2[1]+dot_1[1])/2 //Высчитываем половину (может быть с дробной частью)
        pol=pol-pol%1//Убираем дробную часть  
      tracing=[dot_1,[dot_1[0],pol],[dot_2[0],pol],dot_2];
    }else{
      let pol=(dot_2[0]+dot_1[0])/2 //Высчитываем половину (может быть с дробной частью)
      pol=pol-pol%1//Убираем дробную часть
      tracing=[dot_1,[dot_1[0],dot_1[1]+blok],[pol,dot_1[1]+blok],[pol,dot_2[1]-blok],[dot_2[0],dot_2[1]-blok],[dot_2[0],dot_2[1],4]];
    }
    }
}else{
  let ym=dot_2[0]-dot_1[0]
  if(ym<=1&ym>=-1){
    let visota = () => {if(dot_1[0]>dot_2[0]){return dot_2[0]-2}else{return dot_1[0]-2}}
    tracing=[dot_1,[dot_1[0],dot_1[1]+blok],[visota(),dot_1[1]+blok],[visota(),dot_2[1]-blok],[dot_2[0],dot_2[1]-blok],[dot_2[0],dot_2[1],4]];
  }else{
    let pol=(dot_2[0]+dot_1[0])/2 //Высчитываем половину (может быть с дробной частью)
    pol=pol-pol%1//Убираем дробную часть
    tracing=[dot_1,[dot_1[0],dot_1[1]+blok],[pol,dot_1[1]+blok],[pol,dot_2[1]-blok],[dot_2[0],dot_2[1]-blok],[dot_2[0],dot_2[1],4]];
}}}}
return line_bild(tracing)
}

// Отрисовщик линий (с углами и без)
function line_bild(data_in){
  let r=3
  let line_d='';
  let mask_d='';
  let data=data_in
  if (typeof data_in[0][2]!== 'undefined'){
    op_st=data_in[0][2]
  }else{op_st=0}
  if (data_in[0][2]>=option_l.length){op_st=0}
  if (typeof option_l[op_st].R!== 'undefined'){
    r=option_l[op_st].R
    data.map(function(data_map,i,v) {
      let l=v.length-1
      let x_L=data_map[0]*gird
      let y_L=data_map[1]*gird
      let x_g=data_map[0]
      let y_g=data_map[1]
      if(i==0){
        // Первая точка
        line_d='M'+x_L+','+y_L
        mask_d=line_d
      }else{
        let x_p_g=data[i-1][0]
        let y_p_g=data[i-1][1]
        if(i!=l){
        // Вся середина
        mask_d=mask_d+' L'+x_L+','+y_L
        let x_p=data[i-1][0]*gird
        let y_p=data[i-1][1]*gird
        let x_c=data[i+1][0]*gird
        let y_c=data[i+1][1]*gird
let S={}
let L={}
        if(y_L>y_c){
          if(x_L>x_p){
            S={x:x_L,y:y_L,xr:x_L,yr:y_L-r}
            L={x:x_L-r,y:y_L}//1_L
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
          if(x_L<x_p){
            S={x:x_L,y:y_L,xr:x_L,yr:y_L-r}
            L={x:x_L+r,y:y_L}//3_L
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
        }
        if(y_L<y_c){
          if(x_L>x_p){
            S={x:x_L,y:y_L,xr:x_L,yr:y_L+r} 
            L={x:x_L-r,y:y_L}//5_L
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
          if(x_L<x_p){
            S={x:x_L,y:y_L,xr:x_L,yr:y_L+r} 
            L={x:x_L+r,y:y_L}//7_L
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
        }
        if(y_L<y_p){
          if(x_L>x_c){
            L={x:x_L,y:y_L+r}//2_L
            S={x:x_L,y:y_L,xr:x_L-r,yr:y_L}
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
            if(x_L<x_c){
            L={x:x_L,y:y_L+r}//4_L
            S={x:x_L,y:y_L,xr:x_L+r,yr:y_L}
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }}
        if(y_L>y_p){
          if(x_L>x_c){
            L={x:x_L,y:y_L-r}//6_L
            S={x:x_L,y:y_L,xr:x_L-r,yr:y_L}
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
          }
          if(x_L<x_c){
            L={x:x_L,y:y_L-r}//8_L
            S={x:x_L,y:y_L,xr:x_L+r,yr:y_L}
            line_d=line_d+' L'+L.x+','+L.y+' S'+S.x+','+S.y+' '+S.xr+','+S.yr;
        }}
        }else{
        // Последняя точка
        line_d=line_d+' L'+x_L+','+y_L;
        mask_d=mask_d+' L'+x_L+','+y_L;
        }
      }
  })
  }else{
    data.map(function(data_map,i,v) {
      let x=data_map[0]*gird
      let y=data_map[1]*gird
      let l=v.length-1
      if(i==0){
        // Первая точка
        line_d=line_d+'M'+x+','+y
      }else{
        if(i!=l){
        // Вся середина
        line_d=line_d+' L'+x+','+y;
        }else{
        // Последняя точка
        line_d=line_d+' L'+x+','+y;
        }
      }
  })
  mask_d=line_d
}
return [line_d, mask_d]
}