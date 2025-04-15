import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const tokens = req.body;

    res.setHeader(
      'Set-Cookie',
      serialize('session', JSON.stringify(tokens), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
    );

    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader(
      'Set-Cookie',
      serialize('session', '', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
      })
    );

    return res.status(200).json({ success: true, message: 'Session cleared' });
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
