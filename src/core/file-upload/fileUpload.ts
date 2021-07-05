import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ReadStream } from 'fs-capacitor';
import fs from 'fs';
import path from 'path';

const file = './src/core/file-upload/icon.png';
const bla = fs.createReadStream(file);

const fileUpload = async (fileName: string, fileStream: (options?:{encoding?: string, highWaterMark?: number}) => ReadStream): Promise<string | null> => {
  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;
  const cubeName = process.env.CUBE_NAME;
  const bucketName = process.env.BUCKET_NAME;
  const s3Region = process.env.S3_REGION;

  if (!(accessKeyId && secretAccessKey && cubeName && bucketName && s3Region)) {
    console.log("Missing one or more environment variables")
    return null;
  }

  const s3Client = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const stream = fileStream();

  const data = await new Promise<Buffer>(function(resolve, reject) {
    let buffers: Buffer[]  = []; 
    stream.on("data", function(data) { 
      buffers.push(data as Buffer); 
    }); 
    stream.on("end", () => {
      const actualContents = Buffer.concat(buffers); 
      resolve(actualContents);
    });
  });

  const key = `${cubeName}/public/${fileName}`;

  console.log(data.byteLength);

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentLength: data.byteLength
  };
  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    stream.destroy();
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  } catch (err) {
    stream.destroy();
    console.log(err);
    return null;
  }
};

export default fileUpload;
