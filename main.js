const passwordInput = document.getElementById('passwordInput');
const resultBox = document.getElementById('resultBox');
const bcrypt = dcodeIO.bcrypt;

function hashPassword() {
    const password = passwordInput.value;

    if (!password) {
        resultBox.textContent = "Najpierw wpisz jakieś hasło!";
        return;
    }

    resultBox.textContent = "Generowanie hasza... (chwila patience)";

    bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash);
        resultBox.textContent = hash;

        previousHash = "$2a$10$oOzmnIU1IXgQJaWL0Y8kLOJgqDqmG.TiGEoycxaReXgP/zKuwhNku";
        bcrypt.compare(password, previousHash, function (err, res) {
            if (res) {
                console.log("Sukces! Hasła są identyczne.");
            } else {
                console.log("Błąd! Niepoprawne hasło.");
            }
        });


    });

}
