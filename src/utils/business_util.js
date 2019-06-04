/**
 * 业务逻辑相关的工具函数
 * 它们与一般工具函数差别在于它们服务于某些具体的业务，在跨业务时不具备通用性
 */


export function getPetId(object)
{
  let id = '' // 省 类别 生日 性别 编号
  if (!object)
    return
  id += object.native_province 
  switch (object.type) {
    case '狗狗':
      id += 'D'
      break
    case '猫猫':
      id += 'C'
      break
    case '异宠':
      id += 'O'
      break
  }
  id += object.birthday.replace(/-/g, '')
  switch (object.sex) {
    case '雄性':
      id += 'F'
      break
    case '雌性':
      id += 'M'
      break
  }
  id += object.id
  return id
}
