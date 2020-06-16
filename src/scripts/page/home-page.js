import { Slider } from 'materialize-css'

class HomePage extends HTMLElement {
  connectedCallback () {
    this.renderHomePage()
  }

  renderHomePage () {
    this.innerHTML = `
      <div class="slider">
        <ul class="slides">
          <li>
            <img src="assets/img/carousel/bundesliga.jpg">
            <div class="caption center-align">
              <h3>Bundesliga</h3>
              <h5 class="light grey-text text-lighten-3">Fußball-Bundesliga</h5>
            </div>
          </li>
          <li>
            <img src="assets/img/carousel/laliga.jpg">
            <div class="caption left-align">
              <h3>LaLiga</h3>
              <h5 class="light grey-text text-lighten-3">La Liga Santander</h5>
            </div>
          </li>
          <li>
            <img src="assets/img/carousel/premier_league.jpg">
            <div class="caption center-align">
              <h3>Premier</h3>
              <h5 class="light grey-text text-lighten-3">Premier League</h5>
            </div>
          </li>
          <li>
            <img src="assets/img/carousel/serie_a.jpg">
            <div class="caption right-align">
              <h3>Serie A</h3>
              <h5 class="light grey-text text-lighten-3">Italian Serie A</h5>
            </div>
          </li>
        </ul>
      </div>
      
      <h5>Selamat datang di aplikasi Football PWA!</h5>
      <p>Aplikasi ini memuat informasi singkat mengenai enam turnamen sepakbola utama di Eropa, yaitu:</p>
      
      <div>
        <div class="row">
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/bundesliga.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">Bundesliga</p>
              </div>
            </div>
          </div>
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/la_liga.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">Laliga</p>
              </div>
            </div>
          </div>
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/ligue_1.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">Laliga</p>
              </div>
            </div>
          </div>
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/premier.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">Premier League</p>
              </div>
            </div>
          </div>
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/serie_a.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">Serie A</p>
              </div>
            </div>
          </div>
          <div class="col s12 m4 xl2">
            <div class="card hoverable">
              <div class="card-image">
                <img src="assets/img/badge/uefa.svg">
              </div>
              <div class="card-content">
                <p class="card-title truncate">UEFA Champion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <p>
        Aplikasi ini dibuat untuk submission kelas
        <a href="https://www.dicoding.com/academies/74"><b>Membangun Progressive Web Apps</b></a>
        di Dicoding.com. Semua data yang ditampilkan dalam aplikasi ini diperoleh dari
        <a href="https://www.football-data.org"><b>Football-data.org</b></a>.
      </p>
    `
    const elems = this.querySelectorAll('.slider')
    Slider.init(elems, { interval: 4500 })
  }
}

customElements.define('home-page', HomePage)
