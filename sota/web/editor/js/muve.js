com_link={
    //  "com1":{"pos":[],"p_l":{},"p_r":{},"p_t":{},"p_b":{}},
    //  "com2":{"pos":[],"p_l":{},"p_r":{},"p_t":{},"p_b":{}},
    }
    // "edit":{"data":{"pos":[4,4],"l":5,"h":5},"link":{"l1":["com2",1]},"velue":{"l_1":["com3",2]}}
 
    console.log(link_oll)
    // link_edit("l3",{"p1":[50,30]})
    function ve_muve(id,pos){
    com_link_edit(id,pos[0],pos[1]);
    // console.log(id,x,y);
    }
    
    function com_link_edit(id,x,y){
    // console.log(id,x,y);
    let link_l=Object.keys(com_link[id].p_l)
    link_l.map(function(link){
        let l_1=com_link[id].p_l[link]
        link_edit(link,{"p1":[x+1,y+1+l_1]})
    })
    let link_r=Object.keys(com_link[id].p_r)
    link_r.map(function(link){
        let l_1=com_link[id].p_r[link]
        let l=com_link[id].l
        link_edit(link,{"p0":[x+2+l,y+1+l_1]})
    })
    let link_t=Object.keys(com_link[id].p_t)
    link_t.map(function(link){
        let l_1=com_link[id].p_t[link]
        // console.log(link)
        link_edit(link,{"p1":[x+l_1+1,y+1]})
    })
    let link_b=Object.keys(com_link[id].p_b)
    link_b.map(function(link){
        let l_1=com_link[id].p_b[link]
        let h=com_link[id].h
        link_edit(link,{"p0":[x+1+l_1,y+2+h]})
    })
    
    // link_edit(comp_id[id][0],{["p"+comp_id[id][2]]:[x_muv+1,y_muv+1]})
    }
 
    //Добавляем компоненты на поле и в масив компонентов
    function editor_pars(data){
    let group_id=Object.keys(data);
    data=data[group_id[0]];
    let pos=[0,0]
    // console.log(data)
    let data_id=Object.keys(data);
    data_id.map(function(comp){
        let comp_id=Object.keys(data[comp]); 
        comp_id.map(function(obj){
        pos=data[comp][obj].edit.data.pos;
        let l=data[comp][obj].edit.data.l;
        let h=data[comp][obj].edit.data.h;
        ve_add_component(comp+'/'+obj,compoen_lib[comp],pos);
        com_link[comp+'/'+obj]={"pos":pos,"l":l,"h":h,"p_l":{},"p_r":{},"p_t":{},"p_b":{}};  
        })
        
    })


    data_id.map(function(comp){
        let comp_id=Object.keys(data[comp]); 
        comp_id.map(function(obj){   
            //Добавляем горизонтальные линки в масив компонентов     
            link_masiv=data[comp][obj].edit.link;
            if(link_masiv!=undefined){
            let link_id=Object.keys(link_masiv);
            link_id.map(function(link){
                l_1=link_masiv[link][0]
                l_2=link_masiv[link][2]
                comp_end=link_masiv[link][1][0]+'/'+link_masiv[link][1][1]
                com_link[comp+'/'+obj].p_r[link]=l_1
                com_link[comp_end].p_l[link]=l_2
                let pos_comp=com_link[comp+'/'+obj].pos
                let l_comp=com_link[comp+'/'+obj].l
                let pos_comp_end=com_link[comp_end].pos
                pos_link=[pos_comp[0]+l_comp+1,pos_comp[1]+l_1]
                pos_link_end=[pos_comp_end[0],pos_comp_end[1]+l_2]
                link_add("link_svg",link,["H",pos_link,pos_link_end]);
            })}
    
        // Добавляем вертикальные линки в масив компонентов
        velue_masiv=data[comp][obj].edit.velue;
        if(velue_masiv!=undefined){
        let velue_id=Object.keys(velue_masiv);
        velue_id.map(function(velue){
            v_1=velue_masiv[velue][0]
            v_2=velue_masiv[velue][2]
            comp_end=velue_masiv[velue][1][0]+'/'+velue_masiv[velue][1][1]
            com_link[comp+'/'+obj].p_b[velue]=v_1
            com_link[comp_end].p_t[velue]=v_2
            let pos_comp=com_link[comp+'/'+obj].pos
            let h_comp=com_link[comp+'/'+obj].h
            let pos_comp_end=com_link[comp_end].pos
            pos_link=[pos_comp[0]+v_1,pos_comp[1]+h_comp+1]
            pos_link_end=[pos_comp_end[0]+v_2,pos_comp_end[1]]
            link_add("link_svg",velue,["V",pos_link,pos_link_end]);
        })}
    })
    })
    // console.log(com_link);
    
    }