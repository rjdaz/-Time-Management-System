import * as btn from "./btn.js";

let elementInputCategory = document.getElementById('enteredCategory'),
    btnAddCatgry = document.getElementById('btnCategory'),
    listCategories = document.getElementById('listingOfcatg'),
    exitBtn = document.getElementById('exitCatgry')
    
const STORAGE_KEY_CATEGORY = 'categoryList'

window.onload = displayDataCategory;

export let categoryList = JSON.parse(localStorage.getItem(STORAGE_KEY_CATEGORY)) || [];

exitBtn.addEventListener("click", () => {
  btn.windowAddCtgry.style.opacity = "0";
  btn.windowAddCtgry.style.zIndex = "0";
  btn.viewtask.style.opacity = "1";
  btn.viewtask.style.zIndex = "1";
  btn.btnAddCtgry.style.backgroundColor = "#F0ECE5";
  btn.btnAddCtgry.style.color = "#31304D";
})

btnAddCatgry.addEventListener("click", () => {
  let inputElementCatg = elementInputCategory.value.trim().toUpperCase();

  let sameData = categoryList.some(category => category.category.toUpperCase() === inputElementCatg.toUpperCase());

    if(sameData){
      alert(`Already have a ${inputElementCatg}`)
      return;
    }

  categoryList.push({
    category: inputElementCatg
  })

  localStorage.setItem(STORAGE_KEY_CATEGORY, JSON.stringify(categoryList));

  window.dispatchEvent(new Event('categoryListUpdated'));

  displayDataCategory();

  console.log(inputElementCatg);
})

function displayDataCategory() {
  listCategories.innerHTML = "";

  categoryList.forEach((data, index) => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'addedCatg';
    categoryElement.setAttribute('data-index', index);

    const categoryText = document.createElement('p');
    categoryText.textContent = data.category;

    const deleteButton = document.createElement('span');
    deleteButton.style.fontSize = '15px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.innerHTML = '&#10060;';
    
    deleteButton.addEventListener('click', () => {
      deleteCategory(index);
    });
    categoryElement.appendChild(categoryText);
    categoryElement.appendChild(deleteButton);
    listCategories.appendChild(categoryElement);

    clearData()
  });
}

function clearData(){
  elementInputCategory.value = "";
}

export function deleteCategory(index) {

  categoryList.splice(index, 1);
  localStorage.setItem(STORAGE_KEY_CATEGORY, JSON.stringify(categoryList));
  window.dispatchEvent(new Event('categoryListUpdated'));
  displayDataCategory();
}

displayDataCategory();

console.log(categoryList)
