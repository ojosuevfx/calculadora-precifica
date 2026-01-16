import { useState, useEffect } from "react";
import { Calculator, ArrowDown } from "lucide-react";
import { useDonation } from "@/contexts/DonationContext";

interface HourlyRateCalculatorProps {
  onRateCalculated: (rate: number) => void;
}

const HourlyRateCalculator = ({ onRateCalculated }: HourlyRateCalculatorProps) => {
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("");
  const [vacationDays, setVacationDays] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(0);
  const [hasShownDonation, setHasShownDonation] = useState(false);
  const { showToast } = useDonation();

  useEffect(() => {
    calculateRate();
  }, [monthlyGoal, hoursPerDay, daysPerWeek, vacationDays]);

  // Auto-transfer rate to project calculator whenever it changes
  useEffect(() => {
    if (hourlyRate > 0) {
      onRateCalculated(hourlyRate);
      
      // Show donation toast when rate is calculated for the first time
      if (!hasShownDonation) {
        setTimeout(() => {
          showToast();
          setHasShownDonation(true);
        }, 1500);
      }
    }
  }, [hourlyRate, onRateCalculated, hasShownDonation, showToast]);

  // Parse Brazilian number format (10.000,00 or 10000 or 10000.00)
  const parseNumber = (value: string): number => {
    if (!value) return 0;
    // Remove dots (thousand separators) and replace comma with dot (decimal separator)
    const normalized = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(normalized) || 0;
  };

  const calculateRate = () => {
    const monthly = parseNumber(monthlyGoal);
    const hours = parseNumber(hoursPerDay);
    const days = parseNumber(daysPerWeek);
    const vacation = parseNumber(vacationDays);

    if (monthly > 0 && hours > 0 && days > 0) {
      // Formula: (monthlyGoal ÷ ((daysPerWeek × 4 × hoursPerDay) − vacationDays)) + (daysPerWeek × hoursPerDay)
      const monthlyHours = days * 4 * hours;
      const adjustedHours = monthlyHours - vacation;
      
      if (adjustedHours <= 0) {
        setHourlyRate(0);
        setHoursPerMonth(0);
        return;
      }
      
      const rate = (monthly / adjustedHours) + (days * hours);
      
      setHourlyRate(rate);
      setHoursPerMonth(monthlyHours);
    } else {
      setHourlyRate(0);
      setHoursPerMonth(0);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleTransfer = () => {
    if (hourlyRate > 0) {
      onRateCalculated(hourlyRate);
      // Scroll to project calculator
      const element = document.getElementById("project-calculator");
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="card-elevated p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Calculadora de Valor/Hora
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Descubra quanto você deve cobrar por hora
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Monthly Goal */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Quanto você quer ganhar por mês? *
          </label>
          <div className="relative">
            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              R$
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={monthlyGoal}
              onChange={(e) => setMonthlyGoal(e.target.value)}
              placeholder="5.000,00"
              className="input-field pl-10 sm:pl-12 text-sm sm:text-base py-3 sm:py-4"
            />
          </div>
        </div>

        {/* Hours per Day */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Quantas horas quer trabalhar por dia? *
          </label>
          <div className="relative">
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              placeholder="8"
              className="input-field pr-14 sm:pr-16 text-sm sm:text-base py-3 sm:py-4"
              min="1"
              max="24"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              horas
            </span>
          </div>
        </div>

        {/* Days per Week */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Quantos dias por semana vai trabalhar? *
          </label>
          <div className="relative">
            <input
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              placeholder="5"
              className="input-field pr-12 sm:pr-14 text-sm sm:text-base py-3 sm:py-4"
              min="1"
              max="7"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              dias
            </span>
          </div>
        </div>

        {/* Vacation Days */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
            Quantos dias de férias por ano?
          </label>
          <div className="relative">
            <input
              type="number"
              value={vacationDays}
              onChange={(e) => setVacationDays(e.target.value)}
              placeholder="0"
              className="input-field pr-12 sm:pr-14 text-sm sm:text-base py-3 sm:py-4"
              min="0"
              max="365"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              dias
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
            Deixe em branco se não planeja tirar férias
          </p>
        </div>
      </div>

      {/* Result Card */}
      <div className={`result-card p-5 sm:p-6 md:p-8 transition-all duration-500 ${hourlyRate > 0 ? "animate-pulse-soft" : ""}`}>
        <div className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1.5 sm:mb-2">
          Seu Valor/Hora É
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
          {formatCurrency(hourlyRate)}
        </div>
        {hoursPerMonth > 0 && (
          <div className="text-white/70 text-xs sm:text-sm">
            Baseado em {Math.round(hoursPerMonth)} horas/mês
          </div>
        )}

        {/* Transfer Button */}
        {hourlyRate > 0 && (
          <button
            onClick={handleTransfer}
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            Usar na Calculadora de Projetos
            <ArrowDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HourlyRateCalculator;
