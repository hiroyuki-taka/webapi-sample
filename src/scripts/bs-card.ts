export class BsCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"})
        const wrapper = document.createElement("div")
        wrapper.classList.add("card")
        wrapper.setAttribute("style", this.getAttribute("style"))

        if (this.dataset['title']) {
            const cardTitle = document.createElement("div")
            cardTitle.classList.add("card-header")
            cardTitle.innerText = this.dataset['title']
            wrapper.appendChild(cardTitle)
        }

        const cardImage = document.createElement("div")
        cardImage.classList.add("card-img-top")
        cardImage.setAttribute("style", "height: 100%;")
        cardImage.innerHTML = this.innerHTML
        wrapper.appendChild(cardImage)

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerText = this.dataset['text']
        cardBody.appendChild(cardText)

        wrapper.appendChild(cardBody)
        this.shadowRoot.appendChild(wrapper)
        this.shadowRoot.innerHTML += "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x\" crossorigin=\"anonymous\">"
    }
}