import {Loader} from "@googlemaps/js-api-loader";
import {combineLatest, from} from "rxjs";

const loader = new Loader({
    // apiKey: "AIzaSyC1F1TCvIv5Ff_ZdfV-KXucnQ-JrsdbZaw",
    apiKey: "",
    version: "weekly",
    libraries: []
})

export class GoogleMap extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"})
        const wrapper = document.createElement("div")
        wrapper.setAttribute("style", "height: 100%;")
        this.shadowRoot.append(wrapper)

        console.log(this.dataset)

        from(loader.load())
            .subscribe((_) => {
                new google.maps.Map(wrapper, {
                    center: {
                        lat: Number(this.dataset['lat']),
                        lng: Number(this.dataset['lng']),
                    },
                    zoom: 4
                })
            })
    }
}