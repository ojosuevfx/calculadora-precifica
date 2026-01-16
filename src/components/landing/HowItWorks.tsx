import { Calculator, TrendingUp, FileText } from "lucide-react";
import { useInView } from "../hooks/useInView";

const steps = [
  {
    number: "01",
    icon: Calculator,
    title: "Defina Suas Metas",
    description: "Informe quanto quer ganhar por mês e quantas horas pretende trabalhar",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Descubra Seu Valor/Hora",
    description: "Nossa calculadora calcula o valor ideal para seus serviços",
  },
  {
    number: "03",
    icon: FileText,
    title: "Precifique Seus Projetos",
    description: "Calcule orçamentos para qualquer tipo de projeto com precisão",
  },
];

const HowItWorks = () => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.2 });

  return (
    <section id="como-funciona" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-2">
          <h2 
            ref={ref}
            className={`text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Como Funciona
          </h2>
          <p 
            className={`text-base sm:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Três passos simples para precificar seus serviços com confiança
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`card-elevated p-5 sm:p-6 md:p-8 lg:p-10 text-center transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-foreground rounded-xl sm:rounded-2xl text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">
                {step.number}
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-secondary rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
