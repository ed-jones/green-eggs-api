import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

const file = './src/core/file-upload/icon.png'; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file);

const fileUpload = async (): Promise<any> => {
  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;
  const cubeName = process.env.CUBE_NAME;
  const bucketName = process.env.BUCKET_NAME;
  const s3Region = process.env.S3_REGION;

  if (!(accessKeyId && secretAccessKey && cubeName && bucketName && s3Region)) {
    return {
      error: {
        message: 'Missing an environment variable',
      },
    };
  }

  const s3Client = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const key = `${cubeName}/public/${path.basename(file)}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return { data: { uri: `https://${bucketName}.s3.amazonaws.com/${key}` } };
  } catch (err) {
    return {
      error: {
        message: err,
      },
    };
  }
};

fileUpload();

export default fileUpload;
