
let container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);


let lovedRockets = []
if(localStorage.getItem('lovedRockets')){
    lovedRockets = JSON.parse(localStorage.getItem('lovedRockets'))
}


function showData(items){
    items.customer_satellites.forEach(item=>{
        if(lovedRockets.includes(item.id)){
            let card = document.createElement('div');
            card.classList.add('card');
    
            let addBtnContent = lovedRockets.includes(item.id) ? 'Added':'Add to wish list'
            let country = item.country == 'ISRAEL'?'PALESTINE':item.country

    
            card.innerHTML = 
            `
              <h2 class = 'card-title'>${item.id}</h2>
              <p class = 'country'><span>Country : </span>${country}</p>
              <p class = 'date'><span>Date : </span> ${item.launch_date}</p>
              <p class = 'launcher'><span>Launcher : </span>${item.launcher}</p>
              <p class = 'mass'><span>Mass : </span>${item.mass}</p>
              <button class = 'add-btn' onclick="saveIdToStorage(this)">${addBtnContent}</button>
            `
            container.appendChild(card);
        }
    })
}

fetch('https://isro.vercel.app/api/customer_satellites')
.then((response)=>{
    return response.json()
})
.then(data =>{
   showData(data)
})
.catch(error =>console.log(error))


// add to wish list



let cardsTitle = document.querySelectorAll('.card-title')

lovedRockets.forEach(item =>{
    
})

function saveIdToStorage(btn){
    let btnParent = btn.closest('.card')
    let cardId = btnParent.querySelector('.card-title').innerText.trim()

    if(!lovedRockets.includes(cardId)){
        lovedRockets.push(cardId)
        localStorage.setItem('lovedRockets',JSON.stringify(lovedRockets))
        btn.innerText = "Added"    
    }else{
         let indexId = lovedRockets.indexOf(cardId) 
         lovedRockets.splice(indexId,1) ;
         localStorage.setItem('lovedRockets',JSON.stringify(lovedRockets))
         btn.innerText = "Add to wish list"   
    }
}