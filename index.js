

const btn = document.querySelector(".button");
btn.addEventListener("click", (e) => {

    const article = document.querySelector(".container__article--element");
    const articleName = document.querySelector(".articleName");
    const montant = document.querySelector(".montant");

        if(articleName.value === "" || montant.value === ""){
            alert("Renseignez le prix ou le montant du nouvel article")
        }else{
            if(checked()) return 0;
            // e.preventDefault();
            article.innerHTML += 
            `<div class = "newArticle">
                <div class = "articleTitle">            
                <span class = "item--title">${articleName.value}</span> <br />
                <button class = "supprimer" type = "button">Supprimer</button>
            </div>
            <div class = "compteur">
                <button class = "btn--moins"> - </button>
                <span class = "qte"> 1 </span>
                <button class = "btn--plus"> + </button>
            </div>
            <div class = "prixU">
                    <span class = "prix">${montant.value}</span>
            </div>
            <div class = "totalArticle">
            <span class = "prixT">${montant.value}</span>
            </div>
            </div>
            `
            
            loadNewElements();
            calcTotal(); 
        }
        

});


function  loadNewElements() {

    const btnPlus = document.querySelectorAll(".btn--plus");
    const btnMoins = document.querySelectorAll(".btn--moins");
    const btnSupprim = document.querySelectorAll(".supprimer");



    btnPlus.forEach(element => element.addEventListener('click', increaseQuantity));
    btnMoins.forEach(element => element.addEventListener('click', decreaseQuantity));
    btnSupprim.forEach(element => element.addEventListener("click", removeLine));
    
}

function checked() {
    const product = document.querySelectorAll(".item--title");
    const articleName = document.querySelector(".articleName");
    for(let i = 0; i<product.length; i++){
        if(product[i].textContent == articleName.value){
            alert(articleName.value + " existe déja dans votre panier vous pouvez changé la quantité");
            return true;
        }
    }
    return false
}

function decreaseQuantity() {
    const qty = this.nextElementSibling;
    if(parseInt(qty.textContent) > 0){
       qty.textContent = parseInt(qty.textContent) - 1;
    }
    let price = parseFloat( this.parentElement.nextElementSibling.children[0].textContent)
    this.parentElement.nextElementSibling.nextElementSibling.children[0].innerHTML = parseInt(qty.textContent) * price  
        calcTotal()
}
function increaseQuantity() {
    const qty = this.previousElementSibling;
    qty.textContent = parseInt(qty.textContent) + 1; 
   
    let price = parseFloat( this.parentElement.nextElementSibling.children[0].textContent)
    this.parentElement.nextElementSibling.nextElementSibling.children[0].innerHTML = parseInt(qty.textContent) * price  

    calcTotal()
    
}

function calcTotal(){
    let tab = []
    const total = document.querySelectorAll(".prixT")
    total.forEach(st => tab.push(parseFloat(st.textContent)) )
    let tot = tab.reduce((acc, curr) => acc + curr);
    const totaux = document.querySelector(".montantT");
    totaux.innerHTML = tot +  " Fr CFA";
}

function removeLine(){
    this.parentElement.parentElement.remove();
    calcTotal();
}