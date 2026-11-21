const path=require('node:path');
const ORIGIN='jaydens://game';
function isGameURL(value){try{const u=new URL(value);return u.protocol==='jaydens:'&&u.hostname==='game'&&!u.port&&!u.username&&!u.password;}catch{return false;}}
function assetPath(root,value){if(!isGameURL(value))throw Error('Unknown game address');const name=decodeURIComponent(new URL(value).pathname);if(name.includes('\0')||name.includes('\\'))throw Error('Invalid asset path');const file=path.resolve(root,'.'+(name==='/'?'/index.html':name)),rel=path.relative(root,file);if(rel==='..'||rel.startsWith('..'+path.sep)||path.isAbsolute(rel))throw Error('Asset outside game');return file;}
const hosts=new Set(['github.com','michaelbrandonfalk.github.io','opentextbc.ca','kirkwood.pressbooks.pub','pressbooks.palni.org','creativecommons.org','global.toyota','kanbanguides.org','incompetech.com']);
function isExternalLink(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&hosts.has(u.hostname);}catch{return false;}}
const CSP="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'";
module.exports={ORIGIN,isGameURL,assetPath,isExternalLink,CSP};
