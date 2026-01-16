import { Heart, Coffee, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { useConfetti } from "@/hooks/useConfetti";
import { Button } from "@/components/ui/button";

const donationOptions = [
  {
    icon: Coffee,
    title: "Dois Cafés",
    value: "R$ 10",
    description: "Um pouquinho a mais de energia",
    link: "https://pagamentosimples.com.br/PAyMcTMP",
    popular: false,
  },
  {
    icon: Heart,
    title: "Super Apoiador",
    value: "R$ 25",
    description: "Seu apoio faz a diferença",
    link: "https://pagamentosimples.com.br/UmFdkMok",
    popular: true,
  },
  {
    icon: Sparkles,
    title: "Patrocinador",
    value: "R$ 50",
    description: "Você é incrível! Obrigado pelo apoio",
    link: "https://pagamentosimples.com.br/BpVsVqAw",
    popular: false,
  },
];

const Donation = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.2 });
  const { triggerConfetti } = useConfetti();

  return (
    <section 
      id="apoie" 
      ref={ref}
      className="py-20 md:py-28 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] gradient-orb rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] gradient-orb-alt rounded-full blur-3xl opacity-30" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse-soft" />
            <span className="text-sm font-medium text-muted-foreground">Apoie este projeto</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ajude a Manter o <span className="gradient-text-animated">Precifica</span> no Ar
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Este projeto é gratuito e feito com muito carinho. Se ele te ajudou a precificar melhor, 
            considere fazer uma doação para mantê-lo funcionando.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto items-end pt-6">
          {donationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => triggerConfetti(e)}
                className={`group relative p-4 md:p-6 lg:p-8 rounded-2xl backdrop-blur-sm border shadow-md transition-all duration-500 ease-out text-center hover:-translate-y-1 hover:shadow-xl ${
                  option.popular 
                    ? 'bg-foreground text-white border-foreground shadow-xl scale-105 sm:scale-110 hover:shadow-2xl z-10' 
                    : 'bg-white/90 border-border hover:border-foreground/20'
                } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                {/* Popular badge */}
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      Mais popular
                    </span>
                  </div>
                )}

                {/* Animated glow effect for popular */}
                {option.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-rose-500/20 opacity-50 blur-xl animate-pulse pointer-events-none" />
                )}

                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.popular ? 'from-white/10' : 'from-foreground/[0.02]'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl mb-3 md:mb-4 transition-all duration-500 ease-out group-hover:scale-105 ${
                  option.popular 
                    ? 'bg-white/20 text-white' 
                    : 'bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-white'
                }`}>
                  <Icon className={`w-5 h-5 md:w-7 md:h-7 transition-transform duration-500 group-hover:scale-110 ${option.popular ? 'animate-pulse' : ''}`} />
                </div>

                {/* Value */}
                <div className={`relative text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 transition-colors duration-300 ${
                  option.popular ? 'text-white' : 'text-foreground'
                }`}>
                  {option.value}
                </div>

                {/* Title */}
                <div className={`relative text-sm md:text-lg font-semibold mb-1 md:mb-2 transition-colors duration-300 ${
                  option.popular ? 'text-white/90' : 'text-foreground/80 group-hover:text-foreground'
                }`}>
                  {option.title}
                </div>

                {/* Description */}
                <p className={`relative text-xs md:text-sm hidden sm:block transition-colors duration-300 ${
                  option.popular ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {option.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center ${
                  option.popular ? 'bg-white' : 'bg-foreground'
                }`} />
              </a>
            );
          })}
        </div>

        {/* See more button */}
        <div className={`text-center mt-8 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.3s' }}>
          <Link to="/apoie">
            <Button variant="outline" size="lg" className="gap-2 group">
              Ver outras formas de apoiar
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Footer message */}
        <p className={`text-center text-sm text-muted-foreground mt-8 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.5s' }}>
          💜 Qualquer valor faz diferença. Muito obrigado pelo apoio!
        </p>
      </div>
    </section>
  );
};

export default Donation;
