import { formatDistanceToNow, formatDistanceStrict } from "date-fns";

const toNow = (date, locale, converterOptions) => {
  const { includeSeconds, addSuffix = true } = converterOptions;
  //console.log('hola');
  return formatDistanceToNow(new Date(date), {
    locale,
    includeSeconds,
    addSuffix
  });
};

const strict = (date, locale, converterOptions) => {
  const { roundingMethod = "round", addSuffix = false } = converterOptions;
  return formatDistanceStrict(Date.now(), new Date(date), {
    locale,
    addSuffix,
    roundingMethod
  });
};

export { toNow, strict };
