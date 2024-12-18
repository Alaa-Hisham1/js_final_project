// handiling navbar (start)
$('.nav-interface .open ').click(openNav);
function openNav() {
    $('.nav-interface .open-close .open').hide();
    $('.nav-interface .open-close .close').show();
    $('.nav-details').css({ width: "270px" });
    $('.nav-interface').css({ left: "270px" });
}
$('.nav-interface .close ').click(closeNav);
function closeNav() {
    $('.nav-interface .open-close .close').hide();
    $('.nav-interface .open-close .open').show();
    $('.nav-details').css({ width: "0" });
    $('.nav-interface').css({ left: "0" });
}

// ****************************************************************
// handiling navbar (end)
// ****************************************************************
// get api content
async function apiObject(link, callback) {
    console.log('api');
    let response = await fetch(link);
    let finalData = await response.json();
    console.log(finalData);
    if (link == `https://www.themealdb.com/api/json/v1/1/categories.php`) {
        callback(finalData.categories)
    }
    else {
        callback(finalData.meals)
    }
}
// home api 1
// 
function displayMain(displayed) {
    $('.search').css({ display: "none" });
    $('.ingredients').css({ display: "none" });
    $('.area').css({ display: "none" });
    $('.home').css({ display: "flex" });
    var cartona = ``;
    for (var i = 0; i < displayed.length; i++) {
        cartona += `<div class="item">
            <div class="layer">
                <h3>${displayed[i].strMeal}</h3>
            </div>
            <img src="${displayed[i].strMealThumb}" alt="">
        </div>`
    }
    document.querySelector('.home').innerHTML = cartona;

}

function displayCategories(displayed) {
    $('.ingredients').css({ display: "none" });
    $('.search').css({ display: "none" });
    $('.area').css({ display: "none" });
    $('.home').css({ display: "flex" });
    var cartona = ``;
    for (var i = 0; i < displayed.length; i++) {
        cartona += `<div class="item">
            <div class="layer">
                <h3>${displayed[i].strCategory}</h3>
                <p>${displayed[i].strCategoryDescription.split(" ").splice(0, 10).join("")}</p>
            </div>
            <img src="${displayed[i].strCategoryThumb}" alt="">
        </div>`
    }
    document.querySelector('.home').innerHTML = cartona;
}
function displayAreas(displayed) {
    $('.ingredients').css({ display: "none" });
    $('.search').css({ display: "none" });
    $('.home').css({ display: "none" });
    $('.area').css({ display: "flex" });
    var cartona = ``;
    for (var i = 0; i < displayed.length; i++) {
        cartona += `<div class="item">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${displayed[i].strArea}</h3>
        </div>`
    }
    document.querySelector('.area').innerHTML = cartona;
}
function displayIngredients(displayed) {
    $('.search').css({ display: "none" });
    $('.home').css({ display: "none" });
    $('.area').css({ display: "none" });
    $('.ingredients').css({ display: "flex" });
    var cartona = ``;
    for (var i = 0; i < displayed.length; i++) {
        if (displayed[i].strDescription != null) {
            cartona += `<div class="item">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${displayed[i].strIngredient}</h3>
                <p>${displayed[i].strDescription.split(" ").splice(0, 10).join(" ")}</p>
            </div>`
        }

    }
    document.querySelector('.ingredients').innerHTML = cartona;
}
// default api (List all meal categories)
apiObject(`https://www.themealdb.com/api/json/v1/1/search.php?s=`, displayMain);

// categories api
$('#categories').click(function () {
    closeNav();
    $('.home .item .layer').css({ textAlign: "center" });
    apiObject(`https://www.themealdb.com/api/json/v1/1/categories.php`, displayCategories);
});
// List all  Area
$('#areas').click(function () {
    closeNav();
    apiObject(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`, displayAreas)
})
// List all  Ingredients
$('#ingredients').click(function () {
    closeNav();
    apiObject(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`, displayIngredients)
})

// start search 
// search syling
$('#in1').click(function (e) {
    $('#in1').css({ boxShadow: "5px 5px 15px blue" });
    $('#in2').css({ boxShadow: "" });
    e.stopPropagation();
})
$('#in2').click(function (e) {
    $('#in1').css({ boxShadow: "" });
    $('#in2').css({ boxShadow: "5px 5px 15px blue" });
    e.stopPropagation();
})
$(window).click(function () {
    $('.search input').css({ boxShadow: "" });
})

// /////////////////////////////////////////
$('#search').click(function () {
    closeNav();
    $('.ingredients').css({ display: "none" });
    $('.area').css({ display: "none" });
    $('.home').css({ display: "none" });
    $('.search').css({ display: "flex" });
})
$('#in2').on('input', function () {
    if ($('#in2').val().length > 1) {
        $('#in2').val($('#in2').val().charAt(0));
    }
    // List all meals by first letter
    apiObject(`https://www.themealdb.com/api/json/v1/1/search.php?f=${$('#in2').val()}`, displayMain)
})
$('#in1').on('input', function () {
    // Search meal by name
    apiObject(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#in1').val()}`, displayMain)
})
$('#contact').click(function () {
    closeNav();
    $('.ingredients').css({ display: "none" });
    $('.area').css({ display: "none" });
    $('.home').css({ display: "none" });
    $('.search').css({ display: "none" });
    $('.contact').css({ display: "flex" });
})
// validation
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}