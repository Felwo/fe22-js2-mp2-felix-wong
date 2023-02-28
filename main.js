import { TamagotchiGUI } from "./modules/tamagotchiGUI.js";

const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector("input").value;
    const type = document.querySelector("select").value;
    const container = document.querySelector("#container");

    new TamagotchiGUI(name, type, container);
})