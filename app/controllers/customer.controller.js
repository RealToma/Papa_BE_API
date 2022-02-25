const WalletList = require('../../models/wallet')
const _ = require('lodash');
require('mongoose');

// Create and Save a new Customer
exports.createOrFindOne = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Customer

  console.log("body",req.body.tokenInfo)
  WalletList.findOne({ address: req.body.address })
    .then(async(data) => {
      console.log("data",data)
      if (data) res.send(data)    //when succeed to find out that this user wallet address already exist, return data.
      else {                      // when empty user wallet info, create new one.
        console.error("data is null")
        const customer = new WalletList({
          address: req.body.address
        })
        console.warn(customer);
        WalletList.create(customer)
          .then((data) => {
            console.warn("created successfully",data)
            res.send(data)
          })
          .catch((err) =>
            {
              console.log('create fail', err)
              res.status(500).send({
                  message: err || 'Some error occureed while creating the data',
              })
            }
          )
      }
    })
    .catch((e) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

exports.findByWalletAddress = (req, res) => {
  console.log("********** findByWalletAddress ************** req.params.id=", req.params.id);

  WalletList.findOne({ address: req.params.id })
    .then(data => {
      console.warn("---------- addressInfo ------------",data)
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

exports.setClaimed = (req, res) => {
  console.log("********* setClaimed ************")
  WalletList.findOneAndUpdate({ address: req.body.address }, {status: "Claimed"})
    .then(data=>{
      console.log(data)
      if(data) {
        res.send({data, message: "claimed successful!"});
      } else {
        res.send({message: 'Unregistered address!'});
      }
    }).catch(e=>{
      console.log("+++++++++++error+++++++++++", e)
      res.status(500).send({
        message:
          e.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  console.log('deletAll')
  WalletList.remove({})
    .then((data) => {
      res.sendStatus(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Could not delete Customer.',
      })
    })
}
