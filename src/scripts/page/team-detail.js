import '../components/custom-table.js'

class TeamDetail extends HTMLElement {
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
    const squads = this._data.detail.squad

    const crestUrl = this._data.detail.crestUrl
      ? this._data.detail.crestUrl.replace(/^http:\/\//i, 'https://')
      : 'assets/icons/broken-img.svg'

    const coachTableHead = ['Name', 'Date Of Birth', 'Nationality']
    const playerTableHead = coachTableHead.concat('Shirt Number')
    const date = new Date(this._data.detail.lastUpdated)

    const squadFilter = (key, filterKey) => {
      return squads.filter(squad => squad[key] === filterKey)
    }

    const coach = () => {
      const list = []
      squadFilter('role', 'COACH').forEach(person => {
        const date = new Date(person.dateOfBirth)
        list.push([
          person.name,
          date.toLocaleDateString(),
          person.nationality
        ])
      })
      return list
    }

    const player = (position) => {
      const list = []
      squadFilter('position', position).forEach(person => {
        const date = new Date(person.dateOfBirth)
        list.push([
          person.name,
          date.toLocaleDateString(),
          person.nationality,
          person.shirtNumber || '-'
        ])
      })
      return list
    }

    const createTable = (tableHead, tableContent) => {
      const customTable = document.createElement('custom-table')
      customTable.dataTable = {
        tableHead: tableHead,
        tableData: tableContent
      }
      return customTable
    }

    this.innerHTML = `
      <h2 class="title">${this._data.detail.name}</h2>
      <div class="row">
        <div class="col s12 m4 xl3">
          <div class="card">
            <div class="card-image">
              <img
                src="${crestUrl}"
                alt="Logo"
                loading="lazy">
            </div>
            <div class="card-content">
              <p class="card-title">Information</p>
              <ul>
                <li><b>Alternate Names</b></li>
                <li>${this._data.detail.shortName}</li>
                <li><b>Founded</b></li>
                <li>${this._data.detail.founded}</li>
                <li><b>Club Colors</b></li>
                <li>${this._data.detail.clubColors}</li>
                <li><b>Country</b></li>
                <li>${this._data.detail.area.name}</li>
                <li><b>Venue</b></li>
                <li>${this._data.detail.venue}</li>
                <li><b>Address</b></li>
                <li>${this._data.detail.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col s12 m8 xl9">
          <div class="card-panel">
            <h3>Squad</h3>
            <h4>Coach</h4>
            <hr>
            <div class="overflow-x">
              ${createTable(coachTableHead, coach()).innerHTML}
              <div>
                <h4>Player</h4>
                <hr>
                <div class="overflow-x">
                  <h5>Goalkeeper</h5>
                  ${createTable(playerTableHead, player('Goalkeeper')).innerHTML}
                  <h5>Defender</h5>
                  ${createTable(playerTableHead, player('Defender')).innerHTML}
                  <h5>Midfielder</h5>
                  ${createTable(playerTableHead, player('Midfielder')).innerHTML}
                  <h5>Attacker</h5>
                  ${createTable(playerTableHead, player('Attacker')).innerHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>
      <p>Last Update: ${date.toLocaleString()}</p>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red" id="fav">
          <i class="large material-icons" id="fav-ic">
            ${this._data.isFav ? 'favorite' : 'favorite_border'}
          </i>
        </a>
      </div>
    `

    // Mengatur callback untuk floating action button #fav
    this.querySelectorAll('#fav').forEach(el => {
      el.addEventListener('click', () => {
        this._data.isFav = !this._data.isFav
        const favIc = document.getElementById('fav-ic')
        favIc.textContent = this._data.isFav ? 'favorite' : 'favorite_border'
        this._data.callBackSave(this._data.detail, this._data.isFav)
      })
    })
  }
}

customElements.define('team-detail', TeamDetail)
