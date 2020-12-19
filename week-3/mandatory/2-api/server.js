const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'migracode',
    port: 5432
});

/// GET PRODUCTS ///
app.get("/products", function (req, res) {

    const productNameQuery = req.query.name;
  let query = "SELECT products.product_name, suppliers.supplier_name FROM products JOIN suppliers ON suppliers.id=products.supplier_id";

  if (productNameQuery) {
    query = `SELECT products.product_name, suppliers.supplier_name FROM products JOIN suppliers ON suppliers.id=products.supplier_id  WHERE products.product_name LIKE '%${productNameQuery}%'`;
  }

    pool
      .query(query)
      .then((result) => res.json(result.rows))
      .catch(e => res.status(400).send(e.message));
  });


app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers  ORDER BY name")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});

  /// Get CustomersId ////
  app.get("/customers/:customer_id", function (req, res) {
    const customer_id = req.params.customer_id;
  
    pool
      .query("SELECT * FROM customers WHERE id=$1", [customer_id])
      .then((result) => res.json(result.rows))
      .catch((e) => res.status(400).send(e.message));
  });


/// Post customers ///

app.post("/customers", function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
  
     pool
      .query("SELECT * FROM customers WHERE name=$1", [name])
      .then((result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send("An customers with the same name already exists!");
        } else {
          const query =
            "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
          pool
            .query(query, [name, address, city, country])
            .then(() => res.send("customers created!"))
            .catch((e) => res.status(400).send(e.message));
        }
      });
  });


  /// Post for Products ///
app.get("/products", function (req, res) {
  pool
    .query("SELECT * FROM products  ORDER BY name")
    .then((result) => res.json(result.rows))
    .catch((e) => res.status(400).send(e.message));
});

  app.post("/products", function (req, res) {
    const product_name = req.body.product_name;
    const unit_price = req.body.unit_price;
    const supplier_id = req.body.supplier_id;
    
    if (!Number.isInteger(unit_price) || unit_price <= 0) {
      return res
        .status(400)
        .send("The number of unit_price should be a positive integer.");
    }

  pool
      .query("SELECT * FROM products WHERE product_name=$1", [product_name])
      .then((result) => {
        if (result.rows.length > 0) {
          return res
            .status(400)
            .send("An products with the same name already exists!");
        } else {
          const query =
            "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
          pool
            .query(query, [product_name, unit_price, supplier_id])
            .then(() => res.send("products created!"))
            .catch((e) => res.status(400).send(e.message));
        }
      });
  });
  
/// Post customers/:customerId/orders ///???


/// Put customers/:customerId ///
app.put("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;

  pool
    .query("UPDATE customers SET name=$1,address=$2,city=$3,country=$4 WHERE id=$5", [name,address,city,country, customerId])
    .then(() => res.send(`Customer ${customerId} updated!`))
    .catch((e) => res.status(400).send(e.message));

});

///Delect orders/:orderId /// ???

app.delete("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;

  pool
    .query("DELETE FROM orders WHERE orderId=$1", [orderId])
    .then(() => {
      pool
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => res.send(`orders ${orderId} deleted!`))
        .catch((e) => res.status(400).send(e.message));
    })
    .catch((e) => res.status(400).send(e.message));
});

/// Delecte customers/:customerId by Id /// ?
app.delete("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("DELETE FROM customers WHERE customer_id=$1", [customerId])
    .then(() => {
      pool
        .query("DELETE FROM customers WHERE id=$1", [customerId])
        .then(() => res.send(`Customer ${customerId} deleted!`))
        .catch((e) => console.error(e.message));
    })
    .catch((e) => res.status(400).send("Something went wrong"));
});

/// Get customers/:customerId/orders ///

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});