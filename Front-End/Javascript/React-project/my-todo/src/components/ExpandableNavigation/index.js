import React, { useState } from 'react'
import * as S from './styles'
import Dropdown from '../Dropdown'

const ExpandableNavigation = ({ data }) => {
  const { name, data: columnData } = data;

  const [activeDropdown, setActiveDropdown] = useState(false);

  const handleMouseEnter = () => {
    setActiveDropdown(true);
  }

  const handleMouseLeave = () => {
    setActiveDropdown(false);
  }

  return (
    <S.ExpandableNavItemContainer>
      <S.ExpandableNavItem
        show={activeDropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {name}
        <Dropdown data={columnData} />
      </S.ExpandableNavItem>
    </S.ExpandableNavItemContainer>
  )
}

export default ExpandableNavigation
