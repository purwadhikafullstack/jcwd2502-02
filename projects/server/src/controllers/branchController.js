const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler")
const { getBranchService } = require("./../services/branchService");
const { nearestBranchService } = require("./../services/branchService");
module.exports = {
    getbranch: async (req, res, next) => {
        try {
            const allBranch = await getBranchService()
            responseHandler(res, "Get All Branch Success", allBranch)
        } catch (error) {
            next(error)
        }
    },
    nearestBranch: async (req, res, next) => {
        try {
            const product = await nearestBranchService(req.params)
            responseHandler(res, "Get Nearest Branch Success", product)
        } catch (error) {
            next(error)
        }
    }
}