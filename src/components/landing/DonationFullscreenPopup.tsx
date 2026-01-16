import { Heart, Coffee, Sparkles, Rocket, PartyPopper, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDonation } from "@/contexts/DonationContext";
import { useConfetti } from "@/hooks/useConfetti";

const variations = [
  {
    icon: Rocket,
    iconColor: "text-blue-500",
    title: "Ei, você tá arrasando!",
    subtitle: "Sério, cobrar certo é uma arte",
    description: "O Precifica levou mais noites sem dormir do que eu gostaria de admitir. Mas ver você precificando bem? Vale cada olheira! 😅",
    emoji: "🚀",
  },
  {
    icon: Coffee,
    iconColor: "text-amber-600",
    title: "Meu café tá acabando...",
    subtitle: "E o código não se escreve sozinho",
    description: "Cada funcionalidade nova = 3 xícaras de café. A matemática é simples: mais café = mais features. Você pode ser parte dessa equação! ☕",
    emoji: "😴",
  },
  {
    icon: Heart,
    iconColor: "text-rose-500 fill-rose-500",
    title: "Psiu, entre nós...",
    subtitle: "Você já é meu usuário favorito",
    description: "Tá, eu falo isso pra todo mundo. Mas é verdade! Cada pessoa usando o Precifica me faz acreditar que perder aquele domingo programando valeu a pena.",
    emoji: "🤫",
  },
  {
    icon: Sparkles,
    iconColor: "text-purple-500",
    title: "Plot twist:",
    subtitle: "Freelancer criou tool pra freelancers",
    description: "Sim, eu também já cobrei menos do que devia. Por isso criei essa bagaça! Se tá te ajudando a não repetir meus erros, minha missão tá cumprida. 🎯",
    emoji: "✨",
  },
  {
    icon: PartyPopper,
    iconColor: "text-pink-500",
    title: "Obrigado por chegar até aqui!",
    subtitle: "A maioria fecha o popup sem ler",
    description: "Você leu! Isso já mostra que você é diferenciado. Se quiser apoiar, ótimo! Se não, sem stress – continue usando e arrasando nos orçamentos! 💪",
    emoji: "🎉",
  },
];

const donationOptions = [
  {
    icon: Coffee,
    title: "Dois Cafés",
    value: "R$ 10",
    link: "https://pagamentosimples.com.br/PAyMcTMP",
    popular: false,
  },
  {
    icon: Heart,
    title: "Super Apoiador",
    value: "R$ 25",
    link: "https://pagamentosimples.com.br/UmFdkMok",
    popular: true,
  },
  {
    icon: Sparkles,
    title: "Patrocinador",
    value: "R$ 50",
    link: "https://pagamentosimples.com.br/BpVsVqAw",
    popular: false,
  },
];

const DonationFullscreenPopup = () => {
  const { isFullscreenPopupOpen, setIsFullscreenPopupOpen, popupVariationIndex } = useDonation();
  const { triggerConfetti } = useConfetti();

  if (!isFullscreenPopupOpen) return null;

  const currentVariation = variations[popupVariationIndex];
  const Icon = currentVariation.icon;

  const handleClose = () => {
    setIsFullscreenPopupOpen(false);
  };

  const handleDonationClick = (e: React.MouseEvent) => {
    triggerConfetti(e);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
      style={{
        animation: "fullscreen-enter 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes fullscreen-enter {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes content-enter {
          0% { transform: scale(0.9) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-5deg); }
          75% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.5); }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-rose-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div 
        className="relative max-w-2xl w-full text-center"
        style={{ animation: "content-enter 0.6s ease-out 0.2s both" }}
      >
        {/* Icon */}
        <div 
          className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted mb-6"
          style={{ animation: "float-icon 3s ease-in-out infinite" }}
        >
          <Icon className={`w-10 h-10 md:w-12 md:h-12 ${currentVariation.iconColor}`} />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
          {currentVariation.title}
          <span className="ml-3">{currentVariation.emoji}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-medium text-foreground/80 mb-4">
          {currentVariation.subtitle}
        </p>

        {/* Description */}
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {currentVariation.description}
        </p>

        {/* Donation options */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          {donationOptions.map((option, index) => {
            const OptionIcon = option.icon;
            return (
              <a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDonationClick}
                className={`group relative p-4 md:p-6 rounded-2xl border shadow-lg transition-all duration-300 text-center hover:-translate-y-1 hover:shadow-xl ${
                  option.popular 
                    ? 'bg-foreground text-white border-foreground scale-105' 
                    : 'bg-white/90 border-border hover:border-foreground/20'
                }`}
                style={option.popular ? { animation: "pulse-glow 2s ease-in-out infinite" } : undefined}
              >
                {/* Popular badge */}
                {option.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg">
                      <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      Mais popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-xl mb-2 md:mb-3 transition-all duration-300 ${
                  option.popular 
                    ? 'bg-white/20 text-white' 
                    : 'bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-white'
                }`}>
                  <OptionIcon className="w-4 h-4 md:w-6 md:h-6" />
                </div>

                {/* Value */}
                <div className={`text-xl md:text-3xl font-bold mb-1 ${
                  option.popular ? 'text-white' : 'text-foreground'
                }`}>
                  {option.value}
                </div>

                {/* Title */}
                <div className={`text-xs md:text-sm font-medium ${
                  option.popular ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {option.title}
                </div>
              </a>
            );
          })}
        </div>

        {/* See more link */}
        <Link 
          to="/apoie" 
          onClick={handleClose}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          Ver outras formas de apoiar
        </Link>

        {/* Close text */}
        <button
          onClick={handleClose}
          className="block w-full text-center mt-8 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          Talvez depois
        </button>
      </div>
    </div>
  );
};

export default DonationFullscreenPopup;
