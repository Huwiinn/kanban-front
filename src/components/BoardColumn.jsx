import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoardThunk } from "../redux/modules/boardSlice";
import styled from "styled-components";
import BoardItem from "./BoardItem";
import { nanoid } from "@reduxjs/toolkit";

const BoardColumnStyled = styled.div`
  max-width: 21.25rem;
  width: 100%;
  height: 100%;

  margin: 0 0.625rem;
  padding: 0.625rem;
  padding-bottom: 1.875rem;

  border: 1px solid #ccc;
  border-radius: 0.625rem;

  box-shadow: 0 0 3px rgba(170, 170, 170, 1);

  transition-duration: 0.3s;

  :hover {
    box-shadow: 0.3125rem 0.3125rem 0.75rem rgba(0, 0, 0, 0.7);
  }
  :hover .title {
    color: #2563eb;
  }

  /* background-color: beige; */
  .title {
    position: relative;
    top: 0;
    left: 0;

    width: 100%;
    margin: 0.75rem 0;

    font-size: 1.5rem;
    font-weight: bold;

    text-align: center;

    transition-duration: 0.3s;
  }
`;

const BoardColumn = (props) => {
  console.log("props : ", props);

  const dispatch = useDispatch();

  const { isLoading, error, boards } = useSelector((state) => state.boards);
  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);

  //  <BoardColumn category="Schedule" /> prop으로 내려운 category와 db.json의 category와 매칭시켜서 kanban의 위치를 지정함..
  const renderedBoardItems = boards.map((item) => {
    console.log("item.category : ", item.category);

    if (item.category === props.category) {
      return <BoardItem {...item} key={nanoid()}></BoardItem>;
    }
    return null;
  });

  return (
    <BoardColumnStyled>
      {/*Column title입니다.*/}
      <h3 className="title">{props.title}</h3>
      <ul>{renderedBoardItems}</ul>
    </BoardColumnStyled>
  );
};

export default BoardColumn;
