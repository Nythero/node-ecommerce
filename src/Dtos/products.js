class Products {
  constructor(products) {
    let [rows, fields] = products;
    for(let i = 0; i < rows.length; i++) {
      this[i] = this.singleProduct(rows[i]);
    }
  }

  singleProduct(product) {
    let p = {};
    p.id = product.Id;
    p.name = product.Name;
    p.price = product.Price;
    p.seller = product.Seller;
    p.category = product.Category;
    return p;
  }
}

module.exports = Products;
