import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Demo-only auth: accounts live in this browser's localStorage, there is no server.
// Passwords are stored as SHA-256 hashes so they are never kept in plain text,
// but this is not real security — swap these functions for API calls when a backend exists.

const USERS_KEY = 'jobportal.users'
const SESSION_KEY = 'jobportal.session'

const readJson = (storage, key, fallback) => {
  try {
    const raw = storage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (storage, key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the session then lasts until reload.
  }
}

const removeKey = (key) => {
  try {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  } catch {
    // ignore
  }
}

const hashPassword = async (password) => {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Only follow in-app paths after login (blocks "?redirect=//evil.com" style redirects).
export const safeRedirect = (target) =>
  typeof target === 'string' && target.startsWith('/') && !target.startsWith('//') ? target : '/'

const normalizeEmail = (email) => email.trim().toLowerCase()

export const useAuthStore = defineStore('auth', () => {
  const user = ref(readJson(localStorage, SESSION_KEY, null) || readJson(sessionStorage, SESSION_KEY, null))
  const isLoggedIn = computed(() => !!user.value)

  const startSession = (account, remember) => {
    user.value = { id: account.id, name: account.name, email: account.email }
    removeKey(SESSION_KEY)
    writeJson(remember ? localStorage : sessionStorage, SESSION_KEY, user.value)
  }

  async function register({ name, email, password }) {
    const users = readJson(localStorage, USERS_KEY, [])
    const normalized = normalizeEmail(email)
    if (users.some((u) => u.email === normalized)) {
      throw new Error('An account with this email already exists.')
    }
    const account = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalized,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    }
    writeJson(localStorage, USERS_KEY, [...users, account])
    startSession(account, true)
  }

  async function login({ email, password, remember = true }) {
    const users = readJson(localStorage, USERS_KEY, [])
    const account = users.find((u) => u.email === normalizeEmail(email))
    if (!account || account.passwordHash !== (await hashPassword(password))) {
      throw new Error('Incorrect email or password.')
    }
    startSession(account, remember)
  }

  function logout() {
    user.value = null
    removeKey(SESSION_KEY)
  }

  return { user, isLoggedIn, register, login, logout }
})
