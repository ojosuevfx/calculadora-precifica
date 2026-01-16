import { Heart, Coffee, Sparkles, Rocket, Gift, PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDonation } from "@/contexts/DonationContext";

const variations = [
  {
    icon: Heart,
    iconColor: "text-rose-500 fill-rose-500",
    title: "Gostando do Precifica?",
    subtitle: "Seu apoio faz toda diferença!",
    description: "Este projeto é 100% gratuito e mantido com muito carinho. Se ele te ajudou a precificar melhor seus serviços, considere fazer uma pequena doação para mantê-lo no ar!",
    emoji: "💜",
  },
  {
    icon: Coffee,
    iconColor: "text-amber-600",
    title: "Que tal me pagar um café?",
    subtitle: "Energia para continuar desenvolvendo!",
    description: "Cada café que você me paga se transforma em novas funcionalidades e melhorias. Com R$5 você já faz a diferença!",
    emoji: "☕",
  },
  {
    icon: Rocket,
    iconColor: "text-blue-500",
    title: "Ajude o Precifica a crescer!",
    subtitle: "Juntos vamos mais longe!",
    description: "Com seu apoio, posso dedicar mais tempo para criar novas ferramentas e melhorar as existentes. Vamos juntos?",
    emoji: "🚀",
  },
  {
    icon: Gift,
    iconColor: "text-purple-500",
    title: "Seu apoio é um presente!",
    subtitle: "Gratidão por usar o Precifica!",
    description: "Se essa ferramenta te economizou tempo e te ajudou a cobrar melhor, que tal retribuir com uma pequena doação?",
    emoji: "🎁",
  },
  {
    icon: PartyPopper,
    iconColor: "text-pink-500",
    title: "Você é especial!",
    subtitle: "Obrigado por estar aqui!",
    description: "Cada pessoa que usa o Precifica me motiva a continuar. Se puder, apoie o projeto para que ele continue gratuito para todos!",
    emoji: "🎉",
  },
];

const DonationPopup = () => {
  const { isPopupOpen, setIsPopupOpen, popupVariationIndex } = useDonation();

  const scrollToDonation = () => {
    setIsPopupOpen(false);
    const element = document.getElementById("apoie");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#apoie";
    }
  };

  const currentVariation = variations[popupVariationIndex];
  const Icon = currentVariation.icon;

  return (
    <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
      <DialogContent 
        className="sm:max-w-md border-border bg-white/98 backdrop-blur-md overflow-hidden"
        style={{
          animation: isPopupOpen ? "popup-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : undefined,
        }}
      >
        <style>{`
          @keyframes popup-enter {
            0% { transform: scale(0.9) translateY(20px); opacity: 0; }
            50% { transform: scale(1.02) translateY(-5px); }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes float-icon {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(-5deg); }
            75% { transform: translateY(-5px) rotate(5deg); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        
        {/* Animated background decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div 
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              style={{ animation: "float-icon 3s ease-in-out infinite" }}
            >
              <Icon className={`w-5 h-5 ${currentVariation.iconColor}`} />
            </div>
            <div>
              <span>{currentVariation.title}</span>
              <span className="ml-2">{currentVariation.emoji}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 relative">
          <p className="text-sm font-medium text-foreground/80">
            {currentVariation.subtitle}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {currentVariation.description}
          </p>
          
          <div className="relative flex items-center gap-3 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl overflow-hidden">
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ animation: "shimmer 3s infinite" }}
            />
            
            <div className="relative flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shadow-lg">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-foreground/80 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-foreground/60 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="relative text-sm">
              <div className="font-semibold text-foreground">A partir de R$ 5</div>
              <div className="text-muted-foreground">Qualquer valor ajuda!</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={scrollToDonation}
              className="flex-1 btn-primary py-3 text-sm group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Quero Apoiar
              </span>
            </button>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-full"
            >
              Agora não
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationPopup;