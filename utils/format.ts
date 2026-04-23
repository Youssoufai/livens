export function formatTimer(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const paddedHours = String(hrs).padStart(2, '0')
  const paddedMinutes = String(mins).padStart(2, '0')
  const paddedSeconds = String(secs).padStart(2, '0')

  return hrs > 0
    ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    : `${paddedMinutes}:${paddedSeconds}`
}
