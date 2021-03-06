function populateUF() {
    const ufSelect =  document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for( state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUF()

function getCities(event) {
    const citySelect  = document.querySelector("select[name=city]")
    const stateInput  = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for( city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem() {
    const itemLi = event.target
    // adicionar ou remover uma classe  com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Verificar itens selecionados e pegar
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId
        return itemFound
    })

    //se já estiver selecionado
    if(alreadySelected >= 0) {
        // tira da seleção 
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return false
        })

        selectedItems = filteredItems
    } else {
        // colocar na seleção se não tiver selecionado
        selectedItems.push(itemId)
    }

    // Atualizar o campo escondido com os itens
    collectedItems.value = selectedItems
}