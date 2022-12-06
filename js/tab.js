var databar01 = datatab[2];
var data =[];
for(var i = 0; i < databar01.length-1; i++){
    var item = {};
for(var j = 0;j < databar01[0].length; j++){
    var itemn = databar01[0][j];
    var itemif = databar01[i +1][j];

    item[itemn] = itemif
}
data.push(item);
}
         var cart = document.getElementById("table table-bordered");
         var tbody = cart.children[1];
         var tr = document.createElement('tr');
         for (var key1 in data[0]) {undefined
                        tr.innerHTML += '<th align="center"  ' +
                            'style="background-color:#4d4545;color: rgb(255,255,255);' +
                            '" ><div>' + key1 + '</div></th>';

         }
         tbody.appendChild(tr);
         data.forEach(function (value) {
             //console.log(value);
             var tr = document.createElement('tr');

             for (var key in value) {undefined
                             var doto = value[key];
                             if(key.indexOf("简称") != -1){
                                 tr.innerHTML += '<a href='+ './detail/'+ value["REITs代码"] +'/index.html target= "_blank" align="center" class="award-name"><div class="award-name">' + doto + '</div></a>';
                             } else if(key.indexOf("率") != -1){
                                 tr.innerHTML += '<td align="center"><div class="award-name">' + String((Math.round(doto * 10000)/100).toFixed(2)) + '%'+ '</div></td>';
                             }
                             else{
                                 tr.innerHTML += '<td align="center"><div class="award-name">' + doto + '</div></td>';
                             }

                         }
             tbody.appendChild(tr)
         });
     var td=document.getElementsByTagName("td");//查询所有td标签,组成数组
     var trs=document.getElementsByTagName("tr");//查询所有tr标签,组成数组
    for (var i=0;i<trs.length;i++){
        trs[i].onmouseover=function () {
            this.className='bg';
        };
        trs[i].onmouseleave=function () {
            this.className='tbody';
        }
    }



    function formatDate(numb, format) {
        if (numb != undefined) {

            let time = new Date((numb - 1) * 24 * 3600000 + 1);
            time.setYear(time.getFullYear() - 70);
            let year = time.getFullYear() + '';
            let month = time.getMonth() + 1 + '';
            let date = time.getDate() + '';
            if (format && format.length === 1) {
                return year + format + month + format + date
            }
            return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
        } else {
            return numb;
        }
    }

