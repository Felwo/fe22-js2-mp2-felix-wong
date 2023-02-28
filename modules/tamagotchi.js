export class TamagotchiStatus {
    //private
    #currentHunger;
    #hungerID;
    #currentHappiness;
    #happyID;
    #max;
    constructor(){
        this.#currentHunger = 5;
        this.#currentHappiness = 5;
        this.#max= 10;
    }

    getCurrentHunger() {
        return this.#currentHunger;
    }
    getCurrentHappiness() {
        return this.#currentHappiness;
    }

    initiateStatus(hunger, happiness){
        this.minusHunger(hunger);
        this.#hungerID = setInterval(() => {
            this.minusHunger(hunger);
        }, 3500);

        this.minusHappiness(happiness);
        this.#happyID = setInterval(() => {
            this.minusHappiness(happiness);
        }, 4000);

    }

    stopTimer(){
        clearInterval(this.#hungerID);
        clearInterval(this.#happyID);
    }

    minusHunger(element){
        this.#currentHunger--;
        element.innerText = `Hunger: ${this.#currentHunger}/10`;
        if(this.#currentHunger <= 0) this.stopTimer();
    }
    addHunger(element) {
        if (this.#currentHunger < this.#max) {
            this.#currentHunger++;
            element.innerText = `Hunger: ${this.#currentHunger}/10`;
        }
    }

    minusHappiness(element) {
        this.#currentHappiness--;
        element.innerText = `Happiness: ${this.#currentHappiness}/10`;
        if (this.#currentHappiness <= 0) this.stopTimer();
    }
    addHappiness(element) {
        if (this.#currentHappiness < this.#max) {
            this.#currentHappiness++;
            element.innerText = `Happiness: ${this.#currentHappiness}/10`;
        }
    }


}