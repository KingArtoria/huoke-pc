import goEasy from 'goeasy';

let instance: any
const useGoEasy = () => {
  if (instance) return instance
  instance = goEasy.getInstance({
    host: 'hangzhou.goeasy.io',
    // appkey: 'BC-ad662406fecb4b58bcd6e609416cf61f',
    appkey: 'BC-243a571c586646b4bb625f53f853222f',
    modules: ['pubsub', 'im'],
  });
  return instance
}

export default useGoEasy