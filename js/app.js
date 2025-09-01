(function () {
	const buttonAdd = document.querySelector(".botao-adicionar");
	const buttonClear = document.querySelector(".botao-limpar");
	const product = document.querySelector("#produto");
	const productList = document.querySelector("#lista-produtos");
	const quantity = document.querySelector("#quantidade");
	const totalMoney = document.querySelector("#valor-total");

	function createSpanQuantity(quantityValue) {
		const quantitySpan = document.createElement("span");
		quantitySpan.classList.add("texto-azul");
		quantitySpan.append(`${quantityValue}x `);
		return quantitySpan;
	}

	function createSpanValue(shoppingValue) {
		const valueSpan = document.createElement("span");
		valueSpan.classList.add("texto-azul");
		valueSpan.append(` R$${shoppingValue}`);
		return valueSpan;
	}

	function addShoppingCart(quantitySpan, productName, valueSpan) {
		const sectionProduct = document.createElement("section");
		sectionProduct.classList.add("carrinho__produtos__produto");
		sectionProduct.append(quantitySpan, productName, valueSpan);
		return sectionProduct;
	}

	function addTotalValue(shoppingList) {
		let totalValue = 0;
		shoppingList.forEach((element) => {
			let temp = element.children[1].textContent;
			totalValue += parseInt(temp.slice(temp.lastIndexOf("$") + 1));
		});
		return totalValue;
	}

	buttonAdd.addEventListener("click", () => {
		const quantityValue = quantity.value; // selected quantity
		if (quantityValue >= 1) {
			const completeProduct = product.value; //product name and value

			const productName = completeProduct.slice(0, completeProduct.lastIndexOf("-") - 1); // product name
			const productValue = completeProduct.slice(completeProduct.lastIndexOf("$") + 1); // product value
			const shoppingValue = productValue * quantityValue; // total amount to be added to the cart

			// creating the quantity span
			const quantitySpan = createSpanQuantity(quantityValue);

			// creating the span value
			const valueSpan = createSpanValue(shoppingValue);

			//Adding span quantity, product name and span total value
			const sectionProduct = addShoppingCart(quantitySpan, productName, valueSpan);

			// adding to cart list
			productList.appendChild(sectionProduct);

			// taking the value of each item in the mall and adding up the total
			const shoppingList = Array.from(document.querySelectorAll("#lista-produtos section"));
			let totalValue = addTotalValue(shoppingList);

			// adding the page
			totalMoney.textContent = `R$${totalValue}`;
		}
	});

	buttonClear.addEventListener("click", () => {
		// removing items from the cart
		while (productList.firstChild) {
			productList.removeChild(productList.firstChild);
		}

		// updating the total value
		totalMoney.textContent = `R$${0}`;
	});
})();
