// tresor.js

window.onload = function () {
    const canvas = document.getElementById('donjon');
    const ctx = canvas.getContext('2d');
    let fondLoaded = false;
    let svgLoaded = false;

    const fond = new Image();
    fond.src = 'assets/tresor.svg'; // Fichier d'image de fond

    let svgLabyrinthe;  // Pour stocker l'image du labyrinthe
    let cheminDessine = false;

    // Charger et dessiner le fond
    fond.onload = function () {
        fondLoaded = true;
        resetCanvas();
    };

    // Charger le labyrinthe SVG
    fetch('assets/labi.svg')
        .then(response => response.text())
        .then(svgText => {
            const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            svgLabyrinthe = new Image();

            svgLabyrinthe.onload = function () {
                svgLoaded = true;
                resetCanvas();
            };

            svgLabyrinthe.src = url;
        });

    // Réinitialiser le canevas (afficher le fond et le labyrinthe)
    function resetCanvas() {
        if (fondLoaded && svgLoaded) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(fond, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(svgLabyrinthe, 0, 0, canvas.width, canvas.height);
            cheminDessine = false;
        }
    }

    // Fonction pour tracer le chemin
    function trouverChemin() {
        if (cheminDessine) return;  // Éviter de redessiner si c'est déjà fait
        console.log("Début de la recherche du chemin...");
        
        // Exemple simple: dessiner une ligne du début à la fin (simulation)
        ctx.beginPath();
        ctx.moveTo(100, 100); // Point de départ simulé
        ctx.lineTo(canvas.width / 2, canvas.height / 2); // Centre du labyrinthe
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();

        cheminDessine = true;

        // Activer le bouton "Rejouer" une fois que le chemin est dessiné
        document.getElementById('replayBtn').disabled = false;
    }

    // Gestion des boutons
    document.getElementById('playBtn').addEventListener('click', function() {
        if (!cheminDessine) {
            trouverChemin();
        }
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
        resetCanvas();
        document.getElementById('replayBtn').disabled = true;
    });

    document.getElementById('replayBtn').addEventListener('click', function() {
        resetCanvas();
        setTimeout(trouverChemin, 500); // Rejouer après un court délai
    });
};
