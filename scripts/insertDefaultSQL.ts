import { Prisma, User } from "@prisma/client";
const csv = require("csv-parser");
import * as fs from "fs";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";
import addRecipe from "../src/mutations/addRecipe";
import { MutationAddRecipeArgs } from "../src/generated/graphql";

async function arrayFromCSV<T>(filename: string): Promise<T[]> {
  return new Promise((resolve) => {
    const results: T[] = [];
    fs.createReadStream(filename)
      .pipe(csv({ separator: "\t" }))
      .on("data", (data: T) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
}

function parseArray(arrayAsString: string): string[] {
  return arrayAsString
    .replace(/\"|\[|\]/g, "")
    .split(",")
    .map((s) => s.trim());
}

let users: Array<User> = [];

async function getRandomUser() {
  if (users.length === 0) {
    users = await prisma.user.findMany();
  }

  return users[Math.floor(Math.random() * (users.length - 1))];
}

// Create Diets
arrayFromCSV<Prisma.DietCreateManyInput>("./csv/diets.csv").then(
  async (data) => {
    await prisma.diet.createMany({
      data,
    });
  }
);

// Create Allergies
arrayFromCSV<Prisma.AllergiesCreateManyInput>("./csv/allergies.csv").then(
  async (data) => {
    await prisma.allergies.createMany({
      data,
    });
  }
);

// Create Categories
arrayFromCSV<Prisma.CategoryCreateManyInput>("./csv/categories.csv").then(
  async (data) => {
    await prisma.category.createMany({
      data,
    });
  }
);

// Create Users
arrayFromCSV<Prisma.UserCreateInput>("./csv/users.csv")
  .then((data) => {
    data.forEach(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      await prisma.user.create({
        data: { ...user, password: hash },
      });
    });
  })
  .then(() => {
    // Create Recipes
    arrayFromCSV<any>("./csv/recipes.csv").then(async (data) => {
      data.forEach(async (datum) => {
        console.log(
          await prisma.recipe.create({
            data: {
              ...datum,
              submittedBy: {
                connect: {
                  id: (await getRandomUser()).id,
                },
              },
              ingredients: {
                create: parseArray(datum.ingredients).map((name) => ({
                  genericIngredient: {
                    connectOrCreate: {
                      where: { name },
                      create: { name },
                    },
                  },
                })),
              },
              categories: {
                connectOrCreate: parseArray(datum.categories).map((name) => ({
                  where: { name },
                  create: { name },
                })),
              },
              diets: {
                connectOrCreate: parseArray(datum.diets).map((name) => ({
                  where: { name },
                  create: { name },
                })),
              },
              allergies: {
                connectOrCreate: parseArray(datum.allergies).map((name) => ({
                  where: { name },
                  create: { name },
                })),
              },
            },
          })
        );
      });
    });
  });
