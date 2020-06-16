import '../components/nav-bar.js'
import '../page/team-detail.js'

import { toast } from 'materialize-css'

import AppDB from '../db/app-db'
import DataSource from '../data/data-sources'

const dataSource = new DataSource()
const appDB = new AppDB()

const content = document.querySelector('#body-content')

/**
 * Callback untuk floating action button #fav
 * @param {Object} team informasi team
 * @param {boolean} isFavoriting mengindikasikan apakah team akan difavoritkan
 * atau tidak.
 */
const favCallBack = (team, isFavoriting) => {
  if (isFavoriting) {
    appDB.addToFavorite(team)
    toast({ html: 'Succes Add to Favorite' })
  } else {
    appDB.removeFromFavorite(team.id)
    toast({ html: 'Removed from Favorite' })
  }
}

/**
 * Menampilkan informasi team
 * @param {string} id kode tim
 */
const showTeamInfo = async (id) => {
  const teamDetail = document.createElement('team-detail')
  content.appendChild(teamDetail)

  try {
    let teamInfo = await appDB.getById(parseInt(id))
    let isFav = true
    // Jika informasi team tidak ada dalam idb maka data akan diambil dari
    // server.
    if (!teamInfo) {
      teamInfo = await dataSource.getTeamInfo(id)
      isFav = false
    }

    teamDetail.data = {
      detail: teamInfo,
      callBackSave: favCallBack,
      isFav: isFav
    }
  } catch (error) {
    teamDetail.renderError(error)
  }
}

const main = async () => {
  const urlParams = new URLSearchParams(window.location.search)

  document
    .getElementById('back')
    .addEventListener('click', event => {
      event.preventDefault()
      history.back()
    })

  showTeamInfo(urlParams.get('id'))
}

export default main
