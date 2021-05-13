//TODO::Consider rewriting this.... first break in small methods, then check if lodash does not have helpers for this...
// //TODO:: or consider lodash
// const value = '17.0'
// _.padEnd(value, required_length_of_padding -  value.length, "0");

function format(
    big: string,
    denomination: number,
    decimals: number,
    showLastNonZeroDecimal: boolean,
    addCommas: boolean
) {
    showLastNonZeroDecimal = typeof showLastNonZeroDecimal !== 'undefined' ? showLastNonZeroDecimal : false;

    let array = big.toString().split('');
    if (denomination !== 0) {
        healUpDecimals(array, denomination, decimals);
        array = lastnonZeroDecimal(showLastNonZeroDecimal, array, decimals);
    }

    if (addCommas) array = addComas(array, denomination);

    //TODO::Maybe we can have lodash as dependency on dappTemplate
    const allDecimalsZero = array
        .slice(array.indexOf('.') + 1)
        .every(digit => digit.toString() === '0');

    const string = array.join('');

    if (allDecimalsZero) return string.split('.')[0];

    return decimals === 0 ? string.split('.').join('') : string;
}

function addComas(array: string[], denomination: number) {
  // add comas every 3 characters
  array = array.reverse();
  const reference = denomination ? array.length - array.indexOf('.') - 1 : array.length;
  const count = Math.floor(reference / 3);
  //TODO::More lodash ?
  for (let i = 1; i <= count; i++) {
    const position = array.indexOf('.') + 4 * i;
    if (position !== array.length) {
      array.splice(position, 0, ',');
    }
  }
  array = array.reverse();
  return array;
}

function lastnonZeroDecimal(showLastNonZeroDecimal: boolean, array: string[], decimals: number) {
  if (showLastNonZeroDecimal) {
    let nonZeroDigitIndex = 0;
    for (let i = array.length - 1; i > 0; i--) {
      if (array[i] !== '0') {
        nonZeroDigitIndex = i + 1;
        break;
      }
    }
    const decimalsIndex = array.indexOf('.') + decimals + 1;
    const sliceIndex = Math.max(decimalsIndex, nonZeroDigitIndex);
    return array.slice(0, sliceIndex);
  } else {
    // trim unnecessary characters after the dot
    return array.slice(0, array.indexOf('.') + decimals + 1);
  }
}

function healUpDecimals(array: string[], denomination: number, decimals: number) {
  // make sure we have enough characters
  while (array.length < denomination + 1) {
    array.unshift('0');
  }
  // add our dot
  array.splice(array.length - denomination, 0, '.');
  // make sure there are enough decimals after the dot
  while (array.length - array.indexOf('.') <= decimals) {
    array.push('0');
  }
}

interface DenominateType {
    input: string;
    denomination: number;
    decimals: number;
    showLastNonZeroDecimal: boolean;
    addCommas?: boolean;
}

export default function denominate({
                                       input,
                                       denomination,
                                       decimals,
                                       showLastNonZeroDecimal = false,
                                       addCommas = true,
                                   }: DenominateType): string {
    if (input === '...') {
        return input;
    }
    if (input === '' || input === '0' || input === undefined) {
        input = '0';
    }
    return format(input, denomination, decimals, showLastNonZeroDecimal, addCommas);
}
