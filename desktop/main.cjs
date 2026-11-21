const {app,BrowserWindow,protocol,net,session,Menu,shell,dialog}=require('electron');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {pathToFileURL}=require('node:url');
const {ORIGIN,isGameURL,assetPath,isExternalLink,CSP}=require('./policy.cjs');
protocol.registerSchemesAsPrivileged([{scheme:'jaydens',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true,stream:true}}]);
const selfTest=process.argv.includes('--self-test');
const temporary=selfTest?fs.mkdtempSync(path.join(os.tmpdir(),'jaydens-desktop-check-')):null;
if(temporary)app.setPath('userData',temporary);
const hasLock=selfTest||app.requestSingleInstanceLock();let window;
if(!hasLock)app.quit();
function external(url){if(isExternalLink(url))shell.openExternal(url).catch(()=>{});}
app.on('second-instance',()=>{if(window){if(window.isMinimized())window.restore();window.focus();}});
app.whenReady().then(async()=>{if(!hasLock)return;try{
 const root=path.join(__dirname,'..','dist');
 protocol.handle('jaydens',async request=>{try{const file=assetPath(root,request.url);if(!fs.statSync(file).isFile())return new Response('Not found',{status:404});const result=await net.fetch(pathToFileURL(file).toString());const headers=new Headers(result.headers);headers.set('Content-Security-Policy',CSP);headers.set('X-Content-Type-Options','nosniff');return new Response(result.body,{status:result.status,headers});}catch{return new Response('Not found',{status:404});}});
 const ses=session.defaultSession,requests=[];
 ses.setPermissionRequestHandler((_contents,_permission,done)=>done(false));ses.setPermissionCheckHandler(()=>false);
 ses.webRequest.onBeforeRequest({urls:['http://*/*','https://*/*','ws://*/*','wss://*/*']},(request,done)=>{requests.push(request.url);done({cancel:true});});
 window=new BrowserWindow({width:1280,height:860,minWidth:720,minHeight:600,title:'Super Duper Jaydens! · v'+app.getVersion(),backgroundColor:'#0b1423',show:!selfTest,autoHideMenuBar:process.platform!=='darwin',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true,webviewTag:false}});
 window.webContents.on('page-title-updated',event=>{event.preventDefault();window.setTitle('Super Duper Jaydens! · v'+app.getVersion());});
 window.webContents.setWindowOpenHandler(({url})=>{external(url);return {action:'deny'};});
 window.webContents.on('will-navigate',(event,url)=>{if(!isGameURL(url)){event.preventDefault();external(url);}});
 window.webContents.on('will-attach-webview',event=>event.preventDefault());
 app.setAboutPanelOptions({applicationName:'Super Duper Jaydens!',applicationVersion:app.getVersion(),version:app.getVersion()});
 Menu.setApplicationMenu(Menu.buildFromTemplate([...(process.platform==='darwin'?[{role:'appMenu'}]:[]),{label:'Game',submenu:[{label:'Show saved game folder',click:()=>shell.openPath(app.getPath('userData'))},{type:'separator'},{role:'quit'}]},{role:'editMenu'},{label:'View',submenu:[{role:'resetZoom'},{role:'zoomIn'},{role:'zoomOut'},{role:'togglefullscreen'}]},{label:'Help',submenu:[{label:'Downloads and updates',click:()=>external('https://michaelbrandonfalk.github.io/super-duper-jaydens/#download')},{label:'Credits',click:()=>window.loadURL(ORIGIN+'/index.html#sources')}]}]));
 await window.loadURL(ORIGIN+'/index.html#home');
 if(selfTest){const result=await window.webContents.executeJavaScript(`(async()=>{if(typeof require!=='undefined')throw Error('Node exposed');const title=document.querySelector('main h1')?.textContent;if(!title)throw Error('Empty home');localStorage.setItem('jaydens-smoke','saved');if(localStorage.getItem('jaydens-smoke')!=='saved')throw Error('Save failed');localStorage.removeItem('jaydens-smoke');for(const file of ['adventure.js','assets/art/cover.webp','assets/audio/cipher.mp3','downloads.json']){const r=await fetch(file);if(!r.ok||!(await r.arrayBuffer()).byteLength)throw Error('Missing offline asset: '+file);}const music=new Audio('assets/audio/cipher.mp3');await new Promise((resolve,reject)=>{music.onloadedmetadata=resolve;music.onerror=()=>reject(Error('Audio failed'));music.load();});return {title,secure:isSecureContext,audio:music.duration>200,version:document.querySelector('.site-footer').textContent};})()`);
  if(!result.secure||!result.audio||requests.length)throw Error('Offline checks failed');
  process.stdout.write('JAYDENS_DESKTOP_OK '+JSON.stringify({platform:process.platform,arch:process.arch,...result})+'\n');app.quit();
 }
}catch(error){if(selfTest){process.stderr.write(error.stack+'\n');app.exit(1);}else{dialog.showErrorBox('Super Duper Jaydens could not open',error.message);app.quit();}}});
app.on('window-all-closed',()=>app.quit());
app.on('will-quit',()=>{if(temporary)try{fs.rmSync(temporary,{recursive:true,force:true});}catch{}});
if(selfTest)setTimeout(()=>app.exit(1),30000).unref();
