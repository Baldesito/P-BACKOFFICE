let tuttiTel = [];

function getProducts() {
  return fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjU2NjhhZDEyOTAwMTU4NzZjYzYiLCJpYXQiOjE3MzE2NjczMDIsImV4cCI6MTczMjg3NjkwMn0.pz7K_LvmUtq_5hr9z3BunLrktXzIcEmsv0ZJwxGObSc",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore generico nella chiamata");
      }
    })
    .then((arrayOfPhone) => {
      console.log("arrayOfPhone", arrayOfPhone);
      const phoneRow = document.getElementById("phone-row");
      phoneRow.innerHTML = "";
      arrayOfPhone.forEach((phone, i) => {
        tuttiTel = arrayOfPhone;
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
        <div class="card h-100 flow-hide">
          <img src="${phone.imageUrl}" class="card-img-top" alt="${phone.name}">
          <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">${phone.description}</p>
            <p class="card-text">${phone.price}£</p>
            <div>
              <button class="btn btn-warning" onclick="show(event)">Views</button>
              <button class="btn btn-success" onclick="addToCart(${i})">Aggiungi</button>
             <a href="./formM.html" class="texte-white"> <button class="btn btn-primary " onclick="editProduct(${i})"> Modifica </button></a>
              
              <button class="btn btn-danger m-1" onclick="deleteProduct('${phone._id}')">Cancella</button>
            </div>
          </div>
        </div>
              </div>
            </div>
          </div>
        `;
        phoneRow.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
}

function editProduct(index) {
  const product = tuttiTel[index];
  window.location.href = `form.html?productId=${product._id}`;
}

document.addEventListener("DOMContentLoaded", getProducts);
