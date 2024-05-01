import * as multer from "multer";
import { memoryStorage, Multer } from "multer";
import * as crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generateFileName = (bytes: number = 32): string =>
  crypto.randomBytes(bytes).toString("hex");

const storage: multer.StorageEngine = memoryStorage();
export const upload: Multer = multer({ storage });

const bucketName: string | undefined = process.env.AWS_BUCKET_NAME;
const region: string | undefined = process.env.AWS_BUCKET_REGION;
const accessKeyId: string | undefined = process.env.AWS_ACCESS_KEY;
const secretAccessKey: string | undefined = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS S3 configuration is incomplete.");
}

const s3Client: S3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadFile = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
): Promise<any> => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
};

export const deleteFile = (fileName: string): Promise<any> => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
};

export const getObjectSignedUrl = async (key: string): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
};
