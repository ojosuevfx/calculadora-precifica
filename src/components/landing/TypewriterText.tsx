import { useState, useEffect } from "react";

interface WordItem {
  word: string;
  article: "seu" | "sua";
  preposition: "pelo" | "pela";
}

interface TypewriterTextProps {
  words: WordItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText = ({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000 
}: TypewriterTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentItem = words[currentWordIndex];

  useEffect(() => {
    const currentWord = currentItem.word;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration, currentItem.word]);

  return (
    <span className="relative inline-flex items-baseline flex-wrap justify-center">
      <span className="text-foreground font-bold">{currentItem.preposition} {currentItem.article}&nbsp;</span>
      <span className="gradient-text-animated font-bold">{currentText}</span>
      <span className="animate-blink gradient-text-animated ml-0.5">|</span>
    </span>
  );
};

export default TypewriterText;
