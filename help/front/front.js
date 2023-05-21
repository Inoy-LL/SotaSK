editor=''
fc_front_id=0;
let fc_fr_id='web/front'
function fc_front_add(fc_obj){ //Функция срабатывает один раз при добалении компонета в ДНА
  let fc_front=contentStor.c[fc_fr_id].id;
  fc_front[fc_obj]='fc_t'+fc_front_id;
if (typeof option.main_id!="undefined"){
let div = document.createElement('div');
div.id ='gjs';
fc_front_id++;
// div.innerHTML = `<div>text</div>`;
if(option.main_id=='body'){
  document.body.append(div);
}else{
  let ID_vc_comp=window[option.main_id]; //Создаем имя компонета в который нужно вложить текущий
if(document.getElementById(option.main_id)==null){ 
  console.log('%c%s', 'color: Orange;','ID компонета: '+option.main_id+' не существует!');
  document.body.append(div);
}else{
  ID_vc_comp.append(div)}
}

fc_front_insert()
fc_front_inser()
}};

// const LandingPage = {
//   html: null,
//   css: null,
//   components:[{"type":"text","content":"Text"},{"type":"text","content":"Text"}],
//   style: null,
// };

function fc_front_insert(fc_obj){
editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: '#gjs',
  // plugins: [
  //   'gjs-blocks-basic', 
  //   'gjs-preset-newsletter'],
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  // fromElement: 1,
  // Size of the editor
  height: '100%',
  width: 'auto',
   // Avoid any default panel
   panels: { defaults: [] },
   blockManager: {appendTo: '#blocks',blocks: [
    {
      id: 'text',
      label: '<img draggable="false" src="ico/And.svg"><div>Text</div>',
      content: `<div>Text</div>`

    }]},
    
   traitManager: {appendTo: '#option'},
  // Disable the storage manager for the moment
 
  // components: LandingPage.components || LandingPage.html,
  // style: LandingPage.style || LandingPage.css,
 
  storageManager: {
    autoload: false,
    // type: 0 
  }
 
});
// editor = grapesjs.init({
//   container : '#gjs',
//   components: [{"type":"text1","contenthh":"Text"},{"type":"text","content":"Text123454"}],
//   style: '.txt-red{color: red}',
//     storageManager: {
//     autoload: false,
//   }
// });
}


function fc_front_inser(){
  const storageManager = editor.StorageManager;
  editor.on('component:mount', (some) => {
    console.log(JSON.stringify(editor.getComponents()))
  //   const domComponents = editor.DomComponents;
  //   // console.log(editor.getConfig(domComponents.getWrapper()))
  //   // console.log(editor.getConfig())
  //   let ID_function=window[some.ccid];
  //   console.log(ID_function.parentElement)
  //   // +' '+some.ccid
  //   // console.log(storageManager.getStorages())//Возвращает всю базу

    })

    
   
  var blockManager = editor.BlockManager;
  blockManager.add('button', {
    label: '<img draggable="false" src="ico/Button.svg"><div>Button</div>', // You can use HTML/SVG inside labels
    content: `<button class="button is-small" style="margin: 3px">Button</button>`
  });

  editor.DomComponents.addType('button', {
    isComponent: el => el.tagName == 'BUTTON',
    model: {
      defaults: {
        traits: [
          // Strings are automatically converted to text types
          'Имя', // Same as: { type: 'text', name: 'name' }
          'placeholder',
          {
            type: 'select', // Type of the trait
            label: 'Type', // The label you will see in Settings
            name: 'type', // The name of the attribute/property to use on component
            options: [
              { id: 'text', name: 'Text'},
              { id: 'email', name: 'Email'},
              { id: 'password', name: 'Password'},
              { id: 'number', name: 'Number'},
            ]
          }, {
            type: 'checkbox',
            name: 'required',
        }],
        // As by default, traits are binded to attributes, so to define
        // their initial value we can use attributes
        attributes: { type: 'text', required: true },
      },
    },
});

editor.addComponents(
  [{"type":"text","content":"Text"},{"content":""},{"type":"text","status":"selected","content":"Text"}]
);
}

  