const db = require('../models');
const fs = require('fs').promises;
const { getBranchService } = require("./../services/branchService");
const { nearestBranchService1 } = require("./../services/branchService");
const { nearestBranchService2 } = require("./../services/branchService");
module.exports = {
    getbranch: async (req, res, next) => {
        try {
            const allBranch = await getBranchService()
            res.status(201).send({
                isError: false,
                message: "Get All Branch Success",
                data: allBranch
            })
        } catch (error) {
            next(error)
        }
    },

    nearestBranch: async (req, res, next) => {
        try {
            const { id } = req.params;
            const branch = await nearestBranchService1(id)

            const product = await nearestBranchService2(id)

            res.status(201).send({
                isError: false,
                message: "Get Nearest Branch Success",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }
}