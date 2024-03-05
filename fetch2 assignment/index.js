let prdsDiv = document.getElementById("prds");
let valDiv = document.getElementById('valueDiv');
let sortDiv = document.getElementById('sortDiv');
sortDiv.style.display = 'none';

valDiv.addEventListener('change',sortByValue);

const fetchTodos = async() => {
    try{ 
         let res = await fetch('https://fakestoreapi.com/products');
         let data = await res.json();
         console.log(data,'xyz');
         localStorage.setItem('data',JSON.stringify(data));
         sortDiv.style.display = 'flex';
         displayData(data)
     }
     catch(err){
         console.log(err);
     } 
 }

 function sortByValue(){

    let arr = JSON.parse(localStorage.getItem('data'));
    if(valDiv.value == "rating"){
        arr.sort((a,b) =>  b.rating.rate - a.rating.rate);
        prdsDiv.innerHTML="";
        displayData(arr);
    }
    else if(valDiv.value == "High to Low"){
        arr.sort((a,b) =>  b.price - a.price);
        prdsDiv.innerHTML="";
        displayData(arr);
    }
    else if(valDiv.value == "Low to High"){
        arr.sort((a,b) =>  a.price - b.price);
        prdsDiv.innerHTML="";
        displayData(arr);
    }
}

 function displayData(todos){
    todos.forEach((obj,index) => {
        let card = document.createElement('div');
        card.setAttribute("class","cardDiv")
        let stars = document.createElement('p');
                   
        card.innerHTML = `<div class="imgDiv">
                            <img src = ${obj.image} alt="img" width="100%" height="100%">
                            </div>
                            <div class="textDiv">
                            <p>${obj.title}</p>
                            <p>${obj.category}</p>
                            <p>MRP: ${obj.price}</p>
                            <p>${obj.rating.rate} <span class=\"fa fa-star\"></span></p>
                            </div>
                            <div class="btnDiv"><button class="bagBtn" value = ${obj.rating.count}>Add To Bag</button></div>`
        prdsDiv.append(card);
        btn.style.display = 'none';
    });
}

function getData(){
    let searchProduct = document.querySelector("#search").value;
    let arr = JSON.parse(localStorage.getItem('data'));

    let filteredArray = arr.filter((el) => el.title.includes(searchProduct));

    if(filteredArray.length == 0){
        displayData(arr);
    }
    else{
      prdsDiv.innerHTML="";
      displayData(filteredArray);
    }
}

 let btn = document.querySelector('button');
 btn.addEventListener('click',fetchTodos);