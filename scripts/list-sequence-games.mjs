import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const text = fs.readFileSync(path.join(root, 'audit/page_experience_inventory.csv'), 'utf8');
const parse = (input) => { const rows=[]; let row=[], value='', quoted=false; for(let i=0;i<input.length;i++){const ch=input[i]; if(ch==='"'&&input[i+1]==='"'&&quoted){value+='"';i++;continue;} if(ch==='"'){quoted=!quoted;continue;} if(ch===','&&!quoted){row.push(value);value='';continue;} if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&input[i+1]==='\n')i++;row.push(value);value='';if(row.length)rows.push(row);row=[];continue;} value+=ch;} if(value||row.length){row.push(value);rows.push(row);} const header=rows.shift(); return rows.map((r)=>Object.fromEntries(header.map((h,i)=>[h,r[i]||'']))); };
const rows=parse(text); const games=new Set(rows.filter((row)=>row.hasGame==='true').map((row)=>row.route));
const { ROOM_SEQUENCE } = await import(`file://${path.join(root,'src/data/roomSequence.js')}?list=${Date.now()}`);
console.log(ROOM_SEQUENCE.filter((route)=>games.has(route)).join('\n'));
