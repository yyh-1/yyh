function createWaterFall(areaDom,urls,everyWidth){

    var colNumber;
    var gap;
    createImgDoms();
    setImgPosition();
    

    function cal(){
        var containerWidth = parseInt(areaDom.clientWidth);
        colNumber = Math.floor(containerWidth / everyWidth);
        var space = containerWidth - colNumber*everyWidth;
        gap = space / (colNumber + 1);

    }
    function createImgDoms(){
        for(var i = 0;i < urls.length; i++){
            var url = urls[i];
            var img = document.createElement("img");
            img.src = url;
            img.style.width = everyWidth + "px";
            img.style.position = "absolute";
            img.onload = function(){
                setImgPosition();
            }
            img.style.left = ""
            img.style.top = ""
            areaDom.appendChild(img);
        }
    }

    function setImgPosition(){
        cal();
        var colY = new Array(colNumber); //存放每一列的下一个图片的Y坐标
        colY.fill(0); //将数组的每一项填充为0
        
        for(var i = 0; i < areaDom.children.length; i++){
            var img = areaDom.children[i];
            var y = Math.min(...colY);

            var index = colY.indexOf(y);
            var x = (index + 1)*gap + index*everyWidth;
            img.style.left = x + "px";
            img.style.top = y + "px";

            colY[index] += parseInt(img.height) + gap;


        }

        window.onresize = function(){
            // if (timer){
            //     clearTimeout(timer0);
            // }
            timer = setTimeout(function(){
                setImgPosition();
            },500);
            
        }

        //找到数组中最大的数字
        var height = Math.max(...colY);
        areaDom.style.height = height + "px";
    }
}