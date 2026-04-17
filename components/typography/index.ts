/**
 * /components/typography
  *
   * Premium kinetic typography system.
    * All text animation in this project must use these components.
     *
      * Components:
       * - SplitText: Split headlines into chars/words/lines with GSAP reveals
        * - VariableFont: Animate font-variation-settings on scroll or hover
         * - KineticWord: Single word with per-character staggered entrance
          * - TextMask: Clip-mask reveal for large display text
           *
            * Rules:
             * 1. Never use raw CSS animation on type — always use these components
              * 2. All animations use GSAP power3.out or expo.out easing
               * 3. Overflow is always hidden on line containers to mask travel
                * 4. triggerOnScroll=true for any type below the fold
                 */

                 export { SplitText } from './SplitText';
                 export { VariableFont } from './VariableFont';
                 export { KineticWord } from './KineticWord';
                 export { TextMask } from './TextMask';
