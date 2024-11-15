function loadProduct(productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjU2NjhhZDEyOTAwMTU4NzZjYzYiLCJpYXQiOjE3MzE2NjczMDIsImV4cCI6MTczMjg3NjkwMn0.pz7K_LvmUtq_5hr9z3BunLrktXzIcEmsv0ZJwxGObSc",
    },
  })
    .then((response) => response.json())
    .then((product) => {
      const form = document.getElementById("productForm");
      form.name.value = product.name;
      form.description.value = product.description;
      form.brand.value = product.brand;
      form.price.value = product.price;
      form.imageUrl.value = product.imageUrl;
      form.productId.value = product._id;
    })
    .catch((error) => {
      console.error("Error loading product:", error);
    });
}
function createProduct(product) {
  return fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjU2NjhhZDEyOTAwMTU4NzZjYzYiLCJpYXQiOjE3MzE2NjczMDIsImV4cCI6MTczMjg3NjkwMn0.pz7K_LvmUtq_5hr9z3BunLrktXzIcEmsv0ZJwxGObSc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((newProduct) => {
      console.log("Product created:", newProduct);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error creating product:", error);
    });
}

function updateProduct(productId, updatedProduct) {
  return fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjU2NjhhZDEyOTAwMTU4NzZjYzYiLCJpYXQiOjE3MzE2NjczMDIsImV4cCI6MTczMjg3NjkwMn0.pz7K_LvmUtq_5hr9z3BunLrktXzIcEmsv0ZJwxGObSc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    }
  )
    .then((response) => response.json())
    .then((product) => {
      console.log("Product updated:", product);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error updating product:", error);
    });
}
function saveProduct(form) {
  const product = {
    name: form.name.value.trim(),
    description: form.description.value.trim(),
    brand: form.brand.value.trim(),
    price: parseFloat(form.price.value.trim()),
    imageUrl: form.imageUrl.value.trim(),
  };

  const productId = form.productId.value;

  if (productId) {
    updateProduct(productId, product);
  } else {
    createProduct(product);
  }
}

function deleteProduct(productId) {
  return fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjU2NjhhZDEyOTAwMTU4NzZjYzYiLCJpYXQiOjE3MzE2NjczMDIsImV4cCI6MTczMjg3NjkwMn0.pz7K_LvmUtq_5hr9z3BunLrktXzIcEmsv0ZJwxGObSc",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("Product deleted");
        return response.status;
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
}

function resetForm() {
  document.getElementById("productForm").reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  if (productId) {
    loadProduct(productId);
  }
});
