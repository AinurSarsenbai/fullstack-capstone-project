
const gifts = [
  { id: 1, name: "Birthday Gift", price: 25 },
  { id: 2, name: "Flowers", price: 15 },
  { id: 3, name: "Chocolate Box", price: 10 }
];

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.query.id;

  if (id) {
    const gift = gifts.find(g => g.id === Number(id));
    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }
    return res.status(200).json(gift);
  }

  return res.status(200).json(gifts);
};
