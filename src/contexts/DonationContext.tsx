import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface DonationContextType {
  showToast: () => void;
  showPopup: () => void;
  showFullscreenPopup: () => void;
  isToastVisible: boolean;
  isPopupOpen: boolean;
  isFullscreenPopupOpen: boolean;
  setIsToastVisible: (visible: boolean) => void;
  setIsPopupOpen: (open: boolean) => void;
  setIsFullscreenPopupOpen: (open: boolean) => void;
  toastMessageIndex: number;
  popupVariationIndex: number;
}

const DonationContext = createContext<DonationContextType | null>(null);

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};

export const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFullscreenPopupOpen, setIsFullscreenPopupOpen] = useState(false);
  const [toastMessageIndex, setToastMessageIndex] = useState(0);
  const [popupVariationIndex, setPopupVariationIndex] = useState(0);
  const [lastShownTime, setLastShownTime] = useState(0);
  const [hasShownInitialPopup, setHasShownInitialPopup] = useState(false);

  // Show fullscreen popup after 40 seconds on first visit
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenDonationPopup");
    if (hasSeenPopup) {
      setHasShownInitialPopup(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasShownInitialPopup) {
        setPopupVariationIndex(Math.floor(Math.random() * 5));
        setIsFullscreenPopupOpen(true);
        setHasShownInitialPopup(true);
        sessionStorage.setItem("hasSeenDonationPopup", "true");
      }
    }, 40000); // 40 seconds

    return () => clearTimeout(timer);
  }, [hasShownInitialPopup]);

  const showToast = useCallback(() => {
    const now = Date.now();
    // Prevent showing if less than 30 seconds since last shown
    if (now - lastShownTime < 30000) return;
    
    setToastMessageIndex(prev => (prev + 1) % 5);
    setIsToastVisible(true);
    setLastShownTime(now);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 10000);
  }, [lastShownTime]);

  const showPopup = useCallback(() => {
    const now = Date.now();
    // Prevent showing if less than 60 seconds since last shown
    if (now - lastShownTime < 60000) return;
    
    setPopupVariationIndex(prev => (prev + 1) % 5);
    setIsPopupOpen(true);
    setLastShownTime(now);
  }, [lastShownTime]);

  const showFullscreenPopup = useCallback(() => {
    setPopupVariationIndex(prev => (prev + 1) % 5);
    setIsFullscreenPopupOpen(true);
  }, []);

  return (
    <DonationContext.Provider
      value={{
        showToast,
        showPopup,
        showFullscreenPopup,
        isToastVisible,
        isPopupOpen,
        isFullscreenPopupOpen,
        setIsToastVisible,
        setIsPopupOpen,
        setIsFullscreenPopupOpen,
        toastMessageIndex,
        popupVariationIndex,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
