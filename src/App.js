import React, { Component } from 'react'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

  Card,
  CardBody,
  CardTitle,

  Table
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

function AppNav() {
  return (
    <Navbar color='light' light>
      <NavbarBrand>Toro</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink href='#'>Test</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}



class SchemaTable extends Component {
  state = {
    isFetched: false,
    rows: []
  }

  async componentDidMount() {
    const { id } = this.props

    try {
      const response = await fetch(`https://interview.torodata.io/metrics/${id}`)
      const json = await response.json()

      console.log(json)

      this.setState({
        isFetched: true,
        rows: json
      })

    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { columns, title } = this.props
    const { rows } = this.state

    const columnHeaderCells = []
    for (let i = 0; columns.length > i; ++i) {
      const column = columns[i]

      columnHeaderCells.push(
        <th key={i}>{column.name}</th>
      )
    }

    const rowCells = []
    for (let r = 0; rows.length > r; ++r) {
      const row = rows[r]

      console.log({ row })

      const { id, metric, column, currentValue } = row

      rowCells.push(
        <tr>
          <td>{id}</td>
          <td>{metric}</td>
          <td>{column}</td>
          <td>{currentValue}</td>
        </tr>
      )
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Table>
            <thead>
              <tr>
                {columnHeaderCells}
              </tr>
            </thead>
            <tbody>
              {rowCells}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

class App extends Component {
  state = {
    isFetched: false,
    tables: []
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://interview.torodata.io/tables')
      const json = await response.json()

      console.log(json)

      this.setState({
        tables: json,
        isFetched: true
      })

    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { tables, isFetched } = this.state
    const tablesCards = []

    for (let i = 0; tables.length > i; ++i) {
      const table = tables[i]

      tablesCards.push(
        <SchemaTable
          key={i}
          id={table.id}
          columns={table.columns}
          title={table.table}
        />
      )
    }

    return (
      <>
        <AppNav/>
        {isFetched ? tablesCards : null}
      </>
    )
  }
}

export default App