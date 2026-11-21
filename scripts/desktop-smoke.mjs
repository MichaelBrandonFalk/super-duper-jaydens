import {readdir} from 'node:fs/promises';import {execFile} from 'node:child_process';import {promisify} from 'node:util';import path from 'node:path';
const run=promisify(execFile),root=path.resolve('desktop-release');let executable;
if(process.argv[2])executable=path.resolve(process.argv[2]);
else if(process.platform==='win32')executable=path.join(root,'win-unpacked','Super Duper Jaydens.exe');
else if(process.platform==='linux')executable=path.join(root,'linux-unpacked','super-duper-jaydens');
else{const dirs=await readdir(root),dir=dirs.includes('mac-universal')?'mac-universal':dirs.find(n=>n.startsWith('mac'));executable=path.join(root,dir,'Super Duper Jaydens.app','Contents','MacOS','Super Duper Jaydens');}
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;const result=await run(executable,['--self-test'],{timeout:45000,maxBuffer:4*1024*1024,env});if(!result.stdout.includes('JAYDENS_DESKTOP_OK'))throw Error(result.stdout+'\n'+result.stderr);console.log(result.stdout.trim());
if(process.platform==='win32'&&!process.argv[2]){const portable=(await readdir(root)).find(n=>n.endsWith('-Portable.exe'));await run(path.join(root,portable),['--self-test'],{timeout:120000,maxBuffer:4*1024*1024,env});console.log('JAYDENS_PORTABLE_WRAPPER_OK');}
