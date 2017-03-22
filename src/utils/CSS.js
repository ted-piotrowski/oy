export default {
  // Validate against common CSS vulnerabilities.
  raiseOnUnsafeCSS: (css = '', foundInName = '\'not provided\'') => {
    if (css.match(/-moz-binding/i)) {
      throw new Error(`Unsafe CSS found in ${foundInName}: "-moz-binding"`);
    } else if (css.match(/expression/i)) {
      throw new Error(`Unsafe CSS found in ${foundInName}: "expression"`);
    } else if (css.match(/<\/style>/i)) {
      throw new Error(`Unsafe CSS found in ${foundInName}: "<\/style>"`);
    }
    return css;
  }
};
