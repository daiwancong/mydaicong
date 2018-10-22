	window.onload=function(){
		// 顶部滑动效果
		headerScroll();
		// 倒计时效果
		countDownTime();
		// 图片轮播
		banner();
		// 定时轮播
		timeBanner();
		// 手指滑动事件
		fingerDrag();
		// 底部Nav按钮点击时间
		footerNavClick();
		// 仿hover事件封装
		similationHover();
		// ajax动态
		// 1：newflash 文字定时换
		newFlash();
		// 2滚动到底后加载文件
		srollBottom();
		
	}

	function headerScroll(){
		var navBox = document.getElementById('nav');
		var navHeight =navBox.offsetHeight+navBox.offsetTop;
		var headerBox = document.getElementById('header');
		var headerOpcity=0;
		// 滑动的距离
		var scrollTarget=0;
			// 给容器绑定scroll事件
		window.addEventListener('scroll',function(){
				scrollTarget=document.body.scrollTop||document.documentElement.scrollTop;
				headerOpcity=scrollTarget/navHeight;
				if(headerOpcity>1){
					headerOpcity=1;
					headerBox.style.boxShadow='0 -5px 15px #000';
				}else if(headerOpcity<1){
					headerBox.style.boxShadow='none';
				}
				headerBox.style.background= 'rgba(255,255,255,'+headerOpcity+')';
		});
	}
		// 倒计时效果封装
	function countDownTime(){
		var liArr= document.querySelectorAll('.timelimit-top ul li');
		// 此处效果演示获取的是固定数 实际new.Date()可获取未来开始时间
		var totlaTime=844;
		var hours= 0;
		var minute= 0;
		var second= 0;
			setInterval(function(){
				totlaTime--;
				if(totlaTime<0){
					return;
				}
				hours= Math.floor(totlaTime/3600);
				minute= Math.floor(totlaTime/60);
				second=Math.floor(totlaTime%60);
				liArr[0].innerHTML=Math.floor(hours/10);
				liArr[1].innerHTML=hours%10;
				liArr[3].innerHTML=Math.floor(minute/10);
				liArr[4].innerHTML=minute%10;
				liArr[6].innerHTML=Math.floor(second/10);
				liArr[7].innerHTML=second%10;
			},1000)
	}
		// 轮播效果封装
	function banner(){
		// 获取屏幕宽度
		var width= document.body.offsetWidth;
		// 获取移动的盒子
		var moveBox= document.querySelector('.banner-img');
		// 获取对应的小圆点li数组
		var liIndexArr= document.querySelectorAll('.banner-index li');
		// 声明一个公共的索引
		var index=0;
			// 开始距离
		var startX =0;
		// 鼠标移动距离
		var moveX=0;
		// 拖拽宽度 用于吸附效果
		var drapWidth=0;
		// 重复使用代码进行封装
		// 1开启轮播的过渡效果
		var startTransition=function(){
			moveBox.style.transition='all 0.5s';
		} 
		// 2取消轮播过渡效果
		var endTransition=function(){
			moveBox.style.transition='';
		}
		// 3moveBox移动的距离
		var moveTransform =function(distance){
			moveBox.style.transform='translateX('+distance+'px)';
		}

		// 开启定时器
		var target= setInterval(function(){
			index++;
				// 排他法给banner对应的小圆圈加样式
			// moveBox.style.transition='all 0.5s';
			startTransition();
			// moveBox.style.transform='translateX('+index*width*-1+'px)';
			moveTransform(index*width*-1);
		},2000);
		// 添加过渡事件判断是否越界
		moveBox.addEventListener('webkitTransitionEnd',function(){
				if(index>4){
					index=0;
					// moveBox.style.transition='';
					endTransition();
					// moveBox.style.transform='translateX('+index*width*-1+'px)';
					moveTransform(index*width*-1);
				}else if(index<0){
						index=4;
						// moveBox.style.transition='';
						endTransition();
						// moveBox.style.transform='translateX('+index*width*-1+'px)';
						moveTransform(index*width*-1);
					}
				for (var i = 0; i < liIndexArr.length; i++) {
					liIndexArr[i].className='';
					}
				liIndexArr[index].className='current';	
		})
		// 鼠标按下
		moveBox.addEventListener('touchstart',function(e){
			clearInterval(target);
			startX = e.touches[0].clientX;
		})
		// 鼠标移动
		moveBox.addEventListener('touchmove',function(e){
			moveX = e.touches[0].clientX-startX;
			// moveBox.style.transform='translateX('+(index*width*-1+moveX)+'px)';
			moveTransform(index*width*-1+moveX);
		})
		// 鼠标弹起
		moveBox.addEventListener('touchend',function(e){
			// 拖拽宽度不超过屏幕1/3吸附回去
			drapWidth = width/3;
			if(Math.abs(moveX)<drapWidth){
				// moveBox.style.transition='all 0.5s';
				startTransition();
				// moveBox.style.transform='translateX('+index*width*-1+'px)';
				moveTransform(index*width*-1);
			}else {
				if(moveX>0){
					index--;
				}else if(moveX<0){
					index++;
				}
			// moveBox.style.transition='all 0.5s';
			startTransition();
			// moveBox.style.transform='translateX('+index*width*-1+'px)';
			moveTransform(index*width*-1);
			}
			target= setInterval(function(){
				index++;
				// moveBox.style.transition='all 0.5s';
				startTransition();
				// moveBox.style.transform='translateX('+index*width*-1+'px)';
				moveTransform(index*width*-1);
			},2000);
		})
	}
		// 小banner定时轮播
	function timeBanner(){
		var smallWidth =document.querySelector('.smallbanner-img').offsetWidth;
		var smallBox=document.querySelector('.smallbanner-img ul');
		var smallIndexLi = document.querySelectorAll('.smallbanner-index li');
		var smallIndex=0;
		setInterval(function(){
			smallIndex++;
			smallBox.style.transition='all 1s';
			smallBox.style.transform='translateX('+smallIndex*smallWidth*-1+'px)';
		},4000)
		smallBox.addEventListener('webkitTransitionEnd',function(){
			if(smallIndex>2){
				smallIndex=0;
				smallBox.style.transition='';
				smallBox.style.transform='translateX('+smallIndex*smallWidth*-1+'px)';	
				}
			for (var i = 0; i < smallIndexLi.length; i++) {
				smallIndexLi[i].className='';
				}
			smallIndexLi[smallIndex].className='current';
		})
	}
		// 手指滑动事件封装
	function fingerDrag() {
			var ulaBox =document.getElementById('ula');
			var ulStratX=0;
			var ulMoveX=0;
			var ulaBoxWidth = ulaBox.offsetWidth;
			var ulMaxMove = 0;
			var ulMinMove =ulaBoxWidth/5*-1-10;
			var ulDistanceX =0;
			ulaBox.addEventListener('touchstart',function(e){
				ulStratX=e.touches[0].clientX;
			})
			ulaBox.addEventListener('touchmove',function(e){
				ulMoveX=e.touches[0].clientX-ulStratX;
				if(ulMoveX>ulMaxMove){
					ulMoveX=0;
					ulaBox.style.transition='all 0.8s';
					ulaBox.style.transform='translateX('+ulMaxMove+'px)';	
				}else if(ulMoveX<ulMinMove){
					ulMoveX=0;
					ulaBox.style.transition='all 0.5s';
					ulaBox.style.transform='translateX('+ulMinMove+'px)';
				}

					
				
			})
			ulaBox.addEventListener('touchend',function(e){
				ulDistanceX+=ulMoveX;
				if(ulMoveX>ulMaxMove){
					ulMoveX=ulMaxMove;
					ulaBox.style.transform='translateX('+ulMoveX+'px)';
				}else if(ulMoveX<ulMinMove) {
					ulMoveX=ulMinMove;
					ulaBox.style.transform='translateX('+ulMoveX+'px)';
				}
			})
	}
		// 手指点击事件封装
	function fingerClick(ele,callBack){
		// 起始的时间值
		var timeStart=0;
		// 判断是否移动
		var isMove = false;
		// 点击反应时间
		var maxTime= 250;
		ele.addEventListener('touchstart',function(){
			isMove=false;
			// 获取按下时的时间
			timeStart=Date.now();
		})
		ele.addEventListener('touchmove',function(){
			isMove=true;
		})
		ele.addEventListener('touchend',function(e){
			if(isMove==true){
				return;
			}
			if((Date.now()-timeStart)>maxTime){
				return;
			}
			callBack(e);
		})
	}

	// 底部Nav按钮点击时间
	function footerNavClick(){
			var btnNavUl = document.getElementById('btmnavclick');
			var btnliArr = document.querySelectorAll('#btmnavclick>li');
			// console.log(btnliArr);
			var btnLiWidth=btnliArr[0].offsetWidth;
			var btnNavIndex=0;
			var clickX=0;
			fingerClick(btnNavUl,function(e){
				for (var i = 0; i < btnliArr.length; i++) {
					btnliArr[i].dataset['index']=i;
					btnliArr[i].children[0].children[0].src='images/footernav_icon'+i+'.png';
				}
				// var btnNavIndex =e.path[2].dataset['index'];
				// console.log(e);
				clickX= e.changedTouches[0].clientX;
				btnNavIndex =Math.floor(clickX/btnLiWidth);
				// console.log(btnNavIndex);
				btnliArr[btnNavIndex].children[0].children[0].src='images/active_icon'+btnNavIndex+'.png';
				btnliArr[btnNavIndex].children[0].children[1].style.color='#000';
				//最初版本 是获取的是点击的标签 发现有点击不到的地方 console.log(e)直接获取关于li的标签做添加
				// var btnNavIndex = e.target.parentNode.parentNode.dataset['index'];
				// 	btnliArr[btnNavIndex].children[0].children[0].src='images/active_icon'+btnNavIndex+'.png';
				// 	btnliArr[btnNavIndex].children[0].children[1].style.color='#000';
			})
	}
	// 移动的效果
	function similationHover(ele){
		var hoverUl = document.getElementById('similaHover');
		var hoverBox = hoverUl.children;
		var liWidth = hoverBox[0].offsetWidth;
		var liHeight = hoverBox[0].offsetHeight;
		var hoverWidth =0;
		var hoverHright =0;
		var hoverIndex=0;
		for (var i = 0; i < hoverBox.length; i++) {
			hoverBox[i].dataset['index']=i;
		}
		hoverUl.addEventListener('touchmove',function(e){
			hoverWidth=e.targetTouches[0].clientX;
			//clientY获取问题
			hoverHeight=e.targetTouches[0].clientY;
			if(hoverWidth<0){
				return;
			}
			if(hoverWidth<0){
				return;
			}
			for (var i = 0; i < hoverBox.length; i++) {
				hoverBox[i].children[0].style.border='1px solid #eee';
			}
			if(hoverWidth<=liWidth){
				// 2n
				hoverIndex=2*Math.floor(hoverHeight/liHeight)-2;
			}else if(hoverWidth>liWidth){
				// 2n+1
				hoverIndex=2*Math.floor(hoverHeight/liHeight)-1;
			}
			hoverBox[hoverIndex].children[0].style.border='1px solid #ee1a38';
		})
		hoverUl.addEventListener('touchend',function(e){
			for (var i = 0; i < hoverBox.length; i++) {
				hoverBox[i].children[0].style.border='1px solid #eee';
			}
		})
	}
	// 1：newflash 文字定时换
	function newFlash(){
		var pTxt= document.getElementById('newfh').innerHTML;
		var pName= document.getElementById('newfh');
		// console.log(pName);
		setInterval(function(){
			var ajax = new XMLHttpRequest();
			ajax.open('post','01index.php');
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ajax.send();
			ajax.onreadystatechange =function(e){
				if(ajax.readyState==4&&ajax.status==200) {
					var arrObj =JSON.parse(ajax.responseText);
					var nfObj = arrObj.newsflash;
					var sjindex= Math.floor(Math.random()*nfObj.length);
					// console.log(nfObj[sjindex]);
					pName.innerHTML=nfObj[sjindex].name;
				}
			}
		},4000)
	}
	// 2 01-产品图的瀑布流加载封装
	function waterFall(){
		var ajax=new XMLHttpRequest();
		var wfJoinBox= document.getElementById('btnProduct');
		ajax.open('get','01index.php');
		// ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send();
		ajax.onreadystatechange=function(e){
			if(ajax.readyState==4&&ajax.status==200){
				// 转换json字符为对象
				var arrObj =JSON.parse(ajax.responseText);
					var nfObj = arrObj.product;
					// 定义为items数组
					var obj = {
						items:nfObj
					};
					// 调出模板引擎
					var resultStr = template('template',obj);
					// 在ul后添加，并保留原来的
					wfJoinBox.innerHTML+=resultStr;
			}
		}
	}
	// 滚动到底后加载
	function srollBottom(){
			window.addEventListener('scroll',function(e){
						// 加载盒子的高度
					var ulHeight =document.getElementById('similaHover').offsetHeight;
					// 获取整个盒子的高度 考虑到提前加载问题 在之前就触发
					var bodyHeight =document.getElementById('container').offsetHeight-ulHeight;
					// 获取卷起来的高度
					var scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
					if(scrollHeight+ulHeight>bodyHeight){
						waterFall();
					}
					// 加载后盒子高度变化
					bodyHeight+=ulHeight;
			})
	}

