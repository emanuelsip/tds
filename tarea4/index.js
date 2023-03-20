let filtro = 'platform=pc&category=shooter';
const badge = document.getElementsByClassName("badge");
const listgames = document.getElementById("listajuegos");
const ordenarpor = document.getElementById("listajuegos");

Array.from(badge).forEach((element) => {
    element.addEventListener('click',(e)=>{
        var targetElement = e.target;
        // console.log(targetElement);
        crearFiltro(targetElement.innerHTML.trim(),'tag');
    })
});

function crearFiltro(texto,tipo){
    listgames.innerHTML = '';
    const orderExiste = document.getElementById("orderby").value!= '';
    filtro = (tipo=='tag'?'category='+texto:'');
    filtro += (orderExiste?'&':'');
    filtro += (tipo=='platform' ||  orderExiste ?'platform='+document.getElementById("orderby").value:'');
    // filtro += (orderExiste?'&':'');
    filtro += (tipo=='sort-by'?'sort-by='+texto:'');
    console.log(orderExiste);
    get_juegos();
}
function loaderToggle(){
    listgames.innerHTML = '<img src = "giphy.gif" class="img-thumbnail"/>';
}
function limpiar(){
    filtro = "platform=pc&category=shooter";
    get_juegos();
}
async function get_juegos(){
    loaderToggle();

    let url = 'https://www.freetogame.com/api/games?';
    let template =  (titulo,thumbnail,descripcion,link)=>{
        return   `<div class="col-2"> <div class="card"  >
                    <img src="${thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descripcion}</p>
                        <a href="javascript:" onclick="getPreview('${link}')" class="btn btn-primary">Ver</a>
                    </div>
                    </div>
                    </div>`;
    }
    await get_data(url+filtro).then((resultados)=>{
        listgames.innerHTML = '';
        resultados.forEach(game => {
            listgames.innerHTML = listgames.innerHTML + template(game.title,game.thumbnail,game.short_description,game.game_url);
        });
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