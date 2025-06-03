export function useCurrency() {
    const formatCurrency = (value, locale = 'es-CO', currency = 'COP') => {
        if (typeof value !== 'number') return '';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
        }).format(value);
    }

    return { formatCurrency };
}