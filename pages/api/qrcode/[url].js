// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QRCode from "qrcode";
import { PassThrough } from "stream";

export default async (req, res) => {
  try {
    const { url } = req.query;
    const qrStream = new PassThrough();
    const result = await QRCode.toFileStream(qrStream, url, {
      type: "png",
      width: 400,
      width: 400,
      errorCorrectionLevel: "H",
    });

    qrStream.pipe(res);
  } catch (err) {
    console.error("Failed to return content", err);
  }
};
