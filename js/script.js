"use strict";
class Component {
    constructor() {
        this.categories = [];
        this.entries = new Array();
        this.container = document.querySelector(".container");
        this.urlCategories = "https://api.publicapis.org/categories";
        this.urlEntries = "https://api.publicapis.org/entries";
        this.urlEntriesWithCategory = "https://api.publicapis.org/entries?Category=";
        this.select = document.getElementById("category");
        this.loadCategories();
    }
    loadCategories() {
        fetch(this.urlCategories)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
            .then((items) => {
            for (let i = 0; i < items.categories.length; i++) {
                this.categories.push(items.categories[i]);
                let option = document.createElement("option");
                option.dataset.name = items.categories[i];
                option.className = "opt-category";
                option.innerHTML = items.categories[i];
                this.select.appendChild(option);
            }
            let options = document.getElementsByClassName("opt-category");
            for (let i = 0; i < options.length; i++) {
                options[i].addEventListener("click", () => this.load(options[i].dataset.name));
            }
        });
    }
    load(filter) {
        let url2 = this.urlEntriesWithCategory + filter;
        if (filter === null || filter === "all") {
            url2 = "https://api.publicapis.org/entries";
        }
        fetch(url2)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
            .then((items) => {
            items.entries.forEach((element) => this.entries.push(element));
            this.refreshView(items);
        });
    }
    refreshView(items) {
        this.container.innerHTML = "";
        for (let i = 0; i < items.entries.length; i++) {
            let content = document.createElement("div");
            content.className = "content";
            this.container.appendChild(content);
            let divCard = document.createElement("div");
            divCard.className = "card";
            let h2Card = document.createElement("h2");
            h2Card.innerHTML = items.entries[i].API;
            let pDescriptionCard = document.createElement("p");
            pDescriptionCard.innerHTML =
                "Descriptions : " + items.entries[i].Description;
            let pAuthCard = document.createElement("p");
            pAuthCard.innerHTML = "Auth : " + items.entries[i].Auth;
            let pHTTPSCard = document.createElement("p");
            if (items.entries[i].HTTPS === true) {
                pHTTPSCard.innerHTML =
                    "HTTPS : " + `<i class="fa-solid fa-circle-check green"></i>`;
            }
            else {
                pHTTPSCard.innerHTML =
                    "HTTPS : " + `<i class="fa-solid fa-circle-xmark red"></i>`;
            }
            let pCorsCard = document.createElement("p");
            if (items.entries[i].Cors === "yes") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-check green"></i>`;
            }
            else if (items.entries[i].Cors === "no") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-xmark red"></i>`;
            }
            else if (items.entries[i].Cors === "unknown") {
                pCorsCard.innerHTML =
                    "Cors : " + ` <i class="fa-solid fa-circle-question"></i>`;
            }
            let aLinkCard = document.createElement("a");
            aLinkCard.target = "_blank";
            aLinkCard.className = "btn-link";
            aLinkCard.href = items.entries[i].Link;
            aLinkCard.innerHTML = "Visitez le site";
            content.appendChild(divCard);
            divCard.appendChild(h2Card);
            divCard.appendChild(pDescriptionCard);
            if (items.entries[i].Auth) {
                divCard.appendChild(pAuthCard);
            }
            divCard.appendChild(pHTTPSCard);
            divCard.appendChild(pCorsCard);
            divCard.appendChild(aLinkCard);
        }
    }
}
let component = new Component();
component.load("Animals");
