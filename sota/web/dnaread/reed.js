function reedData(data){
    let dataOut={}
    if( typeof data!== 'object'||Object.keys(data).length===0){dataOut=dna}
        Object.keys(data).map(function(key){
        if(typeof dna[key]!='undefined'){
        if( typeof data[key]!== 'object'||Object.keys(data[key]).length===0){dataOut[key]=dna[key]}else{dataOut[key]={}}
        Object.keys(data[key]).map(function(key1){
        if(typeof dna[key][key1]!='undefined'){
        if( typeof data[key][key1]!== 'object'||Object.keys(data[key][key1]).length===0){dataOut[key][key1]=dna[key][key1]}else{dataOut[key][key1]={}}
        Object.keys(data[key][key1]).map(function(key2){
        if(typeof dna[key][key1][key2]!='undefined'){
        if( typeof data[key][key1][key2]!== 'object'||Object.keys(data[key][key1][key2]).length===0){dataOut[key][key1][key2]=dna[key][key1][key2]}else{dataOut[key][key1][key2]={}}
        Object.keys(data[key][key1][key2]).map(function(key3){
        if(typeof dna[key][key1][key2][key3]!='undefined'){
        if( typeof data[key][key1][key2][key3]!== 'object'||Object.keys(data[key][key1][key2][key3]).length===0){dataOut[key][key1][key2][key3]=dna[key][key1][key2][key3]}else{dataOut[key][key1][key2][key3]={}}
        Object.keys(data[key][key1][key2][key3]).map(function(key4){
        if( typeof data[key][key1][key2][key3][key4]!== 'object'||Object.keys(data[key][key1][key2][key3][key4]).length===0){dataOut[key][key1][key2][key3][key4]=dna[key][key1][key2][key3][key4]}else{dataOut[key][key1][key2][key3][key4]={}}
        })}})}})}})
        }})
    return dataOut
    }