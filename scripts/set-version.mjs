import {readFile,writeFile,readdir} from 'node:fs/promises';
const version=process.argv[2];if(!/^\d+\.\d+\.\d+$/.test(version||''))throw Error('Use: npm run release:version -- 1.3.0');
const pkg=JSON.parse(await readFile('package.json','utf8'));pkg.version=version;await writeFile('package.json',JSON.stringify(pkg,null,2)+'\n');
for(const name of (await readdir('.')).filter(n=>n.endsWith('.js')||n==='index.html')){let text=await readFile(name,'utf8');text=text.replace(/\?v=\d+\.\d+\.\d+/g,'?v='+version);if(name==='index.html')text=text.replace(/>v\d+\.\d+\.\d+</g,'>v'+version+'<');await writeFile(name,text);}
await writeFile('version.js',`export const VERSION='${version}';\n`);
try{const lock=JSON.parse(await readFile('package-lock.json','utf8'));lock.version=version;lock.packages[''].version=version;await writeFile('package-lock.json',JSON.stringify(lock,null,2)+'\n');}catch(error){if(error.code!=='ENOENT')throw error;}
console.log('Game and desktop version set to '+version+'. Downloads stay on the last tested release until the new packages publish.');
