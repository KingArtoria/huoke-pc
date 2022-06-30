
/**
 * 轮询任务
 * @param fn 任务
 * @param timeout 频率 
 * @param immediate 立即执行 
 * @returns 
 */
const usePull = (fn: Function, timeout: number, immediate: boolean = false) => {
  let timer: any = null
  const stopPull = () => {
    clearTimeout(timer)
  }
  const pull = () => {
    timer = setTimeout(() => {
      console.log(1);

      fn()
      pull()
    }, timeout);
  }
  stopPull()
  pull()
  if (immediate) {
    fn()
  }
  return {
    stopPull
  }
}

export default usePull