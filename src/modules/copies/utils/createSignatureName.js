const getPrefix = (item) => {
  if (!item || typeof item !== "string") {
    return "";
  };
  const words = item.trim().split(/\s+/);
  const baseWord = words[0].length <= 3 && words.length > 1
  ? words[1] : words[0];

  return baseWord.slice(0,3);
};

export const createSignature = (lastname, title, copyNumber) => {
    const prefix = getPrefix(lastname).toUpperCase();
    const sufix = getPrefix(title).toLowerCase();
   
    const baseSignature = `${prefix}${sufix}`;

    return copyNumber > 1 ? 
    `${baseSignature} c.${copyNumber - 1}` :`${baseSignature}`;
};