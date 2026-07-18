module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 3, /*
                - Le niveau de maturité des fonctionnalités qu'on veut utiliser, '0' toutes les fonctionnalités expérimentales, '1' beaucoup de fonctionnalités y compris expérimentales, '2' fonctionnalités plus stables et '3' presque standardisées et recommandé
            */
        },
        autoprefixer: {}, /*
            - La configuration autoprefixer est inclus
        */
        /*
            'postcss-import': {}, -- Pour ajouter d'autres plugins
            'postcss-nested': {}

            features: {
                    'nesting-rules': true -- Pour activer le nesting css '& .child'
                }
            }
        */
    }
};