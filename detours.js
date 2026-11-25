import {momentResult} from './city-story.js?v=1.5.1';
export function rememberedDetour(id,p){const text=id>1?momentResult(p,id-1):'';return text?'From our last stop: '+text:'';}
