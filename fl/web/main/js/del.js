function f_component_del(echo){
    return new Promise(function(resolve){
        setTimeout(function() {
            console.log(echo.d);
        resolve(echo);
    }, 1000);
});
}