export default class RepositorioLocal {
  constructor(nome) {
    this._bdNome = nome;

    if (!localStorage[nome]) {
      const dados = {
        judicial: {
          Naturezas: [],
          TiposProcesso: [],
          RitosProcesso: [],
          Comarcas: [],
          Juizos: []
        }
      };
      localStorage[nome] = JSON.stringify(dados);
    }
  }

  buscarCache(categoria, filtro) {
    let cache = JSON.parse(localStorage[this._bdNome]);
    return cache.judicial[categoria].filter(item => {
      return item["filtro"] === filtro;
    });
  }

  atualizarCache(dados, categoria, filtro) {
    let cache = JSON.parse(localStorage[this._bdNome]);
    cache.judicial[categoria] = dados;
    cache.judicial[categoria].map(item => {
      item.filtro = filtro;
    });
    localStorage[this._bdNome] = JSON.stringify(cache);
    return cache.judicial[categoria];
  }

  buscarRemota(categoria, filtro) {
    const self = this;
    return new Promise((resolve, reject) => {
      // self.processoProxy[`busca${categoria}`](filtro)
      //   .then(dados => {
      //     resolve(self.atualizarCache(dados, categoria, filtro));
      //   }).catch(function(e) {
      //     reject(e);
      //   });
    });
  }

  filtrar(itens, filtro) {
    if (filtro) {
      itens = itens.filter(item => {
        return item.id === filtro;
      });
    }
    return itens;
  }

  buscar(categoria, filtro) {
    const self = this;
    // Primeiro busca no cache
    let itens = this.buscarCache(categoria);
    return new Promise((resolve, reject) => {
      if (itens.length === 0) {
        this.buscarRemota(categoria)
          .then(dados => {
            resolve(self.filtrar(dados, filtro));
          });
      } else {
        // no caso do cache, retorna uma promessa apenas para manter a interface uniforme nas camadas mais alta.
        resolve(this.filtrar(itens, filtro));
      }
    });
  }

  buscarTiposProcesso(categoria, naturezaId) {
    const self = this;
    // Primeiro busca no cache
    let itens = this.buscarCache(categoria, naturezaId);
    return new Promise((resolve, reject) => {
      if (itens.length === 0) {
        this.buscarRemota(categoria, naturezaId)
          .then(dados => {
            resolve(dados);
          }).catch(function(e) {
            reject(e);
          });
      } else {
        // no caso do cache, retorna uma promessa apenas para manter a interface uniforme nas camadas mais alta.
        resolve(itens);
      }
    });
  }
}
