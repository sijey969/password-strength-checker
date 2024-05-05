const passwordInput = document.getElementById("password-input");

function Strength(password) {
    let strength = 0;

    if (password.length >= 12) {
        strength++;
        document.getElementById('range-constraint').classList.remove('wrong');
        document.getElementById('range-constraint').classList.add('correct');
    } else {
        document.getElementById('range-constraint').classList.remove('correct');
        document.getElementById('range-constraint').classList.add('wrong');
    }

    if (/[a-z]/.test(password)) {
        strength++;
        document.getElementById('lowercase-constraint').classList.remove('wrong');
        document.getElementById('lowercase-constraint').classList.add('correct');
    } else {
        document.getElementById('lowercase-constraint').classList.remove('correct');
        document.getElementById('lowercase-constraint').classList.add('wrong');
    }

    if (/[A-Z]/.test(password)) {
        strength++;
        document.getElementById('uppercase-constraint').classList.remove('wrong');
        document.getElementById('uppercase-constraint').classList.add('correct');
    } else {
        document.getElementById('uppercase-constraint').classList.remove('correct');
        document.getElementById('uppercase-constraint').classList.add('wrong');
    }

    if (/[0-9]/.test(password)) {
        strength++;
        document.getElementById('digit-constraint').classList.remove('wrong');
        document.getElementById('digit-constraint').classList.add('correct');
    } else {
        document.getElementById('digit-constraint').classList.remove('correct');
        document.getElementById('digit-constraint').classList.add('wrong');
    }

    if (/[!#@?+$^_&%=\.\*]/.test(password)) {
        strength++;
        document.getElementById('spl-char-constraint').classList.remove('wrong');
        document.getElementById('spl-char-constraint').classList.add('correct');
    } else {
        document.getElementById('spl-char-constraint').classList.remove('correct');
        document.getElementById('spl-char-constraint').classList.add('wrong');
    }

    return strength;
}

function generateStrongPassword() {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialCharacters = '!#@?+$^_&%=.';

    const allCharacters = lowercaseLetters + uppercaseLetters + digits + specialCharacters;

    let newPassword = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        newPassword += allCharacters[randomIndex];
    }

    return newPassword;
}

function encryptPassword(password) {
    // Hash the password using SHA-256
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    // Return the hashed password
    return hashedPassword;
}

function saveToFile(encryptedPassword) {
    // Prompt user to choose location to save file
    let fileName = "encryptedPassword.txt";
    if (fileName !== null) {
        // Create a blob with the encrypted password
        let blob = new Blob([encryptedPassword], { type: 'text/plain' });
        // Create a link element to trigger the download
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        // Click the link to trigger the download
        link.click();
    }
}

let container = document.querySelector(".container");
document.addEventListener("keyup", function (e) {
    let password = document.querySelector("#password-input").value;

    let strength = Strength(password);
    if (strength <= 2) {
        container.classList.add("weak");
        container.classList.remove("moderate");
        container.classList.remove("strong");
    } else if (strength >= 2 && strength <= 4) {
        container.classList.remove("weak");
        container.classList.add("moderate");
        container.classList.remove("strong");
    } else {
        container.classList.remove("weak");
        container.classList.remove("moderate");
        container.classList.add("strong");
    }
});

let password = document.querySelector("#password-input");
let show = document.querySelector(".show");
show.onclick = function () {
    if (password.type === "password") {
        password.setAttribute("type", "text");
        show.classList.add("hide");
    } else {
        password.setAttribute("type", "password");
        show.classList.remove("hide");
    }
};

let saveButton = document.querySelector(".save");
saveButton.addEventListener("click", function () {
    let password = document.getElementById("password-input").value;
    let strength = Strength(password);

    if (strength <= 4) {
        alert("The password should be Strong Password before saving.");
    } else {
        let encryptedPassword = encryptPassword(password);
        saveToFile(encryptedPassword);
    }
});

let generateButton = document.querySelector(".generate");
generateButton.addEventListener("click", function () {
    let generatedPassword = generateStrongPassword();
    passwordInput.value = generatedPassword;

    // Update strength meter and criteria colors for the generated password
    let strength = Strength(generatedPassword);
    if (strength <= 2) {
        container.classList.add("weak");
        container.classList.remove("moderate");
        container.classList.remove("strong");
    } else if (strength >= 2 && strength <= 4) {
        container.classList.remove("weak");
        container.classList.add("moderate");
        container.classList.remove("strong");
    } else {
        container.classList.remove("weak");
        container.classList.remove("moderate");
        container.classList.add("strong");
    }
});