export const formatMoney = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function telephoneMask(value) {
  value = value.substring(0, 15);
  value = value.replace(/\D/g, "");

  if (value.length >= 10 && value.length <= 15) {
    value = value.replace(/(\d{6})(\d)/, "$1-$2");

    if (value.length === 11) {
      value = removeMaskTelephone(value);
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{6})(\d)/, "$1-$2");
    }
    if (value.length === 12) {
      value = removeMaskTelephone(value);
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{7})(\d)/, "$1-$2");
    }
  }
  value = value.replace(/^(\d\d)(\d)/g, "($1) $2");

  return value;
}

export function telephoneFixMask(value) {
  value = value.substring(0, 14);
  value = value.replace(/\D/g, "");

  if (value.length >= 10 && value.length <= 14) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{6})(\d)/, "$1-$2");

    if (value.length === 11) {
      value = removeMaskTelephone(value);
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{6})(\d)/, "$1-$2");
    }
  }
  value = value.replace(/^(\d\d)(\d)/g, "($1) $2");

  return value;
}

export function removeMaskTelephone(value) {
  value = value.replace("(", "");
  value = value.replace(")", "");
  value = value.replace(" ", "");
  value = value.replace("-", "");

  return value;
}

export function IsCepValid(cep, format) {
  var iscepValid = "";
  if (format === "#####-###") {
    iscepValid = /^(([0-9]{5}-[0-9]{2}))$/;
    if (iscepValid.test(cep) === false) {
      cep = cep.replace(/\D/g, "");
      if (cep.length === 8) {
        cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
        return cep;
      }
    } else {
      return cep;
    }
  } else if (format === "##.###-###") {
    iscepValid = /^(([0-9]{2}.[0-9]{3}-[0-9]{2}))$/;
    if (iscepValid.test(cep) === false) {
      cep = cep.replace(/\D/g, "");
      if (cep.length === 8) {
        cep = cep.replace(/(\d{2})(\d)/, "$1.$2");
        cep = cep.replace(/(\d{3})(\d)/, "$1-$2");
        return cep;
      }
    } else {
      return cep;
    }
  }
}

export const Days = [
  { id: 1, short: "Seg", name: "Segunda" },
  { id: 2, short: "Ter", name: "Terça" },
  { id: 3, short: "Qua", name: "Quarta" },
  { id: 4, short: "Qui", name: "Quinta" },
  { id: 5, short: "Sex", name: "Sexta" },
  { id: 6, short: "Sab", name: "Sábado" },
  { id: 7, short: "Dom", name: "Domingo" },
];

export function maskCPF(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return value;
}

//Verifa se o cpf é valido
export function TestaCPF(strCPF) {
  var Soma;
  var Resto;
  var i;
  Soma = 0;

  if (strCPF === undefined) return false;

  if (
    strCPF === "00000000000" ||
    strCPF === "11111111111" ||
    strCPF === "22222222222" ||
    strCPF === "33333333333" ||
    strCPF === "44444444444" ||
    strCPF === "55555555555" ||
    strCPF === "66666666666" ||
    strCPF === "77777777777" ||
    strCPF === "88888888888" ||
    strCPF === "99999999999"
  )
    return false;

  for (i = 1; i <= 9; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i), 0) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10), 0)) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i), 0) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11), 0)) return false;
  return true;
}

export function formatNomeLoja(numLoja) {
  if (numLoja.length === 1) {
    return "EMP" + (numLoja + "").padStart(2, "0");
  } else {
    return "EMP" + numLoja;
  }
}