const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const populateCurrencies = async () => {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (err) {
    result.textContent = "Failed to load currency data.";
  }
};

convertBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    result.textContent = "Conversion failed. Try again later.";
  }
});

populateCurrencies();
