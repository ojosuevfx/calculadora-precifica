import { Heart, X, ArrowRight, Coffee, Sparkles, Star } from "lucide-react";
import { useDonation } from "@/contexts/DonationContext";

const messages = [
  {
    icon: Heart,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500 fill-rose-500",
    title: "Curtindo o Precifica? 💜",
    description: "Ajude a manter o projeto no ar com uma pequena doação!",
  },
  {
    icon: Coffee,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Que tal um café? ☕",
    description: "Com apenas R$5 você ajuda a manter tudo funcionando!",
  },
  {
    icon: Sparkles,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
    title: "Você é incrível! ✨",
    description: "Seu apoio faz toda diferença para o projeto continuar.",
  },
  {
    icon: Star,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500 fill-yellow-500",
    title: "Obrigado por usar! ⭐",
    description: "Se o Precifica te ajudou, considere retribuir!",
  },
  {
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    title: "Feito com amor 💕",
    description: "Este projeto é gratuito graças a apoiadores como você!",
  },
];

const DonationToast = () => {
  const { isToastVisible, setIsToastVisible, toastMessageIndex } = useDonation();

  const handleDismiss = () => {
    setIsToastVisible(false);
  };

  const scrollToDonation = () => {
    handleDismiss();
    const element = document.getElementById("apoie");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#apoie";
    }
  };

  if (!isToastVisible) return null;

  const currentMessage = messages[toastMessageIndex];
  const Icon = currentMessage.icon;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 max-w-sm bg-white border border-border rounded-2xl shadow-2xl p-4 animate-toast-enter"
      style={{
        animation: "toast-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <style>{`
        @keyframes toast-bounce {
          0% { transform: translateY(100%) translateX(20px) scale(0.8); opacity: 0; }
          50% { transform: translateY(-10px) translateX(0) scale(1.02); }
          70% { transform: translateY(5px) scale(0.98); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 duration-300"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3 pr-6">
        <div 
          className={`flex-shrink-0 w-11 h-11 rounded-full ${currentMessage.iconBg} flex items-center justify-center`}
          style={{ animation: "icon-pulse 2s ease-in-out infinite" }}
        >
          <Icon className={`w-5 h-5 ${currentMessage.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm mb-1">
            {currentMessage.title}
          </p>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            {currentMessage.description}
          </p>
          <button 
            onClick={scrollToDonation}
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors group"
          >
            Ver opções de apoio
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationToast;