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
  render() {
    const { columns, title } = this.props

    const columnHeaderCells = []
    for (let i = 0; columns.length > i; ++i) {
      const column = columns[i]

      columnHeaderCells.push(
        <th>{column.title}</th>
      )
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Table>
            <thead>
              {columnHeaderCells}
            </thead>
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
        tables: json
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
          columns={table.columns}
          title={table.title}
        />
      )
    }

    return (
      <>
        <AppNav/>
        {isFetched ? <SchemaTable/> : null}
      </>
    )
  }
}

export default App