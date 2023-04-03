/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
        'fira-mono': ['"Fira Mono"', 'monospace'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
    },
    extend: {
        typography: ({ theme }) => ({
            iselein: {
                css: {
                    '--tw-prose-body': theme('colors.amber[900]'),
                    '--tw-prose-headings': theme('colors.amber[900]'),
                    '--tw-prose-lead': theme('colors.amber[700]'),
                    '--tw-prose-links': theme('colors.amber[900]'),
                    '--tw-prose-bold': theme('colors.amber[900]'),
                    '--tw-prose-counters': theme('colors.amber[600]'),
                    '--tw-prose-bullets': theme('colors.amber[400]'),
                    '--tw-prose-hr': theme('colors.amber[300]'),
                    '--tw-prose-quotes': theme('colors.amber[900]'),
                    '--tw-prose-quote-borders': theme('colors.amber[300]'),
                    '--tw-prose-captions': theme('colors.amber[700]'),
                    '--tw-prose-code': theme('colors.amber[900]'),
                    '--tw-prose-pre-code': theme('colors.amber[900]'),
                    '--tw-prose-pre-bg': theme('colors.orange[100]'),
                    '--tw-prose-td-borders': theme('colors.amber[300]'),
                    '--tw-prose-th-borders': theme('colors.amber[300]'),
                    '--tw-prose-invert-body': theme('colors.orange[300]'),
                    '--tw-prose-invert-headings': theme('colors.orange[300]'),
                    '--tw-prose-invert-lead': theme('colors.orange[400]'),
                    '--tw-prose-invert-links': theme('colors.orange[300]'),
                    '--tw-prose-invert-bold': theme('colors.orange[300]'),
                    '--tw-prose-invert-counters': theme('colors.orange[400]'),
                    '--tw-prose-invert-bullets': theme('colors.orange[400]'),
                    '--tw-prose-invert-hr': theme('colors.orange[400]'),
                    '--tw-prose-invert-quotes': theme('colors.orange[300]'),
                    '--tw-prose-invert-quote-borders': theme('colors.orange[400]'),
                    '--tw-prose-invert-captions': theme('colors.orange[200]'),
                    '--tw-prose-invert-code': theme('colors.orange[300]'),
                    '--tw-prose-invert-pre-code': theme('colors.orange[300]'),
                    '--tw-prose-invert-pre-bg': theme('colors.zinc[800]'),
                    '--tw-prose-invert-td-borders': theme('colors.orange[400]'),
                    '--tw-prose-invert-th-borders': theme('colors.orange[400]'),
                },
            },
        }),
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}
