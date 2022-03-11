/*
  Считывание данных из формы;
  Подсчет калорий по формуле:
  (C_WEIGHT) * вес(кг) + C_HEIGHT * рост(см) – C_AGE * возраст (г) + C_GENDER ) * C_ACTIVITY;
  Отправка данных в форму вывода "Result".
*/

import Result from "./result.js";

// Константы для формулы
const CaloriesFormulaConstant = {
  AGE: 4.92,
  WEIGHT: 9.99,
  HEIGHT: 6.25,
  MALE: 5,
  FEMALE: -160,
};

const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesLoseWeightRatio = {
  SAFE: 0.9,
  FAST: 0.8,
};

// Замена не цифр и нулей
const formatInput = (input) => {
  return input.value.replace(/[^\d]/g, "").replace(/^0+/, "");
};

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector(".counter__form");
    this.elements = this.form.elements;
    this.gender = this.form.gender;
    this.parameters = this.elements.parameters.elements;
    this.parametersItem = Array.from(this.parameters);
    this.age = this.parameters.age;
    this.height = this.parameters.height;
    this.weight = this.parameters.weight;
    this.activity = this.elements.activity;
    this.submit = this.elements.submit;
    this.reset = this.elements.reset;

    this.onInput = this.onInput.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.result = new Result(this.root);
  }

  onInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersItem.some((el) => el.value);
    this.age.value = formatInput(this.age);
    this.weight.value = formatInput(this.weight);
    this.height.value = formatInput(this.height);
  }

  onReset() {
    this.reset.disabled = true;
    this.submit.disabled = true;
    this.result.hide();
  }

  onSubmit(evt) {
    evt.preventDefault();
    
    const calories = {
      norm: this.getCaloriesNorm(),
      safe: this.getCaloriesSafeLoseWeigh(),
      fast: this.getCaloriesFastLoseWeigh(),
    };

    this.result.show(calories);
  }

  getCaloriesNorm() {
    const age = CaloriesFormulaConstant.AGE * this.age.value;
    const weight = CaloriesFormulaConstant.WEIGHT * this.weight.value;
    const height = CaloriesFormulaConstant.HEIGHT * this.height.value;
    const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
    const activity = PhysicalActivityRatio[this.activity.value.toUpperCase()];
    return Math.round((weight + height + - age + gender) * activity);
  }

  getCaloriesSafeLoseWeigh() {
    return Math.round(this.getCaloriesNorm() * CaloriesLoseWeightRatio.SAFE);
  }

  getCaloriesFastLoseWeigh() {
    return Math.round(this.getCaloriesNorm() * CaloriesLoseWeightRatio.FAST);
  }

  start() {
    this.form.addEventListener("input", this.onInput, true);
    this.form.addEventListener("submit", this.onSubmit);
    this.form.addEventListener("reset", this.onReset);
  }
}
