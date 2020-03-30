export function getDistanceToBuenosAiresInKm(
  latitude: number,
  longitude: number
) {
  const radiusOfEarthInKm = 6371;

  const countryLatitude = toRadians(latitude);
  const countryLongitude = toRadians(longitude);
  const buenosAiresLatitude = toRadians(-34.0);
  const buenosAiresLongitude = toRadians(-64.0);

  const distanceInLatitude = buenosAiresLatitude - countryLatitude;
  const distanceInLongitude = buenosAiresLongitude - countryLongitude;

  const a =
    Math.sin(distanceInLatitude / 2) * Math.sin(distanceInLatitude / 2) +
    Math.cos(countryLatitude) *
      Math.cos(buenosAiresLatitude) *
      Math.sin(distanceInLongitude / 2) *
      Math.sin(distanceInLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = (~~(radiusOfEarthInKm * c)).toString();

  return distance;
}

function toRadians(deg: number) {
  return deg * (Math.PI / 180);
}
