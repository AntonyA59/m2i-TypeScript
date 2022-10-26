"use strict";
class Component {
    constructor() {
        this.categories = [];
        this.entries = new Array();
        this.container = document.querySelector(".container");
        this.urlCategories = "https://api.publicapis.org/categories";
        this.urlEntries = "https://api.publicapis.org/entries";
        this.select = document.getElementById("category");
        this.loadCategories();
        this.load("all");
    }
    loadCategories() {
        fetch(this.urlCategories)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
            .then((items) => {
            items.categories.forEach((element) => {
                this.categories.push({ name: element });
            });
            this.createOption(this.categories);
        });
    }
    createOption(items) {
        for (let i = 0; i < items.length; i++) {
            let option = document.createElement("option");
            option.dataset.name = items[i].name;
            option.className = "opt-category";
            option.innerHTML = items[i].name;
            this.select.appendChild(option);
        }
        let options = document.getElementsByClassName("opt-category");
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener("click", () => this.load(options[i].dataset.name));
        }
    }
    load(filter) {
        let url = "https://api.publicapis.org/entries?Category=" + filter;
        if (filter === null || filter === "all") {
            url = "https://api.publicapis.org/entries";
        }
        fetch(url)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
            .then((items) => {
            if (this.entries.length !== 0)
                this.entries.splice(0, this.entries.length);
            items.entries.forEach((element) => this.entries.push(element));
            this.refreshView(this.entries);
        });
    }
    refreshView(entries) {
        this.container.innerHTML = "";
        for (let i = 0; i < entries.length; i++) {
            let content = document.createElement("div");
            content.className = "content";
            this.container.appendChild(content);
            let divCard = document.createElement("div");
            divCard.className = "card";
            let h2Card = document.createElement("h2");
            h2Card.innerHTML = entries[i].API;
            let pDescriptionCard = document.createElement("p");
            pDescriptionCard.innerHTML = entries[i].Description;
            let pAuthCard = document.createElement("p");
            pAuthCard.innerHTML = "Auth : " + entries[i].Auth;
            let pHTTPSCard = document.createElement("p");
            if (entries[i].HTTPS === true) {
                pHTTPSCard.innerHTML =
                    "HTTPS : " + `<i class="fa-solid fa-circle-check green"></i>`;
            }
            else {
                pHTTPSCard.innerHTML =
                    "HTTPS : " + `<i class="fa-solid fa-circle-xmark red"></i>`;
            }
            let pCorsCard = document.createElement("p");
            if (entries[i].Cors === "yes") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-check green"></i>`;
            }
            else if (entries[i].Cors === "no") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-xmark red"></i>`;
            }
            else if (entries[i].Cors === "unknown") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-question"></i>`;
            }
            let aLinkCard = document.createElement("a");
            aLinkCard.target = "_blank";
            aLinkCard.className = "btn-link";
            aLinkCard.href = entries[i].Link;
            aLinkCard.innerHTML = "Visitez le site";
            content.appendChild(divCard);
            divCard.appendChild(h2Card);
            divCard.appendChild(pDescriptionCard);
            if (entries[i].Auth) {
                divCard.appendChild(pAuthCard);
            }
            divCard.appendChild(pHTTPSCard);
            divCard.appendChild(pCorsCard);
            divCard.appendChild(aLinkCard);
        }
    }
}
let component = new Component();
