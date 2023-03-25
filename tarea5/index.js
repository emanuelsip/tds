let filtro = {category:'voxel'};
const badge = document.getElementsByClassName("badge");
const listgames = document.getElementById("listajuegos");
const ordenarpor = document.getElementById("listajuegos");
let dataResponse = {};
Array.from(badge).forEach((element) => {
    element.addEventListener('click',(e)=>{
        var targetElement = e.target;
        // console.log(targetElement);
        setFiltro(targetElement.innerHTML.trim(),'category');
    })
});

document.getElementById('filtroclean').addEventListener('click',limpiar);

document.getElementById('orderby').addEventListener('change',(e) => {
    const selectedIndex = e.selectedIndex;
    const selectedOption = e.options[selectedIndex];
    setFiltro(selectedOption.value,'sort-by')
});

document.getElementById("guardar").addEventListener('click',(e)=>{
    window.comunicacion.guardar([getFiltro(),dataResponse]);
});

document.getElementById("consultar").addEventListener('click',(e)=>{
    window.comunicacion.consultar(getFiltro());
    window.comunicacion.respuestaconsulta((event,data)=>{
        rederResponse(JSON.parse(data));
    })
});


document.getElementById("filtrar").addEventListener('click',(e)=>{
    get_juegos();
});

function setFiltro(texto,tipo){
    filtro[tipo] = texto;
}
function getFiltro(){
    
    const paramGet = new URLSearchParams();
    for (const llave in filtro) {
        paramGet.append(llave, filtro[llave]);
    }
    return paramGet.toString();
}
function loaderToggle(){
    listgames.innerHTML = '<img src = "giphy.gif" class="img-thumbnail"/>';
}
function limpiar(){
    filtro = {};
    get_juegos();
}

async function get_juegos(){
    loaderToggle();
    let url = 'https://www.freetogame.com/api/games?'+getFiltro();
    // console.log(url);
    await get_data(url).then((resultados)=>{
        listgames.innerHTML = '';
        dataResponse = resultados;
        rederResponse(resultados);
    });
}
function rederResponse(data){
    console.log(data);
    let template =  (titulo,thumbnail,descripcion,link)=>{
        return `<div class="col-2 mb-4">
                    <div class="card"  >
                        <img src="${thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">${titulo}</h6>
                            <a href="javascript:" onclick="getPreview('${link}')" class="btn btn-sm btn-primary">Ver</a>
                        </div>
                    </div>
                </div>`;
    }
    data.forEach(game => {
        listgames.innerHTML = listgames.innerHTML + template(game.title,game.thumbnail,game.short_description,game.game_url);
    });
}
function getPreview(url){
    var myModal = document.getElementById("myModal");
        document.getElementById("preview").src = url;
    var modal = new bootstrap.Modal(myModal);
        modal.show();
        console.log('modal');
}

async function get_data(url){
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}