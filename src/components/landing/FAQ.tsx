import { useInView } from "../hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como calcular meu valor por hora?",
    answer: "Para calcular seu valor por hora, você precisa considerar: seus custos fixos mensais (aluguel, internet, softwares), a renda desejada, impostos, e quantas horas produtivas você consegue trabalhar por mês. Nossa calculadora faz todo esse cálculo automaticamente para você.",
  },
  {
    question: "Quanto tempo de trabalho devo considerar por projeto?",
    answer: "Além do tempo de execução, considere: reuniões com o cliente, pesquisa, revisões, ajustes e comunicação. Uma boa prática é adicionar 20-30% ao tempo estimado para cobrir imprevistos e garantir qualidade.",
  },
  {
    question: "Devo cobrar separado por custos extras?",
    answer: "Sim! Seu valor/hora remunera seu tempo e habilidade. Custos extras como softwares específicos, deslocamentos, materiais ou terceirizações devem ser incluídos separadamente no orçamento.",
  },
  {
    question: "Como precificar revisões e alterações?",
    answer: "Defina no contrato um número de revisões inclusas (geralmente 2-3). Revisões adicionais devem ser cobradas por hora ou por rodada. Alterações que mudam o escopo original devem ser orçadas separadamente.",
  },
  {
    question: "Qual a diferença entre valor/hora e valor por projeto?",
    answer: "O valor/hora é sua base de cálculo - quanto seu tempo vale. O valor do projeto é o resultado final: (horas estimadas × valor/hora) + custos extras. Sempre calcule por horas internamente, mesmo que apresente um valor fechado ao cliente.",
  },
  {
    question: "Como lidar com clientes que acham caro?",
    answer: "Apresente a composição do orçamento: horas de trabalho, complexidade, experiência e valor entregue. Mostre o valor que você entrega, não apenas o custo. Se necessário, ofereça pacotes reduzidos em vez de baixar seu valor/hora.",
  },
  {
    question: "Devo cobrar por reuniões?",
    answer: "Sim! Reuniões consomem seu tempo e devem ser incluídas no orçamento. Você pode incluir uma reunião inicial gratuita para entender o projeto, mas reuniões de alinhamento e apresentação devem ser consideradas.",
  },
  {
    question: "O Precifica é realmente gratuito?",
    answer: "Sim, o Precifica é 100% gratuito! Não pedimos cadastro, não coletamos dados pessoais e você pode usar quantas vezes quiser. Nossa missão é ajudar profissionais a valorizar seu trabalho.",
  },
];

const FAQ = () => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-2">
          <h2
            ref={ref}
            className={`text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Perguntas Frequentes
          </h2>
          <p
            className={`text-base sm:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Tire suas dúvidas sobre precificação para profissionais
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-secondary/50 border border-border rounded-xl sm:rounded-2xl px-4 sm:px-6 data-[state=open]:shadow-lg data-[state=open]:bg-white transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 sm:py-6 text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
