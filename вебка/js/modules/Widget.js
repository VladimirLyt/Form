// Базовый класс виджета
class Widget {
    constructor(type, title) {
        this.type = type;
        this.title = title;
        this.id = Date.now().toString();
        this.isLoading = false;
        this.hasError = false;
        this.element = null;
    }

    // Создание DOM-элемента виджета
    createElement() {
        const widgetElement = document.createElement('div');
        widgetElement.className = `widget ${this.type}-widget`;
        widgetElement.id = this.id;
        widgetElement.innerHTML = `
            <div class="widget-header">
                <h3 class="widget-title">${this.title}</h3>
                <div class="widget-controls">
                    <button class="btn refresh-btn">Обновить</button>
                    <button class="btn btn-danger remove-btn">Удалить</button>
                </div>
            </div>
            <div class="widget-content">
                ${this.getContentHTML()}
            </div>
        `;

        // Добавляем обработчики событий
        widgetElement.querySelector('.refresh-btn').addEventListener('click', () => {
            this.refresh();
        });

        widgetElement.querySelector('.remove-btn').addEventListener('click', () => {
            this.remove();
        });

        this.element = widgetElement;
        return widgetElement;
    }

    // Обновление данных виджета
    refresh() {
        this.setLoading(true);
        // В базовом классе просто сбрасываем состояние загрузки через 1 секунду
        setTimeout(() => {
            this.setLoading(false);
        }, 1000);
    }

    // Установка состояния загрузки
    setLoading(loading) {
        this.isLoading = loading;
        this.updateContent();
    }

    // Установка состояния ошибки
    setError(error) {
        this.hasError = error;
        this.updateContent();
    }

    // Обновление содержимого виджета
    updateContent() {
        if (!this.element) return;

        const contentElement = this.element.querySelector('.widget-content');
        if (this.isLoading) {
            contentElement.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                </div>
            `;
        } else if (this.hasError) {
            contentElement.innerHTML = `
                <div class="error">
                    <p>Ошибка загрузки данных</p>
                    <button class="btn retry-btn">Повторить</button>
                </div>
            `;
            contentElement.querySelector('.retry-btn').addEventListener('click', () => {
                this.refresh();
            });
        } else {
            contentElement.innerHTML = this.getContentHTML();
            this.bindContentEvents();
        }
    }

    // Удаление виджета
    remove() {
        if (this.element) {
            this.element.remove();
            DashboardManager.removeWidget(this.id);
        }
    }

    // Методы, которые должны быть реализованы в дочерних классах
    getContentHTML() {
        return '<p>Базовый виджет</p>';
    }

    bindContentEvents() {
        // Привязка событий для конкретного содержимого виджета
    }
}