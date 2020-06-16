import { Sidenav, Dropdown } from 'materialize-css'

class NavBar extends HTMLElement {
  connectedCallback () {
    this.renderNavBar()
  }

  set clickCallback (callBack) {
    this._eventCallback = callBack
    this.setCallback()
  }

  get clickCallback () {
    return this._eventCallback
  }

  initNavBar () {
    Sidenav.init(this.querySelectorAll('.sidenav'))
    Dropdown.init(this.querySelectorAll('.dropdown-trigger'), {
      coverTrigger: false,
      constrainWidth: false
    })
    this.querySelectorAll('.sidenav a').forEach((elm) => {
      elm.addEventListener('click', () => {
        const sidenav = document.querySelector('.sidenav')
        Sidenav.getInstance(sidenav).close()
      })
    })
  }

  renderNavBar () {
    const tournamentItem = `
      <li><a href="#2002" class="waves-effect nav-item">Bundesliga</a></li>
      <li><a href="#2015" class="waves-effect nav-item">Ligue 1</a></li>
      <li><a href="#2014" class="waves-effect nav-item">La Liga</a></li>
      <li><a href="#2021" class="waves-effect nav-item">Premier League</a></li>
      <li><a href="#2019" class="waves-effect nav-item">Serie A</a></li>
      <li><a href="#2001" class="waves-effect nav-item">UEFA Champions League</a></li>
    `
    this.innerHTML = `
      <nav class="black" role="navigation">
        <div class="nav-wrapper container">
          <a class="brand-logo" id="logo">
            <i class="material-icons">sports_soccer</i>PWA</a>
          <a class="sidenav-trigger" data-target="nav-mobile">
            <i class="material-icons">menu</i></a>

          <ul class="topnav right hide-on-med-and-down">
            <li><a href="#home" class="waves-effect nav-item">Home</a></li>
            <li>
              <a class="dropdown-trigger waves-effect" data-target="dropdown1">Tournament
                <i class="material-icons right">arrow_drop_down</i>
              </a>
              <ul id="dropdown1" class="dropdown-content" tabindex="0">
                ${tournamentItem}
              </ul>
            </li>
            <li><a href="#favorite" class="waves-effect nav-item">Favorite</a></li>
          </ul>

          <ul class="sidenav" id="nav-mobile">
            <li>
              <div class="user-view">
                <div class="background black">
                </div>
                <a><img src="assets/icons/app-icon.png" alt="icon" class="circle"></a>
                <a><span class="white-text name">FootBall App</span></a>
                <a><span class="white-text email">a.raziq.1992@gmail.com</span></a>
              </div>
            </li>
            <li><a href="#home" class="waves-effect nav-item">Home</a></li>
            <li class="divider"></li>
            <li><a class="subheader">Tournament</a></li>
            ${tournamentItem}
            <li class="divider"></li>
            <li><a href="#favorite" class="waves-effect nav-item">Favorite</a></li>
          </ul>
        </div>
      </nav>
    `
    this.initNavBar()
  }

  setCallback () {
    document.querySelectorAll('.nav-item').forEach((elm) => {
      elm.addEventListener('click', event => {
        event.preventDefault()
        const page = event.target.getAttribute('href').substr(1)
        this._eventCallback(page)
      })
    })
  }
}

customElements.define('nav-bar', NavBar)
