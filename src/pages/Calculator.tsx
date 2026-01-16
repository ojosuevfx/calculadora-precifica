import { useState, useEffect } from "react";
import { Calculator as CalcIcon, FileText } from "lucide-react";
import HourlyRateCalculator from "@/components/calculator/HourlyRateCalculator";
import ProjectCalculator from "@/components/calculator/ProjectCalculator";
import ProposalGenerator from "@/components/calculator/ProposalGenerator";

const Calculator = () => {
  const [transferredRate, setTransferredRate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"calculators" | "proposals">("calculators");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRateCalculated = (rate: number) => {
    setTransferredRate(rate);
  };

  const handleTabChange = (tab: "calculators" | "proposals") => {
    if (tab === activeTab || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Ferramentas de <span className="gradient-text-animated">Precificação</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calcule seu valor e gere propostas comerciais profissionais.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2">
          <div className="inline-flex bg-secondary/50 backdrop-blur-sm p-1 sm:p-1.5 rounded-full border border-border shadow-sm">
            <button
              onClick={() => handleTabChange("calculators")}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === "calculators"
                  ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Calculadoras</span>
            </button>
            <button
              onClick={() => handleTabChange("proposals")}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTab === "proposals"
                  ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Gerador de</span> Propostas
            </button>
          </div>
        </div>

        {/* Content with smooth transitions */}
        <div className="w-full max-w-3xl mx-auto">
          <div
            className={`transition-all duration-300 ease-out ${
              isAnimating
                ? "opacity-0 scale-[0.98] translate-y-2"
                : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            {activeTab === "calculators" ? (
              <div className="space-y-6 sm:space-y-8">
                <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
                  <HourlyRateCalculator onRateCalculated={handleRateCalculated} />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <ProjectCalculator transferredRate={transferredRate} />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <ProposalGenerator />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
          Criado por{" "}
          <a
            href="https://www.instagram.com/ojosueribeiro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium hover:text-primary underline underline-offset-2 transition-colors"
          >
            Josué Ribeiro
          </a>
          {" "}😄🚀
        </div>
      </footer>
    </div>
  );
};

export default Calculator;