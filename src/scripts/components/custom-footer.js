class CustomFooter extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
      <footer class="page-footer black">
        <div class="container">
          <div class="row">

            <div class="col l6 s12">
              <h5 class="white-text">Football PWA</h5>
              <blockquote>Submission kelas <b>Membangun Progressive
                  Web App</b>.</blockquote>
            </div>

            <div class="col l4 offset-l2 s12 hide-on-med-and-down">
              <h5 class="white-text">Referensi</h5>
              <ul>
                <li><a class="grey-text text-lighten-3" href="https://www.dicoding.com/academies/74">Dicoding</a></li>
                <li><a class="grey-text text-lighten-3" href="https://www.football-data.org/">Football-data.org</a></li>
              </ul>
            </div>

          </div>
        </div>
        <div class="footer-copyright grey darken-4">
          <div class="container center">By: A. Bachmid - 2020</div>
        </div>
      </footer>
    `
  }
}

customElements.define('custom-footer', CustomFooter)
