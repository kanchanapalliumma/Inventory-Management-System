let suppliersdata = JSON.parse(localStorage.getItem("suppliersdata")) || [];
class Supplier {
  constructor(name, email, phno, productsSupplied = []) {
    this.name = name;
    this.email = email;
    this.phno = phno;
    this.productsSupplied = productsSupplied;
  }
}



function addSupplier() {
  document.getElementsByClassName(
    "succesfullyadded-supplier"
  )[0].style.display = "none";
  document.getElementsByClassName("caterogy-div")[0].style.display = "none";

  let name = document.getElementById("suppliername").value;
  let email = document.getElementById("supplieremail").value;
  let phno = document.getElementById("phno").value;
  let listofproduct = document.getElementById("listofproduct").value;

  let isEmailDisplayValid = EmailDisplay();
  let isNameDisplayValid = NameDisplay();
  let isNumberDisplayValid = NumberDisplay();

  if (
    isEmailDisplayValid &&
    isNameDisplayValid &&
    isNumberDisplayValid &&
    listofproduct
  ) {
     let existSupplier = suppliersdata.find(
       (supplier) => supplier.name === name
     );
     if (!existSupplier) {
       let products = listofproduct.split(",");
       let supplier = new Supplier(name, email, phno, products);
       suppliersdata.push(supplier);
       console.log(suppliersdata);
       displaysupplier(suppliersdata);
       document.getElementById("exist-message-supplier").textContent = "";
       document.getElementsByClassName(
         "succesfullyadded-supplier"
       )[0].style.display = "block";
     } else {
       document.getElementById("exist-message-supplier").textContent =
         "Supplier already exists";
       console.log("Supplier already exists");
     }
  } else {
    alert("Please fill out all fields");
  }
  displaybook();
}





function EmailDisplay() {
  let inputvalue_three = document.getElementById("supplieremail").value.trim();
  let displayMessage_three = document.getElementById("alert-message-eight");
  let regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (inputvalue_three === "") {
    displayMessage_three.innerHTML = "Please enter the Email";
    return false;
  } else {
    displayMessage_three.innerHTML = "";
    if (!inputvalue_three.match(regex_email)) {
      displayMessage_three.innerHTML =
        "Email must be a valid address,e.g.example@example.com";
      return false;
    } else {
      displayMessage_three.innerHTML = "";
      return true;
    }
  }
}

function NameDisplay() {
  let inputvalue = document.getElementById("suppliername").value;
  let displayMessage = document.getElementById("alert-message-eleven");
  let regex = /^[a-zA-Z' -]+$/;
  if (inputvalue === "") {
    displayMessage.textContent = "Please enter name";
    return false;
  } else {
    displayMessage.innerHTML = "";
    let Firstletter = inputvalue.charAt(0);
    if (Firstletter !== Firstletter.toUpperCase() || !inputvalue.match(regex)) {
      displayMessage.innerHTML =
        " Name must be alphanumeric and contain 3-16 characters";
      return false;
    } else {
      displayMessage.innerHTML = "";
      return true;
    }
  }
}

function NumberDisplay() {
  let inputvalue_two = document.getElementById("phno").value;
  let displayMessage_two = document.getElementById("alert-message-nine");
  let regex = /^\d{10}$/;
  if (inputvalue_two == "") {
    displayMessage_two.innerHTML = "Please enter Mobile No";
    return false;
  } else {
    displayMessage_two.innerHTML = "";
    if (!inputvalue_two.match(regex) || inputvalue_two.length != 10) {
      displayMessage_two.innerHTML = "Invalid Number";
      return false;
    } else {
      displayMessage_two.innerHTML = "";
      return true;
    }
  }
}

function displaysupplier(suppling) {
  let tbody = document.querySelector("#tablebody-three");
  tbody.innerHTML = ""; 

  if(!suppling){
    suppling=suppliersdata
  }
  for (let i = 0; i < suppling.length; i++) {
    let tr = document.createElement("tr");

    let tdname = document.createElement("td");
    tdname.textContent = suppling[i].name;

    let tdemail = document.createElement("td");
    tdemail.textContent = suppling[i].email;

    let tdMobile = document.createElement("td");
    tdMobile.textContent = suppling[i].phno;

    let tdproductlist = document.createElement("td");
    tdproductlist.textContent = suppling[i].productsSupplied.join(", ");

    let tddelete = document.createElement("td");
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.addEventListener("click", function () {
      deleteSupplier(i);
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
      editSupplier(i);
    });
    tdedit.appendChild(edit);

    tr.appendChild(tdname);
    tr.appendChild(tdemail);
    tr.appendChild(tdMobile);
    tr.appendChild(tdproductlist);
    tr.appendChild(tddelete);
    tr.appendChild(tdedit); 

    tbody.appendChild(tr);
  }
  localStorage.setItem("suppliersdata", JSON.stringify(suppliersdata, undefined, 4));

  const savedsupplierdata = JSON.parse(localStorage.getItem("suppliersdata"));
  console.log(savedsupplierdata);
  return suppling;
}

function deleteSupplier(index) {
  if (confirm("Are you sure you want to delete this category?")) {
    suppliersdata.splice(index, 1);
  }
  displaysupplier(suppliersdata);
}

function editSupplier(index) {
  document.getElementsByClassName("succesfullyadded-supplier")[0].textContent =
    "";
  let nameInput = document.getElementById("suppliername");
  let emailInput = document.getElementById("supplieremail");
  let phnoInput = document.getElementById("phno");
  let listofproductInput = document.getElementById("listofproduct");

  nameInput.value = suppliersdata[index].name;
  emailInput.value = suppliersdata[index].email;
  phnoInput.value = suppliersdata[index].phno;
  listofproductInput.value = suppliersdata[index].productsSupplied.join(", ");

  let buttonsave = document.createElement("button");
  buttonsave.innerHTML = "Save Changes";
  buttonsave.addEventListener("click", function () {
    suppliersdata[index].name = nameInput.value;
    suppliersdata[index].email = emailInput.value;
    suppliersdata[index].phno = phnoInput.value;
    suppliersdata[index].productsSupplied = listofproductInput.value.split(","); // Convert back to array
    displaysupplier(suppliersdata);
    document.getElementsByClassName(
      "succesfullyadded-supplier"
    )[0].textContent = "Saved successfully";
    let existingButton = document.getElementById("saveChangesButton");
    if (existingButton) {
      existingButton.parentNode.removeChild(existingButton);
    }
  });
  buttonsave.setAttribute("id", "saveChangesButton");
  document.getElementById("changesbtn-supplier").appendChild(buttonsave);
}

function Supplierinfo() {
  document.getElementsByClassName("Supplier-div")[0].style.display = "block";
  document.querySelector(".product-container").style.display = "none";
  document.querySelector(".manage-div").style.display = "none";
  document.querySelector(".caterogy-div").style.display = "none";
  document.getElementById("pone").style.display = "none";
  document.getElementById("ptwo").style.display = "none";

  document.querySelector(".Supplier-div").style.display = "block";
}
