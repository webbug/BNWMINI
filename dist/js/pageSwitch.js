!function(ROOT,struct,undefined){"use strict";function type(obj){return null==obj?obj+"":"object"==typeof obj||"function"==typeof obj?class2type[toString.call(obj)]||"object":typeof obj}function isArrayLike(elem){var tp=type(elem);return!!elem&&"function"!=tp&&"string"!=tp&&(0===elem.length||elem.length&&(1==elem.nodeType||elem.length-1 in elem))}function camelCase(str){return(str+"").replace(/^-ms-/,"ms-").replace(/-([a-z]|[0-9])/gi,function(all,letter){return(letter+"").toUpperCase()})}function cssTest(name){var prop=camelCase(name),_prop=camelCase(cssVendor+prop);return prop in divstyle&&prop||_prop in divstyle&&_prop||""}function isFunction(func){return"function"==type(func)}function pointerLength(obj){var key,len=0;if("number"==type(obj.length))len=obj.length;else if("keys"in Object)len=Object.keys(obj).length;else for(key in obj)obj.hasOwnProperty(key)&&len++;return len}function pointerItem(obj,n){return"item"in obj?obj.item(n):function(){var key,i=0;for(key in this)if(i++==n)return this[key]}.call(obj,n)}function each(arr,iterate){if(isArrayLike(arr)){if("function"==type(arr.forEach))return arr.forEach(iterate);for(var item,i=0,len=arr.length;len>i;i++)item=arr[i],"undefined"!=type(item)&&iterate(item,i,arr)}else{var key;for(key in arr)iterate(key,arr[key],arr)}}function children(elem){var ret=[];return each(elem.children||elem.childNodes,function(elem){1==elem.nodeType&&ret.push(elem)}),ret}function getStyle(elem,prop){var style=ROOT.getComputedStyle&&ROOT.getComputedStyle(elem,null)||elem.currentStyle||elem.style;return style[prop]}function addListener(elem,evstr,handler){return"object"==type(evstr)?each(evstr,function(evstr,handler){addListener(elem,evstr,handler)}):void each(evstr.split(" "),function(ev){elem.addEventListener?elem.addEventListener(ev,handler,!1):elem.attachEvent?elem.attachEvent("on"+ev,handler):elem["on"+ev]=handler})}function offListener(elem,evstr,handler){return"object"==type(evstr)?each(evstr,function(evstr,handler){offListener(elem,evstr,handler)}):void each(evstr.split(" "),function(ev){elem.removeEventListener?elem.removeEventListener(ev,handler,!1):elem.detachEvent?elem.detachEvent("on"+ev,handler):elem["on"+ev]=null})}function removeRange(){var range;ROOT.getSelection?(range=getSelection(),"empty"in range?range.empty():"removeAllRanges"in range&&range.removeAllRanges()):DOC.selection.empty()}function filterEvent(oldEvent){var pointers,pointer,ev={},which=oldEvent.which,button=oldEvent.button;if(each("wheelDelta detail which keyCode".split(" "),function(prop){ev[prop]=oldEvent[prop]}),ev.oldEvent=oldEvent,ev.type=oldEvent.type.toLowerCase(),ev.eventType=event2type[ev.type]||ev.type,ev.eventCode=event2code[ev.type]||0,ev.pointerType=POINTERTYPES[oldEvent.pointerType]||oldEvent.pointerType||ev.eventtype,ev.target=oldEvent.target||oldEvent.srcElement||DOC.documentElement,3===ev.target.nodeType&&(ev.target=ev.target.parentNode),ev.preventDefault=function(){oldEvent.preventDefault&&oldEvent.preventDefault(),ev.returnValue=oldEvent.returnValue=!1},pointers=POINTERS[ev.eventType]){switch(ev.eventType){case"mouse":case"pointer":var id=oldEvent.pointerId||0;3==ev.eventCode?delete pointers[id]:pointers[id]=oldEvent;break;case"touch":POINTERS[ev.eventType]=pointers=oldEvent.touches}(pointer=pointerItem(pointers,0))&&(ev.clientX=pointer.clientX,ev.clientY=pointer.clientY),ev.button=4>which?Math.max(0,which-1):4&button&&1||2&button,ev.length=pointerLength(pointers)}return ev}var VERSION="2.3.1",lastTime=0,nextFrame=ROOT.requestAnimationFrame||ROOT.webkitRequestAnimationFrame||ROOT.mozRequestAnimationFrame||ROOT.msRequestAnimationFrame||function(callback){var currTime=+new Date,delay=Math.max(1e3/60,1e3/60-(currTime-lastTime));return lastTime=currTime+delay,setTimeout(callback,delay)},cancelFrame=ROOT.cancelAnimationFrame||ROOT.webkitCancelAnimationFrame||ROOT.webkitCancelRequestAnimationFrame||ROOT.mozCancelRequestAnimationFrame||ROOT.msCancelRequestAnimationFrame||clearTimeout,DOC=ROOT.document,divstyle=DOC.createElement("div").style,cssVendor=function(){for(var prop,tests="-webkit- -moz- -o- -ms-".split(" ");prop=tests.shift();)if(camelCase(prop+"transform")in divstyle)return prop;return""}(),opacity=cssTest("opacity"),transform=cssTest("transform"),perspective=cssTest("perspective"),transformStyle=cssTest("transform-style"),transformOrigin=cssTest("transform-origin"),backfaceVisibility=cssTest("backface-visibility"),preserve3d=transformStyle&&function(){return divstyle[transformStyle]="preserve-3d","preserve-3d"==divstyle[transformStyle]}(),toString=Object.prototype.toString,class2type={},event2type={},event2code={click:4,mousewheel:5,dommousescroll:5,keydown:6},POINTERTYPES={2:"touch",3:"pen",4:"mouse",pen:"pen"},STARTEVENT=[],MOVEEVENT=[],POINTERS=(function(){var ret={},states={start:1,down:1,move:2,end:3,up:3,cancel:3};return each("mouse touch pointer MSPointer-".split(" "),function(prefix){var _prefix=/pointer/i.test(prefix)?"pointer":prefix;ret[_prefix]=ret[_prefix]||{},POINTERTYPES[_prefix]=_prefix,each(states,function(endfix,code){var ev=camelCase(prefix+endfix);ret[_prefix][ev]=code,event2type[ev.toLowerCase()]=_prefix,event2code[ev.toLowerCase()]=code,1==code?STARTEVENT.push(ev):MOVEEVENT.push(ev)})}),ret}(),{touch:{},pointer:{},mouse:{}}),EASE={linear:function(t,b,c,d){return c*t/d+b},ease:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},"ease-in":function(t,b,c,d){return c*(t/=d)*t*t+b},"ease-out":function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},"ease-in-out":function(t,b,c,d){return(t/=d/2)<1?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b},bounce:function(t,b,c,d){return(t/=d)<1/2.75?c*(7.5625*t*t)+b:2/2.75>t?c*(7.5625*(t-=1.5/2.75)*t+.75)+b:2.5/2.75>t?c*(7.5625*(t-=2.25/2.75)*t+.9375)+b:c*(7.5625*(t-=2.625/2.75)*t+.984375)+b}},TRANSITION={fade:function(cpage,cp,tpage,tp){opacity?(cpage.style.opacity=1-Math.abs(cp),tpage&&(tpage.style.opacity=Math.abs(cp))):(cpage.style.filter="alpha(opacity="+100*(1-Math.abs(cp))+")",tpage&&(tpage.style.filter="alpha(opacity="+100*Math.abs(cp)+")"))}};each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(name){class2type["[object "+name+"]"]=name.toLowerCase()}),each("X Y ".split(" "),function(name){var XY={X:"left",Y:"top"},fire3D=perspective?" translateZ(0)":"";TRANSITION["scroll"+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction];transform?cpage.style[transform]="translate"+prop+"("+100*cp+"%)"+fire3D:cpage.style[XY[prop]]=100*cp+"%",tpage&&(transform?tpage.style[transform]="translate"+prop+"("+100*tp+"%)"+fire3D:tpage.style[XY[prop]]=100*tp+"%")},TRANSITION["scroll3d"+name]=function(cpage,cp,tpage,tp){var deg,prop=name||["X","Y"][this.direction],fix=0>cp?-1:1,abscp=Math.abs(cp);perspective?(.05>abscp?(deg=1200*abscp,cp=0,tp=-1*fix):.95>abscp?(deg=60,cp=(cp-.05*fix)/.9,tp=(tp+.05*fix)/.9):(deg=1200*(1-abscp),cp=fix,tp=0),cpage.parentNode.style[transform]="perspective(1000px) rotateX("+deg+"deg)",cpage.style[transform]="translate"+prop+"("+100*cp+"%)",tpage&&(tpage.style[transform]="translate"+prop+"("+100*tp+"%)")):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["slide"+name]=function(cpage,cp,tpage,tp){TRANSITION["slideCoverReverse"+name].apply(this,arguments)},TRANSITION["flow"+name]=function(cpage,cp,tpage,tp){TRANSITION["flowCoverIn"+name].apply(this,arguments)},TRANSITION["slice"+name]=function(){var createWrap=function(node,container){var wrap=DOC.createElement("div");wrap.style.cssText="position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;",wrap.appendChild(node),container.appendChild(wrap)},fixBlock=function(cpage,tpage,pages,container){each(pages,function(page){page.parentNode!=container&&(cpage!=page&&tpage!=page?page.parentNode.style.display="none":page.parentNode.style.display="block")})};return function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction],len="X"==prop?"width":"height",total=this.container[camelCase("client-"+len)],end=(100*Math.abs(cp),100*Math.abs(tp),0==cp||0==tp);cpage.style[len]=end?"100%":total+"px",cpage.parentNode==this.container&&createWrap(cpage,this.container),cpage.parentNode.style.zIndex=cp>0?0:1,cpage.parentNode.style[len]=100*(Math.min(cp,0)+1)+"%",tpage&&(tpage.style[len]=end?"100%":total+"px",tpage.parentNode==this.container&&createWrap(tpage,this.container),tpage.parentNode.style.zIndex=cp>0?1:0,tpage.parentNode.style[len]=100*(Math.min(tp,0)+1)+"%"),fixBlock(cpage,tpage,this.pages,this.container)}}(),TRANSITION["flip"+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][1-this.direction],fix="X"==prop?-1:1;perspective?(cpage.style[backfaceVisibility]="hidden",cpage.style[transform]="perspective(1000px) rotate"+prop+"("+180*cp*fix+"deg)"+fire3D,tpage&&(tpage.style[backfaceVisibility]="hidden",tpage.style[transform]="perspective(1000px) rotate"+prop+"("+180*tp*fix+"deg)"+fire3D)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["flip3d"+name]=function(){var inited;return function(cpage,cp,tpage,tp){var prop=name||["X","Y"][1-this.direction],fe="X"==prop?-1:1,fix=fe*(0>cp?1:-1),zh=cpage["offset"+("X"==prop?"Height":"Width")]/2;preserve3d?(inited||(inited=!0,cpage.parentNode.parentNode.style[perspective]="1000px",cpage.parentNode.style[transformStyle]="preserve-3d"),cpage.parentNode.style[transform]="translateZ(-"+zh+"px) rotate"+prop+"("+90*cp*fe+"deg)",cpage.style[transform]="rotate"+prop+"(0) translateZ("+zh+"px)",tpage&&(tpage.style[transform]="rotate"+prop+"("+90*fix+"deg) translateZ("+zh+"px)")):TRANSITION["scroll"+name].apply(this,arguments)}}(),TRANSITION["flipClock"+name]=function(){var createWrap=function(node,container,prop,off){var wrap=node.parentNode,len="X"==prop?"height":"width",pos="X"==prop?"top":"left",origin=["50%",(off?0:100)+"%"]["X"==prop?"slice":"reverse"]().join(" ");return wrap&&wrap!=container||(wrap=DOC.createElement("div"),wrap.style.cssText="position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;display:none;",wrap.style[transformOrigin]=origin,wrap.style[backfaceVisibility]="hidden",wrap.appendChild(node),container.appendChild(wrap)),wrap.style[len]="50%",wrap.style[pos]=100*off+"%",node.style[len]="200%",node.style[pos]=200*-off+"%",wrap},fixBlock=function(cpage,tpage,pages,container){each(pages,function(page){page.parentNode!=container&&(cpage!=page&&tpage!=page?page.parentNode.style.display=page._clone.parentNode.style.display="none":page.parentNode.style.display=page._clone.parentNode.style.display="block")})};return function(cpage,cp,tpage,tp){var m,n,prop=name||["X","Y"][1-this.direction],zIndex=(this.pages[this.current]==cpage,Number(Math.abs(cp)<.5)),fix="X"==prop?1:-1;perspective?(createWrap(cpage,this.container,prop,0),createWrap(cpage._clone||(cpage._clone=cpage.cloneNode(!0)),this.container,prop,.5),m=n=180*-cp*fix,cp>0?n=0:m=0,cpage.parentNode.style.zIndex=cpage._clone.parentNode.style.zIndex=zIndex,cpage.parentNode.style[transform]="perspective(1000px) rotate"+prop+"("+m+"deg)",cpage._clone.parentNode.style[transform]="perspective(1000px) rotate"+prop+"("+n+"deg)",tpage&&(createWrap(tpage,this.container,prop,0),createWrap(tpage._clone||(tpage._clone=tpage.cloneNode(!0)),this.container,prop,.5),m=n=180*-tp*fix,cp>0?m=0:n=0,tpage.parentNode.style.zIndex=tpage._clone.parentNode.style.zIndex=1-zIndex,tpage.parentNode.style[transform]="perspective(1000px) rotate"+prop+"("+m+"deg)",tpage._clone.parentNode.style[transform]="perspective(1000px) rotate"+prop+"("+n+"deg)"),fixBlock(cpage,tpage,this.pages,this.container),0!=cp&&0!=tp||(cpage=this.pages[this.current],cpage.style.height=cpage.style.width=cpage.parentNode.style.height=cpage.parentNode.style.width="100%",cpage.style.top=cpage.style.left=cpage.parentNode.style.top=cpage.parentNode.style.left=0,cpage.parentNode.style.zIndex=2)):TRANSITION["scroll"+name].apply(this,arguments)}}(),TRANSITION["flipPaper"+name]=function(){var backDiv;return function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction],len="X"==prop?"width":"height",m=100*Math.abs(cp);if(!backDiv){backDiv=DOC.createElement("div"),backDiv.style.cssText="position:absolute;z-index:2;top:0;left:0;height:0;width:0;background:no-repeat #fff;";try{backDiv.style.backgroundImage=cssVendor+"linear-gradient("+("X"==prop?"right":"bottom")+", #aaa 0,#fff 20px)"}catch(e){}this.container.appendChild(backDiv)}TRANSITION["slice"+name].apply(this,arguments),backDiv.style.display=0==cp||0==tp?"none":"block",backDiv.style.width=backDiv.style.height="100%",backDiv.style[len]=(0>cp?m:100-m)+"%",backDiv.style[XY[prop]]=(0>cp?100-2*m:2*m-100)+"%"}}(),TRANSITION["zoom"+name]=function(cpage,cp,tpage,tp){var zIndex=Number(Math.abs(cp)<.5);transform?(cpage.style[transform]="scale"+name+"("+Math.abs(1-2*Math.abs(cp))+")"+fire3D,cpage.style.zIndex=zIndex,tpage&&(tpage.style[transform]="scale"+name+"("+Math.abs(1-2*Math.abs(cp))+")"+fire3D,tpage.style.zIndex=1-zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["bomb"+name]=function(cpage,cp,tpage,tp){var zIndex=Number(Math.abs(cp)<.5),val=Math.abs(1-2*Math.abs(cp));transform?(cpage.style[transform]="scale"+name+"("+(2-val)+")"+fire3D,cpage.style.opacity=zIndex?val:0,cpage.style.zIndex=zIndex,tpage&&(tpage.style[transform]="scale"+name+"("+(2-val)+")"+fire3D,tpage.style.opacity=zIndex?0:val,tpage.style.zIndex=1-zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["skew"+name]=function(cpage,cp,tpage,tp){var zIndex=Number(Math.abs(cp)<.5);transform?(cpage.style[transform]="skew"+name+"("+180*cp+"deg)"+fire3D,cpage.style.zIndex=zIndex,tpage&&(tpage.style[transform]="skew"+name+"("+180*tp+"deg)"+fire3D,tpage.style.zIndex=1-zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},each(" Reverse In Out".split(" "),function(type){TRANSITION["scrollCover"+type+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction],zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0),cr=100,tr=100;zIndex?cr=20:tr=20,transform?cpage.style[transform]="translate"+prop+"("+cp*cr+"%)"+fire3D:cpage.style[XY[prop]]=cp*cr+"%",cpage.style.zIndex=1-zIndex,tpage&&(transform?tpage.style[transform]="translate"+prop+"("+tp*tr+"%)"+fire3D:tpage.style[XY[prop]]=tp*tr+"%",tpage.style.zIndex=zIndex)},TRANSITION["slideCover"+type+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction],zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);transform?(cpage.style[transform]="translate"+prop+"("+cp*(100-100*zIndex)+"%) scale("+(.2*(1-Math.abs(zIndex&&cp))+.8)+")"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="translate"+prop+"("+tp*zIndex*100+"%) scale("+(.2*(1-Math.abs(zIndex?0:tp))+.8)+")"+fire3D,tpage.style.zIndex=zIndex)):TRANSITION["scrollCover"+type+name].apply(this,arguments)},TRANSITION["flowCover"+type+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][this.direction],zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);transform?(cpage.style[transform]="translate"+prop+"("+cp*(100-50*zIndex)+"%) scale("+(.5*(1-Math.abs(cp))+.5)+")"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="translate"+prop+"("+tp*(50+50*zIndex)+"%) scale("+(.5*(1-Math.abs(tp))+.5)+")"+fire3D,tpage.style.zIndex=zIndex)):TRANSITION["scrollCover"+type+name].apply(this,arguments)},TRANSITION["flipCover"+type+name]=function(cpage,cp,tpage,tp){var prop=name||["X","Y"][1-this.direction],zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);perspective?(zIndex?cp=0:tp=0,cpage.style[transform]="perspective(1000px) rotate"+prop+"("+-90*cp+"deg)"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="perspective(1000px) rotate"+prop+"("+-90*tp+"deg)"+fire3D,tpage.style.zIndex=zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["skewCover"+type+name]=function(cpage,cp,tpage,tp){var zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);transform?(zIndex?cp=0:tp=0,cpage.style[transform]="skew"+name+"("+90*cp+"deg)"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="skew"+name+"("+90*tp+"deg)"+fire3D,tpage.style.zIndex=zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["zoomCover"+type+name]=function(cpage,cp,tpage,tp){var zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);transform?(zIndex?cp=0:tp=0,cpage.style[transform]="scale"+name+"("+(1-Math.abs(cp))+")"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="scale"+name+"("+(1-Math.abs(tp))+")"+fire3D,tpage.style.zIndex=zIndex)):TRANSITION["scroll"+name].apply(this,arguments)},TRANSITION["bombCover"+type+name]=function(cpage,cp,tpage,tp){var zIndex=Number("In"==type||!type&&0>cp||"Reverse"==type&&cp>0);transform?(zIndex?cp=0:tp=0,cpage.style[transform]="scale"+name+"("+(1+Math.abs(cp))+")"+fire3D,cpage.style.zIndex=1-zIndex,tpage&&(tpage.style[transform]="scale"+name+"("+(1+Math.abs(tp))+")"+fire3D,tpage.style.zIndex=zIndex),TRANSITION.fade.apply(this,arguments)):TRANSITION["scroll"+name].apply(this,arguments)}})}),struct.prototype={version:VERSION,constructor:struct,latestTime:0,init:function(config){var self=this,handler=this.handler=function(ev){!self.frozen&&self.handleEvent(ev)};this.events={},this.duration=isNaN(parseInt(config.duration))?600:parseInt(config.duration),this.direction=0==parseInt(config.direction)?0:1,this.current=parseInt(config.start)||0,this.loop=!!config.loop,this.mouse=null==config.mouse?!0:!!config.mouse,this.mousewheel=!!config.mousewheel,this.interval=parseInt(config.interval)||5e3,this.playing=!!config.autoplay,this.arrowkey=!!config.arrowkey,this.frozen=!!config.freeze,this.pages=children(this.container),this.length=this.pages.length,this.pageData=[],addListener(this.container,STARTEVENT.join(" ")+" click"+(this.mousewheel?" mousewheel DOMMouseScroll":""),handler),addListener(DOC,MOVEEVENT.join(" ")+(this.arrowkey?" keydown":""),handler),each(this.pages,function(page){self.pageData.push({percent:0,cssText:page.style.cssText||""}),self.initStyle(page)}),this.pages[this.current].style.display="block",this.on({before:function(){clearTimeout(self.playTimer)},dragStart:function(){clearTimeout(self.playTimer),removeRange()},after:function(){self.playing&&(self.playTimer=setTimeout(function(){self.next()},self.interval))},update:null}).fire("after"),this.comment=document.createComment(" Powered by pageSwitch v"+this.version+"  https://github.com/qiqiboy/pageSwitch "),this.container.appendChild(this.comment),this.setEase(config.ease),this.setTransition(config.transition)},initStyle:function(elem){var ret,style=elem.style;return each("position:absolute;top:0;left:0;width:100%;height:100%;display:none".split(";"),function(css){ret=css.split(":"),style[ret[0]]=ret[1]}),elem},setEase:function(ease){return this.ease=isFunction(ease)?ease:EASE[ease]||EASE.ease,this},addEase:function(name,func){return isFunction(func)&&(EASE[name]=func),this},setTransition:function(transition){return this.events.update.splice(0,1,isFunction(transition)?transition:TRANSITION[transition]||TRANSITION.slide),this},addTransition:function(name,func){return isFunction(func)&&(TRANSITION[name]=func),this},isStatic:function(){return!this.timer&&!this.drag},on:function(ev,callback){var self=this;return"object"==type(ev)?each(ev,function(ev,callback){self.on(ev,callback)}):(this.events[ev]||(this.events[ev]=[]),this.events[ev].push(callback)),this},fire:function(ev){var self=this,args=[].slice.call(arguments,1);return each(this.events[ev]||[],function(func){isFunction(func)&&func.apply(self,args)}),this},freeze:function(able){return this.frozen=null==able?!0:!!able,this},slide:function(index){function ani(){var offset=Math.min(duration,+new Date-stime),s=duration?ease(offset,0,1,duration):1,cp=(target-percent)*s+percent;self.fixUpdate(cp,current,tIndex),offset==duration?(_tpage&&(_tpage.style.display="none"),delete self.timer,self.fire("after",fixIndex,current)):self.timer=nextFrame(ani)}var self=this,duration=(this.direction,this.duration),stime=+new Date,ease=this.ease,current=this.current,fixIndex=Math.min(this.length-1,Math.max(0,this.fixIndex(index))),cpage=this.pages[current],percent=this.getPercent(),tIndex=this.fixIndex(fixIndex==current?current+(percent>0?-1:1):fixIndex),tpage=this.pages[tIndex],target=index>current?-1:1,_tpage=cpage;return cancelFrame(this.timer),fixIndex==current?(target=0,_tpage=tpage):"none"==tpage.style.display&&(percent=0),this.fixBlock(current,tIndex),this.fire("before",current,fixIndex),this.current=fixIndex,duration*=Math.abs(target-percent),this.latestTime=stime+duration,ani(),this},prev:function(){return this.slide(this.current-1)},next:function(){return this.slide(this.current+1)},play:function(){return this.playing=!0,this.slide(this.current)},pause:function(){return this.playing=!1,clearTimeout(this.playTimer),this},fixIndex:function(index){return this.length>1&&(this.loop||this.playing)?(this.length+index%this.length)%this.length:index},fixBlock:function(cIndex,tIndex){return each(this.pages,function(page,index){cIndex!=index&&tIndex!=index?page.style.display="none":page.style.display="block"}),this},fixUpdate:function(cPer,cIndex,tIndex){var tPer,pageData=this.pageData,cpage=this.pages[cIndex],tpage=this.pages[tIndex];return pageData[cIndex].percent=cPer,tpage&&(tPer=pageData[tIndex].percent=cPer>0?cPer-1:1+cPer),this.fire("update",cpage,cPer,tpage,tPer)},getPercent:function(index){var pdata=this.pageData[null==index?this.current:index];return pdata&&(pdata.percent||0)},getOffsetParent:function(){var position=getStyle(this.container,"position");return position&&"static"!=position?this.container:this.container.offsetParent||DOC.body},handleEvent:function(oldEvent){var ev=filterEvent(oldEvent),canDrag=ev.length<2&&ev.button<1&&(!this.pointerType||this.pointerType==ev.eventType)&&(this.mouse||"mouse"!=ev.pointerType);switch(ev.eventCode){case 2:if(canDrag&&this.rect){var tIndex,percent,cIndex=this.current,dir=this.direction,rect=[ev.clientX,ev.clientY],_rect=this.rect,offset=rect[dir]-_rect[dir],total=(this.pages[cIndex],this.offsetParent[dir?"clientHeight":"clientWidth"]);null==this.drag&&_rect.toString()!=rect.toString()&&(this.drag=Math.abs(offset)>=Math.abs(rect[1-dir]-_rect[1-dir]),this.drag&&this.fire("dragStart",ev)),this.drag&&(percent=this.percent+(total&&offset/total),this.pages[tIndex=this.fixIndex(cIndex+(percent>0?-1:1))]||(percent/=Math.abs(offset)/total+2),this.fixBlock(cIndex,tIndex),this.fire("dragMove",ev),this.fixUpdate(percent,cIndex,tIndex),this._offset=offset,ev.preventDefault())}break;case 1:canDrag&&!this.pointerType&&(this.pointerType=ev.eventType);case 3:if(canDrag){var isDrag,offset,tm,nn,self=this,index=this.current,percent=this.getPercent();ev.length?(nn=ev.target.nodeName.toLowerCase(),this.timer&&(cancelFrame(this.timer),delete this.timer),this.rect=[ev.clientX,ev.clientY],this.percent=percent,this.time=+new Date,this.offsetParent=this.getOffsetParent(),"touch"==ev.eventType||"a"!=nn&&"img"!=nn||ev.preventDefault()):(tm=this.time)&&(offset=this._offset,isDrag=this.drag,each("rect drag time percent _offset offsetParent pointerType".split(" "),function(prop){delete self[prop]}),isDrag&&((+new Date-tm<500&&Math.abs(offset)>20||Math.abs(percent)>.5)&&(index+=offset>0?-1:1),this.fire("dragEnd",ev),ev.preventDefault()),percent&&this.slide(index))}break;case 4:this.timer&&ev.preventDefault();break;case 5:if(ev.preventDefault(),this.isStatic()&&+new Date-this.latestTime>Math.max(1e3-this.duration,0)){var wd=ev.wheelDelta||-ev.detail;Math.abs(wd)>=3&&this[wd>0?"prev":"next"]()}break;case 6:var nn=ev.target.nodeName.toLowerCase();if(this.isStatic()&&"input"!=nn&&"textarea"!=nn&&"select"!=nn)switch(ev.keyCode||ev.which){case 33:case 37:case 38:this.prev();break;case 32:case 34:case 39:case 40:this.next();break;case 35:this.slide(this.length-1);break;case 36:this.slide(0)}}},destroy:function(){var pageData=this.pageData;return offListener(this.container,STARTEVENT.join(" ")+" click"+(this.mousewheel?" mousewheel DOMMouseScroll":""),this.handler),offListener(DOC,MOVEEVENT.join(" ")+(this.arrowkey?" keydown":""),this.handler),each(this.pages,function(page,index){page.style.cssText=pageData[index].cssText}),this.container.removeChild(this.comment),this.length=0,this.pause()},append:function(elem,index){return null==index&&(index=this.pages.length),this.pageData.splice(index,0,{percent:0,cssText:elem.style.cssText}),this.pages.splice(index,0,elem),this.container.appendChild(this.initStyle(elem)),this.length=this.pages.length,index<=this.current&&this.current++,this},prepend:function(elem){return this.append(elem,0)},insertBefore:function(elem,index){return this.append(elem,index-1)},insertAfter:function(elem,index){return this.append(elem,index+1)},remove:function(index){return this.container.removeChild(this.pages[index]),this.pages.splice(index,1),this.pageData.splice(index,1),this.length=this.pages.length,index<=this.current&&this.slide(this.current=Math.max(0,this.current-1)),this}},each("Ease Transition".split(" "),function(name){struct["add"+name]=struct.prototype["add"+name]}),ROOT.pageSwitch=struct}(window,function(wrap,config){return this instanceof arguments.callee?(this.container="string"==typeof wrap?document.getElementById(wrap):wrap,void this.init(config||{})):new arguments.callee(wrap,config)});