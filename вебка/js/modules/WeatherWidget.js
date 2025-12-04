// Виджет погоды
class WeatherWidget extends Widget {
    constructor() {
        super('weather', 'Погода');
        this.weatherData = null;
        // Для демонстрации используем статические данные
        this.weatherData = {
            temperature: 22,
            description: 'Ясно',
            icon: '☀️'
        };
    }

    getContentHTML() {
        if (!this.weatherData) {
            return '<p>Данные о погоде не загружены</p>';
        }

        return `
            <div class="weather-info">
                <div class="weather-icon">${this.weatherData.icon}</div>
                <div class="temperature">${this.weatherData.temperature}°C</div>
            </div>
            <div class="weather-description">${this.weatherData.description}</div>
        `;
    }

    refresh() {
        super.refresh();
        // В реальном приложении здесь был бы запрос к API
        setTimeout(() => {
            // Имитация получения новых данных
            const temperatures = [18, 20, 22, 24, 26];
            const descriptions = ['Облачно', 'Пасмурно', 'Ясно', 'Небольшой дождь'];
            const icons = ['☁️', '🌤️', '☀️', '🌧️'];
            
            const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
            const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            this.weatherData = {
                temperature: randomTemp,
                description: randomDesc,
                icon: randomIcon
            };
            
            this.setLoading(false);
        }, 1500);
    }
}