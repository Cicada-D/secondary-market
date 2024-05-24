// 货物信息
export function gsplitBody(data, images) {
  const path = imagesPath(images)
  const newData = {
    uid: data.uid,
    gName: data.name,
    gDescribe: data.describe,
    gImages: path,
    gPrice: data.price,
    gType: data.type,
    gState: data.level,
    state: data.state
  }
  return newData
}

export function imagesPath(images) {
  let path = []
  console.log("images: ", images)
  for (const itme of images) {
    // console.log(" 1" + itme.path)
    const temp = itme.path
    path.push(temp)
  }
//   console.log(path)
  return path.join(',')
}

//用户信息
export function gsplitUserBody(data, image) {
  const newData = {
    uid: data.uid,
    name: data.name,
    sex: data.sex,
    age: data.age,
    image: image[0].path,
    describe: data.describe,
    sit: data.sit,
  }
  return newData
}

