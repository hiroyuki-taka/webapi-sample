import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {GoogleMap} from "./google-map";
import {WorkerSample} from "./worker";

customElements.define("google-map", GoogleMap)

new WorkerSample()
