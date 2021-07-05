import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

// const file = './src/core/file-upload/icon.png';
// const fileStream = fs.createReadStream(file);

const fileUpload = async (fileName: string, fileStream: fs.ReadStream): Promise<string | null> => {
  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;
  const cubeName = process.env.CUBE_NAME;
  const bucketName = process.env.BUCKET_NAME;
  const s3Region = process.env.S3_REGION;

  if (!(accessKeyId && secretAccessKey && cubeName && bucketName && s3Region)) {
    return null;
  }

  const s3Client = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const key = `${cubeName}/public/${fileName}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  } catch (err) {
    return null;
  }
};

export default fileUpload;
