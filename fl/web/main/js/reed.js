function f_component_reed(echo){
    return new Promise(function(resolve){
        setTimeout(function() {
            console.log(echo.r);
        resolve(echo);
    }, 1000);
});
}