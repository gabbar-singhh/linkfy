// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "@/firebase";

export default async function handler(req, res) {
  const data = {lolo:'hello'}
  res.status(200).json(data);
}
