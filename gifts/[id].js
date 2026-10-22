
const gifts = [
  { id: 1, name: "Birthday Gift", price: 25 },
  { id: 2, name: "Flowers", price: 15 },
  { id: 3, name: "Chocolate Box", price: 10 }
];

module.exports = (req, res) => {
  const id = Number(req.query.id);
  const gift = gifts.find(item => item.id === id);

  if (!gift) {
    return res.status(404).json({
      error: "Gift not found"
    });
  }

  return res.status(200).json(gift);
};
