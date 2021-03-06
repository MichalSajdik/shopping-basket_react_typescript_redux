import * as React from "react";
import styled from "styled-components";
import Item from "./Item";
import Search from "./Search";

import {connect} from 'react-redux';

import {AppState} from "../store/rootStore";
import {ItemInterface} from "../store/items/models/Items";
import {useState} from "react";

const ItemsContainer = styled.div`
  padding: 0 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ItemsProvidedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  @media (min-width: 768px) {
    margin: auto;
    width: 1000px;
  }
`;

const ItemsProvided = (props: ItemsProvidedProps) => {
  const [filter, setFilter] = useState("");

  function itemsFilter(item: ItemInterface) {
    return item.name.includes(filter);
  }

  return (
    <Container>
      <Search onInput={setFilter}/>
      <ItemsProvidedContent>
        <ItemsContainer>
          {props.items.length > 0 && props.items.filter(itemsFilter).map((item: ItemInterface, i: number) => {
            return (
              <Item name={item.name} price={item.price + " Czk"} index={i} key={item.id} id={item.id}/>
            )
          })}
        </ItemsContainer>
      </ItemsProvidedContent>
    </Container>
  )
};

interface ItemsProvidedProps {
  items: ItemInterface[]
}

const mapStateToProps = (state: AppState) => ({
  items: state.itemsReducer.items
});

export default connect(mapStateToProps, null)(ItemsProvided);