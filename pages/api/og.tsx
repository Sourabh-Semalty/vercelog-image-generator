import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const image_url = searchParams.get("image_url");
  if (!title || !price || !image_url) {
    return new ImageResponse(<>No image</>, {
      width: 1200,
      height: 630,
    });
  }
  console.log(image_url);

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
          src={image_url}
        />
        <p
          style={{
            margin: 0,
            marginTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: "19px",
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
            fontSize: "17px",
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
