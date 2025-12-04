// Виджет таймера
class TimerWidget extends Widget {
    constructor() {
        super('timer', 'Таймер Pomodoro');
        this.workTime = 25; // минуты
        this.breakTime = 5; // минуты
        this.timeLeft = this.workTime * 60; // секунды
        this.isRunning = false;
        this.isWorkSession = true;
        this.intervalId = null;
    }

    getContentHTML() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const sessionType = this.isWorkSession ? 'Работа' : 'Перерыв';
        
        return `
            <div class="timer-display">${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</div>
            <div style="text-align: center; margin-bottom: 10px; font-weight: bold;">${sessionType}</div>
            <div class="timer-controls">
                <button class="btn ${this.isRunning ? 'btn-danger' : 'btn-success'} start-btn">${this.isRunning ? 'Пауза' : 'Старт'}</button>
                <button class="btn reset-btn">Сброс</button>
            </div>
            <div class="timer-settings">
                <div class="timer-setting">
                    <label for="work-time-${this.id}">Работа (мин)</label>
                    <input type="number" id="work-time-${this.id}" min="1" max="60" value="${this.workTime}">
                </div>
                <div class="timer-setting">
                    <label for="break-time-${this.id}">Перерыв (мин)</label>
                    <input type="number" id="break-time-${this.id}" min="1" max="30" value="${this.breakTime}">
                </div>
            </div>
        `;
    }

    bindContentEvents() {
        this.element.querySelector('.start-btn').addEventListener('click', () => {
            this.toggleTimer();
        });

        this.element.querySelector('.reset-btn').addEventListener('click', () => {
            this.resetTimer();
        });

        this.element.querySelector(`#work-time-${this.id}`).addEventListener('change', (e) => {
            this.workTime = parseInt(e.target.value);
            if (!this.isRunning && this.isWorkSession) {
                this.timeLeft = this.workTime * 60;
                this.updateContent();
            }
        });

        this.element.querySelector(`#break-time-${this.id}`).addEventListener('change', (e) => {
            this.breakTime = parseInt(e.target.value);
            if (!this.isRunning && !this.isWorkSession) {
                this.timeLeft = this.breakTime * 60;
                this.updateContent();
            }
        });
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 0) {
                this.timerComplete();
            }
            
            this.updateContent();
        }, 1000);
        
        this.updateContent();
    }

    pauseTimer() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateContent();
    }

    resetTimer() {
        this.pauseTimer();
        this.timeLeft = this.isWorkSession ? this.workTime * 60 : this.breakTime * 60;
        this.updateContent();
    }

    timerComplete() {
        this.pauseTimer();
        
        // Уведомление пользователя
        const sessionType = this.isWorkSession ? 'Работа' : 'Перерыв';
        alert(`Время ${sessionType.toLowerCase()} завершено!`);
        
        // Переключение между работой и перерывом
        this.isWorkSession = !this.isWorkSession;
        this.timeLeft = this.isWorkSession ? this.workTime * 60 : this.breakTime * 60;
        
        this.updateContent();
    }

    refresh() {
        // Для таймера обновление просто сбрасывает состояние
        this.resetTimer();
    }

    remove() {
        this.pauseTimer();
        super.remove();
    }
}