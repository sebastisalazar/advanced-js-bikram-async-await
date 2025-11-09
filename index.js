//DESARROLLA AQUI TUS SOLUCIONES


const urlBase="https://pokeapi.co/api/v2/pokemon/"
const pokemonABuscar='pikachu';



const urlBase2="https://dog.ceo/api/";
const razaABuscar='schnauzer';

const llamadaAPI=async(endpoint)=>{
    
    try {
        const resp=await fetch(`${urlBase}${endpoint}`)

        if (resp.ok) {
            //const conversion= await resp.json();
            return resp
        }else{
             throw `No se han podido encontrar datos del pokemon con ID ${endpoint} generado aleatoriamente`
        }
    } catch (error) {
        throw error
    }

}

//console.log(llamadaAPI('?offset=50&limit=100'))


/**Ejercicio 1.- Declara una función getRandomPokemon que retorne un pokemon aleatorio. */

const getRandomPokemon=async()=>{

    const randomNumber=Math.round(Math.random() * (1025 - 1) + 1);
    
    try {
        const resp= await llamadaAPI(randomNumber);
        //console.log(resp)
        if(resp.ok){
            const conversion=await resp.json();
            //console.log(conversion)
            return conversion
        }else{
            throw `No se han podido encontrar datos del pokemon con ID ${randomNumber} generado aleatoriamente`
        }
    } catch (error) {
        throw error
    }
    
}

/**Ejercicio 2.- Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name}) */

const getImageAndName=async(pokemonAbuscar)=>{

    const endpoint=`${pokemonABuscar}`
    const resp= await llamadaAPI(endpoint);

    if(resp.ok){
        const conversion=await resp.json();
        
        //Desestructuracion para poder imprimir solo esos dos atributos
        return {
                img:conversion.sprites.back_default, name:conversion.name
            };
    }else{
            throw "No se han podido encontrar datos"
        }
    
    
}

/**Ejercicio 3.- Declara una funcion printImageAndName que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma: */


const printImageAndName=async(pokemonAImprimir)=>{

    const endpoint=`${pokemonAImprimir}`
    const resp= await getImageAndName(endpoint);

    //console.log(resp)
    return `<section><img src="${resp.img}" alt="${resp.name}"><h1>${resp.name}</h1></section>`

    
}


/**Ejercicios Batalla entre Pokemon y perritos */


const llamadaAPI2=async(url)=>{
    
    try {
        const respuesta=await fetch(`${urlBase2}${url}`)

        if (respuesta.ok) {
             const conversion=await respuesta.json()
             //console.log(conversion)
             return conversion
        }else{
             throw "No se han podido cargar los datos"
        }
    } catch (error) {
        throw (error + " error desde llamadaAPI")
    }

}

/**Ejercicio 4.- Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio */

const getRandomDogImage=async ()=>{
    
    try {

        const imagenObtenida= await llamadaAPI2('breeds/image/random')
        const urlDeImagen=imagenObtenida.message
        //console.log(imagenObtenida)
        return urlDeImagen
            

    } catch (error) {
        throw (error + " error desde devolviendo Random Dog")
    }
    
}

/**Ejercicio 5.- Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio. */

const getRandomPokemonImage=async ()=>{
    
    try {

        const imagenObtenida= await getRandomPokemon()
        
        //console.log(imagenObtenida)
        return imagenObtenida.sprites.back_default

    } catch (error) {
        throw (error + " error desde devolviendo Random Dog")
    }
    
}

/**Ejercicios con Rick and Morty */
const urlBase3="https://rickandmortyapi.com/api/";

const llamadaAPI3=async(url)=>{
    
    try {
        const respuesta=await fetch(`${urlBase3}${url}`)

        if (respuesta.ok) {
             const conversion=await respuesta.json()
             //console.log(conversion)
             return conversion
        }else{
             throw "No se han podido cargar los datos"
        }
    } catch (error) {
        throw (error + " error desde llamadaAPI")
    }

}
/**Ejercicio 7.- Declara una función getRandomCharacter que retorne un personaje aleatori */

const getRandomCharacter=async()=>{

    const randomNumber=Math.round(Math.random() * (20 - 1) + 1);
    
    try {
        const resp= await llamadaAPI3("character/"+randomNumber);
        //console.log(resp)
        return resp
    } catch (error) {
        throw error
    }
    
}



/**Ejercicio 8.- Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode}) */

const getRandomCharacterInfo=async()=>{
    
    try {
        const resp= await getRandomCharacter();
        
        return { name:resp.name,img:resp.image,episodes:resp.episode,firstEpisode:resp.episode[0],dateEpisode:resp.created }
    } catch (error) {
        throw error
    }
    
}

          
getRandomPokemon().then((resp)=>{console.log("Pokemon random generado:",resp)});
getImageAndName(pokemonABuscar).then((resp)=>{console.log("Obteniendo nombre del pokemon con ID 25(pikachu): "+resp.name, resp.img)});
printImageAndName(pokemonABuscar).then((resp)=>{console.log("Imprimiendo etiquetas para DOM de pokemon con ID 25(pikachu) :",resp)});
getRandomDogImage().then(perro=>console.log("Imagen Random de Perro obtenida:",perro))
getRandomPokemonImage().then(pokemon=>console.log("Imagen de pokemon Random obtenida:",pokemon))
getRandomCharacter().then(character=>console.log("Imagen de character Random obtenida:",character.id, character.name))
getRandomCharacterInfo().then(character=>console.log("Imprimiendo informacion de Character random obtenido: ",character.name,character.img,character.episodes,character.episodes,character.firstEpisode,character.dateEpisode))
