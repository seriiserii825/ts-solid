// ==========
// Задача 2
// ----------
// Создай класс AnimationPreset для GSAP:
// duration, ease, stagger
// Реализуй clone().
// Создай fadeIn и fadeInSlow (клон, где duration = 3).

interface AnimationClone {
  clone(): AnimationPreset;
}

class AnimationPreset implements AnimationClone {
  duration: number;
  ease: string;
  stagger: number;

  constructor(duration: number, ease: string, stagger: number) {
    this.duration = duration;
    this.ease = ease;
    this.stagger = stagger;
  }

  clone(): AnimationPreset {
    return new AnimationPreset(this.duration, this.ease, this.stagger);
  }
}

const fadeIn = new AnimationPreset(1, 'power1.out', 0.2);
const fadeInSlow = fadeIn.clone();
fadeInSlow.duration = 3;
console.log(fadeIn); // AnimationPreset { duration: 1, ease: 'power1.out', stagger: 0.2 }
console.log(fadeInSlow); // AnimationPreset { duration: 3, ease: 'power1.out', stagger: 0.2 }
