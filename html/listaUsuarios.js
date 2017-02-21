export default (opcoes) => opcoes.usuarios.map(usuario =>
    `
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
      <div class="mdc-card">
          <div class="mdc-card__horizontal-block">
              <section class="mdc-card__primary">
                  <h1 class="mdc-card__title mdc-card__title--large">${usuario.nome}</h1>
                  <h2 class="mdc-card__subtitle">Classificação: ${usuario.classificacao}</h2>
              </section>
              <img class="mdc-card__media-item" src="${usuario.foto}">
          </div>
          <section class="mdc-card__actions">
              <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
              <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
          </section>
      </div>
  </div>
`
).join("");
