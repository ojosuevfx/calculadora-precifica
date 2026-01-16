import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
type Section = "inicio" | "como-funciona" | "beneficios" | "apoie";
const sections: {
  id: Section;
  label: string;
  sectionId?: string;
}[] = [{
  id: "inicio",
  label: "Início"
}, {
  id: "como-funciona",
  label: "Como Funciona",
  sectionId: "como-funciona"
}, {
  id: "beneficios",
  label: "Benefícios",
  sectionId: "beneficios"
}, {
  id: "apoie",
  label: "Apoie",
  sectionId: "apoie"
}];
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("inicio");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0
  });
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<Section, HTMLButtonElement>>(new Map());
  const location = useLocation();
  const navigate = useNavigate();

  // Update indicator position based on active section
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeSection);
    if (activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width
      });
    }
  }, [activeSection]);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (location.pathname !== "/") return;
      const scrollPosition = window.scrollY + 150;

      // Check sections in reverse order (bottom to top)
      const sectionElements = ["apoie", "beneficios", "como-funciona"].map(id => ({
        id,
        element: document.getElementById(id)
      }));
      let found = false;
      for (const {
        id,
        element
      } of sectionElements) {
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id as Section);
          found = true;
          break;
        }
      }
      if (!found) {
        setActiveSection("inicio");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const handleNavClick = (section: typeof sections[0]) => {
    if (section.sectionId) {
      scrollToSection(section.sectionId);
    } else {
      scrollToTop();
    }
  };
  return <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className={`mx-auto max-w-5xl transition-all duration-500 rounded-2xl ${isScrolled ? "bg-white/70 backdrop-blur-2xl shadow-lg shadow-black/5 border border-white/50" : "bg-white/40 backdrop-blur-xl border border-white/30"}`}>
        <div className="px-4 md:px-6">
          <div className="flex items-center h-16">
            {/* Logo - Fixed width */}
            <div className="flex-1 flex justify-start">
              <button onClick={scrollToTop} className="flex items-center gap-2 group">
                <span className="text-lg font-bold gradient-text-animated">Precifica</span>
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center">
              <div ref={navRef} className="relative flex items-center bg-muted/50 rounded-full p-1">
                {/* Sliding indicator */}
                <div className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-out" style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width
              }} />

                {sections.map(section => <button key={section.id} ref={el => {
                if (el) buttonRefs.current.set(section.id, el);
              }} onClick={() => handleNavClick(section)} className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeSection === section.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {section.label}
                </button>)}
              </div>
            </nav>

            {/* CTA Button - Fixed width */}
            <div className="flex-1 hidden md:flex justify-end">
              <Link to="/calcular" className="group inline-flex items-center gap-2 bg-foreground text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:scale-105">Acessar Ferramentas<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-4 border-t border-border/30">
            <nav className="flex flex-col gap-1">
              {sections.map(section => <button key={section.id} onClick={() => handleNavClick(section)} className={`flex items-center gap-3 font-medium py-3 px-4 text-left rounded-xl transition-all duration-200 ${activeSection === section.id ? "text-foreground bg-muted/30" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"}`}>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeSection === section.id ? "bg-foreground" : "bg-muted-foreground/30"}`} />
                  {section.label}
                </button>)}

              <div className="pt-3 mt-2 border-t border-border/30">
                <Link to="/calcular" className="flex items-center justify-center gap-2 bg-foreground text-white font-medium py-3 px-6 rounded-xl w-full hover:bg-foreground/90 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
                  Calcular Agora
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;