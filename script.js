const data = {
  USD: {EUR: 0.82, GBP: 0.74, CAD: 1.29},
  EUR: {USD: 1.23, GBP: 0.91, CAD: 1.57},
  GBP: {USD: 1.35, EUR: 1.10, CAD: 1.74},
  CAD: {USD: 0.78, EUR: 0.64, GBP: 0.57}
};


const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}


const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);


const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");

calculateButton.addEventListener("click", function () {
  const currencyResult = document.querySelector("#currency-result");
  
  let select1 = document.querySelector("input[name='currency_to']:checked")
  let select2 =  document.querySelector("input[name='currency_from']:checked")
  
  if (select1 == null || select2 == null) { currencyResult.innerHTML = "Secim yapmalisiniz"; return} 
    
  const fromTarget = document.querySelector("input[name='currency_from']:checked").value;
  const toTarget   = document.querySelector("input[name='currency_to']:checked").value;
  const amount     = document.querySelector("input[name='amount']").value;

  if (fromTarget == toTarget) {currencyResult.innerHTML = "Farkli birimler secmelisiniz"; return} 
    
  if (isNaN(amount)) {currencyResult.innerHTML = "Sayi girmelisiniz"; return;}
        
        const currentCurrencyObject = data[fromTarget];
        const resultForOne = currentCurrencyObject[toTarget];
        const result = amount * resultForOne;
        currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
     });