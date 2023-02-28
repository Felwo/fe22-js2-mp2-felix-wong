import { TamagotchiStatus } from "./tamagotchi.js";

export class TamagotchiGUI extends TamagotchiStatus {
    #feedBtn;
    #playBtn;
    #name;
    #updateText;
    #type;
    #container;
    #animalContainer;

    constructor(name, type, container){
        super();
        this.#name = name;
        this.#type = type;
        this.#container = container;
        this.createGUI();
        this.checkStatus();
    }
    //Check status of current class hunger and happiness which changes accordingly to hunger/happy level
    checkStatus(){
        let prevHunger = 0;
        let prevHappiness = 0;

        const interval = setInterval(() => {
            let hungerCounter = super.getCurrentHunger();
            let happyCounter = super.getCurrentHappiness();
            let changeMade = false;

            if (prevHunger !== hungerCounter) {
                changeMade = true;
                prevHunger = hungerCounter;
            }
            else if (prevHappiness !== happyCounter) {
                changeMade = true;
                prevHappiness = happyCounter;
            }

            if (changeMade == false) {
                if (prevHappiness == 0 || prevHunger == 0) {
                    this.dead();
                    clearInterval(interval);
                }
                else if (prevHappiness <= 4 || prevHunger <= 4) {
                    this.nearDeath();
                }
                else if (prevHappiness >= 5 && prevHunger >= 5) {
                    this.healthy();
                }
            }
        }, 100);
    }
    dead() {
        this.#animalContainer.style.backgroundColor = "#FF8267";
        this.#updateText.innerText = `💀${this.#name} the ${this.#type}`;
        this.#feedBtn.disabled = true;
        this.#playBtn.disabled = true;
    }
    nearDeath() {
        this.#animalContainer.style.backgroundColor = "#FFE067";
        this.#updateText.innerText = `😐${this.#name} the ${this.#type}`;
    }
    healthy(){
        this.#animalContainer.style.backgroundColor = "#79FCA0";
        this.#updateText.innerText = `😊${this.#name} the ${this.#type}`;
    }

    createGUI() {
        // Create tamagotchi GUI with info from the class
        const tamagotchi = document.createElement("div");
        tamagotchi.classList.add("tamagotchi");
        this.#container.append(tamagotchi);

        this.#animalContainer = document.createElement("div");
        tamagotchi.append(this.#animalContainer);
        this.#animalContainer.classList.add("animal-container");
        this.#updateText = document.createElement("h3");
        const hungerP = document.createElement("p");
        const happinessP = document.createElement("p");
        this.#animalContainer.append(this.#updateText, hungerP, happinessP);
        this.#updateText.innerText = `${this.#name} the ${this.#type}`;

        super.initiateStatus(hungerP, happinessP)

        this.#feedBtn = document.createElement("button");
        this.#feedBtn.innerText = "Feed";
        this.#playBtn = document.createElement("button");
        this.#playBtn.innerText = "Play!";
        tamagotchi.append(this.#feedBtn, this.#playBtn);

        this.#feedBtn.addEventListener("click", () => {
            super.addHunger(hungerP);
        })
        this.#playBtn.addEventListener("click", () => {
            super.addHappiness(happinessP);
        })
    }
    
}