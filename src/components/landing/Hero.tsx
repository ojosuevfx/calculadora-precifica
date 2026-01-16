import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "./TypewriterText";
const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 sm:pt-24 sm:pb-16 md:pt-20 md:pb-20">
      {/* Animated mesh background */}
      <div className="absolute inset-0 gradient-mesh-animated" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-2 sm:left-4 md:left-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 gradient-orb rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-2 sm:right-4 md:right-10 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 gradient-orb-alt rounded-full blur-3xl animate-float" style={{
      animationDelay: "2s"
    }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-80 md:w-[500px] h-56 sm:h-80 md:h-[500px] gradient-orb rounded-full blur-3xl opacity-30 animate-float" style={{
      animationDelay: "4s"
    }} />
      
      <div className="container-custom relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm border border-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 opacity-0 animate-fade-in-up shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">Para Profissionais do Audiovisual</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 opacity-0 animate-fade-in-up stagger-1 leading-tight max-w-4xl mx-auto px-2">
          Quanto Cobrar{" "}
          <TypewriterText 
            words={[
              { word: "Motion?", article: "seu", preposition: "pelo" },
              { word: "Flyer?", article: "seu", preposition: "pelo" },
              { word: "Design?", article: "seu", preposition: "pelo" },
              { word: "Edição?", article: "sua", preposition: "pela" },
              { word: "Animação?", article: "sua", preposition: "pela" },
              { word: "Tempo?", article: "seu", preposition: "pelo" }
            ]} 
            typingSpeed={120} 
            deletingSpeed={60} 
            pauseDuration={2500} 
          />
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 opacity-0 animate-fade-in-up stagger-2 px-2">A calculadora definitiva para videomakers, editores, designers e animadores. Precifique seus projetos com precisão e pare de cobrar menos do que vale.</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0 animate-fade-in-up stagger-3 px-4 sm:px-0">
          <Link to="/calcular" className="btn-primary w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
            Acessar Ferramentas 
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <button onClick={() => scrollToSection("como-funciona")} className="btn-secondary w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
            Como Funciona
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 opacity-0 animate-fade-in-up stagger-4">
          <div className="p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-border text-center min-w-[85px] sm:min-w-[100px] md:min-w-[120px]">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">2k+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Profissionais</div>
          </div>
          <div className="p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-border text-center min-w-[85px] sm:min-w-[100px] md:min-w-[120px]">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">5k+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Orçamentos</div>
          </div>
          <div className="p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-border text-center min-w-[85px] sm:min-w-[100px] md:min-w-[120px]">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">4.9★</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Avaliação</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => scrollToSection("como-funciona")} className="absolute bottom-4 sm:bottom-8 left-0 right-0 mx-auto w-fit flex items-center justify-center animate-bounce-slow opacity-60 hover:opacity-100 transition-opacity">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
      </button>
    </section>;
};
export default Hero;