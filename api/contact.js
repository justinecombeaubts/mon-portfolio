// Fonction Vercel : reçoit le formulaire de contact et l'envoie sur Discord.
// Le webhook reste côté serveur : variable d'environnement DISCORD_WEBHOOK_URL (Vercel > Settings > Environment Variables).

const LIMITS = { name: 100, email: 254, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Texte libre de l'internaute : on coupe à la limite de Discord et on neutralise la mise en forme.
const clean = (value, max) =>
  String(value ?? '')
    .trim()
    .slice(0, max)
    .replace(/([\\*_~`|>])/g, '\\$1');

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: 'Requête invalide.' });
  }

  // Piège à robots : champ invisible rempli, ou formulaire envoyé en moins de 3 secondes.
  // On répond « ok » pour ne pas leur indiquer qu'ils ont été repérés.
  if (data._gotcha || (Number(data._elapsed) > 0 && Number(data._elapsed) < 3000)) {
    return json(200, { ok: true });
  }

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();
  if (!name || name.length > LIMITS.name) return json(400, { error: 'Indiquez votre nom.' });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return json(400, { error: 'Indiquez une adresse email valide.' });
  if (message.length < 10 || message.length > LIMITS.message) {
    return json(400, { error: `Votre message doit faire entre 10 et ${LIMITS.message} caractères.` });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error('contact : DISCORD_WEBHOOK_URL manquante');
    return json(500, { error: 'Service indisponible.' });
  }

  // Discord limite la description d'un embed à 4 096 caractères : le message (3 000 max) y tient.
  const payload = {
    username: 'Portfolio',
    allowed_mentions: { parse: [] }, // jamais de @everyone ni de mention déclenchée par un visiteur
    embeds: [
      {
        title: '📬 Nouveau message depuis le portfolio',
        color: 0xe2baac,
        description: clean(message, LIMITS.message),
        fields: [
          { name: 'Nom', value: clean(name, LIMITS.name), inline: true },
          { name: 'Email', value: clean(email, LIMITS.email), inline: true },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Discord a répondu ${res.status}`);
  } catch (error) {
    // Jamais l'URL du webhook dans les logs : seulement le statut.
    console.error('contact : envoi Discord impossible :', error.message);
    return json(502, { error: "Le message n'a pas pu être envoyé." });
  }

  return json(200, { ok: true });
}
