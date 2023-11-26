const start = document.getElementById('mulai');
start.addEventListener('click', function () {
    // Hide the start button
    start.style.display = 'none';
    const hasilAkhir = document.querySelector('.hasil-akhir');
    hasilAkhir.textContent = '';

    hasilAkhir.classList.remove("container-hasil-seri");
    hasilAkhir.classList.remove("container-hasil-kalah");
    hasilAkhir.classList.remove("container-hasil-menang");



    // Ask the user how many times they want to play
    let berapa = prompt('Main berapa kali?');

    // Check if the user entered a valid number
    if (!isNaN(berapa) && parseInt(berapa) > 0) {
        game(parseInt(berapa));
    } else {
        alert('Mohon masukkan angka yang valid.');
        // Show the start button again if the input is not valid
        start.style.display = 'block';
    }
});

function game(x) {
    const ronde = document.querySelector('.ronde');
    ronde.textContent = x;

    // Define the scores globally
    let scorePlayer = 0;
    let scoreCom = 0;
    let roundCounter = 0;
    let berapaKali = x;

    function getPilihanCom() {
        const pilihanCom = Math.round(Math.random() * 2);
        if (pilihanCom === 1) return 'gunting';
        if (pilihanCom === 2) return 'kertas';
        return 'batu';
    }

    function proses(player) {
        const pilihCom = getPilihanCom();
        const hasil = getHasil(pilihCom, player);
        const imgComp = document.querySelector('.img-com');
        imgComp.setAttribute('src', 'img/' + pilihCom + '.png');
        const hasil2 = document.querySelector('.info');
        hasil2.innerHTML = hasil;

        // Update the scores in HTML
        updateScoresInHTML();

        // Increment the round counter
        roundCounter++;

        // Check if the maximum number of rounds has been reached
        if (roundCounter == x) {
            // Show the winner and display the start button again
            showWinner();
            start.style.display = 'block';
        }
    }

    const pilihan = document.querySelectorAll('li img');

    pilihan.forEach(function (pilih) {
        pilih.addEventListener('click', function () {
            const pilihanUser2 = pilih.className;
            berapaKali--

            if (berapaKali == 0) {
                ronde.textContent = "Selesai";

            } else {
                ronde.textContent = berapaKali;

            }

            putar();
            setTimeout(function () {
                const prosess = proses(pilihanUser2);
            }, 1000);
        });
    });

    function putar() {
        const imgCom = document.querySelector('.img-com');
        const img = ['gunting', 'kertas', 'batu'];
        let i = 0;
        const waktuAwal = new Date().getTime();
        setInterval(function () {
            if (new Date().getTime() - waktuAwal > 1000) {
                clearInterval;
                return;
            }
            imgCom.setAttribute('src', 'img/' + img[i++] + '.png');
            if (i == img.length) i = 0;
        }, 100);
    }

    function getHasil(pilihCom, pilihUser) {
        if (pilihUser == pilihCom) return 'Seri!';
        else if (pilihUser == 'gunting') {
            if (pilihCom == 'kertas') {
                scorePlayer++;
                return 'Menang!';
            } else {
                scoreCom++;
                return 'Kalah!';
            }
        } else if (pilihUser == 'batu') {
            if (pilihCom == 'gunting') {
                scorePlayer++;
                return 'Menang!';
            } else {
                scoreCom++;
                return 'Kalah!';
            }
        } else if (pilihUser == 'kertas') {
            if (pilihCom == 'batu') {
                scorePlayer++;
                return ' Menang!';
            } else {
                scoreCom++;
                return 'Kalah!';
            }
        }
    }

    function updateScoresInHTML() {
        // Update the scores in HTML
        const scorePlayerElement = document.querySelector('.score-player');
        const scoreComElement = document.querySelector('.score-com');

        scorePlayerElement.textContent = scorePlayer;
        scoreComElement.textContent = scoreCom;
    }

    function showWinner() {
        // Display the winner based on the scores
        const hasilAkhir = document.querySelector('.hasil-akhir');

        if (scorePlayer > scoreCom) {
            hasilAkhir.textContent = 'Anda Menang!';
            hasilAkhir.classList.add("container-hasil-menang");
        } else if (scorePlayer < scoreCom) {
            hasilAkhir.textContent = 'Anda Kalah!';
            hasilAkhir.classList.add("container-hasil-kalah");

        } else {
            hasilAkhir.textContent = 'Hasil Akhir: Seri!';
            hasilAkhir.classList.add("container-hasil-seri");

        }
        // Show the start button again
        start.style.display = 'block';
    }
}

const dark2 = document.getElementById('dark');

dark2.onclick = function () {
    document.body.classList.toggle('darkk');
}