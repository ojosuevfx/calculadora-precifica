import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = (event?: React.MouseEvent) => {
    // Get origin from click position or use center of screen
    const x = event ? event.clientX / window.innerWidth : 0.5;
    const y = event ? event.clientY / window.innerHeight : 0.5;

    // First burst - main confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
      startVelocity: 30,
      gravity: 0.8,
      scalar: 1.2,
      drift: 0,
    });

    // Second burst - smaller particles with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x, y },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
        startVelocity: 20,
        gravity: 1,
        scalar: 0.8,
      });
    }, 150);

    // Third burst - heart-shaped confetti feeling
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x, y: y - 0.1 },
        colors: ['#EC4899', '#F43F5E'],
        startVelocity: 25,
        gravity: 0.6,
        scalar: 1,
        shapes: ['circle'],
      });
    }, 300);
  };

  return { triggerConfetti };
};
