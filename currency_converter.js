const BASE_URL = "https://api.exchangerate.host/convert?access_key=bab0f4daeff6af42c69e60b40a79153d&from=USD&to=INR&amount=1"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } 
    else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
  
    if (fromCurr.value === toCurr.value) {
      msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal} ${toCurr.value}`;
      return;
    }
  
    const URL = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}`;
  
    try {
      let response = await fetch(URL);
  
      if (!response.ok) {
        throw new Error("Failed to fetch conversion rate");
      }
  
      let data = await response.json();
      let rate = data.result;
  
      let finalAmount = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } 
    catch (error) {
      console.error("Error:", error.message);
      msg.innerText = "Error: Unable to fetch conversion rate.";
    }
  };
  

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (img) img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
