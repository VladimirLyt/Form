// Менеджер дашборда
class DashboardManager {
    static widgets = [];
    static availableWidgetTypes = {
        weather: { name: 'Погода', class: WeatherWidget },
        currency: { name: 'Курсы валют', class: CurrencyWidget },
        quote: { name: 'Случайная цитата', class: QuoteWidget },
        timer: { name: 'Таймер Pomodoro', class: TimerWidget }
    };

    static init() {
        this.loadFromStorage();
        this.renderDashboard();
        this.renderAvailableWidgets();
        this.setupEventListeners();
    }

    static addWidget(type) {
        if (this.availableWidgetTypes[type]) {
            const WidgetClass = this.availableWidgetTypes[type].class;
            const widget = new WidgetClass();
            this.widgets.push(widget);
            
            const dashboard = document.getElementById('dashboard');
            dashboard.appendChild(widget.createElement());
            
            this.saveToStorage();
            return widget;
        }
        return null;
    }

    static removeWidget(id) {
        this.widgets = this.widgets.filter(widget => widget.id !== id);
        this.saveToStorage();
    }

    static renderDashboard() {
        const dashboard = document.getElementById('dashboard');
        dashboard.innerHTML = '';
        
        this.widgets.forEach(widget => {
            dashboard.appendChild(widget.createElement());
        });
    }

    static renderAvailableWidgets() {
        const availableWidgetsContainer = document.getElementById('available-widgets');
        availableWidgetsContainer.innerHTML = '';
        
        Object.entries(this.availableWidgetTypes).forEach(([type, widgetInfo]) => {
            const button = document.createElement('button');
            button.className = 'btn btn-success';
            button.textContent = `+ ${widgetInfo.name}`;
            button.addEventListener('click', () => {
                this.addWidget(type);
            });
            
            availableWidgetsContainer.appendChild(button);
        });
    }

    static saveToStorage() {
        const dashboardState = {
            widgets: this.widgets.map(widget => ({
                type: widget.type,
                id: widget.id,
                // Сохраняем специфические данные для каждого типа виджета
                data: this.getWidgetData(widget)
            }))
        };
        
        localStorage.setItem('dashboard', JSON.stringify(dashboardState));
    }

    static loadFromStorage() {
        const savedState = localStorage.getItem('dashboard');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.widgets = [];
                
                state.widgets.forEach(widgetState => {
                    if (this.availableWidgetTypes[widgetState.type]) {
                        const WidgetClass = this.availableWidgetTypes[widgetState.type].class;
                        const widget = new WidgetClass();
                        widget.id = widgetState.id;
                        
                        // Восстанавливаем специфические данные для каждого типа виджета
                        this.restoreWidgetData(widget, widgetState.data);
                        
                        this.widgets.push(widget);
                    }
                });
            } catch (e) {
                console.error('Ошибка при загрузке состояния дашборда:', e);
            }
        } else {
            // Если нет сохраненного состояния, добавляем виджеты по умолчанию
            this.addWidget('weather');
            this.addWidget('currency');
            this.addWidget('quote');
        }
    }

    static getWidgetData(widget) {
        // Сохраняем специфические данные для каждого типа виджета
        switch (widget.type) {
            case 'weather':
                return { weatherData: widget.weatherData };
            case 'currency':
                return { currencyData: widget.currencyData };
            case 'quote':
                return { 
                    currentQuoteIndex: widget.currentQuoteIndex,
                    quotes: widget.quotes
                };
            case 'timer':
                return {
                    workTime: widget.workTime,
                    breakTime: widget.breakTime,
                    timeLeft: widget.timeLeft,
                    isRunning: widget.isRunning,
                    isWorkSession: widget.isWorkSession
                };
            default:
                return {};
        }
    }

    static restoreWidgetData(widget, data) {
        // Восстанавливаем специфические данные для каждого типа виджета
        switch (widget.type) {
            case 'weather':
                if (data.weatherData) widget.weatherData = data.weatherData;
                break;
            case 'currency':
                if (data.currencyData) widget.currencyData = data.currencyData;
                break;
            case 'quote':
                if (data.currentQuoteIndex !== undefined) widget.currentQuoteIndex = data.currentQuoteIndex;
                if (data.quotes) widget.quotes = data.quotes;
                break;
            case 'timer':
                if (data.workTime !== undefined) widget.workTime = data.workTime;
                if (data.breakTime !== undefined) widget.breakTime = data.breakTime;
                if (data.timeLeft !== undefined) widget.timeLeft = data.timeLeft;
                if (data.isRunning !== undefined) widget.isRunning = data.isRunning;
                if (data.isWorkSession !== undefined) widget.isWorkSession = data.isWorkSession;
                break;
        }
    }

    static setupEventListeners() {
        document.getElementById('reset-dashboard').addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите сбросить дашборд? Все текущие виджеты будут удалены.')) {
                this.widgets = [];
                localStorage.removeItem('dashboard');
                this.renderDashboard();
                
                // Добавляем виджеты по умолчанию
                this.addWidget('weather');
                this.addWidget('currency');
                this.addWidget('quote');
            }
        });
    }
}