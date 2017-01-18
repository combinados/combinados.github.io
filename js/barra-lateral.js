import {
    MDCTemporaryDrawer
} from "@material/drawer";
import {
    MDCCheckbox
} from "@material/checkbox";
import {
    MDCIconToggle
} from "@material/icon-toggle";
import {
    MDCSnackbar
} from "@material/snackbar";
import {
    MDCRipple
} from "@material/ripple";


// import * as utils from "@material/drawer/util";
import {
    qs,
    qsa,
    $on,
    $parent,
    $delegate,
    navegarPara
} from "./comum";

export function retrairMenu() {
    let menu = qs("div.navbar-collapse");
    menu.classList.remove("active", "in");
}

export function paginaPronta(eventoDom, buscaGeral) {
    // $on(qs("#frmBuscaGeral"), "submit", e => {
    //     e.preventDefault();
    //     navegarPara(`${buscaGeral}?envolvido=${e.target.elements[0].value}`, true);
    // });
}

export function atualizarPagina(evento, callback) {
    let hash = window.location.hash;
    if (evento && /^load|hashchange$/.test(evento.type)) {
        hash = hash ? hash : callback.paginaPadrao;
        callback.atacharEvento(hash);
    }
    // atualizarMenu(hash);
    inicializarMCW();
}

function inicializarMCW(hash) {
    let drawer = new MDCTemporaryDrawer(qs(".mdc-temporary-drawer"));
    document.querySelector(".demo-menu").addEventListener("click", () => drawer.open = true);

    // let icon = new MDCIconToggle();

    let snackbar = new MDCSnackbar(qs("#mdc-js-snackbar"));
    let data = {
        message: "teste da snackbar"
    };
    qs(".demo-snackbar").addEventListener("click", () => {
        snackbar.show(data);
    });

    MDCRipple.attachTo(qs(".demo-surface"));
}

function atualizarMenu(hash) {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        itemSelecionado,
        menuPai,
        menuAvo,
        menuPaiNaoSelecionado,
        itemPai;
    if (width < 768) {
        retrairMenu();
    }

    [...qsa("#side-menu a")].map(menuItem => {
        menuItem.classList.remove("active");
        if (menuItem.hash && hash.startsWith(menuItem.hash)) {
            itemSelecionado = menuItem;
        } else {
            menuPaiNaoSelecionado = $parent(menuItem, "ul");
            if (menuPaiNaoSelecionado && menuPaiNaoSelecionado.id !== "side-menu") {
                menuPaiNaoSelecionado.classList.remove("in");
                itemPai = $parent(menuPaiNaoSelecionado, "li")
                if (itemPai) {
                    itemPai.classList.remove("active");
                }
            }
        }
    });
    // Expandir os menus ancestrais do item
    menuPai = $parent(itemSelecionado, "ul");
    menuAvo = $parent(menuPai, "ul");

    if (menuPai && menuAvo) {
        itemSelecionado.classList.add("active");
        menuPai.classList.add("collapse", "in");
        menuPai.parentNode.classList.add("active");
        menuAvo.classList.add("collapse", "in");
        menuAvo.parentNode.classList.add("active");
    }
}
