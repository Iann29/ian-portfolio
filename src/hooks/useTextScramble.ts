import { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]';

export function useTextScramble(finalText: string, delay = 2000) {
  const [text, setText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const scrambleInterval = setInterval(() => {
      if (!isScrambling) {
        setIsScrambling(true);
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
          setText(current => {
            if (iterations >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              return finalText;
            }

            return current
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iterations) return finalText[index];
                return characters[Math.floor(Math.random() * characters.length)];
              })
              .join('');
          });
          iterations += 1;
        }, 50);
      }
    }, delay);

    return () => clearInterval(scrambleInterval);
  }, [finalText, delay]);

  return text;
}