import goEasy from 'goeasy';

// 测试环境key
const DEV = 'BC-243a571c586646b4bb625f53f853222f'
// 正式环境key
const PROD = 'BC-ad662406fecb4b58bcd6e609416cf61f'
// TODO 部署时更换正式环境key
let instance: any
const useGoEasy = () => {
  if (instance) return instance
  instance = goEasy.getInstance({
    host: 'hangzhou.goeasy.io',
    appkey: PROD,
    modules: ['pubsub', 'im'],
  });
  return instance
}

export default useGoEasy