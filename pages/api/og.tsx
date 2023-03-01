/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const imageUrl = searchParams.get("image_url");

  console.log("hi");
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
          alignItems: "center",
        }}
      >
        <img width={300} height={180} src={`${imageUrl}`} />
        <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
          {title}
        </p>
        <p
          style={{
            display: "flex",
            lineClamp: 2,
            boxOrient: "vertical",
            overflow: "hidden",
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
