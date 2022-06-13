import goEasy from 'goeasy';
export default class GoEasy {
  static goEasyData: any;
  static getGoEasy() {
    if (!GoEasy.goEasyData) {
      GoEasy.goEasyData = this.initGoEasy();
    }
    return GoEasy.getGoEasy;
  }
  static initGoEasy(): any {
    return goEasy.getInstance({
      host: 'hangzhou.goeasy.io',
      appkey: 'BC-ad662406fecb4b58bcd6e609416cf61f',
      modules: ['pubsub', 'im'],
    });
  }
}
