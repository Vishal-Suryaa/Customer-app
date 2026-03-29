const express = require('express');

const router = express.Router();

const Customer = require('../models/customer');

//GET list
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error });
    }
});

//GET by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foundCustomer = await Customer.findOne({ _id: id });
    res.status(200).json(foundCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error });
  }
})

//POST create
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error });
  }
})

//PUT update
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomer = await Customer.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error });
  }
})

//DELETE delete
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findOneAndDelete({ _id: id });
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error });
  }
})


module.exports = router;