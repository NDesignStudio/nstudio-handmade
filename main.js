(function(){
  var canvas=document.getElementById('beadCanvas');
  var ctx=canvas.getContext('2d');
  var BC=['#3aa89a','#1a6fa3','#4ca3d4','#2c9d8e','#22b8a8','#c0392b','#d4705a','#c06030','#e07050','#4a8c3a','#2d7a40','#6ab04c','#3a6820','#d4c020','#e0a820','#c8b010','#8a6a9a','#b08ac0','#6a4a8a','#d9607a','#e8a0b4','#c04060','#88ccee','#b8e4f4','#60a8d8','#c8907a','#e0b090','#ffffff','#e8f4f8','#d0e8f0'];
  var EC=[{i:'#1a6fa3',p:'#051020'},{i:'#3aa89a',p:'#081e18'},{i:'#c0392b',p:'#2a0808'},{i:'#4a8c3a',p:'#0a1808'},{i:'#d4c020',p:'#1a1000'},{i:'#8a6a9a',p:'#180a20'},{i:'#d9607a',p:'#280a12'},{i:'#2240cc',p:'#040818'},{i:'#c8907a',p:'#200c08'},{i:'#20509a',p:'#020810'},{i:'#3a6020',p:'#081008'},{i:'#c86010',p:'#200a00'},{i:'#a020a0',p:'#180018'}];
  var W,H,els=[],mouse={x:-9999,y:-9999},t=0;
  function rnd(a,b){return a+Math.random()*(b-a);}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function resize(){var d=window.devicePixelRatio||1;W=canvas.offsetWidth;H=canvas.offsetHeight;canvas.width=W*d;canvas.height=H*d;ctx.scale(d,d);}
  function mkEye(x,y){var e=pick(EC);return{type:'eye',x:x,y:y,size:rnd(16,56),vx:rnd(-.3,.3),vy:rnd(-.18,.18),wb:rnd(0,Math.PI*2),wbs:rnd(.008,.022),i:e.i,p:e.p,a:rnd(.5,1),rot:rnd(-.4,.4),rs:rnd(-.003,.003)};}
  function mkBead(x,y){return{type:'bead',x:x,y:y,size:rnd(5,20),c:pick(BC),vx:rnd(-.38,.38),vy:rnd(-.22,.22),wb:rnd(0,Math.PI*2),wbs:rnd(.01,.026),a:rnd(.35,.95)};}
  function mkDisc(x,y){return{type:'disc',x:x,y:y,rx:rnd(7,17),ry:rnd(4,9),rot:rnd(0,Math.PI*2),rs:rnd(-.006,.006),c:pick(BC),vx:rnd(-.28,.28),vy:rnd(-.18,.18),wb:rnd(0,Math.PI*2),wbs:rnd(.008,.02),a:rnd(.35,.82)};}
  function populate(){els=[];var area=W*H;var ne=Math.max(20,Math.floor(area/13000)),nb=Math.max(50,Math.floor(area/3500)),nd=Math.max(22,Math.floor(area/7500));for(var i=0;i<ne;i++)els.push(mkEye(rnd(0,W),rnd(0,H)));for(var i=0;i<nb;i++)els.push(mkBead(rnd(0,W),rnd(0,H)));for(var i=0;i<nd;i++)els.push(mkDisc(rnd(0,W),rnd(0,H)));}
  function lt(h,a){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.min(255,r+a)+','+Math.min(255,g+a)+','+Math.min(255,b+a)+')';}
  function dk(h,a){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.max(0,r-a)+','+Math.max(0,g-a)+','+Math.max(0,b-a)+')';}
  function drawBG(){var g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#050f22');g.addColorStop(.4,'#091828');g.addColorStop(.8,'#071c2c');g.addColorStop(1,'#040e1c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);var glows=[[W*.15,H*.3,320,'rgba(58,168,154,.07)'],[W*.85,H*.2,280,'rgba(26,111,163,.08)'],[W*.5,H*.75,380,'rgba(217,96,122,.05)'],[W*.7,H*.9,220,'rgba(74,140,58,.05)']];for(var i=0;i<glows.length;i++){var s=ctx.createRadialGradient(glows[i][0],glows[i][1],10,glows[i][0],glows[i][1],glows[i][2]);s.addColorStop(0,glows[i][3]);s.addColorStop(1,'transparent');ctx.fillStyle=s;ctx.fillRect(0,0,W,H);}}
  function drawEye(e){var wy=e.y+Math.sin(e.wb+t*e.wbs)*4;ctx.save();ctx.globalAlpha=e.a;ctx.translate(e.x,wy);ctx.rotate(e.rot);var r=e.size;var bg=ctx.createRadialGradient(-r*.2,-r*.2,r*.04,0,0,r);bg.addColorStop(0,lt(e.i,45));bg.addColorStop(.5,e.i);bg.addColorStop(1,dk(e.i,38));ctx.beginPath();ctx.ellipse(0,0,r,r*.9,0,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();ctx.beginPath();ctx.ellipse(0,0,r*.56,r*.52,0,0,Math.PI*2);ctx.fillStyle='#f0f8ff';ctx.fill();var ig=ctx.createRadialGradient(0,0,r*.04,0,0,r*.42);ig.addColorStop(0,lt(e.i,22));ig.addColorStop(1,e.i);ctx.beginPath();ctx.ellipse(0,0,r*.38,r*.35,0,0,Math.PI*2);ctx.fillStyle=ig;ctx.fill();ctx.beginPath();ctx.ellipse(0,0,r*.17,r*.16,0,0,Math.PI*2);ctx.fillStyle=e.p;ctx.fill();ctx.beginPath();ctx.ellipse(-r*.22,-r*.22,r*.12,r*.08,-.5,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.52)';ctx.fill();ctx.beginPath();ctx.ellipse(0,0,r,r*.9,0,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,.16)';ctx.lineWidth=1;ctx.stroke();ctx.restore();}
  function drawBead(b){var wy=b.y+Math.sin(b.wb+t*b.wbs)*3;ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,wy);var r=b.size;var g=ctx.createRadialGradient(-r*.3,-r*.3,r*.04,0,0,r);g.addColorStop(0,lt(b.c,48));g.addColorStop(.4,b.c);g.addColorStop(1,dk(b.c,32));ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.ellipse(-r*.25,-r*.28,r*.28,r*.18,-.4,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.38)';ctx.fill();ctx.restore();}
  function drawDisc(d){var wy=d.y+Math.sin(d.wb+t*d.wbs)*2.5;ctx.save();ctx.globalAlpha=d.a;ctx.translate(d.x,wy);d.rot+=d.rs;ctx.rotate(d.rot);var g=ctx.createRadialGradient(-d.rx*.2,-d.ry*.2,1,0,0,d.rx);g.addColorStop(0,lt(d.c,42));g.addColorStop(1,dk(d.c,28));ctx.beginPath();ctx.ellipse(0,0,d.rx,d.ry,0,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=.7;ctx.stroke();ctx.beginPath();ctx.arc(0,0,Math.min(d.rx,d.ry)*.2,0,Math.PI*2);ctx.fillStyle='rgba(0,0,0,.45)';ctx.fill();ctx.restore();}
  canvas.addEventListener('mousemove',function(e){var rc=canvas.getBoundingClientRect();mouse.x=e.clientX-rc.left;mouse.y=e.clientY-rc.top;});
  canvas.addEventListener('mouseleave',function(){mouse.x=-9999;mouse.y=-9999;});
  function tick(){ctx.clearRect(0,0,W,H);drawBG();for(var i=0;i<els.length;i++){var el=els[i];var dx=el.x-mouse.x,dy=el.y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<95&&dist>.1){var f=(95-dist)/95*.75;el.vx+=(dx/dist)*f;el.vy+=(dy/dist)*f;}el.vx*=.98;el.vy*=.98;el.x+=el.vx;el.y+=el.vy;var pad=(el.size||el.rx||10)+12;if(el.x<-pad)el.x=W+pad;if(el.x>W+pad)el.x=-pad;if(el.y<-pad)el.y=H+pad;if(el.y>H+pad)el.y=-pad;if(el.type==='eye'){el.rot+=el.rs;drawEye(el);}else if(el.type==='bead')drawBead(el);else drawDisc(el);}t++;requestAnimationFrame(tick);}
  window.addEventListener('load',function(){resize();populate();tick();});
  window.addEventListener('resize',function(){resize();populate();});
})();

document.querySelectorAll('.ftab').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.ftab').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
    var f=btn.dataset.filter;
    document.querySelectorAll('.g-card').forEach(function(c){c.classList.toggle('hidden',f!=='all'&&c.dataset.cat!==f);});
  });
});

function openLB(name,img,desc){document.getElementById('lb-name').textContent=name;document.getElementById('lb-img').src=img;document.getElementById('lb-desc').textContent=desc;document.getElementById('lb').classList.add('open');document.body.style.overflow='hidden';}
function closeLBDirect(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='';}
function closeLB(e){if(e.target===document.getElementById('lb'))closeLBDirect();}

var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:.07});
document.querySelectorAll('.g-card,.about-inner,.order-info').forEach(function(el){el.style.opacity='0';el.style.transform='translateY(26px)';el.style.transition='opacity .6s ease,transform .6s ease';io.observe(el);});

(function(){
  var btn=document.getElementById('email-btn');
  var disp=document.getElementById('email-display');
  if(btn){var e=btn.getAttribute('data-u')+'@'+btn.getAttribute('data-d');btn.addEventListener('click',function(ev){ev.preventDefault();window.location.href='mailto:'+e;});}
  if(disp){var e2=disp.getAttribute('data-u')+'@'+disp.getAttribute('data-d');disp.textContent=e2;disp.addEventListener('click',function(){window.location.href='mailto:'+e2;});}
})();
