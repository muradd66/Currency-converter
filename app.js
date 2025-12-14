let entryRub = document.querySelector(".entry-rub")
let entryUsd = document.querySelector(".entry-usd")
let entryEur = document.querySelector(".entry-eur")
let entryGbp = document.querySelector(".entry-gbp")
let exitRub = document.querySelector(".exit-rub")
let exitUsd = document.querySelector(".exit-usd")
let exitEur = document.querySelector(".exit-eur")
let exitGbp = document.querySelector(".exit-gbp")
let entryInput = document.querySelector(".entry-value")
let exitInput = document.querySelector(".exit-value")
let entryInfo = document.querySelector(".entry-info")
let exitInfo = document.querySelector(".exit-info")
let fail = document.querySelector(".fail")

let entryCurrency = 'RUB'
let exitCurrency = 'USD'
entryRub.classList.add("selected")
exitUsd.classList.add("selected")

console.log(entryInput.value)


function load() {
    fetch(`https://v6.exchangerate-api.com/v6/af270181aad7bb59239013c2/pair/${entryCurrency}/${exitCurrency}/${amount}`)
        .then(response => {

            return response.json()

        })
        .then(data => {


        })
}





function convert() {

    fail.innerHTML = ""
    let amount = entryInput.value
    amount = amount.replace(",", ".")
    if (amount <= 0) {
        exitInput.value = ""
        entryInfo.innerHTML = ""
        exitInfo.innerHTML = ""
    }

    if (entryCurrency == exitCurrency) {
        exitInput.value = Number(amount).toFixed(5)
        entryInfo.innerHTML = `1 ${entryCurrency} = 1.00000 ${exitCurrency}`
        exitInfo.innerHTML = `1 ${exitCurrency} = 1.00000 ${entryCurrency} `

    }
    else {


        fetch(`https://v6.exchangerate-api.com/v6/af270181aad7bb59239013c2/pair/${entryCurrency}/${exitCurrency}/${amount}`)
            .then(response => {
                // if (response.ok == false) {
                //     error.innerHTML = `Xəta: ${response.status}`
                // }
                return response.json()

            })
            .then(data => {
                // entryInput.value=Number(entryInput.value).toFixed(5)
                exitInput.value = Number(data.conversion_result.toFixed(5))
                entryInput.value = amount
                let newQuote = data.conversion_rate
                let exitValue = 1 / newQuote
                entryInfo.innerHTML = `1 ${entryCurrency} = ${data.conversion_rate.toFixed(5)} ${exitCurrency}`
                exitInfo.innerHTML = `1 ${exitCurrency} = ${exitValue.toFixed(5)} ${entryCurrency}`
            })
            .catch(error => {

                if (error.message === 'Failed to fetch') {

                    fail.innerHTML = `Xeta: Şəbəkə yoxdur`
                } else {
                    fail.innerHTML = ""
                }
            })

    }


}
entryInput.addEventListener("input", () => {
    let value = entryInput.value
    value = value.replace(/[^0-9.,]/gi, "")
    value = value.replace(",", ".")
    let parts = value.split('.')

    if (parts.length > 1) {
        if (parts[1].length > 5) {
            parts[1] = parts[1].slice(0, 5)
        }
        value = parts.join('.')
    }
    entryInput.value = value

    activeInput = "entry"
    convert();

})



function reverseConvert() {
    fail.innerHTML = ""
    let amount = exitInput.value
    if (amount <= 0) {
        entryInput.value = ""
        entryInfo.innerHTML = ""
        exitInfo.innerHTML = ""
    }
    amount = amount.replace(",", ".")
    exitInput.value = amount

    if (entryCurrency == exitCurrency) {
        entryInput.value = Number(amount).toFixed(5)
        entryInfo.innerHTML = `1 ${entryCurrency} = 1.00000 ${exitCurrency}`
        exitInfo.innerHTML = `1 ${exitCurrency} = 1.00000 ${entryCurrency} `

    }
    else {


        fetch(`https://v6.exchangerate-api.com/v6/af270181aad7bb59239013c2/pair/${exitCurrency}/${entryCurrency}/${amount}`)
            .then(response => {
                if (response.ok != true) {
                    error.innerHTML = `Xəta: ${response.status}`
                }
                return response.json()
            })
            .then(data => {
                entryInput.value = Number(data.conversion_result.toFixed(5))

                let newQuote = data.conversion_rate
                let exitValue = 1 / newQuote
                entryInfo.innerHTML = `1 ${entryCurrency} = ${exitValue.toFixed(5)} ${exitCurrency}`
                exitInfo.innerHTML = `1 ${exitCurrency} = ${data.conversion_rate.toFixed(5)} ${entryCurrency}`
            })
            .catch(error => {

                if (error.message === 'Failed to fetch') {

                    fail.innerHTML = `Xeta: Şəbəkə yoxdur`
                } else {
                    fail.innerHTML = ""
                }
            })


    }
}
exitInput.addEventListener("input", () => {

    let value = exitInput.value
    value = value.replace(/[^0-9.,]/gi, '')
    value = value.replace(",", ".")
    let parts = value.split('.')

    if (parts.length > 1) {
        if (parts[1].length > 5) {
            parts[1] = parts[1].slice(0, 5)
        }
        value = parts.join('.')
    }
    exitInput.value = value

    activeInput = "exit"
    reverseConvert()
})

// Hər iki inputun hesablanması üçün
function active() {
    if (activeInput == "entry") {
        convert()
    }
    else {
        reverseConvert()
    }
}



//Giriş dəyərlər

entryRub.addEventListener("click", () => {

    entryUsd.classList.remove("selected")
    entryEur.classList.remove("selected")
    entryGbp.classList.remove("selected")
    entryRub.classList.add("selected")
    entryCurrency = "RUB"
    active()
})

entryUsd.addEventListener("click", () => {

    entryRub.classList.remove("selected")
    entryEur.classList.remove("selected")
    entryGbp.classList.remove("selected")
    entryUsd.classList.add("selected")
    entryCurrency = "USD"
    active()
})


entryEur.addEventListener("click", () => {

    entryRub.classList.remove("selected")
    entryGbp.classList.remove("selected")
    entryUsd.classList.remove("selected")
    entryEur.classList.add("selected")
    entryCurrency = "EUR"
    active()

})
entryGbp.addEventListener("click", () => {

    entryRub.classList.remove("selected")
    entryUsd.classList.remove("selected")
    entryEur.classList.remove("selected")
    entryGbp.classList.add("selected")
    entryCurrency = "GBP"
    active()
})





//Çıxış dəyərlər

exitRub.addEventListener("click", () => {

    exitUsd.classList.remove("selected")
    exitEur.classList.remove("selected")
    exitGbp.classList.remove("selected")
    exitRub.classList.add("selected")
    exitCurrency = "RUB"
    active()
})


exitUsd.addEventListener("click", () => {

    exitEur.classList.remove("selected")
    exitGbp.classList.remove("selected")
    exitRub.classList.remove("selected")
    exitUsd.classList.add("selected")
    exitCurrency = "USD"
    active()
})



exitEur.addEventListener("click", () => {

    exitGbp.classList.remove("selected")
    exitRub.classList.remove("selected")
    exitUsd.classList.remove("selected")
    exitEur.classList.add("selected")
    exitCurrency = "EUR"
    active()
})


exitGbp.addEventListener("click", () => {

    exitRub.classList.remove("selected")
    exitUsd.classList.remove("selected")
    exitEur.classList.remove("selected")
    exitGbp.classList.add("selected")
    exitCurrency = "GBP"
    active()
})



