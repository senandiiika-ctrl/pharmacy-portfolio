const toggle=document.getElementById('menuToggle');const nav=document.getElementById('navigation');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
const progress=document.getElementById('progress')||document.getElementById('reading-progress');const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%';};window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
/* Make any content card with an existing link clickable across its full surface. */
document.querySelectorAll('.gallery-card,.publication-grid article,.timeline article,.project-card,.lead-grid article').forEach(card=>{
  const destination=card.querySelector('a[href]');
  if(!destination)return;
  card.classList.add('has-card-link');
  card.setAttribute('role','link');
  card.setAttribute('tabindex','0');
  const linkLabel=(destination.textContent||destination.getAttribute('aria-label')||'Open link').trim();
  card.setAttribute('aria-label','Open: '+linkLabel);
  card.addEventListener('click',event=>{
    if(event.target.closest('a,button'))return;
    destination.click();
  });
  card.addEventListener('keydown',event=>{
    if(event.target!==card)return;
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      destination.click();
    }
  });
});




/* Documentation: apply orientation after the image has actually loaded. */
document.querySelectorAll('.gallery .gallery-card img').forEach(img=>{
  const applyPhotoLayout=()=>{
    const card=img.closest('.gallery-card');
    if(!card||!img.naturalWidth||!img.naturalHeight)return;
    const ratio=img.naturalWidth/img.naturalHeight;
    card.classList.toggle('is-landscape',ratio>1.12);
    card.classList.toggle('is-portrait',ratio<0.89);
    card.classList.toggle('is-square',ratio>=0.89&&ratio<=1.12);
  };
  if(img.complete&&img.naturalWidth>0) applyPhotoLayout();
  else {
    img.addEventListener('load',applyPhotoLayout,{once:true});
    img.addEventListener('error',()=>img.closest('.gallery-card')?.classList.add('image-load-error'),{once:true});
  }
});
