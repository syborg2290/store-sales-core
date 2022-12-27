module.exports.modifyKey = function (key, previusFolder) {
  const chunks = key.split("/");
  const fileName = chunks.pop();
  chunks.pop()
  chunks.push(previusFolder);
  chunks.push(fileName);
  key = chunks.join("/");
  return key;
};
