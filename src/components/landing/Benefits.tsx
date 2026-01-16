import { Sparkles, Target, TrendingUp, Zap, Eye, ShieldCheck } from "lucide-react";
import { useInView } from "../hooks/useInView";

const benefits = [
  {
    icon: Sparkles,
    title: "Gratuito e Simples",
    description: "Sem cadastro, sem custos. Feito por quem entende do mercado audiovisual.",
  },
  {
    icon: Target,
    title: "Feito para Você",
    description: "Considera variáveis específicas: custos, tempo e valor do seu trabalho.",
  },
  {
    icon: TrendingUp,
    title: "Valorize Seu Trabalho",
    description: "Pare de cobrar menos do que merece. Saiba o valor real do seu tempo.",
  },
  {
    icon: Zap,
    title: "Orçamentos Rápidos",
    description: "Calcule o valor de qualquer projeto em segundos.",
  },
  {
    icon: Eye,
    title: "Transparência Total",
    description: "Mostre ao cliente exatamente como o orçamento foi calculado.",
  },
  {
    icon: ShieldCheck,
    title: "Negocie com Confiança",
    description: "Tenha argumentos sólidos para defender seus preços.",
  },
];

const Benefits = () => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });

  return (
    <section id="beneficios" className="section-padding relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      {/* Animated orbs - more subtle */}
      <div className="absolute top-20 right-0 w-48 sm:w-72 h-48 sm:h-72 gradient-orb rounded-full blur-3xl animate-float opacity-30" />
      <div className="absolute bottom-20 left-0 w-56 sm:w-80 h-56 sm:h-80 gradient-orb-alt rounded-full blur-3xl animate-float opacity-25" style={{ animationDelay: "4s" }} />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-2">
          <h2 
            ref={ref}
            className={`text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-1000 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Por Que Usar o <span className="gradient-text-animated">Precifica</span>?
          </h2>
          <p 
            className={`text-base sm:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-1000 ease-out delay-150 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Ferramentas criadas especialmente para profissionais do audiovisual
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group relative flex gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border hover:border-foreground/15 transition-all duration-500 ease-out hover:shadow-lg hover:bg-white overflow-hidden hover:-translate-y-1 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Icon container */}
              <div className="relative flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 bg-foreground rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500 ease-out shadow-md">
                <benefit.icon className="relative w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="relative flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
