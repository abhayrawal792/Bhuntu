import fs from 'node:fs';

const policy = 'src/data/gamePolicy.js';
let policyText = fs.readFileSync(policy, 'utf8');
policyText = policyText.replace("{ route: '/wish-wheel', title: 'The Wheel of Abu’s Good Wishes', mechanic: 'wish wheel' }", "{ route: '/birthday-wish-letter', title: 'A Sealed Birthday Letter from Abu', mechanic: 'letter reveal' }");
policyText = policyText.replace("{ route: '/love-spin-bottle', title: 'Spin a Little Surprise for Sanzu', mechanic: 'spin-the-bottle reveal' }", "{ route: '/heartbeat-drum-pad', title: 'The Rhythm of Abu Missing You', mechanic: 'rhythm memory' }");
policyText = policyText.replace("{ route: '/couple-bucket-list-spinner', title: 'Choose Our Next Place Together', mechanic: 'travel spinner' }", "{ route: '/emoji-art-canvas', title: 'Draw the Feeling Abu Cannot Say', mechanic: 'romantic art canvas' }");
fs.writeFileSync(policy, policyText);

const sequence = 'src/data/roomSequence.js';
let sequenceText = fs.readFileSync(sequence, 'utf8');
sequenceText = sequenceText.replace('  "/couple-bucket-list-spinner",', '  "/emoji-art-canvas",');
sequenceText = sequenceText.replace('  "/love-spin-bottle",', '  "/heartbeat-drum-pad",');
fs.writeFileSync(sequence, sequenceText);
console.log('Replaced retained wheel/spin game slots with letter, rhythm, and art experiences.');
