// Handle Slider Control and Display Password Length 
let lengthDisplay = document.querySelector('[lengthDisplay');
// console.log(lengthDisplay)
let slider = document.querySelector('input[type=range]');
// console.log(slider)


function handleSlider() {
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //kuch or bhi add kr skte hai -hW
    const min = slider.min;
    const max = slider.max;

    slider.style.backgroundSize = (( passwordLength - min )*100/(max - min) ) + "% 100%"
}

let passwordLength = 10;
handleSlider();

slider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

// --------------------------------------

// Generate Random Letters and Number and Symbols
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Lowercase Letter 
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}

// Random Lowercase Letter 
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

// Random Number 
function generateRandomNumber() {
    return generateRandom(1, 10);
}

// Generate Symbol 
function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length);
    return symbol[index];
}

// console.log(generateRandomLowercase());
// console.log(generateRandomUppercase());
// console.log(generateRandomNumber());
// console.log(generateRandomSymbol());

// --------------------------------------


// Strength Color Based on Password 
let indicator = document.querySelector('.indicator');

// Set Indicator 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator 
setIndicator("#ccc");

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

// -----------------------------------

// Copy Message 
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");
let passwordDisplay = document.querySelector("input[passwordDisplay]");
// passwordDisplay.value = "My Name is Bicky Jha";

// Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMessage.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMessage.innerText = "Failed";
    }

    copyMessage.classList.add('active');

    setTimeout(() => {
        copyMessage.classList.remove('active');
    }, 2000)
}

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});

// ------------------------------------ 

// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
// Password Generate 

// By Default UpperCase Checked 
// uppercase.checked = true;

let checkBoxes = document.querySelectorAll("input[type=checkbox]");
// console.log(checkBoxes);

let checkCount = 0;

// CheckBox - Handle 

function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


let password = "";
let generateBtn = document.querySelector("#generateBtn");

generateBtn.addEventListener('click', () => {
    if (checkCount <= 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // Remove Previous Password 
    password = "";

    let arrayOfCheckedFunction = [];

    if (uppercase.checked) arrayOfCheckedFunction.push(generateRandomUppercase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generateRandomLowercase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateRandomSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

    // console.log("Password: " + password);

    // Additional addition
    for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
        let randIndex = generateRandom(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
    // console.log("Password: " + password);

    // Shuffle Password 
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();
});






// const inputSlider = document.querySelector("[data-LengthSlider]");
// const lengthDiplay = document.querySelector("[data-lengthNumber]");

// const passwordDisplay = document.querySelector("[data-passwordDisplay]");
// const copyBtn = document.querySelector("[data-copy]");
// const copyMsg = document.querySelector("[data-copyMsg]");

// const uppercaseCheck = document.querySelector("#uppercase");
// const lowercaseCheck = document.querySelector("#lowercase");
// const numbersCheck = document.querySelector("#symbols");
// const symbolsCheck = document.querySelector("#symbols");
// const indicator = document.querySelector("[data-indicator]");
// const generateBtn = document.querySelector(".generateBtn");

// const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// const symbols = '~!@#$%^&*()_+=:;<,>.?/';

// //Initialy 
// let password = "";
// let passwordLength = 10;
// let chechCount = 0;
// handleSlider();
// //set strength circle to grey

// //set password Length
// function handleSlider() {
// inputSlider.value = passwordLength;
// lengthDiplay.innerText = passwordLength;
// //or kuch bhi add krna chahiye
// }

// function setIndicator(color) {
//     indicator.style.backgroundColor = color;
//     //shadow -HW

// }

// function getRndInteger(min,max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// function generateRandomNumber() {
//     return getRndInteger(0,9);
// }

// function generateLowerCase(){
//     return String.fromCharCode(getRndInteger(97,123));
// }

// function generateUpperCase(){
//     return String.fromCharCode(getRndInteger(65,91));
// }

// function generateSymbols(){
//      const randNum = getRndInteger(0,symbols.length);
//      return symbols.charAt(randNum);
// }

// function calcStrength() {
//     let hasUpper = false;
//     let hasLower = false;
//     let hasNum = false;
//     let hasSym = false;

//     if (uppercaseCheck.checked) hasUpper = true;
//     if (lowercaseCheck.checked) hasLower = true;
//     if (numbersCheck.checked) hasNum = true;
//     if (symbolsCheck.checked) hasSym = true;

//     if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
//         setIndicator("#0f0");
//     } else if (
//         (hasLower || hasUpper) &&
//         (hasNum || hasSym) &&
//         passwordLength >= 6
//     ) {
//         setIndicator("#ff0");
//     } else {
//         setIndicator("#f00");
//     }
// }

// inputSlider.addEventListener('input', (e) =>{
//     passwordLength = e.target.value;
//     handleSlider();
// })

// // Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
// async function copyContent() {
//     try {
//         await navigator.clipboard.writeText(passwordDisplay.value);

//         copyMsg.innerText = "Copied"
//     }
//     catch (e) {
//         // alert("Something went wrong in CopyContent");
//         copyMsg.innerText = "Failed";
//     }

//     copyMsg.classList.add('active');

//     setTimeout(() => {
//         copyMsg.classList.remove('active');
//     }, 2000)
// }

// // shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// // Shuffle the array randomly - Fisher Yates Method
// function shufflepassword(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         const temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     let str = "";
//     array.forEach((el) => (str += el));
//     return str;
// }

// // CheckBox - Handle 
// let checkCount = 0;

// function handleCheckBoxChange() {
//     checkCount = 0;
//     checkBoxes.forEach((checkbox) => {
//         if (checkbox.checked)
//             checkCount++;
//     });

//     //special condition
//     if (passwordLength < checkCount) {
//         passwordLength = checkCount;
//         handleSlider();
//     }
// }

// allCheckBox.forEach((checkbox) => {
//     checkbox.addEventListener('change' , handleCheckBoxChange);
// })

// inputSlider.addEventListener('input', (e) => {
//     passwordLength = e.target.value;
//     handleSlider();
// })



// copyBtn.addEventListener("click", () => {
//     if (passwordDisplay.value)
//         copyContent();
// });



// generateBtn.addEventListener('click', () => {
//     if (checkCount <= 0)
//         return;

//     if (passwordLength < checkCount) {
//         passwordLength = checkCount;
//         handleSlider();
//     }

//     // Remove Previous Password 
//     password = "";

//     let FunArr = [];

//     if (uppercaseCheck.checked) FunArr.push(generateUpperCase);
//     if (lowercaseCheck.checked) FunArr.push(generateLowerCase);
//     if (numbersCheck.checked) FunArr.push(generateRandomNumber);
//     if (symbolsCheck.checked) FunArr.push(generateSymbols);

//     // Compulsory Addition
//     for (let i = 0; i < FunArr.length; i++) {
//         password += FunArr[i]();
//     }

//     // console.log("Password: " + password);

//     // Additional addition
//     for (let i = 0; i < passwordLength - FunArr.length; i++) {
//         let randIndex = getRndInteger(0, FunArr.length);
//         password += FunArr[randIndex]();
//     }
//     // console.log("Password: " + password);

//     // Shuffle Password 
//     password = shufflepassword(Array.from(password));
//     passwordDisplay.value = password;
//     calcStrength();
// });