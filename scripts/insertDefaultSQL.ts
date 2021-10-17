import { Prisma, User } from "@prisma/client";
const csv = require("csv-parser");
import * as fs from "fs";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";
import fullRecipeArgs from "../src/core/recipe/fullRecipeArgs";

const comments = [
  "Great recipe!",
  "That was really cool.",
  "I liked this one.",
];

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
    return data.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      return await prisma.user.create({
        data: { ...user, password: hash },
      });
    });
  })
  .then((users) => {
    async function getRandomUser() {
      return users[Math.floor(Math.random() * (users.length - 1))];
    }
    // Create Recipes
    arrayFromCSV<any>("./csv/recipes.csv").then(async (data) => {
      data.forEach(async (datum) => {
        console.log(
          await prisma.recipe.create({
            data: {
              ...datum,
              servingCount: Math.floor(Math.random() * 8) + 1,
              timeEstimate: new Date(
                (Math.floor(Math.random() * 8) + 1) * 1000 * 60 * 60 * 15
              ),
              likedBy: {
                connect: (
                  await Promise.all(
                    users.map(async () => ({
                      id: (await getRandomUser()).id,
                    }))
                  )
                ).slice(0, Math.floor(Math.random() * (users.length - 1))),
              },
              submittedBy: {
                connect: {
                  id: (await getRandomUser()).id,
                },
              },
              recipeComments: {
                create: {
                  author: {
                    connect: {
                      id: (await getRandomUser()).id,
                    },
                  },
                  contents:
                    comments[Math.floor(Math.random() * (comments.length - 1))],
                },
              },
              description:
                "Et nemo officiis consequatur. Esse assumenda voluptatem laudantium ipsam alias autem dolore unde. Nostrum tenetur libero nihil libero. Quos repellendus ullam at.\nProvident non doloremque et excepturi ut. Reprehenderit accusantium eius in. Ab dicta amet doloribus rerum exercitationem. Odit non optio repudiandae quas. Commodi eos et quas sint minima molestiae quod.",
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
            ...fullRecipeArgs,
          })
        );
      });
    });
  });
