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
        drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`, false);
    });

    // Si 5 routes ont été calculées, dessiner la meilleure en trait plein
    if (routeHistory.length === 5) {
        let bestRoute = findBestRoute();
        drawRouteWithBezier(bestRoute.path, 'black', true);
        drawCross(fixedEndPoint.x, fixedEndPoint.y, 'red');
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

function drawCross(x, y, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.moveTo(x - 5, y - 5);
    ctx.lineTo(x + 5, y + 5);
    ctx.moveTo(x + 5, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.stroke();
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

resetButton.addEventListener('click', function() {
    isCalculating = false;
    points = [];
    seaStartPoint = null;
    landDeparturePoints = [];
    intermediatePoints = [];
    fixedEndPoint = null;
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
    if (routeHistory.length >= 5) {
        alert("Vous avez déjà calculé 5 routes. Veuillez en supprimer pour en calculer de nouvelles.");
        return;
    }
    
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

function drawRouteWithBezier(path, color, isSolid = false) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    if (!isSolid) {
        ctx.setLineDash([5, 5]);
    } else {
        ctx.setLineDash([]);
    }
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
    drawRouteWithBezier(route.path, `hsl(${index * 60}, 100%, 50%)`, true);
    drawCross(fixedEndPoint.x, fixedEndPoint.y, 'red');
}

function deleteRoute(index) {
    routeHistory.splice(index, 1);
    updateHistoryList();
    redrawMap();
}

function findBestRoute() {
    return routeHistory.reduce((best, current) => 
        (current.totalDistance < best.totalDistance) ? current : best
    );
}
