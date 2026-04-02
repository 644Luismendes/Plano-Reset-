export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Webhook recebido:", req.body);

    return res.status(200).json({ received: true });
  }

  res.status(405).json({ message: "Método não permitido" });
}
