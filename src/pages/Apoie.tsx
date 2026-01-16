import { Heart, Coffee, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/useConfetti";
import Footer from "@/components/landing/Footer";

const allDonationOptions = [
  {
    icon: Coffee,
    title: "Um Café",
    value: "R$ 5",
    description: "Ajuda a manter o servidor rodando",
    link: "https://pagamentosimples.com.br/hUXdTRPK",
  },
  {
    icon: Coffee,
    title: "Dois Cafés",
    value: "R$ 10",
    description: "Um pouquinho a mais de energia",
    link: "https://pagamentosimples.com.br/PAyMcTMP",
  },
  {
    icon: Heart,
    title: "Apoiador",
    value: "R$ 15",
    description: "Contribui para novas funcionalidades",
    link: "https://pagamentosimples.com.br/VzTLSPWt",
  },
  {
    icon: Heart,
    title: "Super Apoiador",
    value: "R$ 25",
    description: "Seu apoio faz a diferença",
    link: "https://pagamentosimples.com.br/UmFdkMok",
  },
  {
    icon: Sparkles,
    title: "Patrocinador",
    value: "R$ 50",
    description: "Você é incrível! Obrigado pelo apoio",
    link: "https://pagamentosimples.com.br/BpVsVqAw",
  },
  {
    icon: Sparkles,
    title: "Super Patrocinador",
    value: "R$ 100",
    description: "Você é um herói! Gratidão eterna",
    link: "https://pagamentosimples.com.br/nwpGTJXU",
  },
];

const Apoie = () => {
  const { triggerConfetti } = useConfetti();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16 px-4">
        <div className="container-custom">
          {/* Back button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o início
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse-soft" />
              <span className="text-sm font-medium text-muted-foreground">Todas as formas de apoiar</span>
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Apoie o <span className="gradient-text-animated">Precifica</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Escolha o valor que cabe no seu bolso. Qualquer contribuição ajuda a manter 
              este projeto gratuito e funcionando para todos.
            </p>
          </div>

          {/* All donation options */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {allDonationOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <a
                  key={index}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerConfetti(e)}
                  className="group relative p-4 md:p-6 lg:p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-border shadow-md transition-all duration-500 ease-out text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl bg-foreground/5 text-foreground mb-3 md:mb-4 group-hover:bg-foreground group-hover:text-white transition-all duration-500 ease-out group-hover:scale-105">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Value */}
                  <div className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 md:mb-2 transition-colors duration-300">
                    {option.value}
                  </div>

                  {/* Title */}
                  <div className="relative text-sm md:text-lg font-semibold text-foreground/80 mb-1 md:mb-2 transition-colors duration-300 group-hover:text-foreground">
                    {option.title}
                  </div>

                  {/* Description */}
                  <p className="relative text-xs md:text-sm text-muted-foreground hidden sm:block transition-colors duration-300">
                    {option.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                </a>
              );
            })}
          </div>

          {/* Footer message */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            💜 Qualquer valor faz diferença. Muito obrigado pelo apoio!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apoie;
