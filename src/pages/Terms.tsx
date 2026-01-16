const Terms = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Content */}
      <main className="container-custom py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Termos de Uso
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o Precifica, você concorda em cumprir e estar vinculado 
                a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
                não deverá usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Descrição do Serviço
              </h2>
              <p>
                O Precifica é uma ferramenta gratuita de calculadora online que ajuda 
                profissionais autônomos e freelancers a calcular seu valor por hora de 
                trabalho e estimar custos de projetos. O serviço é fornecido "como está" 
                e destina-se apenas a fins informativos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Uso Adequado
              </h2>
              <p>
                Você concorda em usar o Precifica apenas para fins legais e de acordo com 
                estes Termos. Os cálculos fornecidos são estimativas e não devem ser 
                considerados como aconselhamento financeiro ou profissional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Limitação de Responsabilidade
              </h2>
              <p>
                O Precifica não se responsabiliza por quaisquer decisões tomadas com base 
                nos cálculos fornecidos pela ferramenta. Recomendamos que você consulte 
                um profissional qualificado para decisões financeiras importantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo, design e funcionalidades do Precifica são protegidos 
                por direitos autorais e pertencem ao criador. É proibida a reprodução, 
                distribuição ou modificação sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Modificações dos Termos
              </h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                As alterações entrarão em vigor imediatamente após sua publicação no site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Contato
              </h2>
              <p>
                Para dúvidas sobre estes Termos de Uso, entre em contato através do Instagram{" "}
                <a 
                  href="https://www.instagram.com/ojosueribeiro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @ojosueribeiro
                </a>.
              </p>
            </section>

            <p className="text-sm text-muted-foreground/60 pt-8">
              Última atualização: Janeiro de 2024
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-custom text-center text-sm text-muted-foreground">
          Criado por{" "}
          <a 
            href="https://www.instagram.com/ojosueribeiro/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground font-medium hover:text-muted-foreground underline underline-offset-2 transition-colors"
          >
            Josué Ribeiro
          </a>
          {" "}😄🚀
        </div>
      </footer>
    </div>
  );
};

export default Terms;
