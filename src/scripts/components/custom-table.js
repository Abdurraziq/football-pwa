class CustomTable extends HTMLElement {
  set dataTable (data) {
    this._data = data
    this.render()
  }

  get dataTable () {
    return this._data
  }

  render () {
    const tableHead = this._data.tableHead
    const tableData = this._data.tableData
    const table = document.createElement('table')

    const createRow = (row, text, cellTag = 'td') => {
      const cell = document.createElement(cellTag)
      cell.appendChild(document.createTextNode(text))
      row.appendChild(cell)
    }

    const createTableHeader = () => {
      const headRow = document.createElement('tr')
      const tabelHead = document.createElement('thead')

      tableHead.forEach(title => {
        createRow(headRow, title, 'th')
      })
      tabelHead.appendChild(headRow)
      return tabelHead
    }

    const createTableBody = () => {
      const tabelBody = document.createElement('tbody')
      tableData.forEach((dataList) => {
        const bodyRow = document.createElement('tr')
        dataList.forEach((data) => {
          createRow(bodyRow, data)
        })
        tabelBody.appendChild(bodyRow)
      })
      return tabelBody
    }

    table.className = 'striped'
    table.appendChild(createTableHeader())
    table.appendChild(createTableBody())

    this.appendChild(table)
  }
}

customElements.define('custom-table', CustomTable)
