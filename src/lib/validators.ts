import { MAX_FIELD_LENGTH } from "./constants";

export const nameValidator = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "Заполните название ОС";
  if (trimmedValue.length > MAX_FIELD_LENGTH)
    return "Слишком длинное название ОС";
  return "";
};

export const versionValidator = (value: string) => {
  const versionPattern = /^\d+(?:\.\d+)*(?:\.\d+)?$/;
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Заполните версию ОС";
  } else if (trimmedValue.length > MAX_FIELD_LENGTH) {
    return "Слишком длинная версия";
  } else if (!versionPattern.test(trimmedValue)) {
    return "Неверный формат версии";
  } else {
    return "";
  }
};

export const packagesValidator = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return "Заполните список пакетов";
  } else if (!/^(?:[^\s]+\s+[^\s]+\s+[^\s]+(?:\n|$))+$/.test(trimmedValue)) {
    return "Каждая строка должна содержать: Имя_пакета Версию Архитектуру";
  } else {
    return "";
  }
};
