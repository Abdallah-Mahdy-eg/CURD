var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescInput=document.getElementById("productDescInput");

var productsContainer;

if(localStorage.getItem('myProduct')!=null){
    productsContainer=JSON.parse(localStorage.getItem('myProduct'));
    displayProducts(productsContainer);
}
else{
    productsContainer=[];
}

// Function Add Product
function addProduct(){
    if(validateProduct()){
        var product={
            name:productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        localStorage.setItem('myProduct',JSON.stringify(productsContainer));
        clearForm();
        displayProducts(productsContainer);
    }
    else{
        window.alert("Enter value");
    }
    
}

// Function Clear
function clearForm(){
    productNameInput.value='';
    productPriceInput.value='';
    productCategoryInput.value='';
    productDescInput.value='';
}

// Function Display
function displayProducts(List){
    var container=``;
    for(var i=0;i<List.length;i++){
        container+=`<tr>
        <td>${i+1}</td>
        <td>${List[i].name}</td>
        <td>${List[i].price}</td>
        <td>${List[i].category}</td>
        <td>${List[i].desc}</td>
        <td> <button onclick="updateForm(${i});" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProducts(${i});" class="btn btn-outline-danger">delete</button> </td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML=container;
}

// Function Search
function searchProduct(searchTerm){
    var searchContainer=[];
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())==true){
            searchContainer.push(productsContainer[i]);
        }
    }
    displayProducts(searchContainer);
}

// Function Delete
function deleteProducts(deleteIndex){
    productsContainer.splice(deleteIndex);
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
// Function Update
var indexUpdate;
function updateForm(updateIndex){
    productNameInput.value=productsContainer[updateIndex].name;
    productPriceInput.value=productsContainer[updateIndex].price;
    productCategoryInput.value=productsContainer[updateIndex].category;
    productDescInput.value=productsContainer[updateIndex].desc;
    updateBtn.classList.replace('d-none','d-inline-block');
    addBtn.classList.remove('d-inline-block');
    addBtn.classList.add('d-none');
    indexUpdate=updateIndex;
}

function updateProduct(){
    productsContainer[indexUpdate].name=productNameInput.value;
    productsContainer[indexUpdate].price=productPriceInput.value;
    productsContainer[indexUpdate].category=productCategoryInput.value;
    productsContainer[indexUpdate].desc=productDescInput.value;
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();
    updateBtn.classList.replace('d-inline-block','d-none');
    addBtn.classList.replace('d-none','d-inline-block');
}

function validateProduct()
{
    var regex=/^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value)){
        productNameInput.classList.replace("is-invalid","is-valid");
        return true;
    }
    else{
        productNameInput.classList.add("is-invalid");
        return false;
    }
}

var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
addBtn.addEventListener('click',function(){
    addProduct()
});
updateBtn.addEventListener('click',function(){
    updateProduct();
});