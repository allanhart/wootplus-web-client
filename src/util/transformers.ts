/**
 *
 * @param value
 * @param options
 * @returns {*}
 */
export function toCurrency(value:string|number, options?:Object):string {
  if (!value) {
    return '---';
  }
  const numericValue = Number(value);
  const isInt = Number.isInteger(numericValue);

  const localeOptions:Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    ...(options || {}),
  };

  if (!localeOptions.minimumFractionDigits) {
    localeOptions.minimumFractionDigits = isInt ? 0 : 2;
  }
  if (!localeOptions.maximumFractionDigits) {
    localeOptions.maximumFractionDigits = isInt ? 0 : 2;
  }

  let localizedValue = Math.abs(numericValue).toLocaleString('en-US', localeOptions);
  if (numericValue < 0) {
    localizedValue = `(${localizedValue})`
  }

  return localizedValue;
}
