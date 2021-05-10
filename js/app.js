//variables
const formulario = document.querySelector("#formWeather");
const result = document.querySelector('#result-weather');
//eventos
document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit',consultarClima);
});
//funciones
function consultarClima(e){
    e.preventDefault();

    const {cityName,countryName} = e.target;
    
    if(cityName.value !== '' && countryName.value !== ''){
        consultarApi({city:cityName.value,country:countryName.value});
        return;
    };
    messageForm("Debes Completar todos los Campos");
};
function consultarApi({city,country}){
    spinner();

    const url = 'f64bf468a7ad1a6ec566d5d8ca7ec921';
    const keyApi = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${url}`;

    fetch(keyApi)
        .then(response => response.json())
        .then(data => {
            clearResultHtml();

            if(data.cod === 200){
                printWeather(data.main,data.name);
                formulario.reset();
                return;
            };
            messageForm("Esta Ciudad No Existe");
            viewNothing();
        });
}
function spinner(){
    clearResultHtml();

    const spinner = document.createElement('div');
    spinner.classList.add('h-10','w-10','animate-spin','bg-blue-400');

    result.appendChild(spinner);
};
function printWeather(data,city){
    clearResultHtml();
    const {temp,temp_min,temp_max} = data;
    const cent = (temp) => parseInt(temp - 257);

    const weatherHtml =  document.createElement('div');
    weatherHtml.classList.add('consult-weather','bg-gray-200','p-2','rounded-sm');
    weatherHtml.innerHTML = `
    <p class="font-bold border-t border-b border-gray-600 bg-blue-200 rounded-md px-1 my-2">${city}</p>
    <div>
        <p class="text-sm"><span class="font-medium">Min: </span>${cent(temp_min)} ºC</p>
        <p class="text-3xl">${cent(temp)} ºC</p>
        <p class="text-sm"><span class="font-medium">Max: </span>${cent(temp_max)} ºC</p>
    </div>
    `;

    result.appendChild(weatherHtml);
};
function clearResultHtml(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    };
};
function viewNothing(){
    clearResultHtml();

    const p = document.createElement('p');
    p.classList.add('border-b','border-gray-600','text-white');
    p.textContent = 'Sin Resultados';

    result.appendChild(p);
};
function messageForm(text,type = 'incorrecto'){
    const msg = document.createElement('p');
    msg.classList.add('msg-alert','text-center',"border-b",'p-1','text-sm','my-1','rounded-md','text-white');
    msg.textContent = text;

    if(type !== 'correcto'){
        msg.classList.add('border-red-800','bg-red-600');
    }else{
        msg.classList.add('border-green-800','bg-green-600');
    }

    if(!formulario.querySelector('.msg-alert')){
        formulario.insertBefore(msg,formulario.querySelector('.ctn-btn-submit'));
        setTimeout(()=>{
            msg.remove();
        },3000);
    };
};