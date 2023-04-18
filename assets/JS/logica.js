const URL_BASE = 'https://digimon-api.vercel.app/api/digimon';
let contenido;
let dataName;
let dataImg;
let carta;
let dataNivel;
let dataImagenes;
let Nivel;



$(document).ready(function () {
    contenido = document.getElementById("contenido");
    //carta = document.getElementById( );
    carta = document.getElementById("tarjeta");

    //Consumo API con Fetch
    fetch(URL_BASE)
        .then(resp => resp.json())
        .then(datos => {
            tabla(datos);
            // console.log('result: ',datos);
            // console.log('result: ',datos[0]['level']);
            dataNivel = JSON.parse(JSON.stringify(datos));
            // console.log('DataLevel: ',datalevel);
            dataImagenes = JSON.parse(JSON.stringify(datos));
            //console.log('datos :>> ', datalevel);
        });

    //Función tabla para mostrar todos los datos en una tabla
    function tabla(datos) {
        contenido.innerHTML = "";
        for (let temp of datos) {
            // console.log('temp: ',temp['name'])
             contenido.innerHTML += ` <tr>
  <td >${temp.name}</td>
  <td><img  width="60px" height="60px" src="${temp.img}" alt=""></td>
  <td>${temp.level}</td>
</tr> `
        }
    }
});



function capturaDato() {
    let nombre = document.getElementById("datos").value;
    //nombre = nombre.toLowerCase();
    //console.log('digimon: ',nombre);
    document.getElementById("tabla1").style.display = "none";
    document.getElementById("tabla_nivel").style.display = "none";
    document.getElementById("galeria").style.display = "none";
    document.getElementById("tarjeta").style.display = "block";
    //console.log('url: ',URL_BASE + "/?name=" + nombre);
    fetch(URL_BASE + "/name/" + nombre)
    
        .then(resp => resp.json())
        .then(datos => {
            //console.log('datos :>> ', datos);
            if (!datos.error) {
                tarjeta(datos);
            }
        });
}

function mostrarNivel() {
    let nivel = document.getElementById("contenido2");
    document.getElementById("tabla1").style.display = "none";
    document.getElementById("galeria").style.display = "none";
    document.getElementById("tarjeta").style.display = "none";
    document.getElementById("tabla_nivel").style.display = "block";
    
    nivel.innerHTML = "";
    for (let temp of dataNivel) {
        nivel.innerHTML += ` <tr>
<td >${temp.level}</td>   
<td>${temp.name}</td>
</tr> `
    }
}

function mostrarImagenes() {
    let img = document.getElementById("galeria");
    document.getElementById("tabla1").style.display = "none";
    document.getElementById("tarjeta").style.display = "none";
    document.getElementById("galeria").style.display = "block";
    document.getElementById("tabla_nivel").style.display = "none";

    img.innerHTML = "";
    for (let temp of dataImagenes) {
        img.innerHTML += ` 
         <div id="card" class="card">
        <img src="${temp.img}" class="card-img-top" alt=" imagen ${temp.name}">
        <div class="card-body">
          <h6 class="card-title">${temp.name}</h6>
          <p class="card-text">${temp.level}</p>
        </div>
      </div>
          
  `
    }
}

function tarjeta(datos) {
    carta.innerHTML = "";

    if(datos['ErrorMsg']==undefined){
        for (let temp of datos) {
            //console.log('temp: ',temp['name'])
            carta.innerHTML += ` 
              <div id="tarjSola" class="card mb-3 container" style="max-width: 600px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${temp.img}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">"NOMBRE: ${temp.name}"</h5>
              <p class="card-text">"NIVEL: ${temp.level}"</p>
             </div>
          </div>
        </div>
      </div>
         `
        }
    }else{
        //console.log('temp: ',temp['name'])
            carta.innerHTML += ` 
              <div id="tarjSola" class="card mb-3 container" style="max-width: 600px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">"NOMBRE: No encontrado"</h5>
              <p class="card-text">"NIVEL: No encontrado"</p>
             </div>
          </div>
        </div>
      </div>
         `
        
    }
    
    
}

