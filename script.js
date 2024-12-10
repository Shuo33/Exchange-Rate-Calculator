const currencyEl_one = document.getElementById('currentcy-one');
const amountEl_one = document.getElementById('amount-one');

const currencyEl_two = document.getElementById('currentcy-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// Fetch exchange rate and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value; 
    const currency_two = currencyEl_two.value;
    
    async function getData() {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/3cccd0faa698329ba96808c9/latest/${currency_one}`);
        const data = await res.json();
        // console.log(data);

        const rate = data.conversion_rates[currency_two];
        // console.log(rate);

        rateEl.innerHTML = `1${currency_one} = ${rate} ${currency_two} `;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);  
    }

    getData(); 
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);

currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', function () {
    const temp = currencyEl_one.value; 
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp; 

    calculate();
});


calculate();