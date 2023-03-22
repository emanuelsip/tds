let registerUsers = [];
function getClima(moments) {
    const climas = ['despejado','nublado','lluvioso'];
    var climasArr = new Array();
    
    for(var i = 1; i<= moments;i++){
        let temp = Math.floor(Math.random() * 26) + 5;
        let clime = climas[(Math.floor(Math.random() * 3) )];
        let clima = {
            temperature: temp,
            conditions: clime
        };
        climasArr.push(clima);
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(climasArr);        
            resolve(climasArr);
        }, 1000);
    });
}
async function getClimaData(cant) {
    try {
        const clima = await getClima(cant);
        return clima;
    } catch (error) {
        console.error(error);
    }
}
function displayClima(data){
    const tarde = document.getElementById("tarde");
    const noche = document.getElementById("noche");
    const manana = document.getElementById("manana");
    const setParams = (element,dataT) => {
        element.style.display="block";
        element.querySelector("span").innerHTML = dataT.conditions + " " + dataT.temperature + "c&#176;";
        element.querySelector("div").setAttribute("class",dataT.conditions);
    }
    if(evaluateDate()[0])
    {
        tarde.style.display="none";
        noche.style.display="none";
        setParams(manana,data[0]);
    }else{
        setParams(manana,data[0]);
        setParams(tarde,data[1]);
        setParams(noche,data[2]);
    }
}
function evaluateDate(){
    const fechaActual = document.getElementById("date").value;
    let dateactual = document.getElementById("dateactual");
    const dateToCheck = new Date(fechaActual);
    const today = new Date();
    const todayCheck = dateToCheck.toDateString() == today.toDateString() ;
    if(fechaActual !=''){
        dateactual.innerHTML = (dateToCheck.getDate()+1)+ " " +(dateToCheck.getMonth()+1) + " "+ dateToCheck.getFullYear();
    }else{
        dateactual.innerHTML = (today.getDate()+1) + " " + (today.getMonth()+1) + " "+ today.getFullYear();
    }
    return [todayCheck,(todayCheck|| fechaActual==''?1:3)]
}
document.getElementById("enviar").addEventListener("click",()=>{
    // console.log(evaluateDate());
    getClimaData(evaluateDate()[1])
    .then((json) => {
        displayClima(json)
    }).catch((error) => {
        console.error(error);
    })
});
