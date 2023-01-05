function randomString(length: number = 16, type: number = 0) {
  var result: string = "";
  var chars: string;

  if (type == 0) {
    chars = "0123456789";
  }
  if (type == 1) {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (type == 2) {
    chars = "abcdefghijklmnopqrstuvwxyz";
  }
  if(type == 3){
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export default randomString;
