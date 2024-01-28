// ^OPEN AND CLOSE SIDE NAV
const widthValue =  $('.side-nav-inner').innerWidth()

$('#openClose').click(function(){
    if( $('.side-nav').css('left')=='-320px'){

        openMenu()
    }else{
        closeMenu()
    }   
  });
  function openMenu(){
    $('.side-nav').css('left' , 0);
        $('#openClose i').removeClass("fa-bars");
        $('#openClose i').addClass("fa-xmark");
        $('.side-nav-inner a').removeClass("animate__animated animate__fadeOutDownBig ");
        $('.side-nav-inner a').addClass("animate__animated animate__fadeInUpBig  ");
        for(let i=0;i<5;i++){
          $(`.a${i+1}`).addClass(`animate__delay-${i+1}s`);
          
        }
  }
  function closeMenu(){
    $('.side-nav').css('left' , -widthValue);
        $('#openClose i').removeClass("fa-xmark");
        $('#openClose i').addClass("fa-bars");
        $('.side-nav-inner a').removeClass("animate__animated animate__fadeInUpBig  ");
        $('.side-nav-inner a').addClass("animate__animated animate__fadeOutDownBig ");
        for(let i=0;i<5;i++){
            $(`.a${i+1}`).removeClass(`animate__delay-${i+1}s`);
          }
  }
//   ^================================================
// & LOADING ....
$(document).ready(function(){
    $('.loader').fadeOut(2000,function(){
    $('.loading').fadeOut(2000,function(){
        $('body').css('overflow','auto')
        searchByName("")
    })

    })
})
// &==================================================
$('.a1').click( function(){
    contain.innerHTML=""
     searchPage() 
     closeMenu()

})

$('.a2').click( function(){
    contain.innerHTML=""
     displayCategories() 
     closeMenu()
     searchContain.innerHTML=""
})
$('.a3').click( function(){
    contain.innerHTML=""
    displayArea() 
    closeMenu()
    searchContain.innerHTML=""
})
$('.a4').click( function(){
    contain.innerHTML=""
    displayIngredient() 
    closeMenu()
    searchContain.innerHTML=""
})
$('.a5').click( function(){
    contain.innerHTML=""
    showContacts() 
    closeMenu()
    searchContain.innerHTML=""
})

const contain  = document.getElementById("displayMain")
const searchContain  = document.getElementById("displaysearch")

// ^ Search By Name & By  First Letter 
function searchPage(){
    cartona=`
    <input type="text" class="form-control w-40 mx-3 bg-black text-white " onkeyup="searchByName(this.value)" placeholder="Search By Name">
    <input type="text" class="form-control w-40 mx-3 bg-black text-white "  onkeyup="searchByFLetter(this.value)" maxlength="1" placeholder="Search By First Letter">
    `
    searchContain.innerHTML=cartona
}

async function searchByName(term) {
   
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? result(response.meals) : result([])
   

}

async function searchByFLetter(term) {
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? result(response.meals) : result([])

} 

function result(result) {
    
    let cartona=''
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="displayMeal('${result[i].idMeal}')" class="meal mb-3 position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${result[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${result[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    contain.innerHTML = cartona
       
}
// ^==============================================

// ^ ========> CATEGORIES 

async function getCategories(){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data = await response.json()
    return data.categories

}



async function displayCategories() {
    let meal= await getCategories()
    let cartona = "";
    console.log(meal);

    for (let i = 0; i < meal.length; i++) {
       
        cartona += `
        <div class="col-md-3  rounded-3">
            <div class="overflow-hidden rounded-2 cursor-pointer">
                <img onclick="displayMealsOfCategory('${meal[i].strCategory}')" src="${meal[i].strCategoryThumb}" alt="" class="w-100 mb-4">
                
            </div>
        </div>
        `
    }

    contain.innerHTML = cartona
}


async function getMealsOfCategory(categoryName){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    const data = await response.json()
    console.log(data.meals)
    return data.meals

}


 async function displayMealsOfCategory(categoryName) {
    let meal= await getMealsOfCategory(categoryName)
    let cartona = "";



    for (let i = 0; i < meal.length; i++) {
        cartona += `
        <div class="col-md-3  rounded-3 ">
         <div class="overflow-hidden rounded-2 cursor-pointer">
             <img onclick="displayMeal('${meal[i].idMeal}')" src="${meal[i].strMealThumb}" alt="" class="w-100 mb-4">
          </div>  
        </div>
        `
    }
    contain.innerHTML = cartona
}

// ^===============================================================

// ^============> AREA
async function getArea(){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data = await response.json()
    return data.meals

}


async function displayArea() {
    
    let meal= await getArea()
    let cartona = "";
    console.log(meal);

    for (let i = 0; i < meal.length; i++) {
       
        cartona += `
            <div class="col-md-3">
            <div onclick="(displayMealsOfArea('${meal[i].strArea}'))" class="text-white text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${meal[i].strArea}</h3>
            </div>
            </div>
`
       
     }

     contain.innerHTML = cartona
}

async function getMealsOfArea(areaName){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    const data = await response.json()
    console.log(data.meals)
    return data.meals

}
async function displayMealsOfArea(areaName) {
    let meal= await getMealsOfArea(areaName)
    let cartona = "";

    for (let i = 0; i < meal.length; i++) {
        cartona += `
        <div class="col-md-3  rounded-3 ">
         <div class="overflow-hidden rounded-2 cursor-pointer">
             <img onclick="displayMeal('${meal[i].idMeal}')" src="${meal[i].strMealThumb}" alt="" class="w-100 mb-4">
          </div>  
        </div>
        `
    }
    contain.innerHTML = cartona
}


// ^==========================================================
// ^============> INGREDIENT
async function getIngredient(){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const data = await response.json()
    return data.meals.slice(0, 30)

}

async function displayIngredient() {
    
    let meal= await getIngredient()
    let cartona = "";
    
    console.log(meal);

    for (let i = 0; i < meal.length; i++) {
       
        cartona += `
         <div class="col-md-3 mb-5">
            <div onclick="displayMealsOfIngredient('${meal[i].strIngredient}')" class="text-white text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${meal[i].strIngredient}</h3>
                
            </div>
        </div>
            `
       
     }

     contain.innerHTML = cartona
}

async function getMealsOfIngredient(ingredientName){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    const data = await response.json()
    console.log(data.meals)
    return data.meals

}
async function displayMealsOfIngredient(ingredientName) {
    let meal= await getMealsOfIngredient(ingredientName)
    let cartona = "";

    for (let i = 0; i < meal.length; i++) {
        cartona += `
        <div class="col-md-3  rounded-3 ">
         <div class="overflow-hidden rounded-2 cursor-pointer">
             <img onclick="displayMeal('${meal[i].idMeal}')" src="${meal[i].strMealThumb}" alt="" class="w-100 mb-4">
          </div> 
          
        </div>
        `
    }
    contain.innerHTML = cartona
}
// ^===========================================================================
// ^============> GET MEAL DETAILS
async function getMeal(mealID){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    const data = await response.json()
    console.log(data.meals)
    return data.meals

}
async function displayMeal(mealID) {
    let meal= await getMeal(mealID)
    
    console.log(meal);
    console.log(mealID);
    console.log(meal[0]);


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
      let mealDetails = meal[0]
        if (mealDetails[`strIngredient${i}`]) {
            let ingred =mealDetails[`strIngredient${i}`] 
            let measure = mealDetails[`strMeasure${i}`]
            ingredients += `<li class="alert alert-info m-2 p-2">${measure} ${ingred}</li>`
        }
    }

    let tags = meal[0].strTags?.split(",")
    console.log(tags)
    if (!tags) tags = []

    let tagsBlock = ''
    for (let i = 0; i < tags.length; i++) {
        tagsBlock += `
        <li class="alert alert-danger m-2 p-2">${tags[i]}</li>`
    }

     let   cartona =`
        <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal[0].strMealThumb}"alt="">
                <h2>${meal[0].strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsBlock}</ul>
                    <a target="_blank" href="${meal[0].strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    
    contain.innerHTML = cartona
}
// ^=======================================
// ^============>  CONTACT

function showContacts() {
    contain.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="rePasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid re-password 
                </div>
            </div>
        </div>
        <button id="submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submit")


    document.getElementById("nameInput").addEventListener("focus", () => { nameInputTouched = true })
    document.getElementById("emailInput").addEventListener("focus", () => {emailInputTouched = true})
    document.getElementById("phoneInput").addEventListener("focus", () => {phoneInputTouched = true})
    document.getElementById("ageInput").addEventListener("focus", () => {ageInputTouched = true})
    document.getElementById("passwordInput").addEventListener("focus", () => {passwordInputTouched = true})
    document.getElementById("rePasswordInput").addEventListener("focus", () => {rePasswordInputTouched = true})
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;



function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(1[89]|[2-9]\d)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function rePasswordValidation() {
    return document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value
}

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.add("d-none")

        } else {
            document.getElementById("nameAlert").classList.remove("d-none")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.add( "d-none")
        } else {
            document.getElementById("emailAlert").classList.remove("d-none")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.add("d-none")
        } else {
            document.getElementById("phoneAlert").classList.remove("d-none")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.add("d-none")
        } else {
            document.getElementById("ageAlert").classList.remove("d-none")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.add("d-none")
        } else {
            document.getElementById("passwordAlert").classList.remove("d-none")

        }
    }
    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.getElementById("rePasswordAlert").classList.add("d-none")
        } else {
            document.getElementById("rePasswordAlert").classList.remove("d-none")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()){

        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
