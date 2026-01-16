import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";

const CTA = () => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 gradient-orb rounded-full blur-3xl animate-float opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 gradient-orb-alt rounded-full blur-3xl animate-float opacity-25" style={{ animationDelay: "2s" }} />
      
      <div className="container-custom relative z-10">
        <div 
          ref={ref}
          className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 md:p-12 lg:p-20 text-center transition-all duration-700 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 5%), hsl(0 0% 15%), hsl(220 10% 18%), hsl(280 8% 12%), hsl(0 0% 5%))",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 8s ease-in-out infinite"
          }}
        >
          {/* Animated inner orbs */}
          <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          
          {/* Content */}
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
            Pronto Para Cobrar
            <br />
            o Que Você <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent" style={{ backgroundSize: "200% 100%", animation: "gradient-shift 3s ease-in-out infinite" }}>Merece</span>?
          </h2>
          <p className="relative z-10 text-white/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2">
            Descubra o valor real do seu trabalho. Grátis e em menos de 1 minuto.
          </p>

          {/* CTA Button */}
          <Link to="/calcular" className="relative z-10 btn-white text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
            Calcular Meu Valor/Hora
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
