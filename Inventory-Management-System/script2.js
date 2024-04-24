let categories = JSON.parse(localStorage.getItem("categories")) || [];   
class Category {
  constructor(name, subcategories = []) {
    this.name = name;
    this.subcategories = subcategories;
  }
}
function addCategory() {
    document.getElementsByClassName("caterogy-div")[0].style.display =
        "block";
    
  let categoryName = document.getElementById("category-id").value.trim();
  let subcategories = document
    .getElementById("subcategory")
    .value.split(",")
    .map((subcategory) => subcategory.trim());
    document.getElementById("exist-message-category").textContent =""
  if (categoryName && subcategories.length > 0) {
    let existCategory = categories.find(
      (category) => category.name === categoryName
    );
    if (!existCategory) {
      let category = new Category(categoryName, subcategories);
      categories.push(category);
      localStorage.setItem("categories", JSON.stringify(categories));
      Displaycategories(category);
      document.getElementById("exist-message-category").textContent = "";
      document.getElementsByClassName(
        "succesfullyadded-category"
      )[0].style.display = "block";
       document.getElementsByClassName("caterogy-div")[0].style.margin="80px 1px"
        document.getElementById("exist-message-category").textContent =""
    } else {
      document.getElementsByClassName(
        "succesfullyadded-category"
      )[0].style.display = "none";
      document.getElementById("exist-message-category").textContent =
        "Category already exists";
    }

  } else {
    alert("Please fill in both category name and subcategories.");
  }
}



function Displaycategories(newCategory) {
  document.getElementsByClassName("caterogy-div")[0].style.display = "block";
  document.getElementsByClassName("caterogy-div")[0].style.marginTop="80px";
  document.getElementsByClassName("Product-information")[0].style.display =
    "none";
  document.getElementById("pone").style.display = "none";
  document.getElementById("ptwo").style.display = "none";
  let tbody = document.getElementById("tablebody-two");

  tbody.innerHTML = "";


  categories.forEach((category) => {
    let tr = document.createElement("tr");

    let tdCategory = document.createElement("td");
    tdCategory.textContent = category.name;
    console.log(tdCategory.textContent)
    tr.appendChild(tdCategory);

    let tdSubcategories = document.createElement("td");
    tdSubcategories.textContent = category.subcategories.join(", ");
    tr.appendChild(tdSubcategories);

      let tdStatus = document.createElement("td");
    let statusSelect = document.createElement("select");
    statusSelect.setAttribute("id", "statusSelect");

    let availableOption = document.createElement("option");
    availableOption.value = "available";
    availableOption.textContent = "Available";

    let notAvailableOption = document.createElement("option");
    notAvailableOption.value = "not-available";
    notAvailableOption.textContent = "Not Available";

    statusSelect.appendChild(availableOption);
    statusSelect.appendChild(notAvailableOption);

    statusSelect.value = status;
    tdStatus.appendChild(statusSelect);
    tr.appendChild(tdStatus);

    let tdDelete = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteCategory(tr);
    });
    tdDelete.appendChild(deleteButton);
    tr.appendChild(tdDelete);

    let tdEdit = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editCategory(tr);
    });
    tdEdit.appendChild(editButton);
    tr.appendChild(tdEdit);

    tbody.appendChild(tr);
  });

  document.getElementById("category-id").value = "";
  document.getElementById("subcategory").value = "";

  document.getElementsByClassName(
    "succesfullyadded-category"
  )[0].style.display = "block";
  document.getElementsByClassName("succesfullyadded").style.padding="25px";
}



function editCategory(row)  {
  document.getElementsByClassName("succesfullyadded-category")[0].textContent =
    "";
 let categoryName = row.cells[0].textContent;
 let subcategoryInput = row.cells[1].textContent;

  document.getElementById("category-id").value = categoryName;
  document.getElementById("subcategory").value = subcategoryInput;

  let buttonsave = document.createElement("button");
  buttonsave.innerHTML = "Save Changes";
  buttonsave.addEventListener("click", function () {
   row.cells[0].textContent = document.getElementById("category-id").value;
   row.cells[1].textContent = document.getElementById("subcategory").value;; // Convert back to array
    displaysupplier(suppliersdata);
    document.getElementsByClassName(
      "succesfullyadded-category"
    )[0].textContent = "Saved successfully";
    let existingButton = document.getElementById("saveChangesButton");
    if (existingButton) {
      existingButton.parentNode.removeChild(existingButton);
    }
  });
  buttonsave.setAttribute("id", "saveChangesButton");
  document.getElementById("changesbtn-category").appendChild(buttonsave);
}



function deleteCategory(tr){
    if (confirm("Are you sure you want to delete this category?")) {
      let categoryName = tr.cells[0].textContent;
      categories = categories.filter(
        (category) => category.name !== categoryName
      );
      localStorage.setItem("categories", JSON.stringify(categories));
    tr.remove();
    }
}
