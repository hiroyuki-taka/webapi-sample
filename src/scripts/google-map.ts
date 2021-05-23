import {Loader} from "@googlemaps/js-api-loader";
import {combineLatest, from} from "rxjs";

const loader = new Loader({
    apiKey: "AIzaSyC1F1TCvIv5Ff_ZdfV-KXucnQ-JrsdbZaw",
    version: "weekly",
    libraries: []
})

/**
 * google mapを表示する
 */
export class GoogleMap extends HTMLElement {
    private map: google.maps.Map

    constructor() {
        super();

        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = require('./google-map.html').default

        const wrapper = this.shadowRoot.querySelector('#map')

        from(loader.load())
            .subscribe((_) => {
                this.map = new google.maps.Map(wrapper, {
                    center: {
                        lat: Number(this.dataset['lat']),
                        lng: Number(this.dataset['lng']),
                    },
                    zoom: 4
                })
            })
    }
}