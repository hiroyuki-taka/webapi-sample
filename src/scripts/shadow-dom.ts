import {fromEvent} from "rxjs";
import {Loader} from "@googlemaps/js-api-loader";


export class ShadowDomSample extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"})
        const wrapper = document.createElement("div")
        wrapper.innerHTML = "ああああ"

        this.shadowRoot.append(wrapper)
    }
}