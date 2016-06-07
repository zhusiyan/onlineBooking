// 每日套餐tab切换
window.onload=function(){
	var tab=document.getElementById("package");
	var nav=tab.getElementsByTagName("ul")[0];/*星期一等套餐导航*/
	var navLi=nav.getElementsByTagName("li");
	var week=tab.getElementsByTagName("div");

	for(var i=0,len=navLi.length;i<len;i++){
		navLi[i].index=i;
		navLi[i].onmouseover=function(){
			for(var n=0;n<len;n++){
				navLi[n].className="";
				week[n].className="hide";
			}
			this.className="hover";
			week[this.index].className="";
		}
		// 导航鼠标移开hover效果取消
		// navLi[i].onmouseout=function(){
		// 	this.className="";
		// }
	}
	// banner轮播大图
	var bannerBg=document.getElementById("bannerBg");
	var listImg=document.getElementById("listImg");
	var list=document.getElementById("list").getElementsByTagName("li");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var index=1;
	var leng=5;
	var animated=false;
	var interval=3000;
	var timer;

	function animate(offset){
		if(offset==0){
			return;
		}
		animated=true;
		var time=300;
		var inteval=10;
		var speed=offset/(time/interval);
		var left=parseInt(listImg.style.left)+offset;

		var go=function(){
			if ((speed > 0 && parseInt(listImg.style.left) < left) || (speed < 0 && parseInt(listImg.style.left) > left)) {
	    				listImg.style.left = parseInt(listImg.style.left) + speed + 'px';
                        setTimeout(go, inteval);
	    			}
	    			else{
	    				listImg.style.left = left + 'px';
                        if(left>-300){
                            listImg.style.left = -960 * leng + 'px';
                        }
                        if(left<(-960 * leng)) {
                            listImg.style.left = '-960px';
                        }
                        animated = false;
	    	}
		}
		go();

	}
	function showButton() {
                for (var i = 0; i < list.length ; i++) {
                    if( list[i].className == 'on'){
                        list[i].className = '';
                        break;
                    }
                }
                list[index - 1].className = 'on';
            }
            function play() {
                timer = setTimeout(function () {
                	right.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }
            right.onclick=function(){
            	if (animated) {
                    return;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-960);
                showButton();
            }
            left.onclick=function(){
            	if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(960);
                showButton();
            }
            for (var i = 0; i < list.length; i++) {
                list[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -960 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }

            scroll.onmouseover = stop;
            scroll.onmouseout = play;

            play();
}