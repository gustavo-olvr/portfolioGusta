/* Portfólio — Gustavo Oliveira */

/* ===== CONFIGURAÇÃO =====
   Depois de colocar seu PDF em assets/docs/, troque por:
   var CV_URL='assets/docs/curriculo.pdf'; */
var CV_URL='';

/* ===== ESTADO, TOAST, TEMA, IDIOMA, FORMULÁRIO ===== */
var LANG='pt',rm=matchMedia('(prefers-reduced-motion: reduce)').matches,T=document.getElementById('toast'),tt;
function toast(m){T.textContent=m;T.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){T.classList.remove('on');},2800);}
document.getElementById('cv').onclick=function(){if(CV_URL){window.open(CV_URL,'_blank');}else{toast(LANG==='en'?'Add your résumé PDF link here':'Aqui entra o link do seu currículo em PDF');}};
document.getElementById('tema').onclick=function(){var r=document.documentElement;r.setAttribute('data-theme',r.getAttribute('data-theme')==='light'?'dark':'light');};
document.getElementById('lang').onclick=function(){LANG=LANG==='pt'?'en':'pt';
document.querySelectorAll('[data-en]').forEach(function(e){if(e.__p===undefined)e.__p=e.innerHTML;e.innerHTML=LANG==='en'?e.dataset.en:e.__p;});
document.querySelectorAll('[data-enp]').forEach(function(e){if(e.__p===undefined)e.__p=e.placeholder;e.placeholder=LANG==='en'?e.dataset.enp:e.__p;});
document.documentElement.lang=LANG==='en'?'en':'pt-BR';};
document.getElementById('f-s').onclick=function(){var v=function(i){return document.getElementById(i).value.trim();};
var u='mailto:gustavo098122@gmail.com?subject='+encodeURIComponent(v('f-a')||'Contato pelo portfólio')+'&body='+encodeURIComponent(v('f-m')+'\n\n— '+v('f-n')+(v('f-e')?' ('+v('f-e')+')':''));
var l=document.createElement('a');l.href=u;document.body.appendChild(l);l.click();l.remove();toast(LANG==='en'?'Opening your email app...':'Abrindo seu app de e-mail...');};

/* ===== ABAS E CARROSSÉIS ===== */
function dots(w){var c=w.querySelector('.car'),d=w.querySelector('.dots'),n=c.children.length;d.innerHTML='';for(var i=0;i<n;i++)d.appendChild(document.createElement('i'));mark(w);}
function mark(w){var c=w.querySelector('.car'),k=c.children,x=c.scrollLeft,b=0,m=1e9;for(var i=0;i<k.length;i++){var q=Math.abs(k[i].offsetLeft-c.offsetLeft-x);if(q<m){m=q;b=i;}}
w.querySelectorAll('.dots i').forEach(function(e,i){e.classList.toggle('on',i===b);});}
document.querySelectorAll('.carw').forEach(function(w){var c=w.querySelector('.car');
w.querySelector('.arr.l').onclick=function(){c.scrollBy({left:-380,behavior:'smooth'});};
w.querySelector('.arr.r').onclick=function(){c.scrollBy({left:380,behavior:'smooth'});};
c.addEventListener('scroll',function(){mark(w);},{passive:true});dots(w);});
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){
document.querySelectorAll('.tabs button').forEach(function(x){x.classList.toggle('on',x===b);});
document.getElementById('pane-p').hidden=b.dataset.t!=='p';document.getElementById('pane-c').hidden=b.dataset.t!=='c';
dots(document.getElementById(b.dataset.t==='p'?'pane-p':'pane-c'));};});

/* ===== ANIMAÇÃO DE ENTRADA E MENU ATIVO ===== */
if(!rm&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});}
else{document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});}
if('IntersectionObserver' in window){var links=document.querySelectorAll('nav a'),no=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('#inicio,section[id]').forEach(function(s){no.observe(s);});}
