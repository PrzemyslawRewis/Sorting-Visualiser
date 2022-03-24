onmessage = function(e){
    if ( e.data === "start" ) {
  
        var arr = Array(10000);
  
        for (var i = 10000; i >= 0; i--) {
            arr.push(i);
        };
  
        function test2(a)
        {
            var swapped;
            do {
                swapped = false;
                for (var i=0; i < a.length-1; i++) {
                    if (a[i] > a[i+1]) {
                        var temp = a[i];
                        a[i] = a[i+1];
                        a[i+1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
        }
        var start = new Date().getTime();
        test2(arr);
        var stop = new Date().getTime();
        var czas = stop-start;
        postMessage(czas);
    }
  };