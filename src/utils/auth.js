const AUTH_KEYS = {
  adminFails: 'fkv_admin_login_fails_v1',
  freelancerFails: 'fkv_freelancer_login_fails_v1',
};

const AUTH_LIMITS = {
  maxFails: 5,
  lockMs: 10 * 60 * 1000,
  sessionMs: 8 * 60 * 60 * 1000,
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function getLoginState(key) {
  return readJson(key, { fails: 0, lockedUntil: 0 });
}

export function isLocked(key) {
  const state = getLoginState(key);
  if (!state.lockedUntil) return false;
  if (Date.now() < state.lockedUntil) return true;
  localStorage.removeItem(key);
  return false;
}

export function registerFailedAttempt(key) {
  const state = getLoginState(key);
  const nextFails = state.fails + 1;
  const nextState = nextFails >= AUTH_LIMITS.maxFails
    ? { fails: nextFails, lockedUntil: Date.now() + AUTH_LIMITS.lockMs }
    : { fails: nextFails, lockedUntil: 0 };
  return writeJson(key, nextState);
}

export function clearFailedAttempts(key) {
  localStorage.removeItem(key);
}

export function createSession(role, data) {
  return {
    role,
    ...data,
    createdAt: Date.now(),
    expiresAt: Date.now() + AUTH_LIMITS.sessionMs,
  };
}

export function isSessionExpired(session) {
  return !session || !session.expiresAt || Date.now() > session.expiresAt;
}

export { AUTH_KEYS, AUTH_LIMITS };
