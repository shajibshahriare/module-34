const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    const showAllBtn = document.getElementById('show-all-container')


    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `
     <figure><img src="${phone.image}" alt="Shoes" /></figure>
     <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
         <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
       </div>
     </div>
     
     
     
     `;
        phoneContainer.appendChild(phoneCard)
    });

    toggleLoadingSpinner(false)

}

const handleShowDetails = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()

    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p> <span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p> <span>Chipset:</span>${phone?.mainFeatures?.displaySize}</p>
    <p> <span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p> <span>Slug:</span>${phone?.slug}</p>
    <p> <span>Release Date:</span>${phone?.releaseDate}</p>
    <p> <span>Brand:</span>${phone?.brand}</p>
    <p> <span>GPS:</span>${phone?.others?.GPS}</p>
    
    
    
    `

    show_details_modal.showModal()

}

const handleSearchBtn = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    loadPhone(searchText, isShowAll)

}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }

}

const handleShowAll = () => {
    handleSearchBtn(true)

}