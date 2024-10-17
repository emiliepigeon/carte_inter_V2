Vous avez dit :
carte_fond_labi.svg
Fichier
a partir de ce fichier svg je voudrai crer une appliction pour crer une carte interactive avec plusieurs point de départ etun seul point d'arrivée j'aimerai utiliser un canvas et du js avec un algo detype graph explique moi etape par etape ou fais moi des suggestions
ChatGPT a dit :
ChatGPT

Pour créer une application de carte interactive en utilisant un fichier SVG, un canevas HTML5, du JavaScript, et un algorithme de graphe pour tracer des chemins avec plusieurs points de départ et un seul point d'arrivée, voici les étapes détaillées que je te propose :
1. Chargement et rendu du fichier SVG sur le canevas

    Étape 1 : Charger ton fichier SVG sur un canevas HTML5.
    Étape 2 : Extraire les données importantes de l'image SVG (les points de départ, le point d'arrivée, les chemins entre eux). Cela peut se faire soit en interprétant directement le contenu SVG, soit en utilisant des balises spécifiques comme des cercles pour les points d'intérêt.

2. Ajout des points interactifs (points de départ et d'arrivée)

    Étape 3 : Créer une interface utilisateur qui permet d’ajouter ou de sélectionner des points sur la carte. Ces points seront marqués comme des nœuds du graphe.
        Utilise les événements click pour capturer les coordonnées du curseur sur le canevas et placer un point.
        Les points de départ peuvent être multiples, donc il faudra permettre à l'utilisateur d'en ajouter plusieurs.

3. Construction du graphe à partir des points

    Étape 4 : Créer un graphe (sous forme de liste d’adjacence ou de matrice d'adjacence) en connectant les points ajoutés (nœuds). Chaque point de la carte (départ ou intermédiaire) sera un nœud, et les chemins entre eux seront les arêtes du graphe avec des poids (par exemple, les distances euclidiennes entre les points).

4. Algorithme pour trouver le plus court chemin

    Étape 5 : Implémenter un algorithme de plus court chemin comme Dijkstra ou A (A-star)* pour trouver le chemin optimal entre les différents points de départ et le point d'arrivée.
        Dijkstra est efficace pour trouver le plus court chemin en termes de distance, tandis que A* est plus performant dans les grands graphes en prenant en compte une heuristique comme la distance manhattan ou euclidienne.
    Étape 6 : Une fois le chemin trouvé, dessiner ce chemin sur le canevas en connectant les points sélectionnés par des lignes.

5. Interactions et visualisation dynamique

    Étape 7 : Permettre à l'utilisateur de visualiser dynamiquement les changements lorsqu'il ajoute ou déplace un point. Tu peux utiliser des méthodes comme requestAnimationFrame pour mettre à jour le canevas en temps réel.

6. Structure suggérée du projet
a. HTML

html

<canvas id="carteCanvas" width="800" height="600"></canvas>
<script src="app.js"></script>

b. JavaScript (exemple simplifié)

javascript

// Variables globales
let points = [];  // Liste des points ajoutés par l'utilisateur
let graph = {};   // Représentation du graphe (matrice ou liste d'adjacence)
let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Charger l'image SVG sur le canvas
let img = new Image();
img.src = '/mnt/data/carte_fond_labi.svg';  // Chemin du fichier SVG
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};

// Ajouter des points de départ/arrivée
canvas.addEventListener('click', function(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  
  // Ajouter le point dans la liste des nœuds
  points.push({ x: x, y: y });
  
  // Recalculer les chemins
  updateGraph();
});

// Fonction pour mettre à jour le graphe
function updateGraph() {
  // Parcourir tous les points pour créer un graphe
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
      // Ajouter au graphe
      addEdge(i, j, distance);
    }
  }
  
  // Algorithme de plus court chemin
  let path = dijkstra(graph, points);
  
  // Dessiner le chemin sur le canvas
  drawPath(path);
}

// Fonction pour dessiner le chemin
function drawPath(path) {
  ctx.beginPath();
  for (let i = 0; i < path.length - 1; i++) {
    let p1 = points[path[i]];
    let p2 = points[path[i + 1]];
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  }
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

// Algorithme de Dijkstra (à implémenter)
function dijkstra(graph, points) {
  // Implémentation de Dijkstra ou A*
  return []; // Retourne le chemin le plus court
}

7. Options avancées

    Étape 8 : Ajouter des couches supplémentaires à ta carte, comme des zones inaccessibles ou des obstacles, qui influenceront les poids dans le graphe.
    **Étape

Vous avez dit :
donnes moi les fichier html et le script js utilisant mon image
ChatGPT a dit :
ChatGPT

Voici les fichiers HTML et JavaScript qui utilisent ton image SVG pour créer une carte interactive avec plusieurs points de départ et un point d'arrivée. L'idée est de charger l'image SVG dans un canevas, de permettre à l'utilisateur de sélectionner des points, puis de tracer le plus court chemin entre eux à l'aide de l'algorithme de Dijkstra.
1. Fichier HTML (index.html)

html

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte Interactive</title>
    <style>
        canvas {
            border: 1px solid black;
            margin-top: 20px;
        }
        #instructions {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Carte Interactive</h1>
    <div id="instructions">
        Cliquez sur la carte pour ajouter des points de départ. Cliquez deux fois sur le point d'arrivée.
    </div>
    <canvas id="carteCanvas" width="800" height="600"></canvas>
    <script src="app.js"></script>
</body>
</html>

2. Fichier JavaScript (app.js)

javascript

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = '/mnt/data/carte_fond_labi.svg';  // Chemin du fichier SVG
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};

// Ajouter des points de départ et un point d'arrivée
canvas.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (!endPoint) {
        // Ajouter un point de départ si le point d'arrivée n'a pas été sélectionné
        startPoints.push({ x: x, y: y });
        points.push({ x: x, y: y });
        drawPoint(x, y, "blue");
    } else {
        alert("Le point d'arrivée est déjà sélectionné !");
    }
});

canvas.addEventListener('dblclick', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (!endPoint) {
        // Ajouter le point d'arrivée
        endPoint = { x: x, y: y };
        points.push({ x: x, y: y });
        drawPoint(x, y, "red");

        // Une fois le point d'arrivée sélectionné, on calcule les chemins
        updateGraph();
    } else {
        alert("Le point d'arrivée est déjà sélectionné !");
    }
});

// Fonction pour dessiner un point sur le canevas
function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Fonction pour mettre à jour le graphe
function updateGraph() {
    // Parcourir tous les points pour créer le graphe
    graph = {}; // Réinitialiser le graphe
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let distance = calcDistance(points[i], points[j]);
            addEdge(i, j, distance);
            addEdge(j, i, distance);
        }
    }

    // Trouver le plus court chemin avec Dijkstra
    let path = dijkstra(graph, startPoints, endPoint);

    // Dessiner le chemin le plus court sur le canevas
    if (path.length > 0) {
        drawPath(path);
    } else {
        alert("Aucun chemin trouvé !");
    }
}

// Calculer la distance euclidienne entre deux points
function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// Ajouter une arête dans le graphe
function addEdge(from, to, weight) {
    if (!graph[from]) {
        graph[from] = [];
    }
    graph[from].push({ node: to, weight: weight });
}

// Fonction pour dessiner le chemin
function drawPath(path) {
    ctx.beginPath();
    for (let i = 0; i < path.length - 1; i++) {
        let p1 = points[path[i]];
        let p2 = points[path[i + 1]];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Algorithme de Dijkstra pour trouver le chemin le plus court
function dijkstra(graph, starts, end) {
    let distances = {};
    let previous = {};
    let pq = new PriorityQueue();
    let endIndex = points.indexOf(end);

    // Initialiser les distances à l'infini sauf pour les points de départ
    for (let i = 0; i < points.length; i++) {
        distances[i] = Infinity;
        previous[i] = null;
    }
    starts.forEach((start) => {
        let startIndex = points.indexOf(start);
        distances[startIndex] = 0;
        pq.enqueue(startIndex, 0);
    });

    while (!pq.isEmpty()) {
        let current = pq.dequeue().element;

        if (current === endIndex) {
            // Si on atteint le point d'arrivée, on arrête
            let path = [];
            while (previous[current] !== null) {
                path.unshift(current);
                current = previous[current];
            }
            return path;
        }

        if (graph[current]) {
            graph[current].forEach(neighbor => {
                let alt = distances[current] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    previous[neighbor.node] = current;
                    pq.enqueue(neighbor.node, alt);
                }
            });
        }
    }

    return [];
}

// File de priorité pour l'algorithme de Dijkstra
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

Explication :

    HTML : Le canevas est défini avec une largeur de 800px et une hauteur de 600px. Il n'y a que des styles simples et une description des actions attendues.
    JavaScript :
        Le script charge d'abord l'image SVG dans le canevas.
        Ensuite, il permet d'ajouter plusieurs points de départ (en cliquant) et un seul point d'arrivée (en double-cliquant).
        Une fois les points ajoutés, un graphe est construit, et l'algorithme de Dijkstra est utilisé pour trouver le chemin le plus court entre les points de départ et d'arrivée.
        Les chemins sont dessinés en vert sur la carte.

Comment l'utiliser :

    Mets les fichiers index.html et app.js dans le même répertoire.
    Ouvre le fichier index.html dans un navigateur.
    Clique pour ajouter des points de départ (en bleu) et double-clique pour sélectionner le point d'arrivée (en rouge).
    Le chemin le plus court sera tracé en vert.

Si tu as besoin d'une fonctionnalité plus spécifique ou d'améliorations, n'hésite pas à me demander !






Explication des changements :

    Chemin de l'image SVG : Le fichier SVG est maintenant référencé dans le dossier assets via img.src = 'assets/carte_fond_labi.svg';.
    CSS séparé : Le fichier CSS a été séparé pour gérer les styles du canevas et de la page de manière indépendante.

Organisation des fichiers :

    index.html : Fichier principal qui inclut le canevas et le script.
    style.css : Fichier de style pour la mise en page et le style du canevas.
    app.js : Fichier JavaScript qui contient la logique pour gérer l'interactivité avec la carte, le graphe, et l'algorithme de Dijkstra.

Tu peux maintenant organiser les fichiers comme suit :

markdown

- projet/
   - index.html
   - style.css
   - app.js
   - assets/
      - carte_fond_labi.svg

Il te suffit de placer le fichier SVG dans le dossier assets et de lancer le fichier index.html dans ton navigateur pour voir la carte interactive en action.

Modifications principales dans le JavaScript :

    Redimensionnement de l'image : La méthode ctx.drawImage(img, 0, 0, canvas.width, canvas.height) redimensionne l'image SVG pour qu'elle remplisse l'intégralité du canevas.
    Fonction redrawMap() : Cette fonction permet de redessiner l'image à chaque interaction avec la carte (ajout de points, calcul du chemin) afin de s'assurer que l'image reste bien visible en arrière-plan.

Organisation des fichiers :

    index.html : Structure principale du projet.
    style.css : Gère les styles.
    app.js : Contient toute la logique pour afficher l'image, gérer les points et utiliser l'algorithme de Dijkstra.

Place ton fichier SVG dans le dossier assets et ouvre le fichier index.html pour tester l'application.

//////////////// 16/10/24 pt de départ

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === endPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    if (isCalculating) {
        calculateAllRoutes();
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;
let currentPointType = 'start'; // 'start', 'intermediate', 'end'

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
    } else {
        clickCount = 1;
    }
    
    lastClickedPoint = newPoint;

    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(newPoint);
        clickCount = 0;
        lastClickedPoint = null;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    switch(currentPointType) {
        case 'start':
            if (clickCount === 1 && startPoints.length < 5) {
                startPoints.push(point);
                points.push(point);
                if (startPoints.length === 5) {
                    currentPointType = 'intermediate';
                }
            }
            break;
        case 'intermediate':
            if (clickCount === 2) {
                intermediatePoints.push(point);
                points.push(point);
            }
            break;
        case 'end':
            if (clickCount === 3 && !endPoint) {
                endPoint = point;
                points.push(point);
                currentPointType = 'start'; // Revenir au début du cycle
            }
            break;
    }

    // Passer au type de point suivant si le nombre de clics est correct
    if ((currentPointType === 'start' && clickCount === 1) ||
        (currentPointType === 'intermediate' && clickCount === 2) ||
        (currentPointType === 'end' && clickCount === 3)) {
        currentPointType = getNextPointType();
    }

    redrawMap();
}

function getNextPointType() {
    switch(currentPointType) {
        case 'start':
            return startPoints.length < 5 ? 'start' : 'intermediate';
        case 'intermediate':
            return endPoint ? 'start' : 'end';
        case 'end':
            return 'start';
    }
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
        if (endPoint === point) endPoint = null;
    }
}

startButton.addEventListener('click', function() {
    if (!endPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    startPoints = [];
    intermediatePoints = [];
    endPoint = null;
    graph = {};
    currentPointType = 'start';
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    let endIndex = points.indexOf(endPoint);
    startPoints.forEach((startPoint, index) => {
        let startIndex = points.indexOf(startPoint);
        let path = dijkstra(graph, startIndex, endIndex);
        console.log(`Route ${index + 1}:`, path.map(i => points[i]));
        drawRouteWithBezier(path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = points[path[i]];
        let p2 = points[path[i + 1]];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        if (intermediatePoints.includes(p2) || p2 === endPoint) {
            // Si le point suivant est un point intermédiaire ou le point d'arrivée, on trace une ligne droite
            ctx.lineTo(p2.x, p2.y);
        } else {
            // Sinon, on utilise une courbe de Bézier
            let midPoint = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            
            let controlPoint = {
                x: midPoint.x + (midPoint.y - p1.y) * 0.5,
                y: midPoint.y - (midPoint.x - p1.x) * 0.5
            };
            
            ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, p2.x, p2.y);
        }
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function dijkstra(graph, start, end) {
    let distances = {};
    let previous = {};
    let pq = new PriorityQueue();

    for (let i = 0; i < points.length; i++) {
        distances[i] = Infinity;
        previous[i] = null;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        let current = pq.dequeue().element;

        if (current === end) {
            let path = [];
            while (previous[current] !== null) {
                path.unshift(current);
                current = previous[current];
            }
            path.unshift(start);
            return path;
        }

        if (graph[current]) {
            graph[current].forEach(neighbor => {
                let alt = distances[current] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    previous[neighbor.node] = current;
                    pq.enqueue(neighbor.node, alt);
                }
            });
        }
    }

    return [];
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
///////////////////////////

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === endPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    if (isCalculating) {
        calculateAllRoutes();
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);
    if (endPoint === point) endPoint = null;

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!endPoint) {
                endPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Un seul point d'arrivée autorisé.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
        if (endPoint === point) endPoint = null;
    }
}

startButton.addEventListener('click', function() {
    if (!endPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    startPoints = [];
    intermediatePoints = [];
    endPoint = null;
    graph = {};
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    startPoints.forEach((startPoint, index) => {
        let path = [startPoint, ...intermediatePoints, endPoint];
        console.log(`Route ${index + 1}:`, path);
        drawRouteWithBezier(path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

// La fonction dijkstra n'est plus nécessaire car nous n'utilisons plus l'algorithme de recherche de chemin

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
/////////////////// PAS MALpeux mieux faire

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let playButton = document.getElementById('playButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === endPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    if (isCalculating) {
        calculateAllRoutes();
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);
    if (endPoint === point) endPoint = null;

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!endPoint) {
                endPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Un seul point d'arrivée autorisé.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
        if (endPoint === point) endPoint = null;
    }
}

startButton.addEventListener('click', function() {
    if (!endPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    startPoints = [];
    intermediatePoints = [];
    endPoint = null;
    graph = {};
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    routeHistory = []; // Réinitialiser l'historique
    startPoints.forEach((startPoint, index) => {
        let path = [points.indexOf(startPoint)];
        intermediatePoints.forEach(point => {
            path.push(points.indexOf(point));
        });
        path.push(points.indexOf(endPoint));
        
        let route = {
            id: `Route ${index + 1}`,
            path: path.map(i => ({
                x: points[i].x,
                y: points[i].y,
                type: startPoints.includes(points[i]) ? 'départ' :
                      intermediatePoints.includes(points[i]) ? 'intermédiaire' :
                      'arrivée'
            }))
        };
        routeHistory.push(route);
        
        console.log(`Route ${index + 1}:`, route.path);
        drawRouteWithBezier(path.map(i => points[i]), `hsl(${index * 60}, 100%, 50%)`);
    });
    
    updateHistoryList();
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = route.id;
        li.onclick = () => playRoute(index);
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach(point => {
        let color;
        switch(point.type) {
            case 'départ':
                color = 'blue';
                break;
            case 'intermédiaire':
                color = 'green';
                break;
            case 'arrivée':
                color = 'red';
                break;
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

playButton.addEventListener('click', function() {
    if (routeHistory.length > 0) {
        playRoute(0); // Jouer la première route par défaut
    } else {
        alert("Aucun trajet n'a été calculé.");
    }
});

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
/////////////////// pas mal mais point de départ fixé par le calcul & n'est plus pris en compte à modifier

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés
let selectedRouteIndex = -1; // Index de la route sélectionnée

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let playButton = document.getElementById('playButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === endPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Toujours afficher le point d'arrivée
    if (endPoint) {
        drawPoint(endPoint.x, endPoint.y, "red");
    }

    if (isCalculating) {
        calculateAllRoutes();
    } else if (selectedRouteIndex !== -1) {
        playRoute(selectedRouteIndex);
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);
    if (endPoint === point) endPoint = null;

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!endPoint) {
                endPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Un seul point d'arrivée autorisé.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
        if (endPoint === point) endPoint = null;
    }
}

startButton.addEventListener('click', function() {
    if (!endPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    startPoints = [];
    intermediatePoints = [];
    // Ne pas réinitialiser endPoint
    graph = {};
    selectedRouteIndex = -1;
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    startPoints.forEach((startPoint, index) => {
        let path = [points.indexOf(startPoint)];
        intermediatePoints.forEach(point => {
            path.push(points.indexOf(point));
        });
        path.push(points.indexOf(endPoint));
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: path.map(i => ({
                x: points[i].x,
                y: points[i].y,
                type: startPoints.includes(points[i]) ? 'départ' :
                      intermediatePoints.includes(points[i]) ? 'intermédiaire' :
                      'arrivée'
            }))
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path);
        drawRouteWithBezier(path.map(i => points[i]), `hsl(${index * 60}, 100%, 50%)`);
    });
    
    updateHistoryList();
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = route.id;
        li.onclick = () => {
            selectedRouteIndex = index;
            redrawMap();
        };
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach(point => {
        let color;
        switch(point.type) {
            case 'départ':
                color = 'blue';
                break;
            case 'intermédiaire':
                color = 'green';
                break;
            case 'arrivée':
                color = 'red';
                break;
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

playButton.addEventListener('click', function() {
    if (routeHistory.length > 0) {
        if (selectedRouteIndex === -1) {
            selectedRouteIndex = routeHistory.length - 1;
        }
        playRoute(selectedRouteIndex);
    } else {
        alert("Aucun trajet n'a été calculé.");
    }
});

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
///////////////////// pas mal mais je veux pouvoir effacer une route
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte Interactive</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Carte Interactive</h1>
    <div id="instructions">
        Cliquez sur la carte pour ajouter des points de départ. Double-cliquez pour définir un point d'arrivée.
    </div>
    <canvas id="carteCanvas" width="800" height="600"></canvas>
    <div class="button-container">
        <button id="startButton">Lancer le calcul</button>
        <button id="stopButton">Arrêter</button>
        <button id="resetButton">Réinitialiser</button>
        <button id="playButton">Play</button>
        <ul id="historyList"></ul>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
////////////
// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let endPoint = null; // Point d'arrivée unique
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés
let selectedRouteIndex = -1; // Index de la route sélectionnée
let fixedEndPoint = null; // Point d'arrivée fixe pour toutes les routes

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let playButton = document.getElementById('playButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Toujours afficher le point d'arrivée fixe
    if (fixedEndPoint) {
        drawPoint(fixedEndPoint.x, fixedEndPoint.y, "red");
    }

    if (isCalculating) {
        calculateAllRoutes();
    } else if (selectedRouteIndex !== -1) {
        playRoute(selectedRouteIndex);
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    startPoints = [];
    intermediatePoints = [];
    // Ne pas réinitialiser fixedEndPoint
    if (fixedEndPoint) {
        points.push(fixedEndPoint);
    }
    graph = {};
    selectedRouteIndex = -1;
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    startPoints.forEach((startPoint, index) => {
        let path = [points.indexOf(startPoint)];
        intermediatePoints.forEach(point => {
            path.push(points.indexOf(point));
        });
        path.push(points.indexOf(fixedEndPoint));
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: path.map(i => ({
                x: points[i].x,
                y: points[i].y,
                type: startPoints.includes(points[i]) ? 'départ' :
                      intermediatePoints.includes(points[i]) ? 'intermédiaire' :
                      'arrivée'
            }))
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path);
        drawRouteWithBezier(path.map(i => points[i]), `hsl(${index * 60}, 100%, 50%)`);
    });
    
    updateHistoryList();
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = route.id;
        li.onclick = () => {
            selectedRouteIndex = index;
            redrawMap();
        };
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach(point => {
        let color;
        switch(point.type) {
            case 'départ':
                color = 'blue';
                break;
            case 'intermédiaire':
                color = 'green';
                break;
            case 'arrivée':
                color = 'red';
                break;
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

playButton.addEventListener('click', function() {
    if (routeHistory.length > 0) {
        if (selectedRouteIndex === -1) {
            selectedRouteIndex = routeHistory.length - 1;
        }
        playRoute(selectedRouteIndex);
    } else {
        alert("Aucun trajet n'a été calculé.");
    }
});

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
///////////// pas mal du tout

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let fixedEndPoint = null; // Point d'arrivée unique et fixe
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let clearRoutesButton = document.getElementById('clearRoutesButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Toujours afficher le point d'arrivée fixe
    if (fixedEndPoint) {
        drawPoint(fixedEndPoint.x, fixedEndPoint.y, "red");
    }

    // Dessiner toutes les routes enregistrées
    routeHistory.forEach((route, index) => {
        drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    calculateAllRoutes();
    isCalculating = false;
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = fixedEndPoint ? [fixedEndPoint] : [];
    startPoints = [];
    intermediatePoints = [];
    graph = {};
    redrawMap();
});

clearRoutesButton.addEventListener('click', function() {
    routeHistory = [];
    updateHistoryList();
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    startPoints.forEach((startPoint, index) => {
        let path = [points.indexOf(startPoint)];
        intermediatePoints.forEach(point => {
            path.push(points.indexOf(point));
        });
        path.push(points.indexOf(fixedEndPoint));
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: path.map(i => ({
                x: points[i].x,
                y: points[i].y,
                type: startPoints.includes(points[i]) ? 'départ' :
                      intermediatePoints.includes(points[i]) ? 'intermédiaire' :
                      'arrivée'
            }))
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path);
    });
    
    updateHistoryList();
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = route.id;
        
        let playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playRoute(index);
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteRoute(index);
        
        li.appendChild(playButton);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach(point => {
        let color;
        switch(point.type) {
            case 'départ':
                color = 'blue';
                break;
            case 'intermédiaire':
                color = 'green';
                break;
            case 'arrivée':
                color = 'red';
                break;
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

function deleteRoute(index) {
    routeHistory.splice(index, 1);
    updateHistoryList();
    redrawMap();
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
///////////// SUPER

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let startPoints = []; // Points de départ (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let fixedEndPoint = null; // Point d'arrivée unique et fixe
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let clearRoutesButton = document.getElementById('clearRoutesButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (startPoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Toujours afficher le point d'arrivée fixe
    if (fixedEndPoint) {
        drawPoint(fixedEndPoint.x, fixedEndPoint.y, "red");
    }

    // Dessiner toutes les routes enregistrées
    routeHistory.forEach((route, index) => {
        drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 3) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    startPoints = startPoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (startPoints.length < 5) {
                startPoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        startPoints = startPoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || startPoints.length === 0) {
        alert("Veuillez sélectionner au moins un point de départ et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    calculateAllRoutes();
    isCalculating = false;
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = fixedEndPoint ? [fixedEndPoint] : [];
    startPoints = [];
    intermediatePoints = [];
    graph = {};
    redrawMap();
});

clearRoutesButton.addEventListener('click', function() {
    routeHistory = [];
    updateHistoryList();
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    startPoints.forEach((startPoint, index) => {
        let path = [points.indexOf(startPoint)];
        intermediatePoints.forEach(point => {
            path.push(points.indexOf(point));
        });
        path.push(points.indexOf(fixedEndPoint));
        
        let routePoints = path.map(i => points[i]);
        let distance = calculateRouteDistance(routePoints);
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: routePoints,
            distance: distance
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path, `Distance: ${distance.toFixed(2)}`);
    });
    
    updateHistoryList();
}

function calculateRouteDistance(routePoints) {
    let distance = 0;
    for (let i = 0; i < routePoints.length - 1; i++) {
        distance += calcDistance(routePoints[i], routePoints[i + 1]);
    }
    return distance;
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = `${route.id} - Distance: ${route.distance.toFixed(2)}`;
        
        let playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playRoute(index);
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteRoute(index);
        
        li.appendChild(playButton);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach((point, i) => {
        let color;
        if (i === 0) {
            color = 'blue'; // Point de départ
        } else if (i === route.path.length - 1) {
            color = 'red'; // Point d'arrivée
        } else {
            color = 'green'; // Points intermédiaires
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

function deleteRoute(index) {
    routeHistory.splice(index, 1);
    updateHistoryList();
    redrawMap();
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
///////////////// 17/10/24

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let seaStartPoint = null; // Point de départ en mer (unique)
let landDeparturePoints = []; // Points de départ à terre (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let fixedEndPoint = null; // Point d'arrivée unique et fixe
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let currentRoute = null; // Route actuellement calculée

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (point === seaStartPoint) {
            drawPoint(point.x, point.y, "turquoise");
        } else if (landDeparturePoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Dessiner la route actuelle si elle existe
    if (currentRoute) {
        drawRouteWithBezier(currentRoute.path, "purple");
    }
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 4) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Ajouter le point à sa catégorie
    switch(clickCount) {
        case 1:
            if (landDeparturePoints.length < 5) {
                landDeparturePoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ à terre autorisés.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
        case 4:
            if (!seaStartPoint) {
                seaStartPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point de départ en mer est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint && nearestPoint !== seaStartPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        landDeparturePoints = landDeparturePoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || !seaStartPoint || landDeparturePoints.length === 0) {
        alert("Veuillez sélectionner un point de départ en mer, au moins un point de départ à terre et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    calculateRoute();
    isCalculating = false;
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    currentRoute = null;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    seaStartPoint = null;
    landDeparturePoints = [];
    intermediatePoints = [];
    fixedEndPoint = null;
    currentRoute = null;
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateRoute() {
    let path = [seaStartPoint];
    let remainingPoints = [...intermediatePoints, ...landDeparturePoints];
    
    while (remainingPoints.length > 0) {
        let nearestPoint = findNearestPoint(path[path.length - 1], remainingPoints);
        path.push(nearestPoint);
        remainingPoints = remainingPoints.filter(p => p !== nearestPoint);
    }
    
    path.push(fixedEndPoint);

    let distance = calculateRouteDistance(path);
    
    currentRoute = {
        path: path,
        distance: distance
    };
    
    console.log("Route calculée:", currentRoute.path, "Distance:", distance.toFixed(2));
}

function findNearestPoint(currentPoint, pointsList) {
    let nearestPoint = null;
    let minDistance = Infinity;
    
    for (let point of pointsList) {
        let distance = calcDistance(currentPoint, point);
        if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = point;
        }
    }
    
    return nearestPoint;
}

function calculateRouteDistance(routePoints) {
    let distance = 0;
    for (let i = 0; i < routePoints.length - 1; i++) {
        distance += calcDistance(routePoints[i], routePoints[i + 1]);
    }
    return distance;
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

// Implémentation simplifiée de l'algorithme de Dijkstra
function dijkstra(graph, start, end) {
    let distances = {};
    let previous = {};
    let pq = new PriorityQueue();

    for (let vertex in graph) {
        if (vertex == start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (!pq.isEmpty()) {
        let minVertex = pq.dequeue();
        if (minVertex === end) break;

        for (let neighbor of graph[minVertex]) {
            let alt = distances[minVertex] + neighbor.weight;
            if (alt < distances[neighbor.node]) {
                distances[neighbor.node] = alt;
                previous[neighbor.node] = minVertex;
                pq.enqueue(neighbor.node, alt);
            }
        }
    }

    let path = [];
    for (let vertex = end; vertex != null; vertex = previous[vertex]) {
        path.unshift(vertex);
    }
    
    return { path: path, distance: distances[end] };
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        let newItem = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > newItem.priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(newItem);
        }
    }
    
    dequeue() {
        return this.items.shift().element;
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
////////////////////

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let seaStartPoint = null; // Point de départ en mer (unique)
let landDeparturePoints = []; // Points de départ à terre (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let fixedEndPoint = null; // Point d'arrivée unique et fixe
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let clearRoutesButton = document.getElementById('clearRoutesButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (point === seaStartPoint) {
            drawPoint(point.x, point.y, "turquoise");
        } else if (landDeparturePoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Dessiner toutes les routes enregistrées
    routeHistory.forEach((route, index) => {
        drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 4) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    landDeparturePoints = landDeparturePoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (!seaStartPoint) {
                seaStartPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point de départ en mer est déjà défini.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (landDeparturePoints.length < 5) {
                landDeparturePoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ à terre autorisés.");
            }
            break;
        case 4:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint && nearestPoint !== seaStartPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        landDeparturePoints = landDeparturePoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || !seaStartPoint || landDeparturePoints.length === 0) {
        alert("Veuillez sélectionner un point de départ en mer, au moins un point de départ à terre et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    calculateAllRoutes();
    isCalculating = false;
    redrawMap();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    seaStartPoint = null;
    landDeparturePoints = [];
    intermediatePoints = [];
    fixedEndPoint = null;
    graph = {};
    routeHistory = [];
    redrawMap();
    updateHistoryList();
});

clearRoutesButton.addEventListener('click', function() {
    routeHistory = [];
    updateHistoryList();
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    landDeparturePoints.forEach((landStartPoint, index) => {
        let path = [seaStartPoint];
        intermediatePoints.forEach(point => {
            path.push(point);
        });
        path.push(landStartPoint);
        path.push(fixedEndPoint);
        
        let distanceSeaToLand = calculateRouteDistance([seaStartPoint, ...intermediatePoints, landStartPoint]);
        let distanceLandToEnd = calculateRouteDistance([landStartPoint, fixedEndPoint]);
        let totalDistance = distanceSeaToLand + distanceLandToEnd;
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: path,
            distanceSeaToLand: distanceSeaToLand,
            distanceLandToEnd: distanceLandToEnd,
            totalDistance: totalDistance
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path, 
                    `Distance mer-terre: ${distanceSeaToLand.toFixed(2)}`,
                    `Distance terre-arrivée: ${distanceLandToEnd.toFixed(2)}`,
                    `Distance totale: ${totalDistance.toFixed(2)}`);
    });
    
    updateHistoryList();
}

function calculateRouteDistance(routePoints) {
    let distance = 0;
    for (let i = 0; i < routePoints.length - 1; i++) {
        distance += calcDistance(routePoints[i], routePoints[i + 1]);
    }
    return distance;
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = `${route.id} - Distance mer-terre: ${route.distanceSeaToLand.toFixed(2)}, 
                          Distance terre-arrivée: ${route.distanceLandToEnd.toFixed(2)}, 
                          Distance totale: ${route.totalDistance.toFixed(2)}`;
        
        let playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playRoute(index);
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteRoute(index);
        
        li.appendChild(playButton);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach((point, i) => {
        let color;
        if (i === 0) {
            color = 'turquoise'; // Point de départ en mer
        } else if (i === route.path.length - 2) {
            color = 'blue'; // Point de départ à terre
        } else if (i === route.path.length - 1) {
            color = 'red'; // Point d'arrivée
        } else {
            color = 'green'; // Points intermédiaires
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

function deleteRoute(index) {
    routeHistory.splice(index, 1);
    updateHistoryList();
    redrawMap();
}
///// Fonctionne bien

// Variables globales
let points = []; // Liste des points ajoutés (nœuds du graphe)
let seaStartPoint = null; // Point de départ en mer (unique)
let landDeparturePoints = []; // Points de départ à terre (maximum 5)
let intermediatePoints = []; // Points intermédiaires
let fixedEndPoint = null; // Point d'arrivée unique et fixe
let graph = {}; // Représentation du graphe
let isCalculating = false; // État du calcul
let routeHistory = []; // Historique des trajets calculés

let canvas = document.getElementById('carteCanvas');
let ctx = canvas.getContext('2d');

// Boutons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let clearRoutesButton = document.getElementById('clearRoutesButton');

// Éléments pour l'historique
let historyList = document.getElementById('historyList');

// Charger l'image SVG sur le canevas
let img = new Image();
img.src = 'assets/carte_fond_labi.svg';
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function redrawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les points
    points.forEach((point) => {
        if (point === seaStartPoint) {
            drawPoint(point.x, point.y, "turquoise");
        } else if (landDeparturePoints.includes(point)) {
            drawPoint(point.x, point.y, "blue");
        } else if (point === fixedEndPoint) {
            drawPoint(point.x, point.y, "red");
        } else if (intermediatePoints.includes(point)) {
            drawPoint(point.x, point.y, "green");
        }
    });

    // Dessiner toutes les routes enregistrées
    routeHistory.forEach((route, index) => {
        drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
    });
}

let clickCount = 0;
let clickTimer = null;
let lastClickedPoint = null;

canvas.addEventListener('click', function(event) {
    if (isCalculating) return;

    let x = event.offsetX;
    let y = event.offsetY;
    let newPoint = { x: x, y: y };

    if (lastClickedPoint && Math.abs(lastClickedPoint.x - x) < 10 && Math.abs(lastClickedPoint.y - y) < 10) {
        clickCount++;
        if (clickCount > 4) clickCount = 1;
    } else {
        clickCount = 1;
        lastClickedPoint = newPoint;
    }
    
    if (clickTimer) clearTimeout(clickTimer);
    
    clickTimer = setTimeout(() => {
        handleClick(lastClickedPoint);
        clickCount = 0;
    }, 300); // 300ms délai pour détecter les clics multiples
});

function handleClick(point) {
    if (!point) return;

    // Supprimer le point de son ancienne catégorie
    if (point === seaStartPoint) seaStartPoint = null;
    landDeparturePoints = landDeparturePoints.filter(p => p !== point);
    intermediatePoints = intermediatePoints.filter(p => p !== point);
    if (point === fixedEndPoint) fixedEndPoint = null;

    // Ajouter le point à sa nouvelle catégorie
    switch(clickCount) {
        case 1:
            if (!seaStartPoint) {
                seaStartPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point de départ en mer est déjà défini.");
            }
            break;
        case 2:
            intermediatePoints.push(point);
            if (!points.includes(point)) points.push(point);
            break;
        case 3:
            if (landDeparturePoints.length < 5) {
                landDeparturePoints.push(point);
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Maximum 5 points de départ à terre autorisés.");
            }
            break;
        case 4:
            if (!fixedEndPoint) {
                fixedEndPoint = point;
                if (!points.includes(point)) points.push(point);
            } else {
                alert("Le point d'arrivée est déjà défini.");
            }
            break;
    }
    redrawMap();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Gestion de la suppression des points
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        let nearestPoint = findNearestPoint(lastClickedPoint);
        if (nearestPoint && nearestPoint !== fixedEndPoint && nearestPoint !== seaStartPoint) {
            removePoint(nearestPoint);
            redrawMap();
        }
    }
});

function findNearestPoint(point) {
    if (!point) return null;
    return points.find(p => Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10);
}

function removePoint(point) {
    let index = points.findIndex(p => p === point);
    if (index !== -1) {
        points.splice(index, 1);
        landDeparturePoints = landDeparturePoints.filter(p => p !== point);
        intermediatePoints = intermediatePoints.filter(p => p !== point);
    }
}

startButton.addEventListener('click', function() {
    if (!fixedEndPoint || !seaStartPoint || landDeparturePoints.length === 0) {
        alert("Veuillez sélectionner un point de départ en mer, au moins un point de départ à terre et un point d'arrivée.");
        return;
    }
    isCalculating = true;
    updateGraph();
    calculateAllRoutes();
    isCalculating = false;
    redrawMap();
    updateHistoryList();
});

stopButton.addEventListener('click', function() {
    isCalculating = false;
    redrawMap();
});

resetButton.addEventListener('click', function() {
    isCalculating = false;
    landDeparturePoints = [];
    intermediatePoints = [];
    points = points.filter(p => p === seaStartPoint || p === fixedEndPoint);
    graph = {};
    redrawMap();
});

clearRoutesButton.addEventListener('click', function() {
    routeHistory = [];
    updateHistoryList();
    redrawMap();
});

function updateGraph() {
    graph = {};
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let distance = calcDistance(points[i], points[j]);
                addEdge(i, j, distance);
            }
        }
    }
}

function calcDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function addEdge(from, to, weight) {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ node: to, weight: weight });
}

function calculateAllRoutes() {
    landDeparturePoints.forEach((landStartPoint) => {
        let path = [seaStartPoint];
        let landStartIndex = points.indexOf(landStartPoint);
        let firstHalfIntermediates = intermediatePoints.filter(p => points.indexOf(p) < landStartIndex);
        let secondHalfIntermediates = intermediatePoints.filter(p => points.indexOf(p) > landStartIndex);
        
        path = path.concat(firstHalfIntermediates);
        path.push(landStartPoint);
        path = path.concat(secondHalfIntermediates);
        path.push(fixedEndPoint);
        
        let distanceSeaToLand = calculateRouteDistance([seaStartPoint, ...firstHalfIntermediates, landStartPoint]);
        let distanceLandToEnd = calculateRouteDistance([landStartPoint, ...secondHalfIntermediates, fixedEndPoint]);
        let totalDistance = distanceSeaToLand + distanceLandToEnd;
        
        let route = {
            id: `Route ${routeHistory.length + 1}`,
            path: path,
            distanceSeaToLand: distanceSeaToLand,
            distanceLandToEnd: distanceLandToEnd,
            totalDistance: totalDistance
        };
        routeHistory.push(route);
        
        console.log(`Route ${routeHistory.length}:`, route.path, 
                    `Distance mer-terre: ${distanceSeaToLand.toFixed(2)}`,
                    `Distance terre-arrivée: ${distanceLandToEnd.toFixed(2)}`,
                    `Distance totale: ${totalDistance.toFixed(2)}`);
    });
}

function calculateRouteDistance(routePoints) {
    let distance = 0;
    for (let i = 0; i < routePoints.length - 1; i++) {
        distance += calcDistance(routePoints[i], routePoints[i + 1]);
    }
    return distance;
}

function drawRouteWithBezier(path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];
        
        if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
        }

        let midPoint = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        
        let controlPoint1 = {
            x: midPoint.x + (midPoint.y - p1.y) * 0.5,
            y: midPoint.y - (midPoint.x - p1.x) * 0.5
        };

        let controlPoint2 = {
            x: midPoint.x - (midPoint.y - p2.y) * 0.5,
            y: midPoint.y + (midPoint.x - p2.x) * 0.5
        };
        
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, p2.x, p2.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    routeHistory.forEach((route, index) => {
        let li = document.createElement('li');
        li.textContent = `${route.id} - Distance mer-terre: ${route.distanceSeaToLand.toFixed(2)}, 
                          Distance terre-arrivée: ${route.distanceLandToEnd.toFixed(2)}, 
                          Distance totale: ${route.totalDistance.toFixed(2)}`;
        
        let playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playRoute(index);
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteRoute(index);
        
        li.appendChild(playButton);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function playRoute(index) {
    let route = routeHistory[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    route.path.forEach((point, i) => {
        let color;
        if (point === seaStartPoint) {
            color = 'turquoise';
        } else if (landDeparturePoints.includes(point)) {
            color = 'blue';
        } else if (point === fixedEndPoint) {
            color = 'red';
        } else {
            color = 'green';
        }
        drawPoint(point.x, point.y, color);
    });
    
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`);
}

function deleteRoute(index) {
    routeHistory.splice(index, 1);
    updateHistoryList();
    redrawMap();
}
/////////



