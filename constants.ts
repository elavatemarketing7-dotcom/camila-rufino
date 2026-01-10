
import { Question, GalleryItem } from './types';

export const EXPERT_NAME = "Camila Rufino";
export const EXPERT_PROFESSION = "Biomedicina";
export const WHATSAPP_URL = "https://api.whatsapp.com/send?1=pt_BR&phone=5531975752839";
export const INSTAGRAM_URL = "https://www.instagram.com/camilarf.bmd";
export const CLINIC_ADDRESS = "Bairro Água Branca, Contagem";

export const IMAGES = {
  main: "https://i.imgur.com/j28ND3P.png",
  authority1: "https://i.imgur.com/9cLkXXy.png",
  authority2: "https://i.imgur.com/heyRAJn.png",
  authority3: "https://i.imgur.com/srXTSo9.png",
  profilePeito: "https://i.imgur.com/j28ND3P.png", // Using main as fallback for "peito para cima"
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual é o seu principal objetivo hoje?",
    options: ["Melhorar a flacidez", "Rejuvenescimento Facial", "Contorno Mandibular", "Remover manchas ou tatuagens"]
  },
  {
    id: 2,
    text: "Você já realizou algum procedimento estético antes?",
    options: ["Sim, e adoro os resultados", "Nunca fiz, tenho receio", "Sim, mas procuro algo mais natural"]
  },
  {
    id: 3,
    text: "O que mais te incomoda ao olhar no espelho?",
    options: ["Cansaço no olhar", "Perda de volume", "Qualidade da pele", "Linhas de expressão"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Co2
  { id: 'co2-1', url: "https://i.imgur.com/fwnvcQG.png", category: "Co2" },
  { id: 'co2-2', url: "https://i.imgur.com/a5MesN4.png", category: "Co2" },
  
  // Remoção Laser
  { id: 'rl-1', url: "https://i.imgur.com/eyrMDDo.png", category: "Remoção Laser" },
  { id: 'rl-2', url: "https://i.imgur.com/HzwUjGl.png", category: "Remoção Laser" },
  { id: 'rl-3', url: "https://i.imgur.com/76w0x6P.png", category: "Remoção Laser" },
  { id: 'rl-4', url: "https://i.imgur.com/znsLHQq.png", category: "Remoção Laser" },
  { id: 'rl-5', url: "https://i.imgur.com/q19hwhd.png", category: "Remoção Laser" },
  { id: 'rl-6', url: "https://i.imgur.com/5tqB4uM.png", category: "Remoção Laser" },
  
  // Estética Facial
  { id: 'ef-1', url: "https://i.imgur.com/zhuW3Uj.png", category: "Estética Facial" },
  { id: 'ef-2', url: "https://i.imgur.com/ZUPunaK.png", category: "Estética Facial" },
  
  // Hifu Microfocad
  { id: 'hf-1', url: "https://i.imgur.com/NSMnVsL.png", category: "Hifu Microfocad" },
  
  // Depilação Laser
  { id: 'dl-1', url: "https://i.imgur.com/bt5cclG.png", category: "Depilação Laser" },
  
  // Jato Plasma
  { id: 'jp-1', url: "https://i.imgur.com/xGirQzn.png", category: "Jato Plasma" },
  { id: 'jp-2', url: "https://i.imgur.com/V5PVQY8.png", category: "Jato Plasma" },
  { id: 'jp-3', url: "https://i.imgur.com/RoCoMIJ.png", category: "Jato Plasma" },
  
  // Black peel
  { id: 'bp-1', url: "https://i.imgur.com/CepBbUv.png", category: "Black peel" },
  { id: 'bp-2', url: "https://i.imgur.com/M3hOaCm.png", category: "Black peel" },
  
  // Lábios
  { id: 'lb-1', url: "https://i.imgur.com/xvGprcA.png", category: "Lábios" },
  { id: 'lb-2', url: "https://i.imgur.com/Iz4iusM.png", category: "Lábios" },
  { id: 'lb-3', url: "https://i.imgur.com/cPd6NQZ.png", category: "Lábios" },
  
  // Bioestimulador
  { id: 'bio-1', url: "https://i.imgur.com/Q95Igc7.png", category: "Bioestimulador" },
  { id: 'bio-2', url: "https://i.imgur.com/lEYqvGQ.png", category: "Bioestimulador" },
  
  // Intradermo
  { id: 'intra-1', url: "https://i.imgur.com/jXhtRx5.png", category: "Intradermo" },
  { id: 'intra-2', url: "https://i.imgur.com/NsWpuwP.png", category: "Intradermo" },
];

export const AUTHORITY_GALLERY = [
  "https://i.imgur.com/WnRpDyA.png",
  "https://i.imgur.com/nAAD1kD.png",
  "https://i.imgur.com/t29jo0T.png",
  "https://i.imgur.com/ZBNeFl7.png",
  "https://i.imgur.com/LWHNTMy.png",
  "https://i.imgur.com/wy6tCfD.png",
  "https://i.imgur.com/aMx6V7l.png",
  "https://i.imgur.com/6o6ZObe.png"
];

export const TESTIMONIALS = [
  "https://i.imgur.com/7lOlBny.png",
  "https://i.imgur.com/AE2CIMz.png",
  "https://i.imgur.com/3hgQvyx.png",
  "https://i.imgur.com/PjUTR9H.png",
  "https://i.imgur.com/1oPeAKj.png",
  "https://i.imgur.com/CT30D0m.png",
  "https://i.imgur.com/vGmvR7b.png",
  "https://i.imgur.com/izgjI1K.png"
];
