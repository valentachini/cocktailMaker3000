const liquors = [...document.querySelectorAll('[name="liquor"]')];
const softDrink = [...document.querySelectorAll('[name="softDrink"]')];
const garnish = [...document.querySelectorAll('[name="garnish"]')];
const showResult = document.querySelector('#resultado');
const button = document.querySelector('#submit');
const resetbttn = document.querySelector('#resetBttn');
const showPrev = document.querySelector('#showPrev');

button.addEventListener("click", () => userTragos());
resetbttn.addEventListener("click", () => uncheckAll());

function filterTragos () {
    var userLiquor = liquors.filter(userLiquor => userLiquor.checked)[0].value
    var userSoftDrink = softDrink.filter(userSoftDrink => userSoftDrink.checked)[0].value
    var userGarnish = garnish.filter(userGarnish => userGarnish.checked)[0].value
    
    var resultado = [userLiquor, userSoftDrink, userGarnish]
    return resultado
}

function uncheckAll() {
    var inputs = document.querySelectorAll('.check');
    for (var i = 0; i < inputs.length; i+=1) {
        inputs[i].checked = false;
    }
}

window.onload = function() {
    window.addEventListener('load', filterTragos, false);
}

async function userTragos () {   
    
    const resp = await fetch('/api/data.json')
    const data = await resp.json()
    
    var usrResultado = data.filter((trago) => {
       return JSON.stringify(trago.ingredients) === JSON.stringify(filterTragos())
    })[0]
    if (usrResultado){
        localStorage.setItem("previousTragoName", usrResultado.name)
        localStorage.setItem("previousTragoImg", usrResultado.img)
        Swal.fire({
            title: 'Sweet! Tu trago es',
            text: usrResultado.name,
            imageUrl: usrResultado.img,            
          })
          prevTrago()
    }else{
        Swal.fire({
            title: 'Oops! No existe ese trago',
            imageUrl: 'media/noEsUnTrago.png',
          })
    }
}

function prevTrago (){    
   if (localStorage.getItem('previousTragoName') && localStorage.getItem('previousTragoImg')) 
    showPrev.innerHTML = '<div class="prevCard"><p class="resultTxt">Tu ultima degustacion fue: ' + localStorage.getItem('previousTragoName') + '</p><img src= ' + localStorage.getItem('previousTragoImg')+ '></div>';
}

prevTrago()