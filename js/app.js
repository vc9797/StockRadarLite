let stocks = [];
let currentSortDesc = true;

const stockList = document.getElementById("stockList");
const searchInput = document.getElementById("searchInput");
const sortButton = document.querySelector(".toolbar button");

async function loadStocks() {

    const response = await fetch("data/stocks.json");
    stocks = await response.json();

    renderStocks(stocks);

}

function renderStocks(data) {

    stockList.innerHTML = "";

    data.forEach(stock => {

        let riskColor = "#22c55e";

        if (stock.risk > 20)
            riskColor = "#facc15";

        if (stock.risk > 35)
            riskColor = "#ef4444";

        const stars = "★".repeat(Math.round(stock.ai / 20));

        stockList.innerHTML += `

        <div class="card">

            <div class="stock-id">${stock.id}</div>

            <div class="stock-name">${stock.name}</div>

            <div style="font-size:22px;color:gold">
                ${stars}
            </div>

            <div class="ai-score">
                AI ${stock.ai}
            </div>

            <div class="risk"
                 style="color:${riskColor}">
                 Risk ${stock.risk}
            </div>

            <div style="margin-top:12px;">
                ROE：${stock.roe}%
            </div>

            <div>
                PE：${stock.pe}
            </div>

            <div style="margin-top:10px;
                        display:inline-block;
                        background:#2563eb;
                        padding:4px 10px;
                        border-radius:20px;
                        font-size:13px;">

                ${stock.type}

            </div>

        </div>

        `;

    });

}

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const result = stocks.filter(stock =>

        stock.id.includes(keyword)

        ||

        stock.name.includes(keyword)

    );

    renderStocks(result);

});

sortButton.addEventListener("click", () => {

    currentSortDesc = !currentSortDesc;

    stocks.sort((a, b) => {

        return currentSortDesc

            ? b.ai - a.ai

            : a.ai - b.ai;

    });

    renderStocks(stocks);

});

loadStocks();