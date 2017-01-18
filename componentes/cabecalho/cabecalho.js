import cabecalhoCss from "./cabecalho.css";
import cabecalhoTemplate from "./cabecalho.html";
import subCabecalhoTemplate from "./sub-cabecalho.html";
import {
  qs
} from "../../js/comum";

export default class Cabecalho {
	constructor() {
	}
	desenhar(node, titulo = {}) {
			// qs(node).innerHTML = cabecalhoTemplate;
	}
	desenharSub(elemento, dados = {}) {
		elemento.innerHTML = Mustache.render(subCabecalhoTemplate, dados);
	}
}
