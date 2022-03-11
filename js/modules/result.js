/*
    Вывод результатов вычислений
*/

const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
  };  

export default class Result {
    constructor(element) {
        this.counter = element
        this.root = element.querySelector('.counter__result');
        this.caloriesNorm = this.root.querySelector('#calories-norm');
        this.caloriesSafeLoseWeight = this.root.querySelector('#calories-safe');
        this.caloriesFastLoseWeight = this.root.querySelector('#calories-fast');
    }

    show(calories) {
        this.caloriesNorm.textContent = formatNumber(calories.norm);
        this.caloriesSafeLoseWeight.textContent = formatNumber(calories.safe);
        this.caloriesFastLoseWeight.textContent = formatNumber(calories.fast);        
        this.root.classList.remove('counter__result--hidden');   
        this.root.scrollIntoView({block: 'center', behavior: 'smooth'});  
    }

    hide() {
        this.caloriesNorm.textContent = 0;
        this.caloriesSafeLoseWeight.textContent = 0;
        this.caloriesFastLoseWeight.textContent = 0;
        this.root.classList.add('counter__result--hidden');
        this.counter.scrollIntoView({block: 'start', behavior: 'smooth'});  
    }
}