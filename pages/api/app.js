export default async function handler(req, res) {
  const data = {lolo:'hello'}
  res.status(200).json(data);
}
