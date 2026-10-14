const passwordInput = document.getElementById("passwordInput");
const resultBox = document.getElementById("resultBox");
const bruteResultBox = document.getElementById("bruteResultBox");
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

function sha256Hash(password) {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hash);
    resultBox.textContent = hash;
}

function bruteForceHashByFor() {
    if (resultBox.textContent.length < 60) {
        resultBox.textContent = "Najpierw wygeneruj hash!";
        return;
    }

    const targetHash = resultBox.textContent;
    console.log(`Target: ${targetHash}`);
    // const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const smallCharset = "abcdefghijklmnopqrstuvwxyz";
    const bigCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharset = "0123456789";
    const specialCharset = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const charset = smallCharset;// + bigCharset + numberCharset + specialCharset;


    // Start time for performance measurement
    const startTime = Date.now();
    const startDateObj = new Date(startTime);
    console.log(`Start szukania: ${startDateObj.toLocaleTimeString()}`);

    // Lengh 1 (1 loop - 1 character)
    for (let i = 0; i < charset.length; i++) {
        let p = charset[i];
        if (check(p, targetHash, startTime)) return;
    }

    // Lengh 2 (2 loops - 2 character)
    for (let i = 0; i < charset.length; i++) {
        for (let j = 0; j < charset.length; j++) {
            let p = charset[i] + charset[j];
            if (check(p, targetHash, startTime)) return;
        }
    }

    // Lengh 3 (3 loops - 3 characters))
    for (let i = 0; i < charset.length; i++) {
        for (let j = 0; j < charset.length; j++) {
            for (let k = 0; k < charset.length; k++) {
                let p = charset[i] + charset[j] + charset[k];
                if (check(p, targetHash, startTime)) return;
            }
        }
    }

    // Lengh 4 (4 loops - 4 characters)
    for (let i = 0; i < charset.length; i++) {
        for (let j = 0; j < charset.length; j++) {
            for (let k = 0; k < charset.length; k++) {
                for (let l = 0; l < charset.length; l++) {
                    let p = charset[i] + charset[j] + charset[k] + charset[l];
                    if (check(p, targetHash, startTime)) return;
                }
            }
        }
    }

    // Lengh 5 (5 loops - 5 characters)
    for (let i = 0; i < charset.length; i++) {
        for (let j = 0; j < charset.length; j++) {
            for (let k = 0; k < charset.length; k++) {
                for (let l = 0; l < charset.length; l++) {
                    for (let m = 0; m < charset.length; m++) {
                        let p = charset[i] + charset[j] + charset[k] + charset[l] + charset[m];
                        if (check(p, targetHash, startTime)) return;
                    }
                }
            }
        }
    }


    console.log("Nie znaleziono hasła.");
    bruteResultBox.textContent = `Nie znaleziono hasła.`;
}

function check(password, targetHash, startTime) {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    if (hash === targetHash) {
        bruteResultBox.textContent = `Znaleziono hasło: ${password}`;
        const endTime = Date.now();
        const durationInSeconds = ((endTime - startTime) / 1000).toFixed(3);
        console.log(`Target: ${targetHash}, Hash from password: ${hash}`);
        console.log(`Czas szukania: ${durationInSeconds} sekund`);
        return true;
    }
    return false;
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