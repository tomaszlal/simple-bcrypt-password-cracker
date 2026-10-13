const passwordInput = document.getElementById('passwordInput');
const resultBox = document.getElementById('resultBox');
const bruteResultBox = document.getElementById('bruteResultBox');
const bcrypt = dcodeIO.bcrypt;

function hashPassword() {
    const password = passwordInput.value;

    if (!password) {
        resultBox.textContent = "Najpierw wpisz jakieś hasło!";
        return;
    }
    resultBox.textContent = "Generowanie hasza... (chwila patience)";

    // bcryptHash(password);
    sha256Hash(password);
}

function bcryptHash(password) {
    bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash);
        resultBox.textContent = hash;
        previousHash = "$2a$10$oOzmnIU1IXgQJaWL0Y8kLOJgqDqmG.TiGEoycxaReXgP/zKuwhNku";
        bcrypt.compare(password, previousHash, (err, res) => {
            if (res) {
                console.log("Sukces! Hasła są identyczne.");
            } else {
                console.log("Błąd! Niepoprawne hasło.");
            }
        });
    });
}

function sha256Hash(password) {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hash);
    resultBox.textContent = hash;
}

function bruteForceHash() {
    if (resultBox.textContent.length < 60) {
        resultBox.textContent = "Najpierw wygeneruj hash!";
        return;
    }

    const targetHash = resultBox.textContent; // Hash, whitch we want to crack
    console.log(`Target: ${targetHash}`);
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to use for password generation
    const maxLength = 4; // Max of characters in password

    let foundPassword = null;

    function generatePasswords(currentPassword) {
        if (currentPassword.length > maxLength || foundPassword) {
            return;
        }

        if (currentPassword.length > 0) {
            const hash = CryptoJS.SHA256(currentPassword).toString(CryptoJS.enc.Hex);
            if (hash === targetHash) {
                foundPassword = currentPassword;
                bruteResultBox.textContent = `Znaleziono hasło: ${foundPassword}`;
                console.log(`Target: ${targetHash}, Hash from password: ${hash}`);
                return;
            }
        }

        for (let i = 0; i < charset.length; i++) {
            generatePasswords(currentPassword + charset[i]);
        }
    }

    generatePasswords("");
}


function bruteForceHashByFor() {
     if (resultBox.textContent.length < 60) {
        resultBox.textContent = "Najpierw wygeneruj hash!";
        return;
    }

    const targetHash = resultBox.textContent; // Hash, whitch we want to crack
    console.log(`Target: ${targetHash}`);
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to use for password generation
    const maxLength = 4; // Max of characters in password

    let currentPassword = "";

    for (let len = 1; len <= maxLength; len++) {

        for (let i = 0; i < charset.length; i++) {
            currentPassword = charset[i];
        }

    }

}

//TODO: to analyze and change on for.
// function bruteForceHash() {
//     if (resultBox.textContent.length < 60) {
//         resultBox.textContent = "Najpierw wygeneruj hash!";
//         return;
//     }

//     const targetHash = resultBox.textContent; // Hash, który chcemy złamać
//     console.log(`Target: ${targetHash}`);
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Znaki
//     const maxLength = 4; // Maksymalna długość hasła

//     // Przechodzimy przez każdą możliwą długość hasła od 1 do maxLength
//     for (let len = 1; len <= maxLength; len++) {
//         // Tworzymy tablicę indeksów dla aktualnej długości (np. [0, 0, 0, 0])
//         const indices = new Array(len).fill(0);
//         const maxCombinations = Math.pow(charset.length, len);

//         // Pętla iterująca po wszystkich kombinacjach dla danej długości
//         for (let i = 0; i < maxCombinations; i++) {
//             // Składamy hasło z aktualnych indeksów
//             let currentPassword = "";
//             for (let j = 0; j < len; j++) {
//                 currentPassword += charset[indices[j]];
//             }

//             // Sprawdzamy hash
//             const hash = CryptoJS.SHA256(currentPassword).toString(CryptoJS.enc.Hex);
//             if (hash === targetHash) {
//                 bruteResultBox.textContent = `Znaleziono hasło: ${currentPassword}`;
//                 console.log(`Target: ${targetHash}, Hash from password: ${hash}`);
//                 return; // Przerywamy całą funkcję po znalezieniu hasła
//             }

//             // Inkrementujemy indeksy (odpowiednik "licznika kilometrów")
//             let idx = len - 1;
//             while (idx >= 0) {
//                 indices[idx]++;
//                 if (indices[idx] < charset.length) {
//                     break; // Jeśli nie wyszliśmy poza zakres alfabetu, przerywamy pętlę inkrementacji
//                 }
//                 indices[idx] = 0; // Resetujemy i przechodzimy do poprzedniego znaku (przeniesienie)
//                 idx--;
//             }
//         }
//     }
    
//     console.log("Nie znaleziono hasła w zadanym zakresie.");
// }