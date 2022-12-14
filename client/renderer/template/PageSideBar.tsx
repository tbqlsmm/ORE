import styled from "@emotion/styled";
import axios from "../utils/axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { PAGE_USER_API, PATH, TEAM_ROLE } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setPageState, setSelectPageState } from "../slices/pageSlice";
import PageOptionDropDown from "../molecule/PageOptionDropDown";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-height: 100%;
  padding: 10px 0;
  overflow: auto;
  background: var(--super-light-main-color);
`;

const DotButton = styled.button`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-height: 30px;
  width: 80%;
  border: solid 1px var(--main-color);
  border-style: dashed;
  border-radius: 4px;
  background-color: transparent;
  color: var(--main-color);
  cursor: pointer;

  :hover {
    background-color: var(--light-main-color);
    color: white;
    border-style: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
`;

type ButtonContainerProps = {
  highlighted: boolean;
};

const PageContainer = styled.div<ButtonContainerProps>`
  display: flex;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  height: 100%;
  border-radius: 4px;

  font-size: var(--font-size-200);
  :hover {
    cursor: pointer;
    color: white;
  }
  background-color: ${(props) =>
    props.highlighted && `var(--light-main-color)`};
  color: ${(props) => props.highlighted && "white"};
`;
const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  width: 80%;
  height: 30px;
  min-height: 30px;
  margin: 0 auto;
  margin: 3px auto;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding-right: 3px;
  ${IconContainer} {
    visibility: ${(props) => (props.highlighted ? "visible" : "hidden")};
  }

  :hover {
    ${IconContainer} {
      visibility: visible;
    }
    background-color: var(--light-main-color);
    cursor: pointer;
    color: white;
    ${PageContainer} {
      color: white;
    }
  }
  background-color: ${(props) =>
    props.highlighted && `var(--light-main-color)`};
  color: ${(props) => props.highlighted && "white"};
`;
export default function PageSideBar() {
  const selectTeam = useAppSelector(
    (state) => state.myTeamsState
  ).selectTeamState;
  const teamList = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const pageList = useAppSelector((state) => state.pageState).pageState;
  const selectPage = useAppSelector((state) => state.pageState).selectPageState;
  const dispatch = useAppDispatch();
  const getPageList = async () => {
    try {
      const params = {
        page: 0,
        size: 100,
      };
      const { data } = await axios.get(
        `${PAGE_USER_API.ALL}/${selectTeam.teamId}`,
        {
          params,
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      dispatch(setPageState(data.data.content));
      dispatch(setSelectPageState({ idx: -1, pageId: -1 }));
    } catch (e) {}
  };

  useEffect(() => {
    if (selectTeam.idx === -1) return;
    getPageList();
  }, [selectTeam.idx, teamList]);

  const handleClickPage = (idx: number, pageId: number, pageName: string) => {
    dispatch(setSelectPageState({ idx, pageId }));
  };

  return (
    <Container>
      {pageList.length > 0 &&
        pageList.map((v, idx) => (
          <ButtonContainer key={v.pageId} highlighted={idx === selectPage.idx}>
            <Link href={PATH.VIEW_PAGE}>
              <PageContainer
                onClick={() => handleClickPage(idx, v.pageId, v.name)}
                highlighted={idx === selectPage.idx}
              >
                {v.name}
              </PageContainer>
            </Link>
            <IconContainer
              onClick={() => handleClickPage(idx, v.pageId, v.name)}
            >
              <PageOptionDropDown
                role={v.role}
                pageId={v.pageId}
                pageName={v.name}
              />
            </IconContainer>
          </ButtonContainer>
        ))}
      {TEAM_ROLE.MANAGER.includes(teamList[selectTeam.idx]?.teamUserRole) && (
        <Link href={PATH.CREATE_PAGE}>
          <DotButton>+</DotButton>
        </Link>
      )}
    </Container>
  );
}
