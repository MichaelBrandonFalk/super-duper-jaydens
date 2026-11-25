import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
import {equipmentFrames,hubPropFrames,hubView,gadgetArt} from '../visuals.js';
import {freshProgress} from '../engine.js';
test('painted replacements have complete optimized files and exact reviewed hashes',async()=>{
 const files=JSON.parse(await readFile(new URL('../assets/art/painted-manifest.json',import.meta.url)));assert.equal(files.length,6);
 for(const asset of files){const bytes=await readFile(new URL('../'+asset.file,import.meta.url));assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.equal(bytes.length,asset.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert.ok(asset.size[0]>=960);}
 const equipment=files.find(f=>f.atlas?.frames===16),props=files.find(f=>f.atlas?.frames===9);assert.ok(equipment);assert.ok(props);assert.equal(equipment.size[0],equipment.size[1]);assert.equal(props.size[0],props.size[1]);assert.equal(new Set(Object.values(equipmentFrames)).size,16);assert.equal(new Set(Object.values(hubPropFrames)).size,9);
 for(const kind of Object.keys(equipmentFrames)){const html=gadgetArt(kind);assert.match(html,/painted-gadget/);assert.match(html,/aria-hidden="true"/);assert.doesNotMatch(html,/<svg|undefined|NaN/);}
});
test('painted plan and finished hub keep the same saved decisions and accessible descriptions',()=>{
 const p=freshProgress();p.done=[1];p.storyChoices={1:0,3:1,4:0,7:0};const plan=hubView(p);assert.match(plan,/hub-plan-painted.webp/);assert.doesNotMatch(plan,/class="hub-prop /);
 p.done=[1,3,4,7,10,11];p.changePlan=0;const built=hubView(p);assert.match(built,/hub-painted.webp/);for(const name of ['street','map','bowls','stars','pad'])assert.ok(built.includes('hub-prop-'+name));assert.match(built,/Spare parts are in sorting bowls/);assert.doesNotMatch(built,/<svg/);
 p.storyChoices={1:1,3:0,4:1,7:1};p.changePlan=2;const changed=hubView(p);for(const name of ['entrance','shade','mat','team'])assert.ok(changed.includes('hub-prop-'+name));assert.ok(!changed.includes('class="hub-prop hub-prop-pad"'));assert.match(changed,/Spare parts match their paper outlines/);
});
