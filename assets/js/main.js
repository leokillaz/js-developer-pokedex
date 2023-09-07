const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');



const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <buttom type="button" id="lista" onClick="renderPoke(${pokemon.number})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            </li>
        </buttom>
    `
}

async function fetchPokemon(numero) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
    const dados = await resposta.json();
    return dados;
}

async function renderPoke(numero) {
    const nome = document.getElementById('staticBackdropLabel');
    const tipo1 = document.getElementById('tipo1')
    const tipo2 = document.getElementById('tipo2')
    const imagem = document.getElementById('imagem')
    const peso = document.getElementById('peso')
    const altura = document.getElementById('altura')
    const back = document.getElementById('back')
    const cabeça = document.getElementById('cabeça')
    const rodape = document.getElementById('rodape')
    const fechar = document.getElementById('fechar')
    const hp = document.getElementById('hp')
    const att = document.getElementById('att')
    const def = document.getElementById('def')
    const satt = document.getElementById('satt')
    const sdef = document.getElementById('sdef')
    const spd = document.getElementById('spd')
    const mov1 = document.getElementById('mov1')
    const mov2 = document.getElementById('mov2')



    const dados = await fetchPokemon(numero) || {};
    if (dados) {
        nome.innerHTML = "#"+dados.id+" "+dados.name;
        tipo1.innerHTML = dados['types']['0']['type']['name'];
        try {
            tipo2.innerHTML = dados['types']['1']['type']['name'];
            tipo2.classList.toggle(dados['types']['1']['type']['name'])
        }
        catch (err){
            tipo2.innerHTML = ""

        }
        imagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        imagem.alt = dados.name;
        peso.innerHTML ="Weight: " + dados.weight + "lb.";
        altura.innerHTML ="Height: " +  dados.height + "ft.";
        hp.innerHTML = "HP:   "+dados['stats']['0']['base_stat'];
        att.innerHTML = "Attack:  "+dados['stats']['1']['base_stat'];
        def.innerHTML = "Defense:  "+dados['stats']['2']['base_stat'];
        satt.innerHTML = "Sp.Attack:  "+dados['stats']['3']['base_stat'];
        sdef.innerHTML = "Sp.Defense:  "+dados['stats']['4']['base_stat'];
        spd.innerHTML = "Speed:  "+dados['stats']['5']['base_stat'];
        

        
        back.classList.toggle(dados['types']['0']['type']['name'])
        cabeça.classList.toggle(dados['types']['0']['type']['name'])
        rodape.classList.toggle(dados['types']['0']['type']['name'])
        tipo1.classList.toggle(dados['types']['0']['type']['name'])
        peso.classList.toggle(dados['types']['0']['type']['name'])
        altura.classList.toggle(dados['types']['0']['type']['name'])
        mov1.classList.toggle(dados['types']['0']['type']['name'])
        mov2.classList.toggle(dados['types']['0']['type']['name'])

        
    }
    else {
        nome.innerHTML = 'Not found :c';
    }

    fechar.addEventListener('click',() => {
        back.className = 'modal-body'
        cabeça.className = 'modal-header'
        rodape.className = 'modal-footer'
        tipo1.classList = ''
        tipo2.classList = ''
        peso.classList = ''
        altura.classList = ''
        mov1.classList = 'moves1'
        mov2.classList = 'moves2'


    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})