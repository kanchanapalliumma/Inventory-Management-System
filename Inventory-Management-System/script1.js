

let library = JSON.parse(localStorage.getItem("library")) || [];


class Product{
    constructor(id,name,price,expirydate,quantity,category,supplier){
        this.name=name
        this.id=id
        this.price=price
        this.expirydate=expirydate
        this.quantity=quantity
        this.category=category
        this.supplier=supplier
    }
}

function addbook() {
    document.getElementsByClassName("succesfullyadded")[0].style.display =
      "none";
    document.getElementsByClassName("caterogy-div")[0].style.display="none";

  let name = document.getElementById("name").value;
  let id = document.getElementById("id").value;
  let price = document.getElementById("price").value;
  let expirydate = document.getElementById("expirydate").value;
  let quantity = document.getElementById("quantity").value;
  let category = document.getElementById("category").value;
  let supplier = document.getElementById("supplier").value;

  if (name && id && price && expirydate && quantity && category && supplier) {
    let existproduct = library.find((product) => product.id === id);
    if (!existproduct) {
      let product = new Product(
        id,
        name,
        price,
        expirydate,
        quantity,
        category,
        supplier
      );
      library.push(product);
      console.log(library);
      document.getElementById("exist-message").textContent = "";
      document.getElementsByClassName("succesfullyadded")[0].style.display =
        "block";
    } else {
      document.getElementById("exist-message").textContent =
        "Product already exists";
      console.log("Product already existed");
    }
  } else {
    alert("Please fill out all fields");
  }
  displaybook()
}



function displaybook(books) {
  let tbody = document.getElementById("tablebody");
  tbody.textContent = "";
  if (!books) {
    books = library;
  }
  for (let i = 0; i < books.length; i++) {
    let tr = document.createElement("tr");
    let tdtitle = document.createElement("td");
    tdtitle.innerHTML = books[i].name;
    let tdauthorname = document.createElement("td");
    tdauthorname.innerHTML = books[i].id;
    let tdgenre = document.createElement("td");
    tdgenre.innerHTML = books[i].price;
    let tdyear = document.createElement("td");
    tdyear.innerHTML = books[i].expirydate;
    let tdbookid = document.createElement("td");
    tdbookid.innerHTML = books[i].quantity;
    let tdbookcategory = document.createElement("td");
    tdbookcategory.innerHTML = books[i].category;
    let tdbooksupplier = document.createElement("td");
    tdbooksupplier.innerHTML = books[i].supplier;
    let tddelete = document.createElement("td");
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.addEventListener("click", function () {
      Delete(i);
    });
    button.setAttribute("id", "delete");
    button.style.marginTop = "-18px";
    button.style.marginBottom = "10px";
    button.style.borderRadius = "8px";
    tddelete.appendChild(button);
    let tdedit = document.createElement("td");
    let edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.style.marginTop = "-18px";
    edit.style.marginBottom = "10px";
    edit.style.borderRadius = "8px";
    edit.addEventListener("click", function () {
      Edit(i);
    });
    tdedit.appendChild(edit);

    tr.appendChild(tdtitle);
    tr.appendChild(tdauthorname);
    tr.appendChild(tdgenre);
    tr.appendChild(tdyear);
    tr.appendChild(tdbookid);
    tr.appendChild(tdbookcategory);
    tr.appendChild(tdbooksupplier);
    tr.appendChild(tddelete);
    tr.appendChild(tdedit);

    tbody.appendChild(tr);
  }
  localStorage.setItem("library", JSON.stringify(library, undefined, 4));

  const savedLibrary = JSON.parse(localStorage.getItem("library"));
  console.log(savedLibrary);
}


function Delete(i) {
 let confirmed = window.confirm("Are you sure you want to delete?");
 if(confirmed){
     library.splice(i, 1);
    console.log("Content deleted");
 }else{
     console.log("delete cancelled");   
 }
  displaybook();
}


function Edit(i) {
    document.querySelector(".product-container").style.display = "block";
    document.getElementsByClassName(
      "succesfullyadded-supplier"
    )[0].style.display = "none";
    document.querySelector(".manage-div").style.display = "none";
  let nameInput = document.getElementById("name");
  let idInput= document.getElementById("id");
  let priceInput = document.getElementById("price");
  let expirydateInput = document.getElementById("expirydate");
  let quantityInput = document.getElementById("quantity");
  let categoryInput = document.getElementById("category");
  let supplierInput = document.getElementById("supplier");

  nameInput.value = library[i].name;
  idInput.value = library[i].id;
  priceInput.value = library[i].price;
  expirydateInput.value = library[i].expirydate;
  quantityInput.value = library[i].quantity;
  categoryInput.value = library[i].category;
  supplierInput.value = library[i].supplier;

  let buttonsave = document.createElement("button");
  buttonsave.innerHTML = "Save Changes";
  buttonsave.addEventListener("click", function () {
    library[i].name = nameInput.value;
    library[i].id = idInput.value;
    library[i].price = priceInput.value;
    library[i].expirydate = expirydateInput.value;
    library[i].quantity = quantityInput.value;
    library[i].category = categoryInput.value;
    library[i].supplier = supplierInput.value;
    displaybook();
    document.getElementById("exist-message").textContent =
      "Succssfully saved";
    let existingButton = document.getElementById("saveChangesButton");
    if (existingButton) {
      existingButton.parentNode.removeChild(existingButton);
      document.getElementById("exist-message").textContent =""
    }
  });
  buttonsave.setAttribute("id", "saveChangesButton");
  document.getElementById("changesbtn").appendChild(buttonsave);
}
//  document.getElementById("icon-search").addEventListener("click",function(){
//     let buttontwo = document.getElementById("inpword").value.trim();
//  })


 function subproducts() {
    document.getElementById("pone").style.display="block"
    document.getElementById("ptwo").style.display = "block";
 }

  document.getElementById("pone").addEventListener("click", function () {
  document.querySelector(".caterogy-div").style.display = "none";
      
  document.querySelector(".product-container").style.display = "block";
  document.querySelector(".manage-div").style.display = "none";
});
  document.getElementById("ptwo").addEventListener("click", function () {
    document.querySelector(".manage-div").style.display = "block";
    document.querySelector(".product-container").style.display = "none";
  });

function openagain(){
        document.querySelector(".product-container").style.display = "block";
              document.getElementsByClassName(
                "succesfullyadded"
              )[0].style.display = "none";
        document.querySelector(".manage-div").style.display = "none";
}

function getProductInfo(productName) {
  const product = inventory.products.fi(
    (product) => product.name === productName
  );
  if (product) {
    console.log("Product Information:");
    console.log(product);
  } else {
    console.log("Product not found!");
  }
}

function searchProducts() {
  const searchText = document.getElementById("inpword").value.trim().toLowerCase();
  const filtering = library.filter((product) =>
    product.name.toLowerCase().includes(searchText)
  );
  if (searchText === "") {
    document.getElementById("showmessage").style.display = "none";
    document.getElementById("tablebody").innerHTML = "";
  }
  else  if(filtering==""){
    document.getElementById("showmessage").style.display = "block";
    displaybook(filtering);  
  }else{
    document.getElementById("showmessage").style.display="none";
    displaybook(filtering);
  }
}

function GetAllData(){
  if (library.length > 0) {
    document.getElementById("showmessage").style.display = "none";
    displaybook(library);
  } else {
    document.getElementById("tablebody").innerHTML = "";
    document.getElementById("showmessage").style.display = "block";
    document.getElementById("showmessage").textContent =
      "There is no data is available in the inventory";
  }
}

let isProductFormVisible = false;
let isCategoryVisible = false;
let isSupplierVisible = false;
let isManagevisisble=false;

function toggleProductForm() {
  isProductFormVisible = true;
  isCategoryVisible = false;
  isSupplierVisible = false;
  let isManagevisisble = false;
  document.querySelector(".product-container").style.display = "block";
  document.querySelector(".manage-div").style.display = "none";
  document.querySelector(".caterogy-div").style.display = "none";
  document.querySelector(".Supplier-div").style.display = "none";
}

function toggleManageForm() {
  isProductFormVisible = false;
  isCategoryVisible = false;
  isSupplierVisible = false;
  let isManagevisisble = true;

  document.querySelector(".product-container").style.display = "none";
  document.querySelector(".manage-div").style.display = "block";
  document.querySelector(".caterogy-div").style.display = "none";
  document.querySelector(".Supplier-div").style.display = "none";
}

function toggleCategory() {
  isProductFormVisible = false;
  isCategoryVisible = true;
  isSupplierVisible = false;
  let isManagevisisble = false;
  document.querySelector(".product-container").style.display = "none";
  document.querySelector(".manage-div").style.display = "none";
  document.querySelector(".caterogy-div").style.display = "block";
  document.querySelector(".Supplier-div").style.display = "none";
}

function toggleSupplier() {
  isProductFormVisible = false;
  isCategoryVisible = false;
  isSupplierVisible = true;
  let isManagevisisble = false;
  document.querySelector(".product-container").style.display = "none";
  document.querySelector(".manage-div").style.display = "none";
  document.querySelector(".caterogy-div").style.display = "none";
  document.querySelector(".Supplier-div").style.display = "block";
}

document.getElementById("pone").addEventListener("click", toggleProductForm);
document.getElementById("ptwo").addEventListener("click", toggleManageForm);
document
  .getElementById("caterory-one")
  .addEventListener("click", toggleCategory);
document
  .getElementsByClassName("supplier-one")[0 ]
  .addEventListener("click", toggleSupplier);

