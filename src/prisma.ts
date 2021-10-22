/**
 * Author: Edward Jones
 */

import { PrismaClient } from '@prisma/client';

/**
 * Singleton that lets us access all prisma operations
 */
const Prisma = new PrismaClient();
export default Prisma;
