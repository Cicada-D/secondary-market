export function gsplitBody(data, images) {
  const path = imagesPath(images)
  const newData = {
    uid: data.uid,
    gName: data.name,
    gDescribe: data.describe,
    gImages: path,
    gPrice: data.price,
    gType: data.type,
    gState: data.level
  }
  return newData
}

export function imagesPath(images) {
  let path = []
  for (const itme of images) {
    // console.log(" 1" + itme.path)
    const temp = itme.path
    path.push(temp)
  }
//   console.log(path)
  return path.join(',')
}
