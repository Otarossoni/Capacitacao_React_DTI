const isNumber = (value: any, name?: String) => {
  const valor = Number(value);

  if (isNaN(valor)) {
    throw new Error(
      `Campo ${name ? name : "informado"} informado não é um número`
    );
  }
};

export { isNumber };
