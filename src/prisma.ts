import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { spawnSync } from 'child_process';

if (process.env.NODE_ENV === 'production') {
  const binaryPath = '/home/query-engine-debian-openssl-1.1.x';

  if (!fs.existsSync(binaryPath)) {
    spawnSync('cp', [
      `${process.env.LAMBDA_TASK_ROOT}/node_modules/.prisma/client/query-engine-debian-openssl-1.1.x`,
      '/home/',
    ]);

    spawnSync('chmod', ['555', '/home/query-engine-debian-openssl-1.1.x']);
  }
}

const Prisma = new PrismaClient();
export default Prisma;
