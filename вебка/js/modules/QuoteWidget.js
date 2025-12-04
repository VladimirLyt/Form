// Виджет цитат
class QuoteWidget extends Widget {
    constructor() {
        super('quote', 'Случайная цитата');
        this.quotes = [
            { text: "Жизнь - это то, что происходит с тобой, пока ты строишь другие планы.", author: "Джон Леннон" },
            { text: "Единственный способ сделать великую работу — любить то, что ты делаешь.", author: "Стив Джобс" },
            { text: "Будь тем изменением, которое ты хочешь видеть в мире.", author: "Махатма Ганди" },
            { text: "Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.", author: "Уинстон Черчилль" }
        ];
        this.currentQuoteIndex = 0;
    }

    getContentHTML() {
        const quote = this.quotes[this.currentQuoteIndex];
        return `
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
            <button class="btn next-quote-btn">Следующая цитата</button>
        `;
    }

    bindContentEvents() {
        this.element.querySelector('.next-quote-btn').addEventListener('click', () => {
            this.nextQuote();
        });
    }

    nextQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        this.updateContent();
    }

    refresh() {
        super.refresh();
        // В реальном приложении здесь был бы запрос к API
        setTimeout(() => {
            // Просто переходим к следующей цитате
            this.nextQuote();
            this.setLoading(false);
        }, 1000);
    }
}