class DataSource {
  constructor () {
    this.baseUrl = 'https://api.football-data.org/v2'
    this.optionReq = {
      method: 'GET',
      mode: 'cors',
      headers: { 'X-Auth-Token': 'b2a4e4abe74346aaa097ef2f879a90cf' }
    }
  }

  /**
   * Mengambil data dari server
   * @param {string} path bagian url
   */
  async getData (path) {
    const url = `${this.baseUrl}/${path}`
    const res = await fetch(url, this.optionReq)
    if (res.status !== 200) {
      console.log(res.statusText)
      return Promise.reject(new Error(res.statusText))
    }
    return Promise.resolve(res.json())
  }

  /**
   * Mengambil daftar tim dari suatu turnamen / liga
   * @param {string} id kode turnamen / liga
   */
  getTeamList (id) {
    return this.getData(`competitions/${id}/teams`)
  }

  /**
   * Mengambil informasi suatu tim
   * @param {string} id kode tim
   */
  getTeamInfo (id) {
    return this.getData(`teams/${id}`)
  }
}

export default DataSource
