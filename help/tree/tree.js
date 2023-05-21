fc_tree_id=0;
let fc_tr_id='web/tree'

function fc_tree_add(fc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
if (typeof option.main_id!="undefined"&&typeof option.tree!="undefined"){
let fc_tree=contentStor.c[fc_tr_id].id;
fc_tree[fc_obj]='fc_tr'+fc_tree_id;
let div = document.createElement('div');
div.className = "fc_tree";
div.id ='fc_tr'+fc_tree_id;
fc_tree_id++;
// div.onclick=;
div.setAttribute('onclick', "tree_toggle(arguments[0])");
// div.innerHTML = '<ul class="Container">'+option.text+'</ul>';
if(option.main_id=='body'){
  document.body.append(div);
  fc_tree_insert(option.tree,div.id);
}else{
  let ID_vc_comp=window[option.main_id]; //Создаем имя компонета в который нужно вложить текущий
if(document.getElementById(option.main_id)==null){ 
  console.log('%c%s', 'color: Orange;','ID компонета: '+option.main_id+' не существует!');
  document.body.append(div);
  fc_tree_insert(option.tree,div.id);
}else{
  ID_vc_comp.append(div)
  fc_tree_insert(option.tree,div.id);
}
}
//vc_c_content;
//blok.append(div);
// fc_tree_n("tree", "data.php")
}
};

function fc_tree_insert(tree_katredj,main_id){
  console.log(main_id)
  tree_katredj.map(function(data) {
  let div = document.createElement('ul');
  let id_out='';
  let Is=''
  if(data[0]==0){id_out=main_id;Is='IsRoot'}else{id_out='tree_'+data[0];
  Is='IsLast'
}
  let ID_vc_comp=window[id_out]; //Создаем имя компонета в который нужно вложить текущий
  div.className = "Container";
  let status_c='ExpandOpen'
  chexbox=''
  style_ch=''
  if(option.checkbox_on==1){chexbox='<input type="checkbox"/>';style_ch='style="margin-left: 36px;"'}
if(data[2]==1){status_c='ExpandOpen'}else{status_c='ExpandClosed'}
  div.innerHTML='<li class="Node '+Is+' IsLast '+status_c+'" id="'+'tree_'+data[1]+'"><div class="Expand"></div>'+chexbox+'<div class="Content" '+style_ch+' >'+data[3]+'</div>'
  document.body.append(div);
  ID_vc_comp.append(div)
  })
}


function fc_tree_data(data){ //Функция 1 класса text
let id_tree =contentStor.c[fc_t_id].id[fc_id[1]]
if (typeof data == 'undefined'){data_in=option.text};
document.getElementById(id_tree).innerHTML = data;
};


function tree_toggle(event) {
  // console.log(event)
	event = event || window.event
	var clickedElem = event.target || event.srcElement

	if (!hasClass(clickedElem, 'Expand')) {
		return // клик не там
	}

	// Node, на который кликнули
	var node = clickedElem.parentNode
	if (hasClass(node, 'ExpandLeaf')) {
		return // клик на листе
	}

	// определить новый класс для узла
	var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen'
	// заменить текущий класс на newClass
	// регексп находит отдельно стоящий open|close и меняет на newClass
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}


function hasClass(elem, className) {
	return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}