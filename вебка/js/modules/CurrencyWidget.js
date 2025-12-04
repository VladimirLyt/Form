// Виджет курсов валют
class CurrencyWidget extends Widget {
    constructor() {
        super('currency', 'Курсы валют');
        this.currencyData = [
            { pair: 'USD/RUB', rate: 92.45, change: 0.25 },
            { pair: 'EUR/RUB', rate: 99.80, change: -0.12 }
        ];
    }

    getContentHTML() {
        return `
            <div class="currency-list">
                ${this.currencyData.map(currency => `
                    <div class="currency-item">
                        <span class="currency-pair">${currency.pair}</span>
                        <span class="currency-rate">${currency.rate}</span>
                        <span class="currency-change ${currency.change >= 0 ? 'positive' : 'negative'}">
                            ${currency.change >= 0 ? '+' : ''}${currency.change}%
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    refresh() {
        super.refresh();
        // В реальном приложении здесь был бы запрос к API
        setTimeout(() => {
            // Имитация получения новых данных
            const changes = [-0.15, -0.10, -0.05, 0, 0.05, 0.10, 0.15];
            const usdRate = 92 + Math.random();
            const eurRate = 99 + Math.random();
            
            this.currencyData = [
                { 
                    pair: 'USD/RUB', 
                    rate: usdRate.toFixed(2), 
                    change: changes[Math.floor(Math.random() * changes.length)] 
                },
                { 
                    pair: 'EUR/RUB', 
                    rate: eurRate.toFixed(2), 
                    change: changes[Math.floor(Math.random() * changes.length)] 
                }
            ];
            
            this.setLoading(false);
        }, 1500);
    }
}