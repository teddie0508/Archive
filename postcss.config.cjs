module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        cssnano: {
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
                minifyFontValues: true,
                minifyParams: true,
            }]
        }
    }
}