export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const {
      name = '',
      date = '',
      time = '',
      visitors = '',
      phone = ''
    } = req.body || {};

    const token = process.env.VK_GROUP_TOKEN;
    const peerId = process.env.VK_PEER_ID;
    const apiVersion = process.env.VK_API_VERSION || '5.131';

    if (!token || !peerId) {
      return res.status(500).json({ ok: false, error: 'VK env vars missing' });
    }

    const message = [
      'Новая запись с сайта выставки бабочек:',
      `Имя: ${name}`,
      `Дата: ${date}`,
      `Время: ${time}`,
      `Посетителей: ${visitors}`,
      `Телефон: ${phone}`
    ].join('\n');

    const params = new URLSearchParams({
      access_token: token,
      v: apiVersion,
      peer_id: String(peerId),
      random_id: String(Date.now()),
      message
    });

    const response = await fetch(`https://api.vk.com/method/messages.send?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(500).json({ ok: false, error: data.error || 'VK API error' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
