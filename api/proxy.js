export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

const MODELS = [
  'mistralai/mistral-7b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'qwen/qwen-2-7b-instruct:free',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let lastError = '';
  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://vercel.app',
          'X-Title': 'Customer Form',
        },
        body: JSON.stringify({ model, messages: req.body.messages }),
      });

      const rawText = await response.text();
      let data;
      try { data = JSON.parse(rawText); } catch { lastError = rawText.substring(0, 200); continue; }

      if (data.error) { lastError = data.error.message || JSON.stringify(data.error); continue; }
      if (!data.choices?.[0]?.message?.content) { lastError = 'empty response'; continue; }

      return res.status(200).json(data);
    } catch (err) { lastError = err.message; }
  }

  return res.status(500).json({ error: 'ไม่มีโมเดลที่ใช้ได้: ' + lastError });
}

