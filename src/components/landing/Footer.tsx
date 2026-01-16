import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-foreground text-white py-10 sm:py-12 md:py-16">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <span className="text-white">Precifica</span>
            </div>
            <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-6 max-w-xs">
              Transforme seu tempo em lucro de forma inteligente. Nossa calculadora mostra o valor ideal da sua hora de trabalho para que você precifique com segurança, sustentabilidade e crescimento.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <Link to="/calcular" className="hover:text-white transition-colors">
                  Calculadora
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
              <li>
                <Link to="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-white/50 text-xs sm:text-sm">
          Criado por{" "}
          <a href="https://www.instagram.com/ojosueribeiro/" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-white/80 underline underline-offset-2 transition-colors">Josué Ribeiro</a>
          {" "}😄🚀
        </div>
      </div>
    </footer>;
};
export default Footer;