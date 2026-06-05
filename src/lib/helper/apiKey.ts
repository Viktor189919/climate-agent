import { randomBytes, createHash } from 'crypto';

export function generateApiKey() {

  const random_key = randomBytes(32).toString('base64url');
  
  const api_key = `ca_pick_${random_key}`;

  const api_key_hash = hash(api_key);

  return {api_key: api_key, api_key_hash: api_key_hash};
}

export function hash(string: string) {
  return createHash('sha256').update(string).digest('hex');
}