const db = require('../models');
const fs = require('fs').promises;
const responseHandler = require("./../utils/responseHandler")
const { getBranchService } = require("./../services/branchService");
const { getOneBranchService } = require("./../services/branchService");
const { nearestBranchService } = require("./../services/branchService");
const { getRecommendProductService } = require("./../services/branchService");
module.exports = {
    getbranch: async (req, res, next) => {
        try {
            const allBranch = await getBranchService()
            responseHandler(res, "Get All Branch Success", allBranch)
        } catch (error) {
            next(error)
        }
    },
    getOneBranch: async (req, res, next) => {
        try {
            const oneBranch = await getOneBranchService(req.params)
            responseHandler(res, "Get All Branch Success", oneBranch)
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
    },
    getRecommendProduct: async (req, res, next) => {
        try {
            const result = await getRecommendProductService(req.query, res);
            responseHandler(res, "Get Recommended Products Success", result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

}