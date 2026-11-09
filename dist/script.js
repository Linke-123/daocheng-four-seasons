const seasons = {
  spring: {cn:'春', en:'SPRING', months:'四月 — 五月', index:'01', image:"url('images/season-spring-bg.jpg')", accent:'#d8b7a5', desc:'积雪从山谷边缘退去，溪水恢复声音。高山花木穿过薄雾开放，新绿一点点爬回辽阔草甸。', tags:['山花初开','冰雪初融','云雾山谷'], fit:'喜欢清静、花期与轻量徒步的游客', route:'稻城县城青杨林 → 冲古寺 → 卓玛拉措短线', tip:'早晚仍冷，山路可能有残雪；分层穿衣并以当天开放线路为准。'},
  summer: {cn:'夏', en:'SUMMER', months:'六月 — 八月', index:'02', image:"url('images/season-summer-bg.jpg')", accent:'#8bbf9b', desc:'雨水让高原进入最饱满的绿色。溪流丰沛，野花散落牧场，云影在雪峰与草甸之间迅速游走。', tags:['丰水海子','高原花甸','云海流动'], fit:'喜欢绿色草甸、野花与丰水景观的游客', route:'冲古草甸 → 洛绒牛场 → 视体力选择中线', tip:'雨雾偏多、紫外线强；尽量早出发，携带防雨外层并注意防晒。'},
  autumn: {cn:'秋', en:'AUTUMN', months:'九月 — 十月', index:'03', image:"url('images/season-autumn-bg.jpg')", accent:'#d79235', desc:'青杨与高山草甸渐次染金，空气变得清透，雪峰轮廓锋利得像被重新刻过。每一次转弯，都像撞进一幅正在燃烧的画。', tags:['金色青杨','红草地','雪山倒影'], fit:'第一次到访、喜欢摄影与层次色彩的游客', route:'稻城秋色 → 亚丁短线 → 适应良好再选中线', tip:'晴天较多但早晚温差大；旺季提前预约，并把观景安排在清晨。'},
  winter: {cn:'冬', en:'WINTER', months:'十一月 — 次年三月', index:'04', image:"url('images/season-winter-bg.jpg')", accent:'#b8d2da', desc:'雪把群山的杂音全部收走。森林沉静，湖泊凝住呼吸，三座神山在稀薄的冬日光线里显出纯粹轮廓。', tags:['雪原静境','冰封海子','澄澈星空'], fit:'喜欢雪景、安静氛围与低客流体验的游客', route:'香格里拉镇 → 冲古寺 → 按开放情况走短线', tip:'积雪和结冰可能影响道路与线路；准备防滑保暖装备，出发前查看公告。'}
};
const root=document.documentElement, body=document.body;
const updateHeroLighting=()=>{
  const now=new Date();
  const hour=now.getHours()+now.getMinutes()/60;
  let phase='night',brightness=.58,saturation=.68,contrast=1.08,opacity=.34;
  let tint='linear-gradient(180deg,#18364f 0%,#071a2f 72%,#020b14 100%)';
  if(hour>=5&&hour<7){
    const progress=(hour-5)/2;
    phase='dawn';brightness=.72+.23*progress;saturation=.78+.17*progress;contrast=1;opacity=.28-.12*progress;
    tint='linear-gradient(180deg,#eaa56f 0%,#f1c99a 38%,transparent 78%)';
  }else if(hour>=7&&hour<17){
    phase='day';brightness=1.04;saturation=1;contrast=1;opacity=.08;
    tint='linear-gradient(180deg,#ffe8bd 0%,transparent 60%)';
  }else if(hour>=17&&hour<19){
    const progress=(hour-17)/2;
    phase='dusk';brightness=.96-.32*progress;saturation=.96-.22*progress;contrast=1.04;opacity=.18+.16*progress;
    tint='linear-gradient(180deg,#e59158 0%,#9b5f62 48%,#132b45 100%)';
  }
  root.style.setProperty('--hero-brightness',brightness.toFixed(2));
  root.style.setProperty('--hero-saturation',saturation.toFixed(2));
  root.style.setProperty('--hero-contrast',contrast.toFixed(2));
  root.style.setProperty('--hero-time-opacity',opacity.toFixed(2));
  root.style.setProperty('--hero-time-tint',tint);
  body.dataset.timePhase=phase;
};
updateHeroLighting();
setInterval(updateHeroLighting,60000);
document.querySelectorAll('.season-nav button').forEach(btn=>btn.addEventListener('click',()=>{
  const key=btn.dataset.season,s=seasons[key]; body.dataset.season=key; root.style.setProperty('--season-image',s.image);root.style.setProperty('--season-accent',s.accent);
  document.querySelector('.season-cn').textContent=s.cn;document.querySelector('.season-en').textContent=s.en;document.querySelector('.season-months').textContent=s.months;document.querySelector('.season-desc').textContent=s.desc;document.querySelector('.current-index').textContent=s.index;
  document.querySelector('.season-tags').innerHTML=s.tags.map(t=>`<li class="text-drag">${t}</li>`).join('');
  document.querySelector('.season-guide-fit').textContent=s.fit;document.querySelector('.season-guide-route').textContent=s.route;document.querySelector('.season-guide-tip').textContent=s.tip;
  document.querySelectorAll('.season-nav button').forEach(b=>b.setAttribute('aria-selected',String(b===btn)));
}));
document.querySelectorAll('.season-card').forEach(card=>card.addEventListener('click',()=>{
  const target=document.querySelector(`.season-nav button[data-season="${card.dataset.seasonTarget}"]`);
  if(target){target.click();document.querySelector('#seasons').scrollIntoView({behavior:'smooth'});}
}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const guideMega=document.querySelector('.guide-mega');
const guideTriggers=[...document.querySelectorAll('.guide-trigger')];
const guidePanels=[...document.querySelectorAll('.guide-mega-panel')];
const closeGuideMega=()=>{
  guideMega.classList.remove('open');guideMega.setAttribute('aria-hidden','true');
  guideTriggers.forEach(button=>{button.classList.remove('active');button.setAttribute('aria-expanded','false')});
};
guideTriggers.forEach(button=>button.addEventListener('click',event=>{
  event.stopPropagation();
  const key=button.dataset.guide;
  if(guideMega.classList.contains('open')&&button.classList.contains('active')){closeGuideMega();return;}
  guidePanels.forEach(panel=>panel.classList.toggle('active',panel.dataset.guidePanel===key));
  guideTriggers.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-expanded',String(active))});
  guideMega.classList.add('open');guideMega.setAttribute('aria-hidden','false');
}));
document.querySelector('.guide-mega-close').addEventListener('click',closeGuideMega);
document.querySelectorAll('.guide-mega a[href^="#"]').forEach(link=>link.addEventListener('click',closeGuideMega));
document.addEventListener('click',event=>{if(!event.target.closest('.topbar'))closeGuideMega()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeGuideMega()});

const primaryNavItems=[...document.querySelectorAll('.topbar nav a,.topbar nav button,.nav-cta')];
primaryNavItems.forEach(item=>item.addEventListener('click',()=>{
  primaryNavItems.forEach(navItem=>navItem.classList.remove('nav-selected'));
  item.classList.add('nav-selected');
  item.classList.remove('nav-pop');
  void item.offsetWidth;
  item.classList.add('nav-pop');
  item.addEventListener('animationend',()=>item.classList.remove('nav-pop'),{once:true});
}));

const textDragSelector=[
  'h1','h2','h3','p','li','blockquote','figcaption',
  '.brand','.topbar nav a','.topbar nav button','.nav-cta','.guide-mega-close',
  '.guide-mega-image>span','.guide-mega-copy>a','.hero-cta','.hero-meta',
  '.coordinates>span','.season-cn','.season-en','.season-nav button','.season-index',
  '.season-card-number','.season-card-label','.season-card-action','.season-guide-row>small','.landmark-card div>span','.culture-photo>span',
  '.pace-card>span','.pace-card>small','.light-story-copy>small','.light-card>span',
  '.field-note-grid article>b','.route article>b','.route article>small','.travel-note>span',
  '.footer-mark','.footer-bottom>*'
].join(',');
const textDragElements=[...document.querySelectorAll(textDragSelector)];
textDragElements.forEach(element=>element.classList.add('text-drag'));

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&textDragElements.length){
  let lastScrollY=window.scrollY;
  let dragOffset=0;
  let dragImpulse=0;
  let dragFrame=0;

  const renderTextDrag=()=>{
    dragOffset+=(dragImpulse-dragOffset)*.22;
    dragImpulse*=.78;
    if(Math.abs(dragOffset)<.04&&Math.abs(dragImpulse)<.04){
      dragOffset=0;
      root.style.setProperty('--text-drag-y','0px');
      dragFrame=0;
      return;
    }
    root.style.setProperty('--text-drag-y',`${dragOffset.toFixed(2)}px`);
    dragFrame=requestAnimationFrame(renderTextDrag);
  };

  window.addEventListener('scroll',()=>{
    const scrollDelta=window.scrollY-lastScrollY;
    lastScrollY=window.scrollY;
    dragImpulse=Math.max(-20,Math.min(20,dragImpulse+scrollDelta*.22));
    if(!dragFrame)dragFrame=requestAnimationFrame(renderTextDrag);
  },{passive:true});
}
