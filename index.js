const loadAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
  // console.log(data)
};

const setAllMenu = async () => {
  const data = await loadAllProducts();
  // console.log(data)

  const menu = document.getElementById("all-menu");

  const uniqueArray = [];

  for (const product of data) {
    // console.log(product)

    if (uniqueArray.indexOf(product.category) === -1) {
      uniqueArray.push(product.category);
      const li = document.createElement("li");
      li.innerHTML = `
        <a>${product.category}</a>
        `;
      menu.appendChild(li);
    }
  }
};

setAllMenu();

const searchField = document.getElementById("search-field");

searchField.addEventListener("keypress", async (event) => {
  // console.log(event)
  if (event.key === "Enter") {
    // console.log(event.key)

    const searchValue = searchField.value;

    const allProducts = await loadAllProducts();

    // console.log(allProducts)

    const foundProducts = allProducts.filter((product) =>
      product.category.includes(searchValue)
    );
    console.log(foundProducts);

    const productContainer = document.getElementById("products-container");
    const notFound = document.getElementById("not-found");

    productContainer.textContent = "";
    notFound.textContent = "";


    if(foundProducts.length === 0){
        notFound.innerHTML = `
        <h2 class="text-2xl text-red-500 text-center">Not Found</h2>
        `
    }

    foundProducts.forEach((product) => {
      console.log(product);

      const {category, image, title} = product;

      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
  <figure><img class="h-60 w-full" src=${image} alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${category}</h2>
    <p>${title.length > 20 ? title.slice(0,20) + '. . .' : title}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
            `;

        productContainer.appendChild(div)

    });
  }
});
