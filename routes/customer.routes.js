module.exports = app => {
    const customers = require("../app/controllers/customer.controller.js");
    app.post("/findwallet", customers.createOrFindOne);
    app.get("/findwallet/:id", customers.findByWalletAddress);
    app.post("/claim", customers.setClaimed)
  };