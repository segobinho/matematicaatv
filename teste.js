class StockMarketSimulator {
    constructor(initialPrice = 100) {
        this.price = initialPrice;
    }

    getPrice() {
        this.price += (Math.random() * 10 - 5);
        return parseFloat(this.price.toFixed(2));
    }
}

class SimpleReactiveAgent {
    constructor(buyThreshold = 95, sellThreshold = 105) {
        this.buyThreshold = buyThreshold;
        this.sellThreshold = sellThreshold;
        this.holdings = 0;
        this.cash = 1000;
    }

    decide(currentPrice) {
        if (currentPrice <= this.buyThreshold && this.cash >= currentPrice) {
            this.holdings += 1;
            this.cash -= currentPrice;
            console.log(`[Simples] Comprou a ação por $${currentPrice}`);
        } else if (currentPrice >= this.sellThreshold && this.holdings > 0) {
            this.holdings -= 1;
            this.cash += currentPrice;
            console.log(`[Simples] Vendeu a ação por $${currentPrice}`);
        } else {
            console.log(`[simples] Nenhuma ação tomada a $${currentPrice}`);
        }
    }

    getStatus() {
        return `Holdings: ${this.holdings}, Cash: $${this.cash.toFixed(2)}`;
    }
}

class ModelBasedAgent {
    constructor(buyThreshold = 95, sellThreshold = 105, historyLimit = 5) {
        this.buyThreshold = buyThreshold;
        this.sellThreshold = sellThreshold;
        this.holdings = 0;
        this.cash = 1000;
        this.priceHistory = [];
        this.historyLimit = historyLimit;
    }

    decide(currentPrice) {
        this.priceHistory.push(currentPrice);
        if (this.priceHistory.length > this.historyLimit) {
            this.priceHistory.shift();
        }

        let trend = 0;
        if (this.priceHistory.length > 1) {
            trend = (this.priceHistory[this.priceHistory.length - 1] - this.priceHistory[0]) / this.historyLimit;
        }

        if (currentPrice <= this.buyThreshold && trend > 0 && this.cash >= currentPrice) {
            this.holdings += 1;
            this.cash -= currentPrice;
            console.log(`[modelo] Comprou a ação por $${currentPrice}, tendência positiva de ${trend.toFixed(2)}`);
        } else if (currentPrice >= this.sellThreshold && trend < 0 && this.holdings > 0) {
            this.holdings -= 1;
            this.cash += currentPrice;
            console.log(`[Modelo] Vendeu a ação por $${currentPrice}, tendência negativa de ${trend.toFixed(2)}`);
        } else {
            console.log(`[Modelo] Nenhuma ação tomada a $${currentPrice} (tendência ${trend.toFixed(2)})`);
        }
    }

    getStatus() {
        return `Holdings: ${this.holdings}, Cash: $${this.cash.toFixed(2)}`;
    }
}

function simulateMarket(days = 30) {
    const market = new StockMarketSimulator();
    const simpleAgent = new SimpleReactiveAgent();
    const modelAgent = new ModelBasedAgent();

    for (let day = 1; day <= days; day++) {
        console.log(`\n--- Dia ${day} ---`);
        const currentPrice = market.getPrice();
        console.log(`Preço atual da ação: $${currentPrice}`);

        simpleAgent.decide(currentPrice);
        modelAgent.decide(currentPrice);

        console.log(simpleAgent.getStatus());
        console.log(modelAgent.getStatus());
    }
}

simulateMarket();


//adicionar tratatias no baseado em modelo quantas depois ele pode
