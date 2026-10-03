import {JSDOM} from 'jsdom';
import fs from 'node:fs';import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../public/data.js',import.meta.url),'utf8').replace(/export /g,'')+'\n'+fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8').replace(/^import .*\n/,'')+'\nwindow.testState=state;window.testRender=render;';
const errors=[];
function create(saved){const dom=new JSDOM(fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),{url:'https://forma.test/',runScripts:'outside-only'}),w=dom.window;w.fetch=async()=>new Response(JSON.stringify({error:'Configure o Supabase'}),{status:503});w.structuredClone=structuredClone;w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.addEventListener('error',e=>errors.push(e.error));if(saved)w.localStorage.setItem('forma-demo',saved);w.eval(source);return {dom,w};}
const wait=()=>new Promise(r=>setTimeout(r,20));const {dom,w}=create();await wait();
function click(a,extra=''){const b=w.document.querySelector(`[data-action="${a}"]${extra}`);assert.ok(b,`button ${a}`);b.click();}
click('demo');await wait();assert.match(w.document.querySelector('h1').textContent,/Um passo/);assert.equal(w.testState.records.filter(r=>r.kind==='routine').length,3);
click('nav','[data-route="workouts"]');await wait();click('start');await wait();assert.ok(w.testState.draft);const started=w.testState.draft.data.started_at;
for(let i=0;i<3;i++)for(let j=0;j<3;j++){click('set-done',`[data-ex="${i}"][data-set="${j}"]`);await wait();}
assert.equal(w.testState.draft.data.exercises.filter(e=>e.sets.every(s=>s.done)).length,3);
click('finish');await wait();w.document.querySelector('#modal-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait();assert.equal(w.testState.stats.total,1);assert.equal(w.testState.draft,null);
click('new-routine');await wait();assert.equal(w.document.querySelector('[data-action=ex-add]').getAttribute('type'),'button');click('ex-add');await wait();assert.match(w.document.querySelector('.modal-head h2').textContent,/Exercício/);
click('close');await wait();click('nav','[data-route="food"]');await wait();click('new-pantry');await wait();const form=w.document.querySelector('#modal-form');form.querySelector('[name=name]').value='Aveia teste';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait();assert.ok(w.testState.records.find(r=>r.data.name==='Aveia teste'));
click('nav','[data-route="workouts"]');await wait();click('start');await wait();const restUntil=Date.now()+120000;w.testState.draft.data.rest_until=restUntil;w.localStorage.setItem('forma-demo',JSON.stringify({profile:w.testState.profile,records:w.testState.records,draft:w.testState.draft}));const saved=w.localStorage.getItem('forma-demo');
const next=create(saved);await wait();next.w.document.querySelector('[data-action=demo]').click();await wait();assert.equal(next.w.testState.draft.data.rest_until,restUntil);assert.equal(next.w.testState.stats.total,1);assert.equal(errors.length,0);
console.log('PASS: demo navigation, 3-exercise completion, streak, CRUD form, draft and rest restored after reload; no JS errors');
dom.window.close();next.dom.window.close();
