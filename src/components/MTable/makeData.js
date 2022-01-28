import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

// const newPerson = () => {
//   const statusChance = Math.random()
//   return {
//     firstName: namor.generate({ words: 1, numbers: 0 }),
//     lastName: namor.generate({ words: 1, numbers: 0 }),
//     age: Math.floor(Math.random() * 30),
//     visits: Math.floor(Math.random() * 100),
//     progress: Math.floor(Math.random() * 100),
//     status:
//       statusChance > 0.66
//         ? 'relationship'
//         : statusChance > 0.33
//         ? 'complicated'
//         : 'single',
//   }
// }

const newFile = () => {
  const statusChance = Math.random()*10;
  const now = (new Date()).getTime();
  const newDiff = parseInt(Math.random() * 1000 * 60 * 60 * 24 * 365, 10);
  const otherDate = new Date(now + newDiff).toLocaleDateString();
  return {
    案號: namor.generate({ words: 1, numbers: 0 }),
    建檔日期:otherDate,
    說明: statusChance,
    立案人員: namor.generate({ words: 1, numbers: 0 }),
    通知信箱: namor.generate({ words: 1, numbers: 0 }) + '@gmail.com',
    來源文件: Math.floor(Math.random() * 100),
    比對文件: Math.floor(Math.random() * 100),
    比對程序:
      statusChance > 5
        ? '已完成比對'
        : '尚未比對',
    比對結果查詢: namor.generate({ words: 1, numbers: 0 }),
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newFile(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
