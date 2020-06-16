import '../components/nav-bar.js'
import '../page/home-page.js'
import '../page/team-list.js'
import '../page/fav-list.js'

import DataSource from '../data/data-sources'
import AppDB from '../db/app-db'

const dataSource = new DataSource()
const appDB = new AppDB()

const content = document.querySelector('#body-content')

/**
 * Menampilkan halaman muka web (homepage)
 */
const showHome = async () => {
  content.innerHTML = ''
  const homePage = document.createElement('home-page')
  content.appendChild(homePage)
}

/**
 * Menampilkan daftar tim dalam satu turnamen / liga
 * @param {string} id kode turnamen / liga
 */
const showTeamList = async (id) => {
  content.innerHTML = ''
  const teamList = document.createElement('team-list')
  content.appendChild(teamList)
  try {
    const result = await dataSource.getTeamList(id)
    teamList.data = result
  } catch (error) {
    teamList.renderError(error)
  }
}

/**
 * Menampilkan daftar tim yang telah difavoritkan
 */
const showFavList = async () => {
  content.innerHTML = ''
  const favList = document.createElement('fav-list')
  content.appendChild(favList)
  try {
    const result = await appDB.getAll()
    favList.data = result
  } catch (error) {
    favList.renderError(error)
  }
}

/**
 * Menampilkan halaman berdasarkan parameter page
 * @param {string} page parameter halaman yang akan ditampilkan
 */
const renderPage = (page) => {
  if (page === 'home') {
    showHome()
  } else if (page === 'favorite') {
    showFavList()
  } else {
    showTeamList(page)
  }
}

/**
 * Click callback untuk anchor menu nav-bar.
 * @param {string} page parameter halaman dari anchor menu nav-bar.
 */
const navCallback = (page) => {
  renderPage(page)
  history.pushState(page, null, `#${page}`)
}

const main = async () => {
  let page = window.location.hash.substr(1)
  if (page === '') page = 'home'
  renderPage(page)

  // Inisialisasi nav-bar
  const navBar = document.querySelector('nav-bar')
  navBar.clickCallback = navCallback

  window.addEventListener('popstate', function (e) {
    const page = e.state
    page != null ? renderPage(page) : showHome()
  })
}

export default main
