const Privacy = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Content */}
      <main className="container-custom py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Política de Privacidade
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Introdução
              </h2>
              <p>
                Esta Política de Privacidade descreve como o Precifica coleta, usa e 
                protege as informações dos usuários. Valorizamos sua privacidade e 
                estamos comprometidos em proteger seus dados pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Dados Coletados
              </h2>
              <p>
                O Precifica é uma ferramenta de cálculo que funciona inteiramente no 
                seu navegador. <strong>Não coletamos, armazenamos ou transmitimos</strong> os 
                dados que você insere nas calculadoras. Todos os cálculos são realizados 
                localmente no seu dispositivo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Cookies e Tecnologias Similares
              </h2>
              <p>
                Podemos utilizar cookies essenciais para garantir o funcionamento adequado 
                do site. Estes cookies não coletam informações pessoais e são necessários 
                para a experiência básica de navegação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Compartilhamento de Dados
              </h2>
              <p>
                Como não coletamos dados pessoais através das calculadoras, não há 
                informações para compartilhar com terceiros. Sua privacidade é nossa 
                prioridade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Segurança
              </h2>
              <p>
                Implementamos medidas de segurança apropriadas para proteger contra 
                acesso não autorizado, alteração, divulgação ou destruição de 
                informações. O site utiliza conexão segura (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Links Externos
              </h2>
              <p>
                Nosso site pode conter links para sites externos. Não somos responsáveis 
                pelas práticas de privacidade de outros sites. Recomendamos que você 
                leia as políticas de privacidade de qualquer site que visitar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Seus Direitos
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de dados</li>
                <li>Revogar consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Alterações nesta Política
              </h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Quaisquer alterações serão publicadas nesta página com a data 
                de atualização revisada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Contato
              </h2>
              <p>
                Para dúvidas sobre esta Política de Privacidade, entre em contato através do Instagram{" "}
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

export default Privacy;
