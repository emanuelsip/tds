let registerUsers = [];
const tarde = document.getElementById("tarde");
const noche = document.getElementById("noche");
const manana = document.getElementById("manana");
const dateactual = document.getElementById("dateactual");
const climas = document.getElementsByClassName("clima");

function displayClima(data){
    const setParams = (element,dataT) => {
        element.style.display="block";
        element.querySelector("span").innerHTML = dataT.conditions + " " + dataT.temperature + "c&#176;";
        element.querySelector("div").setAttribute("class",dataT.conditions);
    }
    // console.log(climas.length,data);
    for(var i = 0; i<climas.length;i++){
        if(i<data.length){
            setParams(climas[i],data[i]);
        }else{
            climas[i].style.display = "none";
        }
    }
}
function evaluateDate(){
    const fechaActual = document.getElementById("date").value;
    // const dateToCheck = new Date(fechaActual);
    // const givenDateOnly = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate());
    const today = new Date();
    const month = (today.getMonth()+1);
    const currentDate = today.getFullYear()+"-"+ (month<10?"0":"")+month+"-"+ today.getDate();
    // const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // console.log(fechaActual , currentDate);
    const todayCheck = fechaActual === currentDate;

    dateactual.innerHTML = String(fechaActual).replace("-"," ");
    return todayCheck;
}
document.getElementById("date").addEventListener("change",()=>{
    tarde.style.display="none";
    noche.style.display="none";
    manana.style.display="none";
    dateactual.innerHTML = "";
    window.comunicacion.peticion(evaluateDate());
    window.comunicacion.obtenerdatos((event, data)=>{
        // console.log(data);
        displayClima(data);
    })
});
