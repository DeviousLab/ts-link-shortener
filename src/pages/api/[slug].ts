import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 400;
    res.send(JSON.stringify({ error: "No slug provided" }));
    return;
  }
  const data = await prisma.shortenedLink.findFirst({
    where: {
      slug: {
        equals: slug,
      }
    }
  });
  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ error: "No link found" }));
    return;
  }
  return res.redirect(data.url);
}