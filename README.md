# vue-timeago2 [![NPM version](https://img.shields.io/npm/v/vue-timeago2.svg)](https://npmjs.com/package/vue-timeago2) [![NPM downloads](https://img.shields.io/npm/dm/vue-timeago2.svg)](https://npmjs.com/package/vue-timeago2) 

> A timeago component Vue.js

## Install

```bash
yarn add vue-timeago2
# or
npm i vue-timeago2
```


## Usage

```js
import VueTimeago2 from 'vue-timeago2'

Vue.use(VueTimeago2, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn/index'),
    es: require('date-fns/locale/es/index')
  }
})
```

Then in your lovely component:

```vue
<!-- simple usage -->
<!-- time is a dateString that can be parsed by Date.parse() -->
<timeago :datetime="time"></timeago>
//return in about 1 hour

<!-- Convert type -->
<!-- You can use both converters by default: default or strict -->
<timeago :datetime="time" typeConvert="strict"></timeago>
//return '6 months'

<!-- Auto-update time every 60 seconds -->
<timeago :datetime="time" :auto-update="60"></timeago>

<!-- custom locale -->
<!-- use a different locale instead of the global config -->
<timeago :datetime="time" locale="zh-CN"></timeago>


```

## Plugin options

```js
Vue.use(VueTimeago, pluginOptions)
```

### locales

- **Type**: `{ [localeName: string]: any }`

An object of locales.

### locale

- **Type**: `string`

The default locale name.

### converter

- **Type**: `(date, locale, converterOptions) => string`

A `converter` that formats regular dates in `xxx ago`, `in xxx` or `xxx days` style.

We have two [converters](https://github.com/wimil/vue-timeago2/blob/master/src/converts.js) that format time:  [toNow](https://date-fns.org/v2.8.1/docs/formatDistance) and [Strict](https://date-fns.org/v2.8.1/docs/formatDistanceStrict). usando [date-fns](https://date-fns.org/v2.8.1/docs/) 2.8.1

### converterOptions

- **Type**: `Object`

Provide an object which will be available as argument `converterOptions` in the `converter` we mentioned above.

Our default converter supports most options that [date-fns](https://date-fns.org/2.8.1/docs/distanceInWordsToNow) library supports, namely:

- **includeSeconds**: (default: `false`) distances less than a minute are more detailed
- **addSuffix**: (default: `true`) result specifies if the second date is earlier or later than the first
- **roundingMethod** (default: `rounded`) only for strict type conversion

## props

### datetime

- **Type**: `Date` `string` `number`
- **Required**: `true`

The datetime to be formatted .

### autoUpdate

- **Type**: `number` `boolean`
- **Default**: `false`

The period to update the component, in **seconds**.

You can omit this prop or set it to `0` or `false` to disable auto-update.

When `true` it will be equivalent to `60`.

### locale

Just like the `locale` option in the plugin options, but this could override the global one.

### converter

Just like the `converter` option in the plugin options, but this could override the global one.

### typeConvert
- **default**: Return the distance between the given dates in words.
- **strict**: Return the distance between the given dates in words, using strict units. This is like `formatDistance`, but does not use helpers like 'almost', 'over', 'less than' and the like.`

### converterOptions

Just like the `converterOptions` option in the plugin options, but this could override the global one.

## Recipes

### Update Locale Globally

```js
Vue.use(VueTimeago, {
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn/index')
  }
})
```

In your components you can use `this.$timeago.locale` to access the global locale, in this case it's `en`, the `<timeago>` component will get updated when you set it to another valid locale, e.g. `this.$timeago.locale = 'zh-CN'`.

## License

MIT © [EGOIST](https://github.com/egoist)