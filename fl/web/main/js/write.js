function f_component_write(echo){
    return new Promise(function(resolve){
        setTimeout(function() {
        console.log(echo.w);
        resolve(echo);
    }, 1000);
});
}