import fs from 'node:fs';
const file = 'src/App.jsx';
let text = fs.readFileSync(file, 'utf8');
const blocked = ['CoupleBucketListSpinnerPage', 'LoveSpinBottlePage', 'path="/couple-bucket-list-spinner"', 'path="/love-spin-bottle"'];
text = text.split('\n').filter((line) => !blocked.some((token) => line.includes(token))).join('\n');
fs.writeFileSync(file, text);
console.log('Removed direct bucket-spinner and spin-bottle routes from App.jsx.');
