'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(GSAPSplitText);

/**
 * SplitText — Premium kinetic typography component
 *
 * Splits text into chars/words/lines and animates them in
 * with GSAP. Use for hero headlines, section titles, and
 * any display-size type that should enter with intention.
 *
 * Usage:
 *   <SplitText type="words" animation="slideUp" delay={0.2}>
 *     Your Headline Here
 *   </SplitText>
 */

type SplitType = 'chars' | 'words' | 'lines';
type AnimationType = 'slideUp' | 'fadeIn' | 'slideDown' | 'scaleIn';

interface SplitTextProps {
    children: string;
    type?: SplitType;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
    stagger?: number;
    className?: string;
    tag?: keyof JSX.IntrinsicElements;
    triggerOnScroll?: boolean;
}

const animations: Record<AnimationType, gsap.TweenVars> = {
    slideUp: { y: '110%', opacity: 0 },
    slideDown: { y: '-110%', opacity: 0 },
    fadeIn: { opacity: 0 },
    scaleIn: { scale: 0.6, opacity: 0 },
};

export function SplitText({
    children,
    type = 'words',
    animation = 'slideUp',
    duration = 0.9,
    delay = 0,
    stagger = 0.08,
    className,
    tag: Tag = 'p',
    triggerOnScroll = false,
}: SplitTextProps) {
    const ref = useRef<HTMLElement>(null);

  useEffect(() => {
        if (!ref.current) return;

                const split = new GSAPSplitText(ref.current, {
                        type,
                        linesClass: 'overflow-hidden',
                });

                const targets =
                        type === 'chars' ? split.chars :
                        type === 'words' ? split.words :
                        split.lines;

                const from = animations[animation];

                const ctx = gsap.context(() => {
                        gsap.from(targets, {
                                  ...from,
                                  duration,
                                  delay,
                                  stagger,
                                  ease: 'power3.out',
                                  scrollTrigger: triggerOnScroll
                                    ? { trigger: ref.current!, start: 'top 85%', once: true }
                                              : undefined,
                        });
                }, ref);

                return () => {
                        ctx.revert();
                        split.revert();
                };
  }, [children, type, animation, duration, delay, stagger, triggerOnScroll]);

  return (
        <Tag ref={ref as any} className={className}>
          {children}
        </Tag>Tag>
      );
}
