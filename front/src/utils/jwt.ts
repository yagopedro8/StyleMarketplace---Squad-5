export function getLoggedUserId(): number | null {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const payload = token.split(".")[1]
    const decoded = JSON.parse(atob(payload))
    const id = decoded?.sub?.id
    return id ? Number(id) : null
  } catch {
    return null
  }
}
