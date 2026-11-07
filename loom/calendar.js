/* Private calendar integration for The Loom; no event data or tokens committed to GitHub. */
(function(){
'use strict';
var root=document.querySelector('main.main'), footer=root&&root.querySelector('footer.foot');
if(!footer)return;
// Public OAuth identifier; private calendar access still requires Google authorization.
var DEFAULT_CLIENT_ID='69799489064-dvsqmrf93ao4lh2fob5dsfv710vc73mp.apps.googleusercontent.com';
function clientId(){return localStorage.getItem(KEY)||DEFAULT_CLIENT_ID}
var KEY='loom_calendar_oauth_client_id',TZ='America/Chicago',token='',oauth;
var section=document.createElement('section');
section.id='loom-calendar';
section.innerHTML='<div class="section-head"><h2>Upcoming this week</h2><span>Rolling 7 days · Central time</span></div>'+
'<div class="loom-calendar-toolbar"><span id="calendarMessage" role="status">Connect Google Calendar to view events privately.</span>'+
'<div class="loom-calendar-actions"><button id="calendarConnect" type="button">Connect Google Calendar</button> <button id="calendarRefresh" type="button" hidden>Refresh</button> <button id="calendarSettings" type="button">Settings</button> <a target="_blank" rel="noopener" href="https://calendar.google.com/calendar/u/0/r/week">Open Calendar ↗</a></div></div>'+
'<div id="calendarEvents" class="simple-list"><div class="empty">Calendar not connected.</div></div>'+
'<div id="calendarSetup" class="loom-calendar-setup hidden"><strong>Calendar connection settings</strong><p>The Loom includes its default Google Calendar connection on every device. You can optionally override the client ID in this browser. Private events and access tokens are never saved to GitHub.</p><label for="calendarClientId">OAuth Client ID</label><input id="calendarClientId" type="text" placeholder="xxxx.apps.googleusercontent.com"> <button id="calendarSave" type="button">Save setting</button> <button id="calendarDisconnect" type="button">Disconnect</button></div>';
footer.before(section);
var css=document.createElement('style');
css.textContent='#loom-calendar{margin-top:44px}.loom-calendar-toolbar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:15px;color:#757771;font-size:12px;margin-bottom:14px}.loom-calendar-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.loom-calendar-actions button,.loom-calendar-setup button{font:inherit;border:1px solid #d8d7d2;border-radius:6px;background:white;padding:9px 12px;color:#252725;font-weight:600}.loom-calendar-actions a,.loom-event a{color:#395366;text-underline-offset:3px}.loom-calendar-setup{margin-top:13px;background:#fff;border:1px solid #e5e3de;padding:18px;border-radius:8px;font-size:13px;line-height:1.7}.loom-calendar-setup p{max-width:850px}.loom-calendar-setup label{display:block;font-weight:650}.loom-calendar-setup input{width:min(480px,100%);padding:10px;border:1px solid #d8d7d2;border-radius:5px}.loom-event{display:flex;justify-content:space-between;gap:18px;align-items:baseline;padding:16px 4px;border-bottom:1px solid #eeece8;font-size:13px}.loom-event:last-child{border:0}.loom-event strong{font-weight:650}.loom-event time,.loom-event small{color:#777a75;font-size:12px}.loom-event small{display:block;margin-top:5px}.loom-conflict{color:#94501d;font-weight:750;margin-left:9px;font-size:11px}@media(max-width:600px){.loom-event{flex-direction:column;gap:5px}}';
document.head.appendChild(css);
function el(id){return section.querySelector('#'+id)}
function message(s){el('calendarMessage').textContent=s}
function safe(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function formatDate(d){return new Intl.DateTimeFormat('en-US',{timeZone:TZ,weekday:'short',month:'short',day:'numeric'}).format(d)}
function formatTime(d){return new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'numeric',minute:'2-digit'}).format(d)}
function toEvent(e){
 var allDay=!!(e.start&&e.start.date);
 var start=new Date(allDay?e.start.date+'T12:00:00-06:00':e.start.dateTime);
 var end=new Date(allDay?e.end.date+'T12:00:00-06:00':e.end.dateTime);
 return {title:e.summary||'Untitled',start:start.getTime(),end:end.getTime(),allDay:allDay,url:e.htmlLink||'',location:e.location||'',when:formatDate(start)+(allDay?' · All day':' · '+formatTime(start)),endTime:allDay?'':formatTime(end)};
}
function renderEvents(items){
 var list=items.filter(function(e){return e.status!=='cancelled'&&!/school drop.off|morning prep/i.test(e.summary||'')}).map(toEvent).filter(function(e){return Number.isFinite(e.start)}).sort(function(a,b){return a.start-b.start});
 var overlaps=new Set();
 list.forEach(function(a,i){list.forEach(function(b,j){if(j>i&&!a.allDay&&!b.allDay&&a.start<b.end&&b.start<a.end){overlaps.add(i);overlaps.add(j)}})});
 el('calendarEvents').innerHTML=list.length?list.map(function(e,i){
  return '<div class="loom-event"><div><strong>'+safe(e.title)+(overlaps.has(i)?'<span class="loom-conflict">Scheduling conflict</span>':'')+'</strong><small>'+safe(e.location)+(e.endTime?' · Ends '+safe(e.endTime):'')+'</small></div><div><time>'+safe(e.when)+'</time>'+(e.url?'<div><a target="_blank" rel="noopener" href="'+safe(e.url)+'">Open event ↗</a></div>':'')+'</div></div>';
 }).join(''):'<div class="empty">No nonroutine events in the next seven days.</div>';
 message(list.length+' nonroutine events · '+overlaps.size+' events involved in overlaps · updated '+formatTime(new Date()));
 el('calendarRefresh').hidden=false;
}
function loadGoogle(){
 return new Promise(function(resolve,reject){
  if(window.google&&google.accounts&&google.accounts.oauth2){resolve();return}
  var s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.onload=resolve;s.onerror=function(){reject(new Error('Unable to load Google authorization'))};document.head.appendChild(s)
 });
}
async function getJson(url){
 var res=await fetch(url,{headers:{Authorization:'Bearer '+token},cache:'no-store'});
 var json=await res.json();if(!res.ok)throw Error((json.error&&json.error.message)||'Calendar request failed');
 return json;
}
async function refresh(){
 if(!token){connect();return}
 message('Loading calendars…');
 try{
  var c=await getJson('https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=250');
  var start=new Date(),end=new Date(start.getTime()+7*86400000);
  var params=new URLSearchParams({singleEvents:'true',orderBy:'startTime',timeMin:start.toISOString(),timeMax:end.toISOString(),maxResults:'250'});
  var active=(c.items||[]).filter(function(x){return x.selected!==false&&x.accessRole!=='none'});
  var all=await Promise.all(active.map(async function(x){
   var base='https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(x.id)+'/events?'+params.toString(),data=[],next='';
   for(var i=0;i<5;i++){
    var result=await getJson(base+(next?'&pageToken='+encodeURIComponent(next):''));
    data.push.apply(data,result.items||[]);next=result.nextPageToken;if(!next)break;
   }
   return data;
  }));
  var seen=new Set();
  renderEvents(all.flat().filter(function(e){var id=(e.iCalUID||e.id)+'|'+(e.start&&(e.start.dateTime||e.start.date));if(seen.has(id))return false;seen.add(id);return true}));
 }catch(err){message('Calendar error: '+err.message)}
}
async function connect(){
 var id=clientId();
 if(!id){el('calendarSetup').classList.remove('hidden');message('One-time Google OAuth setup required.');return}
 try{
  await loadGoogle();
  oauth=google.accounts.oauth2.initTokenClient({client_id:id,scope:'https://www.googleapis.com/auth/calendar.readonly',callback:function(r){if(r.error){message('Authorization failed: '+r.error);return}token=r.access_token;refresh()}});
  // Reuse Google's existing grant; do not force the consent screen on every connection.
  oauth.requestAccessToken({prompt:''});
 }catch(err){message(err.message)}
}
el('calendarConnect').addEventListener('click',connect);
el('calendarRefresh').addEventListener('click',refresh);
el('calendarSettings').addEventListener('click',function(){el('calendarClientId').value=clientId();el('calendarSetup').classList.toggle('hidden')});
el('calendarSave').addEventListener('click',function(){var s=el('calendarClientId').value.trim();if(!/^[\w-]+\.apps\.googleusercontent\.com$/.test(s)){message('Enter a valid Google OAuth web client ID.');return}localStorage.setItem(KEY,s);el('calendarSetup').classList.add('hidden');message('Setting saved. Click Connect Google Calendar.')});
el('calendarDisconnect').addEventListener('click',function(){if(token&&window.google&&google.accounts)google.accounts.oauth2.revoke(token,function(){});token='';localStorage.removeItem(KEY);el('calendarSetup').classList.add('hidden');el('calendarRefresh').hidden=true;el('calendarEvents').innerHTML='<div class="empty">Calendar not connected.</div>';message('Disconnected; no event data is stored.')});
if(clientId())message('Google Calendar configured. Click Connect Google Calendar to load events.');
})();