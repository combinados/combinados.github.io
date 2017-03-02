import * as seguranca from "./seguranca";
import material from "componentes/comum/css/externo/material.scss";
import {
    MDCTemporaryDrawer
} from "@material/drawer";
let drawer = new MDCTemporaryDrawer(qs(".mdc-temporary-drawer"));
document.querySelector(".demo-menu").addEventListener("click", () => drawer.open = true);

export function formatarData(data, render) {
    data = render(data).trim();
    return data ? data.replace(/^(\d{4})[-/](\d{2})[-/](\d{2})$/, "$3/$2/$1") : "";
}

// Interceptador ajax
(function(open) {
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener("readystatechange", function() {
            // this.readyState === 4 ? qs("#parcial").style.cursor = "auto" : qs("#parcial").style.cursor = "progress";
        }, false);
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);

export function dispararEvento(evento) {
    qs("#parcial").dispatchEvent(new CustomEvent(evento.nome, {
        "detail": evento
    }));
}

export function queryStringParaJson(qs) {
    try {
        return JSON.parse(`{"${qs.replace(/&/g, "\",\"").replace(/=/g, "\":\"")}"}`);
    } catch (e) {
        return "";
    }
}

//forcar, dispara o evento hashchange
export function navegarPara(url, forcar = false) {
    let hash = window.location.hash;

    if (url.startsWith("#")) {
        if (forcar) {
            hash !== url ? window.location.hash = url : history.go(0);
        } else if (hash !== url) {
            history.pushState(null, "", url);
        } else {
            history.replaceState(null, "", url);
        }
    } else {
        window.location.href = url;
    }
}

// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach;

// Get element(s) by CSS selector:
export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

export function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    const useCapture = type === "blur" || type === "focus";

    $on(target, type, dispatchEvent, !!capture);
}

// Find the element's parent with the given tag name:
// $parent(qs('a'), 'div')
export function $parent(element, tagName, className) {
    if (!element || !element.parentNode || element.parentNode.tagName.toLowerCase() === "body") {
        return;
    }

    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
        if (className) {
            if (element.parentNode.classList.contains(className)) {
                return element.parentNode;
            }
        } else {
            return element.parentNode;
        }
    }

    return $parent(element.parentNode, tagName, className);
}
