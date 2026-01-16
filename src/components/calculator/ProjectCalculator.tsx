import { useState, useEffect, useRef } from "react";
import { FileText, Copy, Check, Plus, X, Percent, TrendingUp, ChevronDown, Settings2, Download, User, FileEdit } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import jsPDF from "jspdf";
import { useDonation } from "@/contexts/DonationContext";

interface ExtraCost {
  id: string;
  name: string;
  value: string;
}
interface ProjectCalculatorProps {
  transferredRate: number | null;
}
const ProjectCalculator = ({
  transferredRate
}: ProjectCalculatorProps) => {
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [projectDays, setProjectDays] = useState<string>("");
  const [extraCosts, setExtraCosts] = useState<ExtraCost[]>([]);
  const [profitMargin, setProfitMargin] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectCost, setProjectCost] = useState<number>(0);
  const [baseCost, setBaseCost] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalExtras, setTotalExtras] = useState<number>(0);
  const [profitValue, setProfitValue] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [isClientInfoOpen, setIsClientInfoOpen] = useState(false);
  const [hasShownDonation, setHasShownDonation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showPopup } = useDonation();

  useEffect(() => {
    if (transferredRate !== null && transferredRate > 0) {
      setHourlyRate(transferredRate.toFixed(2).replace('.', ','));
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);
    }
  }, [transferredRate]);
  useEffect(() => {
    calculateProject();
  }, [hourlyRate, hoursPerDay, projectDays, extraCosts, profitMargin, discount]);

  // Show donation popup when project cost is calculated
  useEffect(() => {
    if (projectCost > 0 && !hasShownDonation) {
      const timer = setTimeout(() => {
        showPopup();
        setHasShownDonation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [projectCost, hasShownDonation, showPopup]);

  // Parse Brazilian number format (10.000,00 or 10000 or 10000.00)
  const parseNumber = (value: string): number => {
    if (!value) return 0;
    // Remove dots (thousand separators) and replace comma with dot (decimal separator)
    const normalized = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(normalized) || 0;
  };
  const calculateProject = () => {
    const rate = parseNumber(hourlyRate);
    const hours = parseNumber(hoursPerDay);
    const days = parseNumber(projectDays);
    const margin = parseNumber(profitMargin);
    const disc = parseNumber(discount);

    // Calculate total extra costs
    const extrasTotal = extraCosts.reduce((sum, cost) => sum + parseNumber(cost.value), 0);
    setTotalExtras(extrasTotal);
    if (rate > 0 && hours > 0 && days > 0) {
      const total = hours * days;
      const base = total * rate + extrasTotal;
      setTotalHours(total);
      setBaseCost(base);

      // Apply profit margin
      const profit = base * (margin / 100);
      setProfitValue(profit);
      const withProfit = base + profit;

      // Apply discount
      const discountAmount = withProfit * (disc / 100);
      setDiscountValue(discountAmount);
      const finalCost = withProfit - discountAmount;
      setProjectCost(finalCost);
    } else {
      setTotalHours(0);
      setBaseCost(extrasTotal);
      setProfitValue(0);
      setDiscountValue(0);
      setProjectCost(extrasTotal);
    }
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(formatCurrency(projectCost));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleReset = () => {
    setHoursPerDay("");
    setProjectDays("");
    setExtraCosts([]);
    setProfitMargin("");
    setDiscount("");
    setClientName("");
    setProjectDescription("");
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Header
    doc.setFillColor(139, 92, 246); // Purple
    doc.rect(0, 0, pageWidth, 45, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("ORÇAMENTO", margin, 28);

    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    doc.text(`Data: ${today}`, pageWidth - margin - 50, 28);

    // Client name in header if provided
    if (clientName.trim()) {
      doc.setFontSize(12);
      doc.text(`Para: ${clientName}`, margin, 38);
    }
    y = 60;

    // Project Description if provided
    if (projectDescription.trim()) {
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Descrição do Projeto", margin, y);
      y += 8;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);

      // Split long text into multiple lines
      const splitDescription = doc.splitTextToSize(projectDescription, pageWidth - margin * 2);
      doc.text(splitDescription, margin, y);
      y += splitDescription.length * 6 + 10;

      // Separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 15;
    }

    // Project Details Section
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detalhes do Projeto", margin, y);
    y += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const details = [{
      label: "Valor da Hora",
      value: formatCurrency(parseNumber(hourlyRate))
    }, {
      label: "Horas por Dia",
      value: `${hoursPerDay || "0"} horas`
    }, {
      label: "Duração do Projeto",
      value: `${projectDays || "0"} dias`
    }, {
      label: "Total de Horas",
      value: `${totalHours} horas`
    }];
    details.forEach(item => {
      doc.text(item.label + ":", margin, y);
      doc.text(item.value, pageWidth - margin - 50, y);
      y += 8;
    });
    y += 5;

    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    // Costs Breakdown
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text("Composição do Valor", margin, y);
    y += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    // Base cost
    doc.setTextColor(80, 80, 80);
    doc.text("Custo Base (Horas × Valor/Hora):", margin, y);
    doc.text(formatCurrency(totalHours * parseNumber(hourlyRate)), pageWidth - margin - 50, y);
    y += 8;

    // Extra costs
    if (extraCosts.length > 0) {
      doc.text("Custos Extras:", margin, y);
      y += 6;
      extraCosts.forEach(cost => {
        if (cost.name && parseNumber(cost.value) > 0) {
          doc.text(`  • ${cost.name}`, margin + 5, y);
          doc.text(formatCurrency(parseNumber(cost.value)), pageWidth - margin - 50, y);
          y += 6;
        }
      });
      y += 2;
    }

    // Profit margin
    if (profitValue > 0) {
      doc.setTextColor(34, 197, 94); // Green
      doc.text(`Margem de Lucro (${profitMargin}%):`, margin, y);
      doc.text(`+ ${formatCurrency(profitValue)}`, pageWidth - margin - 50, y);
      y += 8;
    }

    // Discount
    if (discountValue > 0) {
      doc.setTextColor(234, 179, 8); // Yellow
      doc.text(`Desconto (${discount}%):`, margin, y);
      doc.text(`- ${formatCurrency(discountValue)}`, pageWidth - margin - 50, y);
      y += 8;
    }
    y += 5;

    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    // Final Value Box
    doc.setFillColor(245, 245, 255);
    doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 30, 3, 3, "F");
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(139, 92, 246);
    doc.text("VALOR FINAL:", margin + 10, y + 12);
    doc.setFontSize(18);
    doc.text(formatCurrency(projectCost), pageWidth - margin - 10, y + 12, {
      align: "right"
    });
    y += 40;

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("Orçamento gerado por Precifica - precifica.app", margin, y);
    doc.text("Este orçamento é válido por 15 dias", margin, y + 5);

    // Save PDF
    doc.save(`orcamento-${new Date().toISOString().split("T")[0]}.pdf`);
  };
  const addExtraCost = () => {
    setExtraCosts([...extraCosts, {
      id: crypto.randomUUID(),
      name: "",
      value: ""
    }]);
  };
  const updateExtraCost = (id: string, field: "name" | "value", newValue: string) => {
    setExtraCosts(extraCosts.map(cost => cost.id === id ? {
      ...cost,
      [field]: newValue
    } : cost));
  };
  const removeExtraCost = (id: string) => {
    setExtraCosts(extraCosts.filter(cost => cost.id !== id));
  };

  // Check if any extras are active
  const hasActiveExtras = extraCosts.length > 0 || parseNumber(profitMargin) > 0 || parseNumber(discount) > 0;
  const hasClientInfo = clientName.trim() !== "" || projectDescription.trim() !== "";
  return <div id="project-calculator" className="card-elevated p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-secondary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Calculadora de Projeto
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Calcule o custo total de um projeto específico
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Hourly Rate */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Quanto você ganha por hora? *
          </label>
          <div className="relative">
            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              R$
            </span>
            <input ref={inputRef} type="text" inputMode="decimal" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="80,00" className={`input-field pl-10 sm:pl-12 text-sm sm:text-base py-3 sm:py-4 transition-all duration-500 ${isHighlighted ? "ring-4 ring-primary/30 border-primary" : ""}`} />
          </div>
        </div>

        {/* Hours per Day */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Horas por dia no projeto? *
          </label>
          <div className="relative">
            <input type="number" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} placeholder="6" className="input-field pr-14 sm:pr-16 text-sm sm:text-base py-3 sm:py-4" min="0.5" step="0.5" />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              horas
            </span>
          </div>
        </div>

        {/* Project Duration */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Duração do projeto? *
          </label>
          <div className="relative">
            <input type="number" value={projectDays} onChange={e => setProjectDays(e.target.value)} placeholder="5" className="input-field pr-12 sm:pr-14 text-sm sm:text-base py-3 sm:py-4" min="0.5" step="0.5" />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              dias
            </span>
          </div>
        </div>
      </div>

      {/* Client Info Collapsible */}
      <Collapsible open={isClientInfoOpen} onOpenChange={setIsClientInfoOpen} className="mb-6 sm:mb-8">
        

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
            {/* Client Name */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                Nome do Cliente
              </label>
              <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Ex: João Silva, Empresa ABC..." className="input-field text-sm sm:text-base py-3 sm:py-4" />
            </div>

            {/* Project Description */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                <FileEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                Descrição do Projeto
              </label>
              <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)} placeholder="Descreva brevemente o projeto, serviços incluídos, entregas previstas..." className="input-field text-sm sm:text-base py-3 sm:py-4 min-h-[100px] resize-none" rows={3} />
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Esta descrição será incluída no PDF do orçamento
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Extra Options Collapsible */}
      <Collapsible open={isExtrasOpen} onOpenChange={setIsExtrasOpen} className="mb-6 sm:mb-8">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 bg-secondary/50 hover:bg-secondary/70 rounded-xl sm:rounded-2xl border border-border transition-all duration-300 group">
          <div className="flex items-center gap-2 sm:gap-3">
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <span className="text-sm sm:text-base font-medium text-foreground">
              Opções Extras
            </span>
            {hasActiveExtras && <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                Ativo
              </span>}
          </div>
          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 ${isExtrasOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <div className="pt-4 sm:pt-6 space-y-6 sm:space-y-8">
            {/* Extra Costs Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                <label className="text-xs sm:text-sm font-medium text-foreground">
                  Custos Extras (deslocamento, passagens, equipamentos, etc.)
                </label>
                <button onClick={addExtraCost} className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md w-full sm:w-auto">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Adicionar Custo
                </button>
              </div>

              {extraCosts.length > 0 && <div className="space-y-3">
                  {extraCosts.map(cost => <div key={cost.id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
                      <input type="text" value={cost.name} onChange={e => updateExtraCost(cost.id, "name", e.target.value)} placeholder="Ex: Deslocamento, Hospedagem..." className="input-field flex-1 text-sm sm:text-base py-3 sm:py-4" />
                      <div className="flex gap-2 sm:gap-3 items-center">
                        <div className="relative flex-1 sm:w-36 md:w-40">
                          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            R$
                          </span>
                          <input type="text" inputMode="decimal" value={cost.value} onChange={e => updateExtraCost(cost.id, "value", e.target.value)} placeholder="0,00" className="input-field pl-10 sm:pl-12 text-sm sm:text-base py-3 sm:py-4" />
                        </div>
                        <button onClick={() => removeExtraCost(cost.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>)}
                </div>}

              {extraCosts.length === 0 && <p className="text-xs sm:text-sm text-muted-foreground">
                  Nenhum custo extra adicionado. Clique em "Adicionar Custo" para incluir despesas.
                </p>}
            </div>

            {/* Margin and Discount Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Profit Margin */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success" />
                  Margem de Lucro (%)
                </label>
                <div className="relative">
                  <input type="number" value={profitMargin} onChange={e => setProfitMargin(e.target.value)} placeholder="10" className="input-field pr-10 sm:pr-12 text-sm sm:text-base py-3 sm:py-4" min="0" max="100" step="1" />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    %
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Adicione uma margem de lucro sobre o custo base
                </p>
              </div>

              {/* Discount */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                  <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  Desconto (%)
                </label>
                <div className="relative">
                  <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="5" className="input-field pr-10 sm:pr-12 text-sm sm:text-base py-3 sm:py-4" min="0" max="100" step="1" />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    %
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Aplique um desconto promocional ou fidelidade
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Result Card */}
      <div className={`result-card-secondary p-5 sm:p-6 md:p-8 transition-all duration-500 ${projectCost > 0 ? "animate-pulse-soft" : ""}`}>
        <div className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1.5 sm:mb-2">
          Valor Final do Projeto
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
          {formatCurrency(projectCost)}
        </div>
        {(totalHours > 0 || totalExtras > 0 || profitValue > 0 || discountValue > 0) && <div className="text-white/70 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
            {totalHours > 0 && <div>
                {totalHours} horas × {formatCurrency(parseNumber(hourlyRate))}/hora = {formatCurrency(totalHours * parseNumber(hourlyRate))}
              </div>}
            {totalExtras > 0 && <div>
                + Custos extras: {formatCurrency(totalExtras)}
              </div>}
            {profitValue > 0 && <div className="text-green-300">
                + Margem de lucro ({profitMargin}%): {formatCurrency(profitValue)}
              </div>}
            {discountValue > 0 && <div className="text-yellow-300">
                - Desconto ({discount}%): {formatCurrency(discountValue)}
              </div>}
          </div>}

        {/* Action Buttons */}
        {projectCost > 0 && <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button onClick={handleExportPDF} className="inline-flex items-center justify-center gap-2 bg-white text-primary font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base hover:bg-white/90 shadow-lg">
              <Download className="w-4 h-4" />
              Exportar 
            </button>
            <button onClick={handleCopy} className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base">
              {copied ? <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </> : <>
                  <Copy className="w-4 h-4" />
                  Copiar Valor
                </>}
            </button>
            <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base">
              Novo Cálculo
            </button>
          </div>}
      </div>
    </div>;
};
export default ProjectCalculator;