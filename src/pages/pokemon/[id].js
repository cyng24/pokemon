import * as React from "react"
import ListItem from '../components/ListItem.jsx';

const Pokemon = ({ location }) => {
  return (
    <div>
      <ListItem pathname={location.pathname}/>
    </div>
  )
}

export default Pokemon