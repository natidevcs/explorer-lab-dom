import "./css/index.css"
import Imask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(01) path") //busque pelo seletor//
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(02) path")
//const ccBgColor03 = document.querySelector(".cc-bg svg > g g:nth-child(03) path") 

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")



//estrutura de dados para as cores//

function setCardType(type) {
    const colors = {
     visa: ["#436D99", "#2D57F2"],
     mastercard: ["#DF6F29", "#C69347"],
     elo: ["#A77DFF", "#924AEE"],
     default: ["black", "gray"],
    }

    ccBgColor01.setAttribute("fill", colors[type][0])
    ccBgColor02.setAttribute("fill", colors[type][1])
    //ccBgColor03.setAttribute("fill", colors[type][2])

    ccLogo.setAttribute("src", `cc-${type}.svg`)
 
}
//setCardType("visa")
//globalThis.setCardType = setCardType

// security code
const securityCode = document.querySelector('#security-code') // pegar um elemento qualquer
const securityCodePattern = {
    mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// date expiration card
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {  // // block, filtro de anos e meses
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
    },
}
const expirationDateMasked = IMask (expirationDate, expirationDatePattern)

//card number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        }, 
        {
            mask: "0000 0000 0000 0000",
            regex: /^6\d{0,15}/,
            cardtype: "elo",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },
    ],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended). replace(/\D/g,''); //D=digitos
        const foundMask = dynamicMasked.compiledMasks.find(function(item) { //find(({regex}) =>  number.match(RegExp))
            
            return number.match(item.regex) 
        })

        return foundMask
        },
    }
    
    const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

    /*return dynamicMasked.compiledMasks.find(function (m) { //find= função que aceita uma função com parametro, se aplica ao array
            return number.indexOf(m.startsWith) === 0;*/ 
            
    
 // botão adicionar cartão   
const addButton = document.querySelector("#add-card") //adicionar evento click no botão
addButton.addEventListener("click", () => { //arrow function
    alert("Cartão adicionado!")

})
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
})

//nome titular
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value") // . = classe

    ccHolder.innerText = cardHolder.value.length  === 0 ? "FULANO DOS SANTOS" : //length mostra quantas letras tem no input
    cardHolder.value
})

//código segurança
securityCodeMasked.on("accept", () => {
    updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code) {
    const ccSecurity = document.querySelector(".cc-security .value");
    ccSecurity.innerText = code.length === 0 ? "123" : code
}    

//número cartao
cardNumberMasked.on("accept", () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype //acessar qual o tipo do cartão
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number){
    const ccNumber = document.querySelector(".cc-number");
    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

//data expiração
expirationDateMasked.on("accept", () => {
    updateExpirationDate(expirationDateMasked.value);
})

function updateExpirationDate(date){
    const ccExpiration = document.querySelector(".cc-extra .value");
    ccExpiration.innerText = date.length === 0 ? "10/22" : date
}