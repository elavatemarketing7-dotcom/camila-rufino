
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ViewState } from './types';
import { 
  EXPERT_NAME, 
  EXPERT_PROFESSION, 
  WHATSAPP_URL, 
  IMAGES, 
  QUIZ_QUESTIONS, 
  GALLERY_ITEMS, 
  AUTHORITY_GALLERY,
  TESTIMONIALS,
  CLINIC_ADDRESS,
  INSTAGRAM_URL
} from './constants';

const Ticker = ({ onNavigate }: { onNavigate?: (id: string) => void }) => {
  const items = [
    { label: "Sobre Mim", id: "sobre" },
    { label: "Resultados Reais", id: "resultados" },
    { label: "Biomedicina de ❤️", id: "autoridade" },
    { label: "Instagram", id: "instagram", isExternal: true },
    { label: "Onde nos Encontrar", id: "localizacao" },
    { label: "Agendamento", id: "contato" },
    { label: EXPERT_NAME, id: "top" }
  ];

  const handleClick = (item: typeof items[0]) => {
    if (item.isExternal) {
      window.open(INSTAGRAM_URL, '_blank');
      return;
    }
    if (onNavigate) {
      onNavigate(item.id);
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 overflow-hidden h-10 flex items-center">
      <div className="ticker-animate whitespace-nowrap flex items-center">
        {[...Array(4)].map((_, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {items.map((item, i) => (
              <button
                key={`${groupIndex}-${i}`}
                onClick={() => handleClick(item)}
                className="text-[10px] uppercase tracking-[3px] font-medium mx-8 text-gold/80 flex items-center hover:text-stone-900 transition-colors cursor-pointer outline-none active:scale-95"
              >
                {item.label} <span className="ml-8 opacity-30">•</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const QuizComponent = ({ onComplete, onCancel }: { onComplete: (answers: string[]) => void, onCancel: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 quiz-overlay">
      <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 text-gold font-serif text-xl md:text-2xl opacity-40 select-none whitespace-nowrap">
        {EXPERT_NAME}
      </div>
      
      <div className="absolute top-16 md:top-24 right-4 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-gold p-1 animate-bounce overflow-hidden z-10 shadow-lg">
        <img src={IMAGES.authority3} alt={EXPERT_NAME} className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="glass w-full max-w-lg rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-stone-200">
        <div className="h-1.5 w-full bg-stone-100 rounded-full mb-6 md:mb-8">
          <div 
            className="h-full bg-gold transition-all duration-500 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-6 md:mb-8 text-center leading-tight">
          {QUIZ_QUESTIONS[currentStep].text}
        </h3>

        <div className="space-y-3 md:space-y-4">
          {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full py-3.5 md:py-5 px-5 md:px-6 rounded-2xl bg-stone-50 border border-stone-100 text-stone-800 text-base md:text-lg font-medium hover:bg-gold hover:text-white hover:border-gold transition-all active:scale-95 text-left shadow-sm"
            >
              {option}
            </button>
          ))}
        </div>

        <button 
          onClick={onCancel}
          className="w-full mt-8 md:mt-10 text-stone-400 text-[10px] md:text-sm underline uppercase tracking-widest font-bold text-center"
        >
          Pular e ir para o site
        </button>
      </div>
    </div>
  );
};

const AnalyzingScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center p-8">
      <div className="w-64 h-2 bg-stone-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gold animate-[loading_2.5s_ease-in-out]"></div>
      </div>
      <p className="text-xl font-serif text-gold animate-pulse">Analisando Perfil...</p>
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const ResultPage = ({ onGoMain, answers }: { onGoMain: () => void, answers: string[] }) => {
  const sendToWhatsApp = (mode: string) => {
    let msg = "";
    if(mode === 'avaliar') {
      const quizSummary = QUIZ_QUESTIONS.map((q, i) => `*${q.text}*\nResposta: ${answers[i]}`).join('\n\n');
      msg = `Olá Dra. Camila, acabei de realizar o teste no seu site e meu perfil foi classificado como *Paciente Ideal*!\n\n📋 *Minha Avaliação:*\n\n${quizSummary}\n\nEstou ansiosa para iniciar meu tratamento com você. Como podemos proceder?`;
    }
    if(mode === 'chamar') msg = "Olá Dra. Camila, gostaria de tirar umas dúvidas sem compromisso sobre o seu método.";
    window.open(`${WHATSAPP_URL}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center px-4 py-4 md:py-12">
      <div className="w-full max-w-md glass rounded-[35px] md:rounded-[40px] p-5 md:p-8 text-center flex flex-col items-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
        
        <p className="text-gold font-bold tracking-widest text-[10px] md:text-sm mb-1">RESULTADO</p>
        <h2 className="text-xl md:text-3xl font-serif text-stone-900 mb-3 md:mb-6 leading-tight">Perfil Compatível.<br/>Você é a Paciente ideal.</h2>
        
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gold p-1.5 mb-4 md:mb-8 shadow-xl shadow-stone-100">
          <img 
            src={IMAGES.authority3} 
            alt={EXPERT_NAME} 
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <p className="text-sm md:text-lg text-stone-600 leading-relaxed mb-6 md:mb-10 px-1 md:px-4">
          Com base nas suas respostas, o Método da <span className="text-gold font-bold">Dra. Camila Rufino</span> consegue entregar exatamente a naturalidade e segurança que você procura.
        </p>

        <div className="w-full space-y-2 md:space-y-4">
          <button 
            onClick={() => sendToWhatsApp('avaliar')}
            className="w-full py-3.5 md:py-5 bg-gold text-white font-bold rounded-xl md:rounded-2xl shadow-lg active:scale-95 transition-transform btn-pulse text-[13px] md:text-base leading-tight"
          >
            1 - ENVIAR MINHA AVALIAÇÃO À DRA
          </button>
          
          <button 
            onClick={() => sendToWhatsApp('chamar')}
            className="w-full py-3.5 md:py-5 bg-stone-100 text-stone-800 font-bold rounded-xl md:rounded-2xl border border-stone-200 active:scale-95 transition-transform text-[13px] md:text-base leading-tight"
          >
            2 - CHAMAR NO WHATSAPP SEM COMPROMISSO
          </button>

          <button 
            onClick={onGoMain}
            className="w-full py-2 md:py-5 bg-transparent text-stone-400 font-medium rounded-xl md:rounded-2xl active:scale-95 transition-transform text-[11px] md:text-sm uppercase tracking-widest"
          >
            3 - NÃO ENVIAR E CONTINUAR NO SITE
          </button>
        </div>
      </div>
    </div>
  );
};

const MainSite = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GALLERY_ITEMS.map(item => item.category)));
    return ["Todos", ...cats];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "Todos") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-10">
      {/* Hero Section */}
      <section id="top" className="relative min-h-[90vh] flex flex-col items-center justify-end px-6 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.main} className="w-full h-full object-cover opacity-80 scale-105" alt="Hero Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-3xl text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-stone-300 mb-8 animate-fade-in shadow-sm">
            <i className="fab fa-instagram text-gold"></i>
            <span className="text-[11px] font-bold tracking-widest text-stone-900">@camilarf.bmd</span>
          </div>
          
          <div className="mb-10 bg-white/20 backdrop-blur-[4px] rounded-3xl p-6 md:p-8 shadow-sm">
            <h1 className="text-5xl md:text-8xl font-serif text-stone-900 mb-6 leading-tight font-bold drop-shadow-md">
              Sou Camila Rufino
            </h1>
            <p className="text-2xl md:text-3xl text-stone-900 font-bold mb-2 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              Especialista em realçar sua beleza com <span className="text-gold font-black italic underline decoration-gold/50 underline-offset-8">naturalidade, segurança e propósito.</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-5 items-center">
            <button 
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="group w-full md:w-auto px-12 py-7 bg-gold text-white text-2xl font-black rounded-full shadow-[0_25px_50px_rgba(109,76,65,0.4)] active:scale-95 transition-all btn-pulse uppercase tracking-wider"
            >
              AGENDAR CONSULTA NO WHATSAPP
            </button>
            <button 
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
              className="w-full md:w-auto px-10 py-5 bg-white text-stone-900 border-2 border-stone-200 text-base font-bold rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-stone-50 hover:border-stone-300"
            >
              <i className="fab fa-instagram text-xl"></i>
              Acompanhe meu dia no Instagram
            </button>
          </div>
        </div>
      </section>

      {/* Video Highlight Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-end">
           <div className="glass rounded-[40px] p-2 overflow-hidden shadow-2xl border border-stone-100 group w-full max-w-[400px]">
            <video 
              className="w-full aspect-[9/16] object-cover rounded-[35px] group-hover:scale-[1.02] transition-transform duration-700"
              controls
              autoPlay
              muted
              loop
              playsInline
              poster={IMAGES.authority2}
            >
              <source src="https://i.imgur.com/FukaHB2.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-gold mb-8 leading-tight">A Ciência Encontra a Arte</h2>
          <p className="text-lg md:text-2xl text-stone-700 leading-relaxed font-light mb-6">
            Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito.
          </p>
          <div className="bg-stone-50 p-8 rounded-3xl border-l-4 border-gold shadow-sm">
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-medium italic">
              "Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
            </p>
          </div>
          <div className="mt-10">
            <button 
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="px-8 py-5 bg-gold text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              QUERO MINHA AVALIAÇÃO
            </button>
          </div>
        </div>
      </section>

      {/* Who Am I */}
      <section id="sobre" className="py-24 px-6 bg-[#FDFBF9] border-y border-stone-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={IMAGES.authority1} className="rounded-3xl shadow-2xl border border-white" alt="Dra. Camila" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-2xl flex items-center justify-center p-4 text-center shadow-lg border border-stone-50">
              <span className="text-gold font-bold text-xs uppercase tracking-tighter">Autoridade<br/>Reconhecida</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif text-stone-900 mb-8">Além da Biomedicina</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              Minha missão é devolver a autoestima de forma honesta. Não acredito em rostos padronizados, acredito na harmonia que já existe em você.
            </p>
            <ul className="space-y-4">
              {[
                "Avaliação Humanizada e Personalizada",
                "Foco em Naturalidade Extrema",
                "Tecnologia de Ponta em Contagem",
                "Acompanhamento Pós-Procedimento de Perto"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-stone-800">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <i className="fas fa-check text-[10px] text-gold"></i>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Results Real - Filterable Gallery */}
      <section id="resultados" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-stone-900 mb-4">Resultados que Falam</h2>
            <p className="text-gold uppercase tracking-[4px] text-sm font-bold mb-8">Escolha a categoria que deseja ver</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto overflow-x-auto pb-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat 
                    ? "bg-gold text-white border-gold shadow-lg scale-105" 
                    : "bg-stone-50 text-stone-500 border-stone-200 hover:border-gold/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-500 min-h-[400px]">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="aspect-square bg-stone-50 overflow-hidden rounded-2xl cursor-pointer group relative animate-fade-in shadow-sm"
                onClick={() => setSelectedImg(item.url)}
              >
                <img 
                  src={item.url} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.category} 
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-gold/90 px-3 py-1 rounded-full">{item.category}</span>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-20 text-center text-stone-300 italic">
                Nenhum resultado encontrado nesta categoria.
              </div>
            )}
          </div>
          <p className="mt-12 text-center text-stone-400 text-xs uppercase tracking-widest">
            *Resultados podem variar de pessoa para pessoa.
          </p>
        </div>
      </section>

      {/* Bastidores da Expert - Grid for Visibility */}
      <section id="autoridade" className="py-24 px-6 bg-[#FDFBF9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-serif text-stone-900 mb-2">Bastidores e Estilo de Vida</h2>
              <p className="text-gold uppercase tracking-[4px] text-sm font-bold">Acompanhe minha rotina diária no Instagram</p>
            </div>
            <button 
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
              className="px-8 py-4 bg-stone-900 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
            >
              <i className="fab fa-instagram text-xl"></i>
              VER MAIS NO INSTAGRAM
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...AUTHORITY_GALLERY, IMAGES.authority3].map((url, i) => (
              <div key={i} className="aspect-[3/4] rounded-[32px] overflow-hidden bg-white shadow-xl border border-stone-100 group relative animate-fade-in">
                <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={`Camila Rufino ${i}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl border border-stone-100">
                   <p className="text-[10px] text-stone-800 font-bold uppercase tracking-widest">Excelência & Propósito</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Avaliação Honesta", desc: "Só indico o que você realmente precisa para brilhar.", icon: "fa-star" },
            { title: "Toque Feminino", desc: "Sensibilidade para entender suas dores e desejos.", icon: "fa-heart" },
            { title: "Biossegurança", desc: "Protocolos rigorosos para sua total segurança.", icon: "fa-shield-halved" }
          ].map((card, i) => (
            <div key={i} className="bg-stone-50 p-8 rounded-[30px] border border-stone-100 text-center shadow-sm">
              <i className={`fas ${card.icon} text-4xl text-gold mb-6`}></i>
              <h3 className="text-xl font-serif text-stone-900 mb-4">{card.title}</h3>
              <p className="text-stone-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-[#FDFBF9]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-stone-900 mb-16">O Caminho para sua Melhor Versão</h2>
          <div className="space-y-12 relative">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-stone-200 hidden md:block"></div>
            {[
              { step: "01", title: "Contato via WhatsApp", desc: "Clique nos botões e fale diretamente com minha equipe de recepção." },
              { step: "02", title: "Agendamento VIP", desc: "Escolhemos o melhor horário para uma consulta de avaliação detalhada." },
              { step: "03", title: "Sua Transformação", desc: "Realizamos o procedimento focado em realçar sua beleza natural." }
            ].map((s, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-2">{s.title}</h3>
                  <p className="text-stone-500 text-lg">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - REFACTORED TO BE MORE APPARENT AND ORGANIZED */}
      <section className="py-24 px-6 bg-[#FAF8F6] border-y border-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-px bg-gold/30 self-center"></div>
              <i className="fas fa-quote-right text-gold text-2xl mx-6"></i>
              <div className="w-20 h-px bg-gold/30 self-center"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Vozes de Transformação</h2>
            <p className="text-gold uppercase tracking-[4px] text-[10px] md:text-sm font-black mb-2">O QUE ELAS DIZEM</p>
            <p className="text-stone-500 max-w-xl mx-auto text-sm md:text-base">Confira os depoimentos reais de quem confiou sua beleza e autoestima ao nosso método exclusivo.</p>
          </div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {TESTIMONIALS.map((url, i) => (
              <div 
                key={i} 
                className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 hover:scale-[1.03] transition-all duration-500 group cursor-pointer"
                onClick={() => setSelectedImg(url)}
              >
                <img 
                  src={url} 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                  alt={`Depoimento ${i + 1}`} 
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-stone-50 flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, star) => (
                      <i key={star} className="fas fa-star text-[8px] text-gold"></i>
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest italic">Verificada</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="px-10 py-5 bg-stone-900 text-white font-bold rounded-2xl shadow-xl hover:bg-gold transition-colors active:scale-95 flex items-center gap-3 mx-auto"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              QUERO VIVER ESSA EXPERIÊNCIA
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contato" className="py-24 px-6 text-center bg-[#FDFBF9]">
        <div className="max-w-3xl mx-auto bg-white p-12 rounded-[50px] border border-stone-100 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Pronta para se redescobrir?</h2>
          <p className="text-xl text-stone-500 mb-12">Restam poucas vagas para este mês. Agende sua primeira consulta agora.</p>
          <button 
            onClick={() => window.open(WHATSAPP_URL, '_blank')}
            className="w-full md:w-auto px-16 py-8 bg-gold text-white text-2xl font-black rounded-full shadow-2xl active:scale-95 transition-all btn-pulse uppercase tracking-wider"
          >
            CLIQUE AQUI PARA SABER MAIS
          </button>
        </div>
      </section>

      {/* Map/Location */}
      <section id="localizacao" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-serif text-3xl text-stone-900 mb-12">Onde nos Encontrar</h2>
          <div className="rounded-[40px] p-4 h-96 overflow-hidden bg-stone-50 border border-stone-100 shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15004.991206660742!2d-44.0381661!3d-19.9329124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa694208a38a37b%3A0xc34857754b52b2b1!2sBairro%20%C3%81gua%20Branca%2C%20Contagem%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1715000000000"
              className="w-full h-full rounded-[30px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
          <p className="text-center mt-6 text-stone-400">{CLINIC_ADDRESS}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-stone-100 text-center bg-white">
        <div className="text-gold font-serif text-5xl mb-6 italic opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
          Camila Rufino
        </div>
        <p className="text-stone-500 uppercase tracking-[5px] text-xs font-bold mb-8">
          {EXPERT_PROFESSION} • CONTAGEM/MG
        </p>
        <div className="flex justify-center gap-8 mb-12">
          <a href={INSTAGRAM_URL} target="_blank" className="text-stone-400 hover:text-gold text-2xl transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href={WHATSAPP_URL} target="_blank" className="text-stone-400 hover:text-gold text-2xl transition-colors">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <p className="text-[10px] text-stone-300 uppercase tracking-widest">
          © {new Date().getFullYear()} Camila Rufino • Todos os direitos reservados.
        </p>
      </footer>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl" alt="Zoom" />
          <button className="absolute top-10 right-10 text-white text-4xl hover:scale-110 transition-transform">&times;</button>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('CHOICE');
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const handleQuizComplete = (answers: string[]) => {
    setQuizAnswers(answers);
    setViewState('ANALYZING');
  };

  const handleAnalysisFinish = () => {
    setViewState('RESULT');
  };

  const goToMain = () => {
    setViewState('MAIN_SITE');
  };

  const handleSkipToSite = () => {
    setViewState('MAIN_SITE');
  };

  const handleNavigation = (id: string) => {
    if (viewState !== 'MAIN_SITE') {
      setViewState('MAIN_SITE');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="antialiased selection:bg-stone-100 selection:text-stone-900">
      <Ticker onNavigate={handleNavigation} />

      {viewState === 'CHOICE' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF9] overflow-hidden">
          {/* Main Container - Compact and Centered */}
          <div className="w-full h-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch shadow-2xl overflow-hidden lg:rounded-[40px] lg:my-8 lg:h-[calc(100vh-64px)]">
            
            {/* Image Side (Hero Highlight) - Adjusted to focus on chest-to-head */}
            <div className="flex-[0.8] lg:flex-1 relative order-1 lg:order-2 h-[45vh] lg:h-full animate-fade-in overflow-hidden">
              <img 
                src={IMAGES.authority3} 
                className="w-full h-full object-cover scale-[1.3] md:scale-[1.1] object-[center_18%] lg:object-[center_12%]" 
                alt="Dra. Camila Rufino" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent lg:bg-gradient-to-r lg:from-[#FDFBF9] lg:via-transparent to-transparent"></div>
              
              {/* Floating Name Overlay for Mobile (More compact) */}
              <div className="absolute bottom-6 left-6 right-6 lg:hidden text-center">
                 <h2 className="text-stone-900 font-serif text-4xl mb-0.5 drop-shadow-sm">{EXPERT_NAME}</h2>
                 <p className="text-gold uppercase tracking-[4px] text-[9px] font-black">Biomedicina Estética</p>
              </div>
            </div>

            {/* Action Side (Content) */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-8 lg:py-0 order-2 lg:order-1 bg-[#FDFBF9] z-10">
              <div className="w-full max-sm:max-w-[280px] max-w-sm text-center lg:text-left animate-fade-in">
                
                {/* Brand Header for Desktop (Compact) */}
                <div className="hidden lg:block mb-8">
                  <h2 className="text-gold font-serif text-5xl mb-2">{EXPERT_NAME}</h2>
                  <p className="text-stone-500 uppercase tracking-[5px] text-[10px] font-bold">Referência em Naturalidade</p>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-stone-900 mb-6 lg:mb-8 leading-tight">
                  Como você prefere iniciar sua jornada?
                </h3>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => setViewState('QUIZ')}
                    className="w-full py-4 md:py-5 bg-gold text-white font-bold rounded-2xl text-base md:text-lg shadow-xl active:scale-95 transition-transform btn-pulse flex flex-col items-center justify-center gap-0.5 group"
                  >
                    <span className="group-hover:tracking-wider transition-all uppercase text-sm lg:text-base">AVALIAÇÃO PERSONALIZADA</span>
                    <span className="block text-[10px] opacity-80 uppercase tracking-widest font-black">Iniciar diagnóstico</span>
                  </button>
                  
                  <button 
                    onClick={() => goToMain()}
                    className="w-full py-4 bg-white text-stone-800 font-bold rounded-2xl border-2 border-stone-100 shadow-md active:scale-95 transition-transform hover:bg-stone-50 hover:border-stone-200 text-sm lg:text-base"
                  >
                    IR DIRETO PARA O SITE
                  </button>
                  
                  <div className="pt-2 md:pt-4">
                    <a 
                      href={WHATSAPP_URL}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-gold text-[10px] md:text-[11px] font-black uppercase tracking-[3px] hover:scale-105 transition-transform"
                    >
                      <i className="fab fa-whatsapp text-sm"></i>
                      Dúvidas? Fale com a Dra.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'QUIZ' && (
        <QuizComponent 
          onComplete={handleQuizComplete} 
          onCancel={handleSkipToSite} 
        />
      )}

      {viewState === 'ANALYZING' && (
        <AnalyzingScreen onFinish={handleAnalysisFinish} />
      )}

      {viewState === 'RESULT' && (
        <ResultPage onGoMain={goToMain} answers={quizAnswers} />
      )}

      {viewState === 'MAIN_SITE' && (
        <MainSite />
      )}
    </div>
  );
}
