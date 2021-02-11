// source https://gist.github.com/ugurozpinar/9682734
const trCompare = (a, b) => {
  const alphabets =
    '0123456789AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz';
  if (a.length === 0 || b.length === 0) {
    return a.length - b.length;
  }

  for (let i = 0; i < a.length && i < b.length; i++) {
    const ai = alphabets.indexOf(a[i]);
    const bi = alphabets.indexOf(b[i]);
    if (ai !== bi) {
      return ai - bi;
    }
  }

  return 0;
};

const capitalizeFirstLetters = (string) => {
  return string
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
};

const strNormalize = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accented characters
    .replace(/ı/g, 'i'); // Change ı to i
};

export { trCompare, capitalizeFirstLetters, strNormalize };
