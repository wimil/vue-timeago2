import createTimeago from "./component";
import defaultConverter from "./converts";

//instalacion del plugin
export const install = (Vue, opts) => {
  if (Vue.prototype.$timeago) {
    return;
  }
  if (process.env.NODE_ENV === "development" && !Vue.observable) {
    console.warn(`[vue-timeago] Vue 2.6 or above is recommended.`);
  }

  const $timeago = {
    locale: opts.locale
  };

  Vue.prototype.$timeago = Vue.observable
    ? Vue.observable($timeago)
    : new Vue({ data: $timeago });

  const Component = createTimeago(opts);
  Vue.component(Component.name, Component);
};

//export const converter = defaultConverter;

export default install;
