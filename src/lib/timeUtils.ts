// Formats seconds into MM:SS format
export function formatTimeMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Formats seconds into M:SS.s format (e.g. for tenths of a second if needed)
// For now, we'll stick to MM:SS, but this is an option.
// export function formatTimeMMSSsss(totalSeconds: number): string {
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = Math.floor(totalSeconds % 60);
//   const tenths = Math.floor((totalSeconds * 10) % 10);
//   return `${String(minutes).padStart(1,'0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
// }

// Parses MM:SS string to seconds
export function parseTimeMMSS(timeStr: string): number {
  const parts = timeStr.split(':');
  if (parts.length !== 2) return 0;
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  if (isNaN(minutes) || isNaN(seconds)) return 0;
  return minutes * 60 + seconds;
}
