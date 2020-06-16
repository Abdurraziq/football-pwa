import { openDB } from 'idb/with-async-ittr'

class AppDB {
  async _db () {
    return await openDB('Football-app', 1, {
      upgrade (db) {
        const store = db.createObjectStore('fav-club', { keyPath: 'id' })
        store.createIndex('name', 'name', { unique: false })
      }
    })
  }

  /**
   * Menambakan data suatu tim favorit ke idb
   * @param {Object} team data tim
   */
  addToFavorite (team) {
    this._db()
      .then(db => {
        const tx = db.transaction('fav-club', 'readwrite')
        const store = tx.objectStore('fav-club')
        store.add(team)
        return tx.complete
      })
      .then(() => {
        console.log('Club berhasil difavoritkan.')
      })
  }

  /**
   * Menghapus data suatu tim dari idb
   * @param {number} id kode tim
   */
  removeFromFavorite (id) {
    this._db()
      .then(db => {
        const tx = db.transaction('fav-club', 'readwrite')
        const store = tx.objectStore('fav-club')
        store.delete(id)
        return tx.complete
      })
      .then(() => {
        console.log('Club berhasil dihapus.')
      })
  }

  /**
   * Mengambil data semua tim yang difavoritkan dari idb
   */
  getAll () {
    const db = this._db()
    return new Promise(function (resolve) {
      db
        .then(db => {
          const tx = db.transaction('fav-club', 'readonly')
          const store = tx.objectStore('fav-club')
          return store.getAll()
        })
        .then(favClubs => {
          resolve(favClubs)
        })
    })
  }

  /**
   * Mengambil data suatu tim yang difavoritkan dari idb
   * @param {number} id kode tim
   */
  getById (id) {
    const db = this._db()
    return new Promise(function (resolve) {
      db
        .then(db => {
          const tx = db.transaction('fav-club', 'readonly')
          const store = tx.objectStore('fav-club')
          return store.get(id)
        })
        .then(favClub => {
          resolve(favClub)
        })
    })
  }
}

export default AppDB
