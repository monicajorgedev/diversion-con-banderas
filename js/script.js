//Creo en html una ul con id list
const list = document.getElementById('list')

const getCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3/all");
        if(!response.ok) {
            throw new Error ("Ha surgido un error", response.status);
        }
        const data = await response.json();
        const arrdata = data.sort((a,b)=> a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()))
        
        arrdata.forEach((country, i)=> {
            const {flags, name, capital, population, car} = country
            const templete = `<li id="country-${i}">
            <img src="${flags[0]}" alt="${name.common}"/><p>${name.common}</p></li>`
            list.insertAdjacentHTML("beforeend", templete)            
            //evento con templete individual
            const countryFicha = document.getElementById(`country-${i}`)
            countryFicha.addEventListener("click", ()=>{
                const ficha = `<div class="flag-dates"><img src="${flags[0]}" alt="${name.common}"/>
                <div class="datos">
                <h2>${name.common}</h2>
                <p>Capital: ${capital}</p>
                <p>Población: ${population}</p>
                <p>Lado de la carretera: ${car.side}</p>
                </div>
                </div>
                <button id="btnClose${i}">Cerrar</button>`
                //creo div en html para añadir el html creado para la ficha flotante
                const divFicha = document.getElementById("ficha")
                divFicha.innerHTML = ficha
                //añado evento activa o no con el display none para que se mueve cuando se llama al evento
                divFicha.classList.add("active")
                //botón cerrar donde quita la clase para que no se vea la pantalla
                const btnClose = document.getElementById(`btnClose${i}`)
                btnClose.addEventListener("click", ()=> {
                divFicha.classList.remove("active")   
                })
            })
        })
    } catch (error) {
    console.log("Error al obtener los datos", error)
    }
}
getCountries()

// codigo de clase con el innerHTML
/*

const countriesList = document.getElementById("countries-list")
const divficha = document.getElementById("ficha")

const getCountry = async () => {
 try {
   const response = await fetch("https://restcountries.com/v3/all")
   const countries = await response.json()
   sortedCountries(countries)
   return countries
 } catch (err) {
   console.log("Se ha producido un error al introducir los datos", err)
 }
}


const sortedCountries = (countries) => {
 countries.sort((a, b) => {
   const nameA = a.name.common.toUpperCase()
   const nameB = b.name.common.toUpperCase()
   return nameA.localeCompare(nameB)
})}


getCountry().then(countries => {
 countries.forEach((country) => {
   const template = `
   <div class="cardflags">
   <img src="${country.flags[0]}" alt="${country.name.common}" />
   <h2>${country.name.common}</h2>
   </div>
   `
   countriesList.innerHTML += template
 });
 countries.forEach((country, index) => {
   const countryElement = document.querySelectorAll('.cardflags')[index];
  
   countryElement.addEventListener('click', () => {
     const fichaTemplate = `
     <div>
     <button onclick="closeInfo()">CERRAR</button>
       <p>${country.name.common}</p>
       <p>${country.flags[0]}</p>
     </div>
     `
     divficha.innerHTML = fichaTemplate
     divficha.classList.add("active")
   }); 
 });
 })


function closeInfo () {
 divficha.classList.remove("active")
}

*/