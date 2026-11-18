import {starterRoutines} from './data.js';
const normalizedExercise=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const patterns=['bench','incline','fly','pushdown','overhead','plank','pulldown','row','row','curl','curl','curl','crunch','squat','legpress','extension','flexion','hinge','calf','calfseat'];
const muscleGroups={
 bench:'Peito',machinepress:'Peito',incline:'Peito',fly:'Peito',pushup:'Peito',
 pushdown:'Tríceps',overhead:'Tríceps',
 pulldown:'Costas',row:'Costas',rowhinge:'Costas',
 curl:'Bíceps / Antebraço',
 squat:'Pernas',legpress:'Pernas',extension:'Pernas',flexion:'Pernas',flexionseat:'Pernas',hinge:'Pernas',
 calf:'Panturrilhas',calfseat:'Panturrilhas',calfpress:'Panturrilhas',
 plank:'Abdômen / Core',crunch:'Abdômen / Core'
};
const additions=[
 ['Supino na máquina','Peitoral e tríceps.','Ajuste o banco para as mãos ficarem na linha do peito. Apoie costas e pés; empurre sem elevar os ombros. Retorne devagar.','bench','Máquina de supino'],
 ['Flexão de braços','Peitoral, tríceps e estabilização.','Apoie mãos e pés, mantendo o tronco alinhado. Flexione os cotovelos sem deixar o quadril cair. Use apoio elevado se necessário.','plank','Peso corporal'],
 ['Supino inclinado na máquina','Peitoral, com maior participação da região superior.','Regule o banco e apoie as costas. Empurre na trajetória da máquina sem tirar o quadril do apoio. Retorne com controle.','incline','Máquina inclinada'],
 ['Crossover na polia','Adução dos braços para o peitoral.','Use postura estável e cotovelos levemente flexionados. Aproxime as mãos à frente sem lançar o tronco. Retorne sem forçar o ombro.','fly','Polias'],
 ['Tríceps com halter acima da cabeça','Extensão dos cotovelos para tríceps.','Use carga leve para aprender. Estabilize o tronco, segure o halter e flexione os cotovelos com amplitude confortável. Estenda sem arquear a lombar.','overhead','Halter'],
 ['Remada com halter apoiado','Costas e flexores do cotovelo.','Apoie uma mão em banco firme. Mantenha coluna confortável e puxe o halter em direção ao quadril, sem girar o tronco.','row','Banco e halter'],
 ['Rosca na polia','Flexores do cotovelo.','Mantenha os cotovelos perto do corpo e os punhos alinhados. Flexione sem inclinar o tronco; retorne lentamente.','curl','Polia'],
 ['Agachamento goblet','Quadríceps e glúteos.','Segure um halter junto ao peito. Mantenha apoio estável dos pés; agache com controle em amplitude confortável, sem dor.','squat','Halter'],
 ['Cadeira flexora','Flexores do joelho, posteriores da coxa.','Alinhe joelhos ao eixo da máquina e ajuste os apoios. Flexione sem tirar o quadril do banco. Retorne controlando a carga.','flexion','Máquina flexora sentada'],
 ['Panturrilha no leg press','Flexores plantares do tornozelo.','Com o trenó seguro, apoie a parte anterior dos pés. Mantenha os joelhos estáveis e mova os tornozelos devagar; evite perder o apoio.','calf','Leg press']
];
export const exerciseGuides=starterRoutines().flatMap(r=>r.exercises).map((e,i)=>({id:'guide-'+i,name:e.name,purpose:e.purpose,execution:e.execution,pattern:patterns[i],muscle:muscleGroups[patterns[i]]||'Geral',equipment:['bench','incline'].includes(patterns[i])?'Banco e pesos':patterns[i]==='plank'||patterns[i]==='crunch'?'Peso corporal':'Conforme o exercício',alternatives:[]}));
for(const [name,purpose,execution,pattern,equipment] of additions)exerciseGuides.push({id:'guide-'+exerciseGuides.length,name,purpose,execution,pattern,muscle:muscleGroups[pattern]||'Geral',equipment,alternatives:[]});
const pairs={0:[20,21],1:[22,0],2:[23],3:[24,4],4:[24,3],5:[],6:[7,8],7:[8,25],8:[25,7],9:[26,10],10:[9,26],11:[26],12:[],13:[27,14],14:[27,13],15:[27],16:[28],17:[],18:[29,19],19:[18],20:[0,21],21:[0,20],22:[1],23:[2],24:[4,3],25:[8,7],26:[9],27:[13,14],28:[16],29:[18]};
exerciseGuides[20].pattern='machinepress';exerciseGuides[21].pattern='pushup';exerciseGuides[25].pattern='rowhinge';exerciseGuides[28].pattern='flexionseat';exerciseGuides[29].pattern='calfpress';
for(const g of exerciseGuides){g.muscle=muscleGroups[g.pattern]||'Geral';g.alternatives=(pairs[Number(g.id.split('-')[1])]||[]).map(i=>'guide-'+i);}
exerciseGuides.push({id:'guide-30',name:'Puxada alta com pegada neutra',purpose:'Dorsais e flexores do cotovelo.',execution:'Ajuste o apoio das coxas e use a pegada neutra disponível. Puxe à frente em direção ao alto do peito sem jogar o tronco. Retorne lentamente.',pattern:'pulldown',muscle:'Costas',equipment:'Polia alta com pegador neutro',alternatives:['guide-6']});exerciseGuides[6].alternatives=['guide-30'];
export function findExerciseGuide(name){const n=normalizedExercise(name);return exerciseGuides.find(g=>normalizedExercise(g.name)===n)||exerciseGuides.filter(g=>n.startsWith(normalizedExercise(g.name)+' com ')||n.startsWith(normalizedExercise(g.name)+' na ')).sort((a,b)=>b.name.length-a.name.length)[0]||null;}
export function guideWarnings(pattern){return ({bench:'Não perca o apoio no banco. Evite cotovelos excessivamente abertos e use apoio de segurança com barra.',incline:'Inclinação e amplitude devem ser confortáveis para o ombro. Não use impulso.',fly:'Não force o alongamento do ombro. Mantenha leve flexão dos cotovelos.',squat:'Não sacrifique controle para aumentar amplitude ou carga. Joelhos acompanham a direção dos pés.',hinge:'Movimento parte do quadril. Mantenha carga próxima ao corpo; pare antes de perder controle da coluna.',legpress:'Não descole o quadril do encosto nem estenda os joelhos de forma brusca.',curl:'Não balance o tronco nem dobre os punhos para compensar a carga.',plank:'Mantenha o quadril alinhado e respire; não deixe a lombar ceder.'})[pattern]||'Ajuste apoios e carga antes de começar. Mantenha controle, respire e interrompa se sentir dor aguda.';}

// Ilustrações biomecânicas animadas em duas fases (Excêntrica/Preparação e Concêntrica/Pico de Contração) com músculos destacados em neon e vetores de direção.
export function exerciseDiagram(pattern){
 const shapes={
  bench:['M40 104 L148 104 M60 104 L45 144 M132 104 L148 144','M64 92 L130 92 M130 92 L152 118 L168 144','M88 92 L84 62 L106 62','M88 92 L88 28 L110 28'],
  incline:['M52 118 L126 64 M70 118 L55 146 M115 74 L132 146','M65 106 L120 65 M65 106 L104 128 L146 144','M100 80 L94 46 L114 46','M100 80 L138 24 L158 24'],
  fly:['M48 135 L48 22 M176 135 L176 22','M112 64 L112 112 M112 112 L94 146 M112 112 L130 146','M112 72 L62 60 M112 72 L162 60','M112 72 L86 86 L108 76 M112 72 L138 86 L116 76'],
  pushdown:['M182 16 L182 146 M158 16 L182 16','M96 58 L96 110 L84 146 M96 110 L114 146','M96 70 L120 86 L146 64','M96 70 L120 86 L142 118'],
  overhead:['M60 146 L150 146','M102 64 L102 112 L86 146 M102 112 L122 146','M102 70 L116 32 L94 42','M102 70 L116 18 L132 18'],
  pulldown:['M52 18 L176 18 M166 18 L166 138 M78 116 L142 116','M106 64 L106 112 L144 112 L144 146','M106 70 L84 28 M106 70 L136 28','M106 70 L76 60 L96 86 M106 70 L144 60 L124 86'],
  row:['M176 88 L176 142 M54 120 L108 120','M90 64 L90 114 L126 114 L150 142','M90 74 L152 84','M90 74 L74 96 L110 86'],
  curl:['M52 148 L166 148','M96 64 L96 112 L80 146 M96 112 L120 146','M96 74 L120 96 L136 126','M96 74 L120 96 L122 48'],
  squat:['M38 148 L182 148','','M110 68 L84 104 L130 110 L116 146 M110 68 L136 74','M106 54 L106 104 L116 146 M106 64 L132 78'],
  legpress:['M48 84 L90 136 L126 136 M170 48 L196 102','M60 74 L100 120','M100 120 L140 126 L166 90','M100 120 L140 94 L180 64'],
  extension:['M48 104 L136 104 M60 104 L60 146','M80 54 L80 100 L130 100','M130 100 L130 146','M130 100 L176 100'],
  flexion:['M40 100 L180 100 M54 100 L54 146 M166 100 L166 146','M64 90 L120 90','M120 90 L172 90','M120 90 L146 54'],
  hinge:['M44 148 L172 148','M96 100 L96 146','M96 100 L142 70 M126 80 L126 136','M96 100 L100 54 M100 64 L110 116'],
  calf:['M58 146 L146 146 L146 158','M100 54 L100 110','M100 110 L100 146 L126 146','M100 110 L100 136 L126 146'],
  calfseat:['M54 104 L126 104 M60 104 L60 146','M80 54 L80 100 L130 100','M130 100 L130 146 L150 146','M130 100 L130 136 L150 146'],
  plank:['M34 146 L186 146','M64 94 L152 126','M64 94 L64 136 L94 136 M152 126 L166 142','M64 94 L64 136 L94 136 M152 126 L166 142'],
  crunch:['M34 146 L186 146','M106 126 L146 100 L172 142','M60 130 L106 126 M80 130 L96 110','M70 104 L106 126 M80 110 L102 98'],
  machinepress:['M58 38 L58 120 L130 120 M64 120 L64 150','M80 60 L80 114 L126 114 L126 150','M80 70 L64 90 L96 90','M80 70 L146 74'],
  pushup:['M30 148 L186 148','','M54 84 L150 120 L170 146 M54 84 L54 142','M54 110 L150 136 L170 146 M54 110 L40 130 L64 146'],
  rowhinge:['M44 114 L90 114 L90 146','M96 84 L140 104 L156 146 M96 84 L64 110','M106 90 L110 136','M106 90 L136 80 L120 110'],
  flexionseat:['M50 104 L130 104 M54 104 L54 146','M80 54 L80 100 L130 100','M130 100 L176 100','M130 100 L130 146'],
  calfpress:['M50 84 L90 136 L126 136 M174 44 L196 100','M60 74 L100 120 L140 94 L174 70','M174 70 L190 80','M174 70 L186 64']
 };
 const hotspots={
  bench:[84,88],incline:[96,82],fly:[112,74],machinepress:[86,74],pushup:[82,98],
  pushdown:[112,82],overhead:[108,54],
  pulldown:[106,84],row:[94,84],rowhinge:[108,90],
  curl:[112,84],
  squat:[102,96],legpress:[122,110],extension:[108,96],flexion:[98,90],flexionseat:[108,96],hinge:[112,92],
  calf:[102,126],calfseat:[130,122],calfpress:[156,82],
  plank:[104,108],crunch:[92,116]
 };
 const vectors={
  bench:'M122 66 L122 26',incline:'M126 60 L150 26',fly:'M72 58 Q112 92 152 58',machinepress:'M102 68 L146 68',pushup:'M95 112 L95 76',
  pushdown:'M146 68 L142 116',overhead:'M126 44 L126 16',
  pulldown:'M126 28 L126 74',row:'M148 84 L106 84',rowhinge:'M112 134 L126 88',
  curl:'M138 118 Q144 82 124 52',
  squat:'M154 98 L154 50',legpress:'M148 114 L182 74',extension:'M142 138 Q166 122 172 98',flexion:'M166 86 Q162 62 144 54',flexionseat:'M168 102 Q160 128 134 142',hinge:'M142 66 Q126 46 102 52',
  calf:'M142 146 L142 118',calfseat:'M158 144 L158 118',calfpress:'M178 86 L192 62',
  plank:'M74 82 L144 106',crunch:'M58 122 Q74 96 98 96'
 };
 const p=shapes[pattern];if(!p)return '';
 const [hx,hy]=hotspots[pattern]||[100,85];
 const vec=vectors[pattern]||'M155 110 L155 55';
 const muscleLabel=muscleGroups[pattern]||'Músculo alvo';
 return `<div class="exercise-figures">${[0,1].map((phase)=>`<figure class="bio-figure ${phase?'phase-concentric':'phase-eccentric'}"><div class="bio-badge-row"><span class="bio-phase-pill">${phase?'Fase 2 • Contração':'Fase 1 • Preparação'}</span><span class="bio-muscle-pill">🎯 ${muscleLabel}</span></div><svg viewBox="0 0 220 175" role="img" aria-label="${phase?'Posição final':'Posição inicial'} esquemática"><defs><radialGradient id="muscleGlow-${pattern}-${phase}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b6f36b" stop-opacity="${phase?'0.85':'0.45'}"/><stop offset="100%" stop-color="#b6f36b" stop-opacity="0"/></radialGradient></defs><line x1="20" y1="152" x2="200" y2="152" stroke="#262c25" stroke-width="2" stroke-dasharray="4 4"/><path d="${p[0]}" fill="none" stroke="#6c776a" stroke-width="5" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="${phase?22:15}" fill="url(#muscleGlow-${pattern}-${phase})" class="bio-hotspot"/><path d="${vec}" fill="none" stroke="#c3b1fc" stroke-width="2.2" stroke-dasharray="4 3" opacity="${phase?'0.95':'0.45'}"/><g class="bio-actor ${phase?'bio-anim-active':''}" fill="none" stroke="#b6f36b" stroke-linecap="round" stroke-linejoin="round" stroke-width="7"><path d="${p[1]} ${p[2+phase]}"/></g><circle cx="${pattern==='bench'?50:pattern==='incline'?130:pattern==='plank'?53:pattern==='pushup'?43:pattern==='rowhinge'?85:pattern==='machinepress'?80:pattern==='flexionseat'?80:pattern==='calfpress'?48:pattern==='crunch'?phase?60:47:pattern==='legpress'?48:pattern==='flexion'?50:pattern==='squat'?phase?105:116:pattern==='hinge'?phase?100:150:100}" cy="${pattern==='bench'?92:pattern==='incline'?56:pattern==='plank'?88:pattern==='pushup'?phase?103:78:pattern==='rowhinge'?78:pattern==='machinepress'?48:pattern==='flexionseat'?42:pattern==='calfpress'?65:pattern==='crunch'?phase?96:130:pattern==='legpress'?65:pattern==='flexion'?90:pattern==='squat'?phase?42:57:pattern==='hinge'?phase?42:62:42}" r="10" fill="#c3b1fc" stroke="#182010" stroke-width="2"/></svg><figcaption>${pattern==='plank'?'Isometria e alinhamento do core':phase?'Fase concêntrica — pico de contração':'Fase inicial — controle excêntrico'}</figcaption></figure>`).join('')}</div><p class="subtle">Guia biomecânico visual com foco em <strong>${muscleLabel}</strong>. Mantenha cadência controlada (2s na descida, 1s na subida) e amplitude segura para suas articulações.</p>`;
}
