export function getLocalTime(offset: string) {
  const today = new Date();

  const utc = today.getTime() + today.getTimezoneOffset() * 60000;
  const localDateInLocation = new Date(utc + 3600000 * +offset);

  if (+offset === 1) {
    localDateInLocation.setHours(localDateInLocation.getHours() + 1);
  }

  const hours = localDateInLocation.getHours();
  const minutes = localDateInLocation.getMinutes();
  const seconds = localDateInLocation.getSeconds();

  const time = `${hours}:${minutes}:${seconds} (UTC${offset})`;

  return time;
}
