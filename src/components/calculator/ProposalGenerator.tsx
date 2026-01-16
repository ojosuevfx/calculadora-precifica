import { useState } from "react";
import { FileText, User, Briefcase, Clock, Calendar, FileEdit, Building2, Download, ChevronDown, Hash, CreditCard, Shield, RefreshCw, Check, Plus, X, Sparkles } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import jsPDF from "jspdf";
import { useDonation } from "@/contexts/DonationContext";

interface ProposalData {
  providerName: string;
  clientName: string;
  serviceType: string;
  estimatedHours: string;
  hourlyRate: string;
  deadline: string;
  notes: string;
  revisions: string;
  paymentMethods: string[];
  paymentCondition: string;
  proposalValidity: string;
  usageRights: string;
}

const PAYMENT_OPTIONS = [
  { id: "pix", label: "PIX" },
  { id: "cartao", label: "Cartão de Crédito" },
  { id: "boleto", label: "Boleto Bancário" },
  { id: "transferencia", label: "Transferência Bancária" },
  { id: "permuta", label: "Permuta" },
  { id: "parcelado", label: "Parcelado" },
] as const;

const DEFAULT_BENEFITS = [
  "Qualidade profissional que fortalece a imagem da marca",
  "Entrega dentro do prazo acordado",
  "Comunicação clara durante todo o processo",
  "Material pronto para uso imediato",
  "Suporte durante o período de projeto",
];

const ProposalGenerator = () => {
  const [formData, setFormData] = useState<ProposalData>({
    providerName: "",
    clientName: "",
    serviceType: "",
    estimatedHours: "",
    hourlyRate: "",
    deadline: "",
    notes: "",
    revisions: "2",
    paymentMethods: ["pix"],
    paymentCondition: "50% na aprovação, 50% na entrega",
    proposalValidity: "15 dias",
    usageRights: "Uso exclusivo para o projeto contratado",
  });

  const [benefits, setBenefits] = useState<string[]>([...DEFAULT_BENEFITS]);
  const [newBenefit, setNewBenefit] = useState("");
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits((prev) => [...prev, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const togglePaymentMethod = (methodId: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(methodId)
        ? prev.paymentMethods.filter((m) => m !== methodId)
        : [...prev.paymentMethods, methodId],
    }));
  };

  const getPaymentMethodsLabel = () => {
    if (formData.paymentMethods.length === 0) return "Nenhum selecionado";
    return formData.paymentMethods
      .map((id) => PAYMENT_OPTIONS.find((opt) => opt.id === id)?.label)
      .filter(Boolean)
      .join(", ");
  };

  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const updateField = (field: keyof ProposalData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    const normalized = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(normalized) || 0;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateTotal = () => {
    const hours = parseNumber(formData.estimatedHours);
    const rate = parseNumber(formData.hourlyRate);
    return hours * rate;
  };

  const generateProposalNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${year}${month}-${random}`;
  };

  const generateProjectDescription = () => {
    const service = formData.serviceType.toLowerCase();
    return `Este projeto tem como objetivo desenvolver ${service} de alta qualidade, garantindo excelência técnica, impacto visual e resultados alinhados às expectativas do cliente. Todo o processo será conduzido com profissionalismo e atenção aos detalhes.`;
  };

  const generateScope = () => {
    const baseScope = [
      `Desenvolvimento completo do ${formData.serviceType.toLowerCase() || "projeto"}`,
      "Planejamento e conceituação inicial",
      "Execução técnica profissional",
      "Entrega em formatos adequados para uso",
    ];
    
    if (parseNumber(formData.revisions) > 0) {
      baseScope.push(`Até ${formData.revisions} rodadas de revisão incluídas`);
    }
    
    return baseScope;
  };

  const { showPopup } = useDonation();

  const handleExportPDF = () => {
    // Show donation popup after generating PDF
    setTimeout(() => {
      showPopup();
    }, 1500);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    const proposalNumber = generateProposalNumber();
    const total = calculateTotal();
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // ===== HEADER (Compacto) =====
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, 35, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PROPOSTA COMERCIAL", margin, 22);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Nº ${proposalNumber} | ${today}`, pageWidth - margin, 22, { align: "right" });

    y = 45;

    // ===== CLIENT & PROVIDER INFO (Compacto) =====
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y - 5, contentWidth, 20, 2, 2, "F");
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text("PRESTADOR", margin + 4, y + 2);
    doc.text("CLIENTE", pageWidth / 2 + 4, y + 2);
    
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(formData.providerName || "Seu Nome/Empresa", margin + 4, y + 10);
    doc.text(formData.clientName || "Nome do Cliente", pageWidth / 2 + 4, y + 10);

    y += 25;

    // ===== LAYOUT EM DUAS COLUNAS =====
    const colWidth = (contentWidth - 8) / 2;
    const leftCol = margin;
    const rightCol = margin + colWidth + 8;
    let leftY = y;
    let rightY = y;

    // === COLUNA ESQUERDA ===
    
    // VISÃO GERAL
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("VISÃO GERAL", leftCol, leftY);
    leftY += 6;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const description = generateProjectDescription();
    const splitDesc = doc.splitTextToSize(description, colWidth);
    doc.text(splitDesc, leftCol, leftY);
    leftY += splitDesc.length * 4 + 6;

    // ESCOPO
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("ESCOPO DO SERVIÇO", leftCol, leftY);
    leftY += 6;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    
    const scope = generateScope();
    scope.forEach((item) => {
      doc.setFillColor(0, 0, 0);
      doc.circle(leftCol + 2, leftY - 1, 1, "F");
      const splitItem = doc.splitTextToSize(item, colWidth - 8);
      doc.text(splitItem, leftCol + 6, leftY);
      leftY += splitItem.length * 4 + 2;
    });

    leftY += 4;

    // BENEFÍCIOS
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("BENEFÍCIOS", leftCol, leftY);
    leftY += 6;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    
    benefits.forEach((item) => {
      doc.setTextColor(34, 140, 80);
      doc.text("✓", leftCol + 1, leftY);
      doc.setTextColor(60, 60, 60);
      const splitBenefit = doc.splitTextToSize(item, colWidth - 8);
      doc.text(splitBenefit, leftCol + 6, leftY);
      leftY += splitBenefit.length * 4 + 2;
    });

    // === COLUNA DIREITA ===

    // INVESTIMENTO (DESTAQUE)
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(rightCol, rightY - 3, colWidth, 28, 3, 3, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("INVESTIMENTO TOTAL", rightCol + 6, rightY + 6);
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(total), rightCol + 6, rightY + 18);

    rightY += 35;

    // CONDIÇÕES COMERCIAIS
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("CONDIÇÕES", rightCol, rightY);
    rightY += 6;

    doc.setFontSize(8);

    const paymentMethodsText = getPaymentMethodsLabel();
    const conditions = [
      { label: "Prazo", value: formData.deadline || "A combinar" },
      { label: "Revisões", value: `${formData.revisions || "2"} rodadas` },
      { label: "Pagamento", value: paymentMethodsText },
      { label: "Condições", value: formData.paymentCondition },
      { label: "Validade", value: formData.proposalValidity },
      { label: "Direitos", value: formData.usageRights },
    ];

    conditions.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(`${item.label}:`, rightCol, rightY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const valueLines = doc.splitTextToSize(item.value, colWidth - 30);
      doc.text(valueLines, rightCol + 28, rightY);
      rightY += valueLines.length * 4 + 3;
    });

    // ===== FOOTER (na parte inferior da página) =====
    const pageHeight = doc.internal.pageSize.getHeight();
    const footerY = pageHeight - 20;

    // Observações (se houver, coloca abaixo das colunas)
    const maxY = Math.max(leftY, rightY);
    let notesY = maxY + 8;
    
    if (formData.notes.trim()) {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("OBSERVAÇÕES:", margin, notesY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const splitNotes = doc.splitTextToSize(formData.notes, contentWidth);
      doc.text(splitNotes, margin + 32, notesY);
    }

    // Linha separadora e encerramento
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Estamos à disposição para iniciar o projeto assim que esta proposta for aprovada.", margin, footerY);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const siteUrl = "https://oprecifica.vercel.app";
    doc.textWithLink(siteUrl, pageWidth - margin - doc.getTextWidth(siteUrl), footerY, { url: siteUrl });

    // Save
    const fileName = formData.clientName 
      ? `proposta-${formData.clientName.toLowerCase().replace(/\s+/g, "-")}-${proposalNumber}.pdf`
      : `proposta-${proposalNumber}.pdf`;
    doc.save(fileName);
  };

  const total = calculateTotal();
  const canGenerate = formData.clientName && formData.serviceType && total > 0;

  return (
    <div className="card-elevated p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Gerador de Propostas
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Crie propostas comerciais profissionais que vendem valor
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="space-y-6 sm:space-y-8">
        {/* Provider & Client */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              Seu Nome / Empresa *
            </label>
            <input
              type="text"
              value={formData.providerName}
              onChange={(e) => updateField("providerName", e.target.value)}
              placeholder="Ex: Studio Criativo, João Silva..."
              className="input-field text-sm sm:text-base py-3 sm:py-4"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              Nome do Cliente *
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              placeholder="Ex: Empresa ABC, Maria Santos..."
              className="input-field text-sm sm:text-base py-3 sm:py-4"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            Tipo de Serviço *
          </label>
          <input
            type="text"
            value={formData.serviceType}
            onChange={(e) => updateField("serviceType", e.target.value)}
            placeholder="Ex: Animação para evento, Edição de vídeo institucional..."
            className="input-field text-sm sm:text-base py-3 sm:py-4"
          />
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            Descreva o serviço de forma clara e profissional
          </p>
        </div>

        {/* Hours, Rate & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              Horas Estimadas *
            </label>
            <input
              type="number"
              value={formData.estimatedHours}
              onChange={(e) => updateField("estimatedHours", e.target.value)}
              placeholder="20"
              className="input-field text-sm sm:text-base py-3 sm:py-4"
              min="1"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
              <span className="text-muted-foreground text-xs">R$</span>
              Valor da Hora *
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                R$
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={formData.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value)}
                placeholder="150,00"
                className="input-field pl-10 sm:pl-12 text-sm sm:text-base py-3 sm:py-4"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              Prazo de Entrega
            </label>
            <input
              type="text"
              value={formData.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              placeholder="Ex: 10 dias úteis"
              className="input-field text-sm sm:text-base py-3 sm:py-4"
            />
          </div>
        </div>

        {/* Benefits Collapsible */}
        <Collapsible
          open={isBenefitsOpen}
          onOpenChange={setIsBenefitsOpen}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 bg-secondary/50 hover:bg-secondary/70 rounded-xl sm:rounded-2xl border border-border transition-all duration-300">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <span className="text-sm sm:text-base font-medium text-foreground">
                Benefícios para o Cliente ({benefits.length})
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 ${isBenefitsOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
              {/* Current Benefits List */}
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-secondary/30 rounded-xl border border-border group"
                  >
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground flex-1">{benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Benefit */}
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addBenefit()}
                  placeholder="Adicionar novo benefício..."
                  className="input-field text-sm py-2.5 sm:py-3 flex-1"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  disabled={!newBenefit.trim()}
                  className={`px-3 sm:px-4 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    newBenefit.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Pressione Enter ou clique no + para adicionar. Passe o mouse sobre um benefício para removê-lo.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Notes */}
        <div>
          <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            <FileEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            Observações
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Informações adicionais que devem constar na proposta..."
            className="input-field text-sm sm:text-base py-3 sm:py-4 min-h-[80px] resize-none"
            rows={2}
          />
        </div>

        {/* Commercial Conditions Collapsible */}
        <Collapsible
          open={isConditionsOpen}
          onOpenChange={setIsConditionsOpen}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 bg-secondary/50 hover:bg-secondary/70 rounded-xl sm:rounded-2xl border border-border transition-all duration-300">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <span className="text-sm sm:text-base font-medium text-foreground">
                Condições Comerciais
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 ${isConditionsOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    Revisões Incluídas
                  </label>
                  <input
                    type="number"
                    value={formData.revisions}
                    onChange={(e) => updateField("revisions", e.target.value)}
                    placeholder="2"
                    className="input-field text-sm sm:text-base py-3 sm:py-4"
                    min="0"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    Validade da Proposta
                  </label>
                  <input
                    type="text"
                    value={formData.proposalValidity}
                    onChange={(e) => updateField("proposalValidity", e.target.value)}
                    placeholder="15 dias"
                    className="input-field text-sm sm:text-base py-3 sm:py-4"
                  />
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  Meios de Pagamento Aceitos
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {PAYMENT_OPTIONS.map((option) => {
                    const isSelected = formData.paymentMethods.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => togglePaymentMethod(option.id)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary/50 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Condition */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                  <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  Condições de Pagamento
                </label>
                <input
                  type="text"
                  value={formData.paymentCondition}
                  onChange={(e) => updateField("paymentCondition", e.target.value)}
                  placeholder="50% na aprovação, 50% na entrega"
                  className="input-field text-sm sm:text-base py-3 sm:py-4"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  Direitos de Uso
                </label>
                <input
                  type="text"
                  value={formData.usageRights}
                  onChange={(e) => updateField("usageRights", e.target.value)}
                  placeholder="Uso exclusivo para o projeto contratado"
                  className="input-field text-sm sm:text-base py-3 sm:py-4"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Preview Card */}
        <div className={`result-card-primary p-5 sm:p-6 md:p-8 transition-all duration-500 ${total > 0 ? "animate-pulse-soft" : ""}`}>
          <div className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1.5 sm:mb-2">
            Investimento Total no Projeto
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {formatCurrency(total)}
          </div>
          
          {total > 0 && (
            <div className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="opacity-70">Referência técnica: </span>
              {formData.estimatedHours} horas × {formatCurrency(parseNumber(formData.hourlyRate))}/hora
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleExportPDF}
            disabled={!canGenerate}
            className={`inline-flex items-center justify-center gap-2 font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 text-sm sm:text-base w-full sm:w-auto ${
              canGenerate
                ? "bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl"
                : "bg-white/20 text-white/50 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Gerar Proposta Comercial
          </button>

          {!canGenerate && (
            <p className="text-white/50 text-xs mt-3">
              Preencha os campos obrigatórios (*) para gerar a proposta
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
          <h4 className="font-semibold text-foreground text-sm sm:text-base mb-2 sm:mb-3">
            💡 Dicas para uma proposta de alto impacto
          </h4>
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 sm:space-y-2">
            <li>• Use o nome do serviço de forma clara e profissional</li>
            <li>• O foco deve ser no valor entregue, não nas horas trabalhadas</li>
            <li>• Defina revisões para evitar trabalho extra não remunerado</li>
            <li>• Prazos claros aumentam a confiança do cliente</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;
