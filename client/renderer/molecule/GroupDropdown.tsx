import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { GroupUserType } from "../types";

interface SearchMenues {
  name: string;
  nickName: string;
}

interface RoleMenues {
  LEADER: string;
  MANAGER: string;
  USER: string;
}

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues | RoleMenues;
  member?: GroupUserType;
  groupMembers?: Array<GroupUserType>;
}

export default function GroupDropDown(props: SearchDropDownProps) {
  const categoryChange = (event: SelectChangeEvent, userId?: number) => {
    props.setCategory(event.target.value as string);
    if (props.groupMembers !== undefined && userId !== undefined) {
      props.groupMembers[userId].role = event.target.value as string;
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 100, height: 38 }}>
        <Select
          id="demo-simple-select"
          value={
            props.member !== undefined ? props.member.role : props.category
          }
          onChange={(event) => {
            categoryChange(event, props.member?.userId);
          }}
        >
          {Object.entries(props.MenuItems).map((item, idx) => (
            <MenuItem value={item[0]} key={idx}>
              {item[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
