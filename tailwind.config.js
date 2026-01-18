import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: () => ({
                ink: {
                    css: {
                        '--tw-prose-body': 'var(--color-ink)',
                        '--tw-prose-headings': 'var(--color-ink)',
                        '--tw-prose-lead': 'var(--color-ink-light)',
                        '--tw-prose-links': 'var(--color-ink)',
                        '--tw-prose-bold': 'var(--color-ink)',
                        '--tw-prose-counters': 'var(--color-ink-lighter)',
                        '--tw-prose-bullets': 'var(--color-ink-lighter)',
                        '--tw-prose-hr': 'var(--color-ink-lighter)',
                        '--tw-prose-quotes': 'var(--color-ink-light)',
                        '--tw-prose-quote-borders': 'var(--color-ink-lighter)',
                        '--tw-prose-captions': 'var(--color-ink-lighter)',
                        '--tw-prose-code': 'var(--color-ink)',
                        '--tw-prose-pre-code': 'var(--color-ink)',
                        '--tw-prose-pre-bg': 'var(--color-paper-dark)',
                        '--tw-prose-th-borders': 'var(--color-ink-lighter)',
                        '--tw-prose-td-borders': 'var(--color-ink-lighter)',

                        '--tw-prose-invert-body': 'var(--color-ink)',
                        '--tw-prose-invert-headings': 'var(--color-ink)',
                        '--tw-prose-invert-lead': 'var(--color-ink-light)',
                        '--tw-prose-invert-links': 'var(--color-ink)',
                        '--tw-prose-invert-bold': 'var(--color-ink)',
                        '--tw-prose-invert-counters': 'var(--color-ink-lighter)',
                        '--tw-prose-invert-bullets': 'var(--color-ink-lighter)',
                        '--tw-prose-invert-hr': 'rgba(255, 255, 255, 0.1)',
                        '--tw-prose-invert-quotes': 'var(--color-ink-light)',
                        '--tw-prose-invert-quote-borders': 'rgba(255, 255, 255, 0.1)',
                        '--tw-prose-invert-captions': 'var(--color-ink-lighter)',
                        '--tw-prose-invert-code': 'var(--color-ink)',
                        '--tw-prose-invert-pre-code': 'var(--color-ink)',
                        '--tw-prose-invert-pre-bg': 'rgba(0, 0, 0, 0.3)',
                        '--tw-prose-invert-th-borders': 'rgba(255, 255, 255, 0.1)',
                        '--tw-prose-invert-td-borders': 'rgba(255, 255, 255, 0.1)',
                    },
                },
            }),
            colors: {
                paper: {
                    DEFAULT: 'var(--color-paper)',
                    dark: 'var(--color-paper-dark)',
                },
                ink: {
                    DEFAULT: 'var(--color-ink)',
                    light: 'var(--color-ink-light)',
                    lighter: 'var(--color-ink-lighter)',
                },
                warm: {
                    100: '#F5F5F1',
                    200: '#EBEBE6',
                    300: '#D4D9D2',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(44, 44, 44, 0.08)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            }
        },
    },
    plugins: [
        typography,
    ],
}

