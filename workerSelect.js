onmessage = function(e){
    if ( e.data === "start" ) {
  
        var arr = Array(10000);
  
        for (var i = 10000; i >= 0; i--) {
            arr.push(i);
        };
  
        function test3(a)
        {
            let n = a.length;
            for(let i = 0; i < n; i++) {
                let min = i;
                for(let j = i+1; j < n; j++){
                    if(a[j] < a[min]) {
                        min=j; 
                    }
                }
                if (min != i) {
                    let tmp = a[i]; 
                    a[i] = a[min];
                    a[min] = tmp;      
                }
            }
            
        }
        var start = new Date().getTime();
        test3(arr);
        var stop = new Date().getTime();
        var czas = stop-start;
        postMessage(czas);
    }
  };