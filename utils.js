module.exports = {

float2int: function(value) { //This will convert float to integer              
    return value | 0;                                            
},                                                                
                                                                 
convert: function(integer) {                                    
    var str = Number(integer).toString(16);                    
    return str.length == 1 ? "0" + str : str;                    
},                                                               
                                                                 
to_rgb: function(r, g, b) { return "#" + convert(r) + convert(g) + convert(b); },
                                                                               
getCurrentSystemTime: function(){                                               
        var currenTimemilliseconds = (new Date).getTime();                     
        return currenTimemilliseconds;                    
}  

}
