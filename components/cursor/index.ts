/**
 * /components/cursor
  *
   * Premium cursor system — replaces default browser cursor
    * with a physics-driven, context-aware custom cursor.
     *
      * Components:
       * - CustomCursor: Dot + ring cursor with magnetic cursor states
        *
         * Usage:
          * Mount <CustomCursor /> once in the root layout (server component).
           * Add data-cursor attributes to elements to trigger states:
            *   data-cursor="link"   → shrinks + scales ring
             *   data-cursor="text"   → expands ring to read-mode
              *   data-cursor="drag"   → shows drag indicator
               *   data-cursor="hide"   → hides cursor (video players, etc.)
                *
                 * Rules:
                  * 1. Mount only once — in the root layout
                   * 2. Uses mix-blend-difference — ensure bg colors are set
                    * 3. Disable on touch devices via CSS: @media (hover: none)
                     * 4. Never animate cursor with CSS — GSAP quickTo only
                      */

                      export { CustomCursor } from './CustomCursor';
