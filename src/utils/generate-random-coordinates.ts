// 地球半径（单位：米）
const EARTH_RADIUS = 6371000;

// 将经纬度转换为弧度
function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

// 将弧度转换为经纬度
function toDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

// 在给定经纬度周围生成随机经纬度
function generateRandomCoordinates(latitude: number, longitude: number, distance: number) {
  const radiusInDegrees = distance / EARTH_RADIUS;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newLat = toDegrees(y + toRadians(latitude));
  const newLng = toDegrees(x + toRadians(longitude));

  return { latitude: parseFloat(newLat.toFixed(6)), longitude: parseFloat(newLng.toFixed(6)) };
}

// 示例函数：生成在给定经纬度周围50米的新经纬度
export default function generateNewCoordinates(latitude: number, longitude: number) {
  return generateRandomCoordinates(latitude, longitude, 50);
}

// // 示例用法
// const newCoordinates = generateNewCoordinates(40.062539, 116.171196);
// console.log(newCoordinates);
