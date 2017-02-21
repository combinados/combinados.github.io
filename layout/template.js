import barraLateral from "./parcial/navegacao-barra-lateral.html";
import navegacaoCabecalho from "./parcial/navegacao-cabecalho.html";
import cabecalho from "./cabecalho";
import principal from "./principal.html";
import rodape from "./rodape.html";

export default (plugin) => {
    const opcoes = plugin.htmlWebpackPlugin.options;
    return `
		<!doctype html>
		<html lang="en">
			<head>
				<title>
					${opcoes.title}
				</title>
				<!-- <base href="/"> -->
				${cabecalho(opcoes.producao ? ".min" : "")}
			</head>
			<body class="mdc-typography demo-body">
				<div>
					<div id="modalConfirmacao" style="margin-top: 0"></div>
					${navegacaoCabecalho}
					${barraLateral}
          ${principal}
				</div>
				<footer>
					${rodape}
				</footer>
			</body>
		</html>`;
}
