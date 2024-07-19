const PatternString = {
  cjk: "\\p{Script=Han}|\\p{Script=Kana}|\\p{Script=Hira}|\\p{Script=Hangul}",
  word: "[\\p{L}|\\p{N}|._]+",
};

const wordPattern = new RegExp(
  `${PatternString.cjk}|${PatternString.word}`,
  "gu"
);

export const countWords = (text) => {
  return text.normalize().match(wordPattern)?.length ?? 0;
};
