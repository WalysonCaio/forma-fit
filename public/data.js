export const uid=()=>crypto.randomUUID();
const ex=(name,purpose,execution,alternative,reps=10,rest=90)=>({id:uid(),name,purpose,execution,alternative,rest,sets:Array.from({length:3},()=>({kg:0,reps,done:false}))});
export function starterRoutines(){return [
 {name:'A • Peito e tríceps',group:'A',exercises:[
 ex('Supino reto','Peitoral, com participação de tríceps e ombros.','Apoie os pés, mantenha as escápulas firmes e desça a carga com controle. Empurre sem tirar o quadril do banco. Use amplitude confortável e apoio para cargas altas.','Supino na máquina',10,120),
 ex('Supino inclinado com halteres','Ênfase na porção superior do peitoral.','Use inclinação moderada. Mantenha punhos alinhados e cotovelos sob os halteres. Desça sem forçar os ombros e suba com controle.','Supino inclinado na máquina',10,120),
 ex('Peck deck','Movimento de adução para o peitoral.','Ajuste o banco à altura do peito. Una os braços sem projetar os ombros à frente. Retorne devagar.','Crossover na polia',12),
 ex('Tríceps na polia','Extensão do cotovelo para o tríceps.','Mantenha cotovelos próximos ao corpo. Estenda sem balançar o tronco e retorne de forma controlada.','Extensão com elástico',12),
 ex('Tríceps acima da cabeça','Tríceps, incluindo a cabeça longa.','Estabilize o tronco, flexione os cotovelos dentro de uma amplitude confortável e estenda sem abrir excessivamente os braços.','Extensão na polia',12),
 ex('Prancha','Estabilidade do tronco. Cada repetição registrada equivale a um segundo.','Apoie antebraços e pés. Alinhe cabeça, tronco e quadril. Respire sem deixar a lombar ceder.','Prancha com joelhos apoiados',30,60)]},
 {name:'B • Costas e braços',group:'B',exercises:[
 ex('Puxada alta','Dorsais e flexores do cotovelo.','Puxe a barra à frente em direção ao alto do peito. Evite jogar o corpo para trás ou puxar atrás da nuca.','Puxada com pegada neutra',10,120),
 ex('Remada com apoio no peito','Costas, com apoio para estabilizar o tronco.','Apoie o peito. Puxe os cotovelos para trás sem elevar os ombros. Volte devagar.','Remada baixa',10,120),
 ex('Remada baixa','Dorsais e músculos ao redor das escápulas.','Mantenha coluna confortável e tronco estável. Puxe sem usar impulso e retorne com controle.','Remada com halter apoiado',12),
 ex('Rosca direta','Bíceps e outros flexores do cotovelo.','Mantenha cotovelos estáveis e flexione sem balançar o tronco. Desça a carga lentamente.','Rosca na polia',10),
 ex('Rosca martelo','Braquial e braquiorradial, além do bíceps.','Use pegada neutra. Flexione sem dobrar os punhos e retorne com controle.','Rosca martelo com corda',12),
 ex('Rosca inversa','Ênfase no braquiorradial do antebraço.','Use carga moderada e pegada pronada. Preserve punhos alinhados e evite compensações.','Rosca inversa na polia',12),
 ex('Abdominal no solo','Flexão do tronco pelo abdômen.','Expire ao elevar levemente os ombros. Não puxe a cabeça e não use impulso.','Abdominal na máquina',15,60)]},
 {name:'C • Pernas e panturrilhas',group:'C',exercises:[
 ex('Agachamento','Quadríceps, glúteos e estabilidade do tronco.','Use apoio estável dos pés. Agache dentro da amplitude que controla sem dor. Mantenha joelhos acompanhando a direção dos pés. Aprenda com supervisão antes de subir a carga.','Agachamento hack',10,120),
 ex('Leg press','Quadríceps e glúteos.','Apoie a lombar e desça sem descolar o quadril. Empurre com controle, evitando travar os joelhos de forma brusca.','Agachamento na máquina',12,120),
 ex('Cadeira extensora','Extensão do joelho para quadríceps.','Alinhe o eixo da máquina ao joelho. Estenda com controle e retorne sem deixar a carga cair.','Agachamento com apoio',12),
 ex('Mesa flexora','Flexão do joelho para posteriores da coxa.','Ajuste o rolo e mantenha o quadril apoiado. Flexione sem arquear excessivamente a lombar.','Cadeira flexora',12),
 ex('Levantamento romeno','Posteriores da coxa e glúteos.','Leve o quadril para trás com joelhos levemente flexionados. Mantenha a carga perto das pernas e pare ao perder controle da coluna.','Extensão de quadril orientada',10,120),
 ex('Panturrilha em pé','Panturrilhas com joelho estendido.','Suba e desça devagar, sem quicar. Use amplitude confortável e apoio para equilíbrio.','Panturrilha no leg press',15),
 ex('Panturrilha sentado','Panturrilhas com joelho flexionado.','Mantenha os pés apoiados e mova os tornozelos com controle. Faça uma pausa curta no topo.','Panturrilha sentado com carga orientada',15)]}
 ];}
export const foods=['Banana','Ovo','Beterraba','Alface','Batata inglesa','Batata-doce','Macaxeira','Goiaba','Carne vermelha','Fígado','Frango','Macarrão','Arroz','Cuscuz','Calabresa','Tapioca','Carne moída','Repolho','Tomate','Feijão','Queijo','Mortadela'];
export const baseMeals=[
 {name:'Café da manhã',time:'05:20',content:'Cuscuz com ovos e banana. Cadastre as porções do plano revisado para você.',purpose:'Refeição antes do treino. Ajuste a quantidade à tolerância digestiva.'},
 {name:'Depois do treino',time:'08:30',content:'Arroz com frango ou macaxeira com ovos. As opções precisam de porções ajustadas individualmente.',purpose:'Contribuir para a ingestão diária de energia e proteína.'},
 {name:'Almoço',time:'12:00',content:'Arroz, feijão, frango ou carne moída, alface, tomate, repolho e beterraba.',purpose:'Refeição principal com diferentes grupos de alimentos.'},
 {name:'Lanche no trabalho',time:'16:00',content:'Panqueca com frango ou carne moída e uma fruta. Leve em recipiente e conserve refrigerado até consumir.',purpose:'Opção prática para seu intervalo de 20 minutos.'},
 {name:'Jantar',time:'22:00',content:'Arroz ou macaxeira, frango ou carne moída e salada.',purpose:'Completar a alimentação do dia conforme o plano individual.'}
];
export function demoRecords(){return [...starterRoutines().map(data=>({id:uid(),kind:'routine',data,version:1})),...baseMeals.map(data=>({id:uid(),kind:'meal',data,version:1})),...foods.map(name=>({id:uid(),kind:'pantry',data:{name,quantity:1,unit:'un',price:0,available:true},version:1})),{id:uid(),kind:'measurement',version:1,data:{date:new Date().toISOString().slice(0,10),weight:90,waist:91,chest:110,thigh:54,arm:32,calf:34,notes:'Medidas iniciais informadas. Atualize com uma nova aferição.'}}];}
export const demoProfile={name:'Walyson',username:'walyson_caio',share_progress:false,settings:{age:28,height:181,weight:90,target:100,goal:'Hipertrofia com prioridade em pernas, braços e antebraços',biotype:'Ectomorfo (autodeclarado)',experience:'Intermediário',minutes:75,days:6,equipment:'Academia completa',limitations:'',budget:0,sleep:6,schedule:'Acordo 05h; treino 07h de segunda a sexta, 08h sábado; almoço 12h; intervalo 16h–16h20; chego em casa 22h.'}};
