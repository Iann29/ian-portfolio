import React, { useState, useEffect } from 'react';
import { Code2, User, Mail, Github, Linkedin, FileText, ChevronDown } from 'lucide-react';
import { useTextScramble } from './hooks/useTextScramble';
import Lenis from '@studio-freight/lenis';
import RainEffect from './components/RainEffect';
import LoadingScreen from './components/LoadingScreen';
import MountainLight from './components/MountainLight';
import ThunderEffect from './components/ThunderEffect';
import './fonts.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrambledTitle = useTextScramble("THINGS", 3000);
  const scrambledAbout = useTextScramble("SOBRE", 4000);
  const scrambledProjects = useTextScramble("PROJETOS LEGAIS", 5000);
  const scrambledCompanies = useTextScramble("EMPRESAS", 6000);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className="min-h-screen bg-black text-white font-mono">
        {/* Hero Section */}
        <div 
          className={`min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-1000 relative ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <RainEffect />
          <MountainLight />
          <ThunderEffect />
          <div className="relative z-10">
            <pre className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre hidden md:block">
{`
     ██╗██╗   ██╗███████╗████████╗    ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
     ██║██║   ██║██╔════╝╚══██╔══╝    ██╔══██╗██║   ██║██║██║     ██╔══██╗
     ██║██║   ██║███████╗   ██║       ██████╔╝██║   ██║██║██║     ██║  ██║
██   ██║██║   ██║╚════██║   ██║       ██╔══██╗██║   ██║██║██║     ██║  ██║
╚█████╔╝╚██████╔╝███████║   ██║       ██████╔╝╚██████╔╝██║███████╗██████╔╝
 ╚════╝  ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 
`}
            </pre>
            <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-4" style={{ fontFamily: 'VeniceClassic' }}>{scrambledTitle}</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-lg text-center mb-8">
              "Faço acontecer. É sobre resolver problemas, não sobre código."
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#about" className="hover:text-gray-400 transition-colors">
                <User size={24} />
              </a>
              <a href="mailto:seu@email.com" className="hover:text-gray-400 transition-colors">
                <Mail size={24} />
              </a>
              <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 animate-bounce z-10">
            <ChevronDown size={32} />
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="min-h-screen flex flex-col items-center justify-center p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <Code2 size={32} />
              <h2 className="text-3xl font-bold font-mono">{scrambledAbout}</h2>
            </div>
            <pre className="text-xs sm:text-sm whitespace-pre-wrap mb-8">
{`
/**
 * Empresário e desenvolvedor por paixão.
 * 
 * Minha stack? Tudo que resolver o problema.
 * Minha metodologia? Funciona? É bom? Tá valendo.
 * 
 * Aqui você encontra alguns dos meus experimentos
 * e projetos malucos que faço nas horas vagas.
 * 
 * Bora trocar uma ideia? 
 */
`}
            </pre>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-white p-6">
                <h3 className="text-xl font-bold mb-4 font-mono">{scrambledProjects}</h3>
                <ul className="space-y-4">
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">01.</span>
                      <span className="font-bold">AutoBot 3000</span>
                    </div>
                    <p className="text-sm text-gray-400">Bot que automatiza tudo que é chato de fazer</p>
                  </li>
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">02.</span>
                      <span className="font-bold">CryptoTracker</span>
                    </div>
                    <p className="text-sm text-gray-400">Porque todo dev precisa ter um projeto crypto</p>
                  </li>
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">03.</span>
                      <span className="font-bold">WebScraper Pro</span>
                    </div>
                    <p className="text-sm text-gray-400">Pegando dados da web do jeito ninja</p>
                  </li>
                </ul>
              </div>
              <div className="border border-white p-6">
                <h3 className="text-xl font-bold mb-4 font-mono">{scrambledCompanies}</h3>
                <ul className="space-y-4">
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">01.</span>
                      <span className="font-bold">Amage</span>
                    </div>
                    <p className="text-sm text-gray-400">Agência web que transforma ideias em realidade digital</p>
                  </li>
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">02.</span>
                      <span className="font-bold">Magododohayday</span>
                    </div>
                    <p className="text-sm text-gray-400">Loja online de venda de itens do jogo "Hay Day"</p>
                  </li>
                  <li className="group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 group-hover:text-white transition-colors">03.</span>
                      <span className="font-bold">Maguinho</span>
                    </div>
                    <p className="text-sm text-gray-400">Startup em desenvolvimento - Em breve revolucionando o mercado financeiro</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <a 
                href="https://github.com/seu-usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
              >
                <Github size={20} />
                VER PROJETOS
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;