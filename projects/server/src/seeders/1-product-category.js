'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_categories",
      [
        {
          id: 1,
          name: "Fruits",
          image: "public/pc1.png",
          isDeleted: 0,
        },
        {
          id: 2,
          name: "Veggies",
          image: "public/pc2.png",
          isDeleted: 0,
        },
        {
          id: 3,
          name: "Meats",
          image: "public/pc3.png",
          isDeleted: 0,
        },
        {
          id: 4,
          name: "Groceries",
          image: "public/pc4.png",
          isDeleted: 0,
        },
        {
          id: 5,
          name: "Seafoods",
          image: "public/pc5.png",
          isDeleted: 0,
        },
        {
          id: 6,
          name: "Spices",
          image: "public/pc6.png",
          isDeleted: 0,
        },
        {
          id: 7,
          name: "Chickens",
          image: "public/pc7.png",
          isDeleted: 0,
        },
        {
          id: 8,
          name: "Instant Foods",
          image: "public/pc8.png",
          isDeleted: 0,
        },
        {
          id: 9,
          name: "Proteins",
          image: "public/pc9.png",
          isDeleted: 0,
        },
        {
          id: 10,
          name: "Dairy",
          image: "public/pc10.png",
          isDeleted: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_categories", null, {});
  }
};
