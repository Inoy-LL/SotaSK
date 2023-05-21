
var f1 = function() {
    return new Promise(function(resolve,reject) {
      setTimeout(function() {
          let status=true;
          if(status){      
          console.log('Хорошо 1');
          resolve(status);
          }else{console.log('Плохо 1')
          resolve(status)}
      }, 1000);
    });
  }
  

  var f2 = function(echo) {

    return new Promise(function(resolve,reject) {
      masiv=[1,2,3,4]
      return masiv.reduce(function(p, dee){ 
        return p.then(()=>f4(dee))
      }, Promise.resolve())  
      .then(test=>console.log('Успешная загрузка'))
      .catch(test=>console.log('Ошибка загрузки'))
      .then(test=>resolve(12))
    });
  }
  
  var f3 = function(echo) {
    return new Promise(function(resolve,reject) {
      setTimeout(function() {
          let status=true;
          if(status){      
          console.log('Хорошо 3');
          resolve(status);
          }else{console.log('Плохо 3')
          resolve(status)}
      }, 1000);
    });
  }

  var f4 = function(echo) {
    return new Promise(function(resolve,reject) {
      setTimeout(function() {
        console.log('Номер: '+echo);
        // resolve(echo);
        reject(13);
      }, 1000);
      
    });
  }
  

  var seqRunner = function(deeds) {
    return deeds.reduce(function(p, deed){ 
      return p.then(deed)
    }, Promise.resolve());
  }
  
  seqRunner([f1, f2, f3])
  .then(data =>console.log('Успех! '+data))
  .catch(err => console.log('Ошибка '+err));


// test = 
// {level1: {level2: {level3: "level3"}}};
// r1 = (((test || {}).level1 || {}).level2 || {}).level3;
// console.log(r1)
// test11=0
// link={'t12':worcF,data:startLink(1)}
// link.t12({test:1});
// //----------------Функции срабатывают по прерываниям--------------------------

// function startLink(id_in="Дефолт"){//Кнопка нажата
// test11=88
// console.log(id_in)
// };

// function worcF(id_in="Дефолт"){//Кнопка нажата
// console.log(test11)
// };












  //   test_get('fl/web/main/js/download.js')
// .then(data=>console.log('%c%s', 'color: green;','Файл существует'))
// .catch(data=>console.log('%c%s', 'color: red;','Файл ненайден'))

// function test_get(file) {  
//     return new Promise(function(True,False) {
//     let rawFile = new XMLHttpRequest();
//                 rawFile.open("HEAD", file, true);
//                 rawFile.send();
//                 rawFile.onload = function() {
//     if (rawFile.status == "200"){
//         True();
//         }else{
//         False();
// }}})}

// function fc_tree_ad(fc_obj){
// $.ajax({
// 			url: url,
// 			data: node.id,
// 			dataType: "json",
// 			success: onSuccess,
// 			error: onAjaxError,
// 			cache: false
//         })
//     }