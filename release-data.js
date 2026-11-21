export function artifactDefinitions(version){const prefix=`Super-Duper-Jaydens-${version}`;return [
 {id:'windows',platform:'Windows',format:'64-bit installer',file:`${prefix}-Windows-x64-Setup.exe`,primary:true},
 {id:'mac',platform:'Mac',format:'macOS 13+ · Universal DMG · Apple silicon and Intel',file:`${prefix}-macOS-universal.dmg`,primary:true},
 {id:'mint',platform:'Linux Mint',format:'64-bit .deb installer',file:`${prefix}-Linux-x64.deb`,primary:true},
 {id:'windows-portable',platform:'Windows portable',format:'64-bit · no installation',file:`${prefix}-Windows-x64-Portable.exe`,primary:false},
 {id:'linux-portable',platform:'Linux portable',format:'64-bit AppImage',file:`${prefix}-Linux-x64.AppImage`,primary:false}
 ];}
export function validateDownloads(raw){if(!raw||!/^\d+\.\d+\.\d+$/.test(raw.version)||!Array.isArray(raw.files))return null;const expected=artifactDefinitions(raw.version);for(const e of expected){const f=raw.files.find(x=>x.id===e.id);if(!f||f.file!==e.file||!Number.isSafeInteger(f.bytes)||f.bytes<1000000||!/^[a-f0-9]{64}$/.test(f.sha256))return null;}return {version:raw.version,files:expected.map(e=>({...e,...raw.files.find(x=>x.id===e.id)}))};}
export const releaseURL=version=>`https://github.com/MichaelBrandonFalk/super-duper-jaydens/releases/tag/v${version}`;
export const assetURL=(version,file)=>`https://github.com/MichaelBrandonFalk/super-duper-jaydens/releases/download/v${version}/${file}`;
