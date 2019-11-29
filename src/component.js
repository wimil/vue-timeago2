import { toNow, strict } from "./converts";
//console.log(toNow);
export default (opts = {}) => {
  const locales = opts.locales || {};
  const name = opts.name || "Timeago";

  return {
    name,
    props: {
      datetime: {
        required: true
      },
      title: {
        type: [String, Boolean]
      },
      locale: {
        type: String
      },
      autoUpdate: {
        type: [Number, Boolean]
      },
      converter: {
        type: Function
      },
      converterOptions: {
        type: Object
      },
      typeConvert: {
        type: String,
        default: "default"
      }
    },

    data() {
      return {
        timeago: this.getTimeago()
      };
    },

    computed: {
      localeName() {
        return this.locale || this.$timeago.locale;
      }
    },

    mounted() {
      this.startUpdater();
    },

    beforeDestroy() {
      this.stopUpdater();
    },

    render(h) {
      return h(
        "time",
        {
          attrs: {
            datetime: new Date(this.datetime),
            title:
              typeof this.title === "string"
                ? this.title
                : this.title === false
                ? null
                : this.timeago
          }
        },
        [this.timeago]
      );
    },

    methods: {
      getTimeago(datetime) {
        //console.log(datetime);
        const converter =
          this.converter || opts.converter || this.defaultTypeConvert();
        return converter(
          datetime || this.datetime,
          locales[this.locale || this.$timeago.locale],
          this.converterOptions || {}
        );
      },

      convert(datetime) {
        //console.log('hola');
        this.timeago = this.getTimeago(datetime);
      },

      defaultTypeConvert() {
        //console.log('hola')
        if (this.typeConvert === "default") {
          //console.log(toNow)
          return toNow;
        } else if (this.typeConvert === "strict") {
          return strict;
        }
      },

      startUpdater() {
        if (this.autoUpdate) {
          const autoUpdaye = this.autoUpdate === true ? 60 : this.autoUpdate;
          this.updater = setInterval(() => {
            this.convert();
          }, autoUpdaye * 1000);
        }
      },

      stopUpdater() {
        if (this.updater) {
          clearInterval(this.updater);
          this.updater = null;
        }
      }
    },

    watch: {
      autoUpdate(newValue) {
        this.stopUpdater();
        if (newValue) {
          this.startUpdater();
        }
      },
      datetime() {
        this.convert();
      },
      localeName() {
        this.convert();
      },
      converter() {
        this.convert();
      },
      converterOptions: {
        handler() {
          this.convert();
        },
        deep: true
      }
    }
  };
};
