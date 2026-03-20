export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://customer-form-app-eight.vercel.app',
        'X-Title': 'Customer Form',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: req.body.messages,
      }),
    });

    const rawText = await response.text();
    try {
      const data = JSON.parse(rawText);
      return res.status(response.status).json(data);
    } catch {
      return res.status(500).json({ error: rawText.substring(0, 300) });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
