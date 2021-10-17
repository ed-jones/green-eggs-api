import prisma from '../src/prisma';
import { Prisma } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';

async function arrayFromCSV<T>(filename: string): Promise<T[]> {
  return new Promise((resolve) => {
    const results = []
    fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results);
    });
  });
}

// Create Users
arrayFromCSV<Prisma.UserCreateManyInput>('users.csv').then((data) => {
  prisma.user.createMany({
    data
  });
});

// Create Diets
arrayFromCSV<Prisma.DietCreateManyInput>('diets.csv').then((data) => {
  prisma.diet.createMany({
    data
  });
});

// Create Allergies
arrayFromCSV<Prisma.AllergiesCreateManyInput>('allergies.csv').then((data) => {
  prisma.allergies.createMany({
    data
  });
});

// Create Categories
arrayFromCSV<Prisma.CategoryCreateManyInput>('categories.csv').then((data) => {
  prisma.category.createMany({
    data
  });
});

// Create Recipes
arrayFromCSV<Prisma.RecipeCreateManyInput>('recipes.csv').then((data) => {
  prisma.recipe.createMany({
    data
  });
});

// Create Recipe Comments