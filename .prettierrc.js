module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    importOrder: [
        '^@/app/(.*)$',
        '^\breact-native\b(.*)$',        
        '^@/shared/(.*)$',
        '^@/constants/(.*)$',                
        '^@/assets/(.*)$',        
        '^@/components/(.*)$',
        '^@/services/(.*)$',
        '^@/hooks/(.*)$',        
        '^@/utils/(.*)$',
        '^@/json/(.*)$',        
        '^lodash/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
};
