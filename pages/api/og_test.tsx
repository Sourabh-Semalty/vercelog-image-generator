/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

async function getImageData(url: string) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const imageData = Buffer.from(response.data, "binary").toString("base64");
  return imageData;
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") as string;
  const price = searchParams.get("price");
  const imageUrl = searchParams.get("image_url") as string;
  console.log("-------------------");
  console.log(searchParams, req.query);
  console.log("-------------------");
  const bufferImage = getImageData(imageUrl);
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          width={300}
          height={180}
          style={{ objectFit: "cover" }}
          src={`data:image/jpeg;base64,${bufferImage}`}
        />
        <p
          style={{
            margin: 0,
            marginTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: "18px",
            fontWeight: "bold",
            WebkitLineClamp: 2,
          }}
        >
          {title.length > 50 ? title.substring(0, 50) + "..." : title}
        </p>
        <p
          style={{
            display: "flex",
            lineClamp: 2,
            boxOrient: "vertical",
            overflow: "hidden",
            paddingLeft: 10,
            fontSize: "16px",
            fontWeight: "bold",
            paddingRight: 10,
          }}
        >
          Rs. {price}
        </p>
      </div>
    ),
    {
      width: 300,
      height: 300,
    }
  );
}
