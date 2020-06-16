class FavList extends HTMLElement {
  connectedCallback () {
    this.renderLoading()
  }

  set data (data) {
    this._data = data
    this.render()
  }

  get data () {
    return this._data
  }

  renderLoading () {
    this.innerHTML = `
      <div class="preloader-wrapper big active loader">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    `
  }

  renderError (errorMsg) {
    this.innerHTML = `
      <div class="card-panel deep-orange white-text">
        <div class="valign-wrapper">
          <i class="material-icons icon medium">error_outline</i>
          <h5>Ups terjadi kesalahan!</h5>
        </div>
        <hr>
        <p>${errorMsg}</p>
      </div>
    `
  }

  render () {
    let card = ''

    this._data.forEach(team => {
      const crestUrl = team.crestUrl
        ? team.crestUrl.replace(/^http:\/\//i, 'https://')
        : 'assets/icons/broken-img.svg'

      card += `
        <div class="col s12 m6 l4 xl3">
          <div class="card medium">
            <a href="detail.html?id=${team.id}" class="waves-effect card-image">
              <img
                src="${crestUrl}"
                alt="Logo"
                loading="lazy">
            </a>
            <div class="card-content">
              <p class="card-title truncate">${team.shortName}</p>
              <b class="truncate">${team.name}</b>
              <p class="truncate">${team.area.name}</p>
            </div>
          </div>
        </div>
      `
    })

    this.innerHTML = `
      <h3>Favorite List</h3><hr>
      <h5>Daftar Team yang Anda favoritkan</h5>
      <h4>Teams</h4>
      <div class="row center">
        ${card}
      </div>
    `
  }
}

customElements.define('fav-list', FavList)
