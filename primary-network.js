var storage = new plog.storages.LocalStorage({ maxSize: 200 });
plog.useStorage(storage);
var primaryNetworkContainer = document.getElementById("primary-network");


// VALORES PREDETERMINADOS DENTRO DEL NETWORK
var primaryNetworkNodes = new vis.DataSet([
    { id: 1, label: "Nodo 1", dir: 'foward', arrows: 'to' },
    { id: 2, label: "Nodo 2", dir: 'foward', arrows: 'to' },
    { id: 3, label: "Nodo 3", dir: 'foward', arrows: 'to' },
    { id: 4, label: "Nodo 4", dir: 'foward', arrows: 'to' },
    { id: 5, label: "Nodo 5", dir: 'foward', arrows: 'to' }
]);

var primaryNetworkEdges = new vis.DataSet([
    { id: "1-1", from: 1, to: 2, label: "2", dir: "foward", arrows: 'to' },
    { id: "1-3", from: 1, to: 4, label: "4", dir: 'foward', arrows: 'to' },
    { id: "1-2", from: 1, to: 3, label: "5", dir: 'foward', arrows: 'to' },
    { id: "2-1", from: 2, to: 5, label: "1", dir: 'foward', arrows: 'to' },
    { id: "3-1", from: 3, to: 5, label: "4", dir: 'foward', arrows: 'to' },
    { id: "5-1", from: 5, to: 4, label: "3", dir: 'foward', arrows: 'to' }
]);

var primaryNetworkData = {
    nodes: primaryNetworkNodes,
    edges: primaryNetworkEdges
};

var options = {
    manipulation: {
        enabled: true,
        addNode: false,
        addEdge: false,
        editEdge: false,
        deleteNode: false,
        deleteEdge: true
    },
};
var primaryNetwork = new vis.Network(primaryNetworkContainer, primaryNetworkData, options);
primaryNetwork.setOptions(options);

var primaryNetworkNodeCounter = document.getElementById('primary-network-node-count');
primaryNetworkNodeCounter.innerText = getNodeLength();

var primaryNetworkEdgeCounter = document.getElementById('primary-network-edge-count');
primaryNetworkEdgeCounter.innerText = getEdgeLength();


function getNodeLength() {
    return primaryNetworkNodes.length;
}

function getEdgeLength() {
    return primaryNetworkEdges.length;
}

function updateCounters() {
    plog.info("Actualizando contadores");
    primaryNetworkNodeCounter.innerText = getNodeLength();
    primaryNetworkEdgeCounter.innerText = getEdgeLength();
}

//🥵🥵🥵🥵
/* function Verific_Bucle() {  // determina si existe algun bucle dentro del grafo
    var items = primaryNetworkEdges.get({           //filtra los datos de edges 
        filter: function (item) {
            return item.to == item.from;  // condicion de filtrado
        }
    });

    if (items.length == 0) return false;
    else return true;
} */
//-.-.-.-.-
/* function Grafo_ponderado() { //determina si las aristas tiene lable vacio,bool
    var items = primaryNetworkEdges.get({         //filtra los datos de edges
        filter: function (item) {
            return item.label == "";    // condicion de filtrado
        }
    });

    if (items.length == primaryNetworkEdges.length) return true; // todas las aristas tiene lable ""
    else return false;
} */
//-.-.-.-.-
//🥵🥵🥵🥵
//CREAMOS UNA MATRIZ A PARTIR DEL VECTOR QUE TIENE TODOS LOS IDS DE LOS NODOS
/* let generarMatriz = size => {
    let matriz = [];
    let random = () => 0;
    for (let x = 0; x < size; x++) {
        matriz[x] = [];
        for (let y = 0; y < size; y++) {
            matriz[x][y] = random();
        }
    }
    return matriz;
}; */

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ID = primaryNetworkNodes.length;
function addRandomNodeToPrimaryNetwork() {
    var weight = getRandomInt(0, 100000);
    plog.info(`Se añadio el nodo N°${ID}`);
    console.log("weight", weight);
    if (primaryNetworkNodes.getIds().includes(ID)) {
        if (weight > 1 && weight % 1 === 0) {
            primaryNetworkNodes.add({ id: ID + 1, label: `Nodo ${ID + 1}`, color: getRandomColor() });
            primaryNetworkEdges.add(
                {
                    id:
                        getRandomInt(0, ID) +
                        "-" +
                        ID + 1,
                    from: getRandomInt(0, ID),
                    to: getRandomInt(0, primaryNetworkNodes.lenght),
                    label: weight.toString(),
                    dir: 'foward',
                    arrows: 'to',
                }
            );
        }
    } else {
        if (weight > 1 && weight % 1 === 0) {
            primaryNetworkNodes.add({ id: ID, label: `Nodo ${ID}`, color: getRandomColor() });
            primaryNetworkEdges.add(
                {
                    id:
                        getRandomInt(0, ID) +
                        "-" +
                        ID,
                    from: getRandomInt(0, ID),
                    to: ID,
                    label: weight.toString(),
                    dir: 'foward',
                    arrows: 'to',
                }
            );
        }
    }
    resetSelects();
    populateSelects();
    updateCounters();
    $('#primary-network-add-node-modal').modal('hide');
    plog.info("Se agrega el nodo a sus respectivos select en la pagina");
    ID = ID + 1;
}

function addNodeToPrimaryNetwork() {
    let nodeValue = document.getElementById('primary-network-node-value').value;
    let nodeColor = document.getElementById('primary-network-node-color').value;
    let nodeLabel = document.getElementById('primary-network-node-label').value;
    let from = document.getElementById('primary-network-node-from');
    if (nodeValue) {
        document.getElementById('primary-network-node-value').value = '';
        plog.info(`Se añadió el nodo N°${ID}`);
        if (primaryNetworkNodes) {
            if (nodeLabel) {
                if (nodeColor) {
                    /*  if (to && from) {
                         nodes.add({
                             id: nodes.length + 1,
                             label: nodeLabel,
                             color: nodeColor,
                         });
                     } */
                     primaryNetworkNodes.add({ id: ID, label: nodeLabel, color: nodeColor })
                    primaryNetworkEdges.add({
                        id: `${primaryNetworkNodes.length + 1}-${from.options[from.selectedIndex].value + 1}`,
                        label: nodeLabel,
                        color: nodeColor,
                        from: from.options[from.selectedIndex].value,
                        to: primaryNetworkNodes.length - 1,
                        arrows: 'to',
                        dir: 'foward',
                    });
                } else {
                    primaryNetworkNodes.add({ id: ID, label: nodeLabel });
                }
            } else {
                if (nodeColor) {
                    primaryNetworkNodes.add({ id: ID, label: nodeValue, color: nodeColor })
                } else {
                    primaryNetworkNodes.add({ id: ID, label: nodeValue });
                }
            }
        }
        ID++;
        $('#addNodeModal').modal('hide');
    } else {
        $('#addAlert').show();
        setTimeout(() => {
            $('#addAlert').hide();
        }, 3000);
    }
    resetSelects();
    populateSelects();
    updateCounters();
}

function addEdge() {
    var fromSelect = document.getElementById('primary-network-edge-from');
    var toSelect = document.getElementById('primary-network-edge-to');
    var weight = document.getElementById("primary-network-edge-weight").value;

    if (weight < 1) {
        alert("no se pueden ingresar pesos negativos,signos o de valor 0");
        plog.warn(
            "se intento conectar dos nodos usando un peso negativo,signos o de valor 0 y se cancela la operacion"
        );
    } else if (weight % 1 != 0) {
        alert("ingrese solo numeros enteros");
        plog.warn(
            "se intento conectar dos nodos usando un peso decimal y se cancela la operacion"
        );
    } else {
        plog.info(
            "se conecto el nodo " +
            fromSelect.options[fromSelect.selectedIndex].value +
            " con el nodo " +
            toSelect.options[toSelect.selectedIndex].value +
            " con un peso de " +
            weight
        );
        var edges = primaryNetworkEdges.get();
        var edgesCount = primaryNetworkEdges.filter(
            aristas => aristas.from == fromSelect.options[fromSelect.selectedIndex].value
        );
        if (recorridoaristas(fromSelect.options[fromSelect.selectedIndex].value)[1] == true) {
            edgesCount = edgesCount.length + 1;
            primaryNetworkEdges.add(
                {
                    id:
                        fromSelect.options[fromSelect.selectedIndex].value +
                        "-" +
                        edgesCount,
                    from: fromSelect.options[fromSelect.selectedIndex].value,
                    to: toSelect.options[toSelect.selectedIndex].value,
                    label: weight.toString(),
                    arrows: 'to',
                    dir: 'foward',
                }
            );
            return;
        }
        if (recorridoaristas(fromSelect.options[fromSelect.selectedIndex].value)[1] == false) {
            primaryNetworkEdges.add(
                {
                    id: recorridoaristas(fromSelect.options[fromSelect.selectedIndex].value)[0],
                    from: fromSelect.options[fromSelect.selectedIndex].value,
                    to: toSelect.options[toSelect.selectedIndex].value,
                    label: weight.toString(),
                    arrows: 'to',
                    dir: 'foward',
                }
            );
            return;
        }
    }
    resetSelects();
    populateSelects();
    updateCounters();
}

function addRandomEdge() {
    console.log("primary");
    let from = getRandomInt(1, primaryNetworkNodes.length);
    let to = getRandomInt(1, primaryNetworkNodes.length);
    let max = Math.floor(Math.random());
    let weight = getRandomInt(1, 1000000);

    if (from == 0 || to == 0) {
        plog.warn(
            "se intento conectar nodos inexistentes,se alerta al usuario y se cancela la operacion"
        );
        alert("agregue nodos y vuelva a intentar");
    } else if (weight < 1) {
        alert("no se pueden ingresar pesos negativos,signos o de valor 0");
        plog.warn(
            "se intento conectar dos nodos usando un peso negativo,signos o de valor 0 y se cancela la operacion"
        );
    } else if (weight % 1 != 0) {
        alert("Ingrese solo numeros enteros");
        plog.warn(
            "Se intento conectar dos nodos usando un peso decimal y se cancela la operacion"
        );
    } else {
        var edgeCount = primaryNetworkEdges.get().filter(
            arista => arista.from == from
        );
        edgeCount = edgeCount.length + 1;
        /* while (edges.get().filter((edge) => edge.id === from+"-"+to) == 0) {
            from = getRandomInt(1, nodes.length - 1);
            to = getRandomInt(1, nodes.length - 1);
        } */
        /* var filtered = edges.get().filter((edge) => edge.id === from + "-" + to);
        while (filtered.length == 0) {
            from = getRandomInt(1, nodes.length - 1);
            to = getRandomInt(1, nodes.length - 1);
            filtered = edges.get().filter((edge) => edge.id === from + "-" + to);
        } */
        var filtered = primaryNetworkEdges.get().filter((edge) => edge.id === ((from-1) + "-" + (to-1)));
        if (filtered.length != 0) {
            plog.info(`El camino con id ${from-1}-${to-1} ya existe, omitiendo camino`);
        } else {
            plog.info(
                "se conecto el nodo " +
                from-1 +
                " con el nodo " +
                to-1 +
                " con un peso de " +
                weight
            );
            primaryNetworkEdges.add(
                {
                    id:
                        (from-1) +
                        "-" +
                        (to-1),
                    from: (from-1).toString(),
                    to: (to-1).toString(),
                    arrows: 'to',
                    dir: 'foward',
                    label: weight.toString(),
                }
            );
        }
    }
    /* resetSelects();
    populateSelects();
    updateCounters(); */
}

function deleteArrows() {
    var edgesCount = primaryNetworkEdges.getIds().length;
    let aux = primaryNetworkEdges.get({
        filter: function (item) {
            return item;
        }
    });
    for (i = 0; i < edgesCount; i++) {
        primaryNetworkEdges.updateOnly({ id: aux[i].id, dir: "" });
        primaryNetworkEdges.updateOnly({ id: aux[i].id, arrows: "" });
    }
}

function setArrows() {
    var edgesCount = primaryNetworkEdges.getIds().length;
    let aux = primaryNetworkEdges.get({
        filter: function (item) {
            return item;
        }
    });
    for (i = 0; i < edgesCount; i++) {
        primaryNetworkEdges.updateOnly({ id: aux[i].id, dir: "foward" });
        primaryNetworkEdges.updateOnly({ id: aux[i].id, arrows: "to" });
    }
}

function isDirectionalGraph() {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.dir == "foward" || item.label == "to";
        }
    });
    if (items.length != 0) alert('El grafo si es direccional');
    else return alert('El grafo no es direccional');
}

function clearData() {
    $('#primary-network-clear-canvas-modal').modal('hide');
    var nodeCount = primaryNetworkNodes.getIds().length;
    var edgeCount = primaryNetworkEdges.getIds().length;
    for (i = 1; i <= nodeCount; i++) {
        primaryNetworkNodes.clear();
    }
    for (i = 0; i < edgeCount; i++) {
        primaryNetworkEdges.clear();
    }
    resetSelects();
    nodeCounter.innerText = getNodeLength();
    edgeCounter.innerText = getEdgeLength();
    ID = 0;
}

function isWeightedGraph() {
    //determina si las aristas tiene lable vacio,bool
    var items = primaryNetworkEdges.get({
        //filtra los datos de edges
        filter: function (item) {
            return item.label == ""; // condicion de filtrado
        }
    });

    if (items.length !== primaryNetworkEdges.length) return alert('Si es un grafo ponderado');
    // todas las aristas tiene lable ""
    else return alert('No es un grafo ponderado');
}

function isMultigraph() {
    var items = primaryNetworkEdges.get({
        fields: ["from", "to"],
        type: {
            date: "ISODate"
        }
    });
    const search = items.reduce((acc, item) => {
        const key = JSON.stringify(item); //crea un valor en formato json y lo verifica como clave
        acc[key] = ++acc[key] || 0;
        return acc;
    }, {});
    const duplicates = items.filter(item => {
        return search[JSON.stringify(item)];
    });

    if (duplicates.length >= 2) {
        return alert('El grafo si es multigrafo');
    } else {
        return alert('El grafo no es multigrafo');
    }
}

function isWheelGraph() {
    // caminos=(2(nodos-1))
    var edgeCount = primaryNetworkEdges.getIds().length,
        nodeCount = primaryNetworkNodes.getIds().length;
    if (edgeCount == 2 * (nodeCount - 1)) {
        return alert('El grafo si es un grafo rueda');
    } else return alert('El grafo no es un grafo rueda');
}

function isCompleteGraph() {
    var edgeCount = primaryNetworkEdges.getIds().length,
        nodeCount = primaryNetworkNodes.getIds().length;
    if (edgeCount == (nodeCount * (nodeCount - 1)) / 2) {
        return alert('Si es un grafo completo');
    } else alert('No es un grafo completo');
}

// TODO: ADD LOGS TO PLOG
function nodeGrade(i) {
    //Grado para un nodo de id "i"
    var sum = 0;
    var aux_1 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i; //guarda las ids de los elementos que vengan de i
        }
    });
    var aux_2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i; //guarda las ids de los elementos que vengan de i
        }
    });
    sum = aux_1.length + aux_2.length;
    return sum;
}

// TODO: ADD LOGS TO PLOG
function grades() {
    var nodeCount = primaryNetworkNodes.getIds().length;
    var aux = [];
    for (var i = 0; i < nodeCount; i++) {
        aux[i] = nodeGrade(i);
    }
    return aux;
}

// TODO: ADD LOGS TO PLOG
function regular() {
    // si todos los grados del grafo son iguales el grafo es regular
    var nodeCount = primaryNetworkNodes.getIds().length;
    var aux = [],
        previous = 0;
    aux = grades();
    previous = aux[0]; // guarda la primera cantidad en el vector 1

    for (var i = 0; i < nodeCount; i++) {
        if (previous != aux[i]) {
            return alert('No es un grafo regular');
        } // verifica si el elemento anterior es diferente al siguente elemento
        previous = aux[i];
    }

    return alert('Si es un grafo regular'); //todos los grados son iguales
}

function createMatrix(fila, columna) {
    // genera 1 iretacion extra
    var matrix = [];
    for (var i = 0; i < fila; i++) {
        matrix[i] = new Array(columna);
    }
    var h = 0;
    for (var i = 0; i < fila; i++) {
        for (var j = 0; j < columna; j++) {
            matrix[i][j] = h;
        }
    }
    return matrix;
}

function adjacencyMatrix() {      //Para grafo dirigido
    var nodeCount = primaryNetworkNodes.getIds().length,
        aux = [];
    var items = primaryNetworkEdges.get({
        //extrae los valores de from y to y los guarda en un array
        fields: ["from", "to"],
        type: {
            date: "ISODate"
        }
    });
    aux = createMatrix(nodeCount, nodeCount);
    for (var i = 0; i < nodeCount; i++) {
        for (var j = 0; j < nodeCount; j++) {
            for (var z = 0; z < items.length; z++) {
                if (items[z].to - 1 == i && items[z].from - 1 == j) {
                    aux[j][i] = 1;
                }
            }
        }
    }
    return aux;
}

function showAdjacencyMatrix() {
    var container = document.getElementById('primary-network-matrix-container');
    var matrix = adjacencyMatrix();
    container.innerHTML = JSON.stringify(matrix).replaceAll('],', ']<br/>');
}

function show() {
    showAdjacencyMatrix()
    console.log("Adyacente", adjacencyMatrix());
}

function connectedNodes(i) {
    // funcion para obtener los from y to de los nodos
    var fromsArray = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i + 1;
        }
    });
    var toArray = fromsArray.map(function (items) {
        return items.from;
    });
    var aux_1 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });
    var aux_2 = aux_1.map(function (items) {
        return items.to;
    });

    Array.prototype.push.apply(aux_2, toArray);
    return aux_2;
}

function simpleRoad() {
    // Comprueba si el recorrido es simple
    let simplePaths;
    var paths = primaryNetworkNodes.getIds();

    for (let i = 0; i < paths.length; i++) {
        let primaryNetworkNodes = connectedNodes(i);

        let repeated = primaryNetworkNodes.filter(
            //se buscan los recorridos repetidos dentro del array
            (value, pos, self) => {
                return (
                    self.slice(pos + 1).indexOf(value) >= 0 && pos === self.indexOf(value)
                );
            }
        );

        if (repeated >= 1) {
            // si encuentra un valor repetido finaliza de analizar los demas recorridos
            simplePaths = false;
        } else {
            simplePaths = true;
        }
    }
    return simplePaths; // retorna verdadero o falso si el recorrido es simple
}

function isSimplePath() {
    if (simpleRoad()) {
        alert('El recorrido si es simple');
    } else {
        alert('El recorrido no es simple');
    }
}

// TODO: FIX
function deleteNode() {
    var selectedNode = document.getElementById('primary-network-delete-node-select');
    // var n = primaryNetworkNodes.getIds();
    // console.log("n", selectedNode.options[selectedNode.selectedIndex].value);
    // primaryNetworkNodes.remove(selectedNode.options[selectedNode.selectedIndex].value - 1);

    /* SET NEW VALUES TO SELECT */
    // selectedNode.remove(selectedNode.options[selectedNode.selectedIndex - 1].value);
    //if (selectedNode) {
    /* if(n.contains(selectedNode.options[selectedNode.selectedIndex].value)) {
        var index = n.indexOf(selectedNode.options[selectedNode.selectedIndex].value);
        console.log("index", n[index]);
    } */
    //}


    var CantidadNodos = primaryNetworkNodes.getIds().length;
    var CantidadAristas = primaryNetworkEdges.getIds().length;

    for (i = 1; i <= CantidadNodos; i++) {
        console.log(primaryNetworkNodes.get(i));
        if (primaryNetworkNodes.get(i).id == selectedNode.options[selectedNode.selectedIndex].value) {
            primaryNetworkNodes.remove(primaryNetworkNodes.get(i).id);
        }
    }

    /* var edges1 = primaryNetworkEdges.get({
        filter: function (item) {
            return item;
        }
    });

    for (i = 0; i < CantidadAristas; i++) {
        primaryNetworkEdges.remove(edges1[i]);
    } */
}

// TODO
function resetSelects() {
    $('#addAlert').hide();
    var select = document.getElementsByName("ELIMINAR")[0];
    var selecthasta = document.getElementsByName("HASTA")[0];
    var selectdesde = document.getElementsByName("DESDE")[0];
    var selectcamino1 = document.getElementsByName("nodoinicial")[0];
    var selectcamino2 = document.getElementsByName("nodofinal")[0];
    var n = primaryNetworkNodes.getIds();

    var edgesSelect = document.getElementsByName('edges-select');
    for (var i = 0; i < edgesSelect.length; i++) {
        while (edgesSelect[i].firstChild) {
            edgesSelect[i].removeChild(edgesSelect[i].lastChild);
        }
    }
    for (var i = 0; i < edgesSelect.length; i++) {
        var option = document.createElement("option");
        option.text = "Selecciona un nodo"
        edgesSelect[i].add(option)
    }

}

function populateSelects() {
    $('#addAlert').hide();
    var select = document.getElementsByName("ELIMINAR")[0];
    var selecthasta = document.getElementsByName("HASTA")[0];
    var selectdesde = document.getElementsByName("DESDE")[0];
    var selectcamino1 = document.getElementsByName("nodoinicial")[0];
    var selectcamino2 = document.getElementsByName("nodofinal")[0];
    var edgesSelect = document.getElementsByName('edges-select');
    var selectNodes = document.getElementsByName('primary-network-nodes');
    var n = primaryNetworkNodes.getIds();

    if (selectNodes) {
        for (var i = 0; i < selectNodes.length; i++) {
            for (var j = 0; j < n.length; j++) {
                var option = document.createElement("option");
                option.value = n[j];
                option.text = "Nodo " + n[j];
                selectNodes[i].add(option);
            }
        }
    }

    if (edgesSelect) {
        for (var i = 0; i < edgesSelect.length; i++) {
            for (var j = 0; j < n.length; j++) {
                var option = document.createElement("option");
                option.value = n[j];
                option.text = "Nodo " + n[j];
                edgesSelect[i].add(option);
            }
        }
    }
    if (select) {
        for (var i = 0; i < n.length; i++) {
            var option = document.createElement("option");
            option.value = n[i];
            option.text = "Nodo " + n[i];
            select.add(option);
        }
    }
    if (selecthasta) {
        for (var i = 0; i < n.length; i++) {
            var option = document.createElement("option");
            option.value = n[i];
            option.text = "Nodo " + n[i];
            selecthasta.add(option);
        }
    }
    if (selectdesde) {
        for (var i = 0; i < n.length; i++) {
            var option = document.createElement("option");
            option.value = n[i];
            option.text = "Nodo " + n[i];
            selectdesde.add(option);
        }
    }
    if (selectcamino1) {
        for (var i = 0; i < n.length; i++) {
            var option = document.createElement("option");
            option.value = n[i];
            option.text = "Nodo " + n[i];
            selectcamino1.add(option);
        }
    }
    if (selectcamino2) {
        for (var i = 0; i < n.length; i++) {
            var option = document.createElement("option");
            option.value = n[i];
            option.text = "Nodo " + n[i];
            selectcamino2.add(option);
        }
    }
}
populateSelects();

// ! ESTA FUNCION NO SIRVE
function ordenar(x) {
    var y = [];
    var arreglofinal = [];
    var z;
    var separar;
    for (var i = 0; i < x.length; i++) {
        z = x[i].id;
        separar = z.split("-");
        y[i] = separar[1];
    }
    y.sort((a, b) => a - b);

    for (var i = 0; i < x.length; i++) {
        z = x[i].id;
        separar = z.split("-");
        arreglofinal[i] = separar[0] + "-" + y[i];
    }
    return arreglofinal;
}

// ! ESTA FUNCION NO SIRVE
// ESTA FUNCION HACE: 
function recorridoaristas(value) {
    var count = 1;
    var returned = [];

    var edgeCount = primaryNetworkEdges.get().filter(edge => edge.from === value);
    edgeCount = ordenar(edgeCount);
    for (var i = 0; i < edgeCount.length; i++) {
        var verifica = `${value}-${count}`;
        if (edgeCount[i] != verifica) {
            returned[0] = verifica;
            returned[1] = false;
            break;
        }
        count++;
    }
    returned[1] = true;
    return returned;
}
recorridoaristas(1);

//FUNCION PARA CONECTAR NODOS
function conectarnodos() {
    var desde = document.getElementsByName("DESDE")[0].value;
    var hasta = document.getElementsByName("HASTA")[0].value;
    var peso = document.getElementsByName("PESO")[0].value;

    if (desde == 0 || hasta == 0) {
        plog.warn(
            "se intento conectar nodos inexistentes,se alerta al usuario y se cancela la operacion"
        );
        alert("agregue nodos y vuelva a intentar");
    } else if (peso < 1) {
        alert("no se pueden ingresar pesos negativos,signos o de valor 0");
        plog.warn(
            "se intento conectar dos nodos usando un peso negativo,signos o de valor 0 y se cancela la operacion"
        );
    } else if (peso % 1 != 0) {
        alert("ingrese solo numeros enteros");
        plog.warn(
            "se intento conectar dos nodos usando un peso decimal y se cancela la operacion"
        );
    } else {
        plog.info(
            "se conecto el nodo " +
            desde +
            " con el nodo " +
            hasta +
            " con un peso de " +
            peso
        );
        var aristas = primaryNetworkEdges.get();
        var contadoraristas = aristas.filter(
            aristas => aristas.from == document.getElementsByName("DESDE")[0].value
        );
        if (recorridoaristas(desde)[1] == true) {
            contadoraristas = contadoraristas.length + 1;
            primaryNetworkEdges.add([
                {
                    id:
                        document.getElementsByName("DESDE")[0].value +
                        "-" +
                        contadoraristas,
                    from: document.getElementsByName("DESDE")[0].value,
                    to: document.getElementsByName("HASTA")[0].value,
                    label: document.getElementsByName("PESO")[0].value
                }
            ]);
            return;
        }
        if (recorridoaristas(desde)[1] == false) {
            primaryNetworkEdges.add([
                {
                    id: recorridoaristas(desde)[0],
                    from: document.getElementsByName("DESDE")[0].value,
                    to: document.getElementsByName("HASTA")[0].value,
                    label: document.getElementsByName("PESO")[0].value
                }
            ]);
            return;
        }
    }
}

//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo() {
    var selectedNode = document.getElementById('primary-network-delete-node-select');

    ide = selectedNode.options[selectedNode.selectedIndex].value;

    var borrar = primaryNetworkNodes.getIds();
    borrar = borrar.indexOf(ide);
    if (ide == 0) {
        plog.warn(
            "Se intento eliminar un nodo cuando no hay ninguno,se cancela la operacion y se manda alerta "
        );
        alert("Para eliminar un nodo,agregue uno primero");
    }
    plog.info("Se elimina el nodo " + ide + " junto con todas sus aristas ");
    //var selecthasta = document.getElementsByName("HASTA")[0];
    //var selectdesde = document.getElementsByName("DESDE")[0];
    //var selectcamino1 = document.getElementsByName("nodoinicial")[0];
    //var selectcamino2 = document.getElementsByName("nodofinal")[0];
    selectedNode.remove(selectedNode.options[selectedNode.selectedIndex].value);
    //selecthasta.remove(borrar);
    //selectdesde.remove(borrar);
    //selectcamino1.remove(borrar);
    //selectcamino2.remove(borrar);

    primaryNetworkNodes.remove(ide - 1);
    var aristas = primaryNetworkEdges.get();
    var contadoraristas = aristas.filter(aristas => aristas.from == ide);

    var x = contadoraristas.length;

    while (x != 0) {
        primaryNetworkEdges.remove(contadoraristas[x - 1].id);
        x = x - 1;
    }

    contadoraristas = aristas.filter(aristas => aristas.to == ide);
    x = contadoraristas.length;
    while (x != 0) {
        primaryNetworkEdges.remove(contadoraristas[x - 1].id);
        x = x - 1;
    }
}

var arrayaux = [];
//Funcion

function verificaconexion(array) {
    var from1;
    var cantidad = primaryNetworkNodes.getIds();
    plog.info("Se rellena la s del grafo");
    arrayaux = generarMatriz(cantidad.length);
    for (var i = 0; i < arrayaux.length; i++) {
        for (var j = 0; j < arrayaux.length; j++) {
            from1 = vectornodos4(cantidad[i]);

            for (var z = 0; z < from1.length; z++) {
                if (cantidad[j] == from1[z]) {
                    arrayaux[i][j] = 1;
                }
            }
        }
    }
    return arrayaux;
}

var tabla;
var tabla1;
var tblBody;
var borrarcelda;
var celdaantigua;
var haytabla = false;
function createSecondaryTable() {
    show()
    var arrayX = verificaconexion();
    var cantidad = primaryNetworkNodes.getIds();
    var h;
    if (haytabla == true) {
        tabla.removeChild(tblBody);
        tabla1.removeChild(borrarcelda);
        haytabla = false;
        plog.info("Se borra la matriz generada anteriormente");
    }
    if (haytabla == false) {
        plog.info("Se crea la s del grafo");
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];

        // Crea un elemento <table> y un elemento <tbody>

        tabla = document.getElementById("matrizdecaminos");
        tabla1 = document.getElementById("matrizdecaminos");
        borrarcelda = document.createElement("tbody");
        tblBody = document.createElement("tbody");
        for (var i = 0; i < cantidad.length; i++) {
            celdaantigua = document.createElement("th");
            h = "N" + cantidad[i];
            var textoCelda = document.createTextNode(h);
            celdaantigua.appendChild(textoCelda);
            borrarcelda.appendChild(celdaantigua);
        }
        tabla1.appendChild(borrarcelda);
        // Crea las celdas
        for (var i = 0; i < cantidad.length; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            for (var j = 0; j < cantidad.length; j++) {
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(arrayX[i][j]);

                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }

        // posiciona el <tbody> debajo del elemento <table>

        tabla.appendChild(tblBody);
        // appends <table> into <body>

        //body.appendChild(tabla); deja la tabla de matriz por debajo de la pagina

        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
        haytabla = true;
        plog.info("Se muestra la s del grafo en una ventana modal");
        document.location.href = "#openModal";
    }
}

function revisar(from) {
    if (from[0] <= 1) {
        return true;
    } else return false;
}

function grafoconexo() {
    plog.info("Se comprueba si el grafo es conexo");
    var retornar;
    var grafoconexo1;
    var from1;
    var from2;
    var canid = primaryNetworkNodes.getIds();
    var comprobarsi = 0;

    //creamos for que recorra el largo de nodos que existen
    for (var i = 0; i < canid.length; i++) {
        from1 = vectornodos(i); //obtenemos un vector con los nodos a los cuales esta conectado
        //el nodo actual(nodo(i))
        from2 = vectornodos(canid[i]); //obtenemos lo mismo que en el anterior pero incluyendo el nodo(i)
        //llamamos a la funcion repetidos para ver si hay algun nodo conectado SOLO a si mismo o
        //en su defecto conectado a nada

        if (repetidos(from2).length <= 1 && revisar(repetidos(from2)) == false) {
            comprobarsi = 1;
        } else if (repetidos(from2).length <= 0) {
            comprobarsi = 1;
        }
        //entonces si esta vacio o solo esta conectado a si mismo se hace verdadero la sentencia
        //y se termina el bucle for
        if (comprobarsi == 1) {
            grafoconexo1 = true;
            break;
        } else {
            grafoconexo1 = false;
        }
    }

    if (grafoconexo1 == true) {
        retornar = true;
    } else {
        retornar = false;
    }
    return retornar;
}

function imprimirgrafoconexo() {
    var grafoconexo1 = grafoconexo();
    var retornar;

    if (grafoconexo1 == true) {
        retornar = "El grafo no es conexo";
    } else {
        retornar = "El grafo es conexo";
    }
    return retornar;
}

// funciona para el boton de comprobar si el grafo es conexo
function recargar(contenido) {
    plog.info("se muestra si el grafo es conexo");
    contenido = imprimirgrafoconexo();
    alert(contenido);
    // document.getElementById("conexo").innerHTML = contenido;
}

//FUNCION QUE ARROJA EN UN VECTOR TODOS LOS NODOS AL QUE ESTA CONECTADO EL NODO ACTUAL (I)
// RECOMENDABLE SOLO USAR EN FOR
function vectornodos(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i + 1;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });
    Array.prototype.push.apply(desde, hasta);
    return desde;
}
//FUNCION QUE HACE LO MISMO QUE LA ANTERIOR PERO ESTA INCLUYE AL MISMO NODO ESTE CONECTADO O NO
function vectornodos2(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i + 1;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });

    var items3 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });
    var hasta2 = items3.map(function (items) {
        return items.from;
    });

    Array.prototype.push.apply(desde, hasta);
    Array.prototype.push.apply(desde, hasta2);
    return desde;
}

//OBTIENE TODOS LOS ELEMENtOS REPETIDOS DENTRO DE UN VECTOR
function repetidos(vector) {
    var repetidos = {};

    vector.forEach(function (numero) {
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    var resultado = Object.values(repetidos);
    return resultado;
}
//
function vectornodos3(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i + 1;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });

    var items3 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i + 1;
        }
    });
    var hasta2 = items3.map(function (items) {
        return items.from;
    });

    var items4 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i + 1;
        }
    });
    var hasta3 = items4.map(function (items) {
        return items.to;
    });

    Array.prototype.push.apply(desde, hasta);
    Array.prototype.push.apply(desde, hasta2);
    Array.prototype.push.apply(desde, hasta3);
    return desde;
}
//MISMO QUE EL 2 PERO CON LA CONDICION DEL 3
function vectornodos4(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });
    Array.prototype.push.apply(desde, hasta);
    return desde;
}

function vectornodosGRADOS(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });

    var items3 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i;
        }
    });
    var hasta2 = items3.map(function (items) {
        return items.from;
    });

    var items4 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i;
        }
    });
    var hasta3 = items4.map(function (items) {
        return items.to;
    });

    Array.prototype.push.apply(desde, hasta);
    Array.prototype.push.apply(desde, hasta2);
    Array.prototype.push.apply(desde, hasta3);
    return desde;
}

/*
function addConexion(nodoInicial, nodoFinal, valorDistancia) {
  valorDistancia = parseInt(valorDistancia, 10);
  plog.info(
    "Se comprueba utlizando Dijkstra,el camino mas corto entre nodo los nodos"
  );
  buscarNodo = grafoDijkstra.filter(item => item.origen === nodoInicial);
  if (buscarNodo.length === 0) {
    conexion = [];
    conexion.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
    grafoDijkstra.push({ origen: nodoInicial, conexiones: conexion });
  } else {
    buscarNodo[0].conexiones.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
  }
} 

function shortestPath() {
  grafoDijkstra = [];
  var aristas = primaryNetworkEdges.get();
  var enlaces;
  var valores;
  for (var j = 0; j < aristas.length; j++) {
    addConexion(aristas[j].from, aristas[j].to, aristas[j].label);
    addConexion(aristas[j].to, aristas[j].from, aristas[j].label);
  }
  var g = new Graph();
  grafoDijkstra.forEach(function(value, key, array) {
    enlaces = {};

    value.conexiones.forEach(function(conexion) {
      enlaces[conexion.destino] = conexion.distancia;
    });

    g.addVertex(value.origen, enlaces);
  });
  var nodoINICIAL = document.getElementsByName("nodoinicial")[0].value;
  var nodoFINAL = document.getElementsByName("nodofinal")[0].value;
  if (nodoINICIAL == 0 || nodoFINAL == 0) {
    alert("agregue un nodo");
    plog.info(
      "Se intenta encontrar el camino mas corto con nodos inexistentes,se alerta al usuario y se cancela la operacion"
    );
    return;
  }
  if (nodoINICIAL == nodoFINAL) {
    alert("ingrese dos nodos distintos entre si");
    plog.info(
      "Se intenta comprobar el camino mas corto entre un nodo y si mismo,se alerta al usuario y se cancela la operacion"
    );
    return;
  }
  var i = nodoINICIAL.toString();
  var f = nodoFINAL.toString();

  camino = g
    .shortestPath(i, f)
    .concat(i)
    .reverse();
  
  plog.info(
    "Se muestra el camino mas corto entre el nodo " + i + " y el nodo " + f
  );

  return camino;
}
*/

function imprimirCamino() {
    var aux = shortestPath();
    var aux2 = "";
    for (var i = 0; i < aux.length; i++) {
        aux2 = aux2 + aux[i] + ",";
    }
    return aux2;
}

function recargarCamino(contenido) {
    var aux = shortestPath();
    var tamaño = 0;
    var aux2;
    var aristas = primaryNetworkEdges.get();

    contenido = imprimirCamino();
    contenido = contenido.substring(0, contenido.length - 1);
    alert("camino:" + contenido);
}

function aristarepetida(arista, vectorrepetido) {
    var repetido;
    for (let k = 0; k < vectorrepetido.length; k++) {
        if (arista == vectorrepetido[k]) {
            repetido = true;
            break;
        } else {
            repetido = false;
        }
    }
    return repetido;
}

function verticerepetido(vertice, vectorrepetido) {
    var repetido;
    for (let k = 0; k < vectorrepetido.length; k++) {
        if (vertice == vectorrepetido[k]) {
            repetido = true;
            break;
        } else {
            repetido = false;
        }
    }
    return repetido;
}

// poder identificar los edges de un nodo
function euleriano() {
    var conexo = grafoconexo();
    var cantid = primaryNetworkNodes.getIds();
    var imp = 0; // vertices con aristas impares
    var verticemax = 0;
    var verticemin = 0;
    var maxfrom = 0;
    var cantmin = 0;
    var camino = [];
    var aristas = primaryNetworkEdges.get();
    var min =
        aristas.filter(aristas => aristas.from == cantid[0]).length +
        aristas.filter(aristas => aristas.to == cantid[0]).length;

    if (conexo == false) {
        for (var i = 0; i < cantid.length; i++) {
            var to = aristas.filter(aristas => aristas.to == cantid[i]);
            var from = aristas.filter(aristas => aristas.from == cantid[i]);
            var cantaristas = from.length + to.length;


            if (cantaristas % 2 == 1) {
                imp++;
            }

            if (cantaristas > maxfrom) {
                maxfrom = cantaristas;

                verticemax = cantid[i];
            }


            if (cantaristas <= min) {

                min = cantaristas;
                if (cantaristas == 1) {
                    verticemin = cantid[i];
                    cantmin++;
                }
            }
        }
        if (imp < 3 && min > 1) {
            camino.push(verticemax);
            var aristas = primaryNetworkEdges.get();
            var aristasto = aristas.filter(aristas => aristas.to == verticemax);
            var contadoraristas = aristas.filter(
                aristas => aristas.from == verticemax
            );
            contadoraristas = contadoraristas.concat(aristasto);
            var vectoraristas = [];
            var cont = 0;
            var repetido = false;
            var vertices = [];

            for (var i = 0; i < aristas.length; i++) {
                for (var j = 0; j < contadoraristas.length; j++) {
                    //si el cont-1 es igual a un from o to
                    if (
                        contadoraristas[j].to == camino[cont] &&
                        contadoraristas[j].from != camino[cont - 1] &&
                        aristarepetida(contadoraristas[j], vectoraristas) != true
                    ) {
                        camino.push(contadoraristas[j].from);
                        vectoraristas.push(contadoraristas[j]);
                        cont++;
                    } else {
                        if (
                            contadoraristas[j].from == camino[cont] &&
                            aristarepetida(contadoraristas[j], vectoraristas) != true
                        ) {
                            camino.push(contadoraristas[j].to);
                            vectoraristas.push(contadoraristas[j]);
                            cont++;
                        }
                    }
                }

                aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
                contadoraristas = aristas.filter(
                    aristas => aristas.from == camino[cont]
                );
                contadoraristas = contadoraristas.concat(aristasto);
            }


        } else if (imp < 3 && min >= 1 && (cantmin == 1 || cantmin == 2)) {

            camino.push(verticemin);
            var aristas = primaryNetworkEdges.get();
            var aristasto = aristas.filter(aristas => aristas.to == verticemin);
            var contadoraristas = aristas.filter(
                aristas => aristas.from == verticemin
            );
            contadoraristas = contadoraristas.concat(aristasto);
            var vectoraristas = [];
            var cont = 0;
            var repetido = false;
            var vertices = [];

            for (var i = 0; i < aristas.length; i++) {
                for (var j = 0; j < contadoraristas.length; j++) {
                    if (
                        contadoraristas[j].to == camino[cont] &&
                        contadoraristas[j].from != camino[cont - 1] &&
                        aristarepetida(contadoraristas[j], vectoraristas) != true
                    ) {
                        camino.push(contadoraristas[j].from);
                        vectoraristas.push(contadoraristas[j]);

                        cont++;
                    } else {
                        if (
                            contadoraristas[j].from == camino[cont] &&
                            aristarepetida(contadoraristas[j], vectoraristas) != true
                        ) {
                            camino.push(contadoraristas[j].to);
                            vectoraristas.push(contadoraristas[j]);

                            cont++;
                        }
                    }
                }

                aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
                contadoraristas = aristas.filter(
                    aristas => aristas.from == camino[cont]
                );
                contadoraristas = contadoraristas.concat(aristasto);
            }

        }
    } else {
        plog.warn("no puede ser euleriano por que no es conexo");
    }
    return camino;
}

function imprimireuleriano() {
    var aux = euleriano();
    var aux2 = "";
    var aux3;

    if (aux.length == 0) {
        plog.info("Se comprueba que el grafo no es euleriano");
        aux3 = "El grafo no es euleriano";
        alert(aux3);
        //document.getElementById("euleriano").innerHTML = aux3;
    } else {
        plog.info("Se comprueba que el grafo si es euleriano");
        aux3 = "El grafo es euleriano y su camino es:";

        for (var i = 0; i < aux.length - 1; i++) {
            aux2 = aux2 + aux[i] + "->";
        }
        aux2 = aux2 + aux[aux.length - 1];
        alert(aux3 + aux2);
        // document.getElementById("euleriano").innerHTML = aux3 + aux2;
    }
}

function archivo() {
    var aux = "";
    var events = storage.getEvents();
    for (var i = 0; i < events.length - 1; i++) {
        aux = aux + JSON.stringify(events[i]) + "\n";
    }

    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:events/plain;charset=utf-8," + encodeURIComponent(aux)
    );
    element.setAttribute("download", "log.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById("download").addEventListener(
    "click",
    function () {
        // Genera la descarga del .txt

        archivo();
    },
    false
);

function verticesNOadyacentes() {
    var cantidaddenodos = primaryNetworkNodes.getIds();

    for (var i = 0; i < cantidaddenodos.length; i++) { }
}


function recorrerhamiltoniano() {
    var nodosid = primaryNetworkNodes.getIds();
    var aristas = primaryNetworkEdges.get();
    var conexo = grafoconexo();
    var min =
        aristas.filter(aristas => aristas.from == nodosid[0]).length +
        aristas.filter(aristas => aristas.to == nodosid[0]).length;
    var nodomin;
    var camino = [];
    if (conexo == false) {
        for (var i = 0; i < nodosid.length; i++) {
            var to = aristas.filter(aristas => aristas.to == nodosid[i]);
            var from = aristas.filter(aristas => aristas.from == nodosid[i]);
            var cantaristas = from.length + to.length;

            if (cantaristas <= min) {
                min = cantaristas;

                nodomin = nodosid[i];
            }
        }

        camino.push(nodomin);
        var aristasto = aristas.filter(aristas => aristas.to == nodomin);
        var contadoraristas = aristas.filter(aristas => aristas.from == nodomin);
        contadoraristas = contadoraristas.concat(aristasto);
        var vectornodos = [nodomin];
        var vectoraristas = [];
        var repetido = false;
        var repetidonodo = false;
        var cont = 0;

        for (var i = 0; i < nodosid.length; i++) {
            for (var j = 0; j < contadoraristas.length; j++) {
                //------------DESDE EL TO-----------------
                if (
                    contadoraristas[j].to == camino[cont] &&
                    contadoraristas[j].from != camino[cont - 1] &&
                    aristarepetida(contadoraristas[j], vectoraristas) != true &&
                    verticerepetido(contadoraristas[j].from, vectornodos) != true
                ) {
                    camino.push(contadoraristas[j].from);
                    vectornodos.push(contadoraristas[j].from);
                    vectoraristas.push(contadoraristas[j]);
                    cont++;

                } else {
                    //------------DESDE EL FROM--------------
                    if (
                        contadoraristas[j].from == camino[cont] &&
                        aristarepetida(contadoraristas[j], vectoraristas) != true &&
                        verticerepetido(contadoraristas[j].to, vectornodos) != true
                    ) {
                        camino.push(contadoraristas[j].to);
                        vectornodos.push(contadoraristas[j].to);
                        vectoraristas.push(contadoraristas[j]);
                        cont++;

                    }
                }
            }

            aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
            contadoraristas = aristas.filter(aristas => aristas.from == camino[cont]);
            contadoraristas = contadoraristas.concat(aristasto);
        }
    }


    return camino;
}

function imprimirhamiltoniano2() {
    var aux = recorrerhamiltoniano();
    var aux2 = "";
    var aux3;

    if (aux.length == 0) {
        plog.info("Se comprueba que el grafo no es hamiltoniano");
        aux3 = "El grafo no es hamiltoniano";
        alert(aux3);
    } else {
        plog.info("Se comprueba que el grafo si es hamiltoniano");
        aux3 = "El grafo es hamiltoniano y su camino es: ";

        for (var i = 0; i < aux.length - 1; i++) {
            aux2 = aux2 + aux[i] + "->";
        }
        aux2 = aux2 + aux[aux.length - 1];
        alert(aux3 + aux2);
    }
}

function imprimirgrafohamiltoniano() {
    var grafoham = grafoHamiltoniano();
    var retornar;

    if (grafoham == true) {
        retornar = "El grafo es Hamiltoniano";
    } else {
        retornar = "El grafo no es Hamiltoniano";
    }
    return retornar;
}

// funciona para el boton de comprobar si el grafo es conexo
function recargar3(contenido) {
    plog.info("Se comprueba que el grafo sea hamiltoniano");
    contenido = imprimirgrafohamiltoniano();
    document.getElementById("hamiltoniano").innerHTML = contenido;
}
/*  intento de prim
function recorreradyacente(nodo) {
  var aristas = primaryNetworkEdges.get();
  var aristasto = aristas.filter(aristas => aristas.to == nodo);
  var contadoraristas = aristas.filter(aristas => aristas.from == nodo);
  contadoraristas = contadoraristas.concat(aristasto);
  var aux = contadoraristas[0];
  var min = contadoraristas[0].label;
  
  
  for (let i=0; i < contadoraristas.length; i++) {
    
    if (contadoraristas[i].label <= min) {
      min = contadoraristas[i].label;
      
      aux = contadoraristas[i];
    }
  }
  
  return aux;
}
function aristasdeunnodo(nodo) {
  var aristas = primaryNetworkEdges.get();
  var aristasto = aristas.filter(aristas => aristas.to == nodo);
  var contadoraristas = aristas.filter(aristas => aristas.from == nodo);
  contadoraristas = contadoraristas.concat(aristasto);
  return contadoraristas;
}
function eliarisvect(arista,vector){ //elimina arista en vector
var aux = [];
for(let i = 0;i<vector.length;i++){
 if(vector[i]!=arista){
  aux.push(vector[i]);
 }
return aux;
}
}
function prim() {
  var nodos = primaryNetworkNodes.getIds();
  var aristas = primaryNetworkEdges.get();
  
  var aristaminima = recorreradyacente(nodos[0]);
  var aristasdesechables = [];
  var arisnodo = aristasdeunnodo(nodos[0]);
  var aux = nodos[0];
  var camino = [aux];
  var nodorepetido=[aux];
  var aristarepetida=aristas;
  aristarepetida=eliarisvect(aristaminima,aristarepetida);
  
  
  for (let i = 0; i < nodos.length; i++) {
    
    for (let j = 0; j < arisnodo.length; j++) {
      if (arisnodo != aristaminima) {
        aristasdesechables.push(arisnodo[j]);
      }
    }
    
    
    if (aux == aristaminima.from && verticerepetido(aristaminima.to,nodorepetido) != true) {
      
      
      aristarepetida=eliarisvect(aristaminima,aristarepetida);
      aristaminima = recorreradyacente(aristaminima.to,aristarepetida);
      nodorepetido.push(aristaminima.to);
      aux = aristaminima.to;
      camino.push(aux);
      
    } else {
      if (aux == aristaminima.to && verticerepetido(aristaminima.from,nodorepetido) != true){
        
      
        aristarepetida=eliarisvect(aristaminima,aristarepetida);
      aristaminima = recorreradyacente(aristaminima.from,aristarepetida);
       nodorepetido.push(aristaminima.from);
      aux = aristaminima.from;
      camino.push(aux);
      }
      
    }
  }
  
  return camino;
}
prim();
*/

function vectornodos4(i) {
    var items = primaryNetworkEdges.get({
        filter: function (item) {
            return item.from == i;
        }
    });

    var desde = items.map(function (items) {
        return items.to;
    });

    var items2 = primaryNetworkEdges.get({
        filter: function (item) {
            return item.to == i;
        }
    });
    var hasta = items2.map(function (items) {
        return items.from;
    });
    Array.prototype.push.apply(desde, hasta);
    return desde;
}





