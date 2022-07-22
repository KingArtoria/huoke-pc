const useYunQue = () => {
  const script = document.createElement("script");
  script.src = '//dist.yunque360.com/bundle.js' + "?v=" + new Date().getUTCDate();
  script.async = true;
  const el = document.getElementsByTagName("script")[0];
  // @ts-ignore
  el.parentNode.insertBefore(script, el);
  // @ts-ignore
  window['_YUNQUE'] = { company_id: 'cjn1jvhb8io60d'}
}

export default useYunQue