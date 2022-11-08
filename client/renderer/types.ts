import React from "react";
import { SetStateAction, Dispatch } from "react";

export interface GroupUserType {
  userId: number;
  name: string;
  email: string;
  nickName: string;
  role: string;
  profileImg?: string;
}

export interface GroupOptions extends Object {
  teamId: number;
  name: string;
  imageUrl: string | null | ArrayBuffer;
}

export interface UserProfileOptions extends Object {
  email: string;
  name: string;
  nickname: string;
  role: string;
  profileImage: string;
}

export interface BarProps {
  selectedTeamId: number;
  setSelectedTeamId: Dispatch<SetStateAction<number>>;
}

interface TagPropsType {
  header?: string;
  target?: string;
  children?: string | string[];
  label?: string[];
  option?: string[];
  type?: string;
  placeholder?: string;
  count?: 2;
  row?: number;
  column?: number;
  href?: string;
  name?: string;
  style?: React.CSSProperties;
}

export interface TagType {
  type: string;
  tagProps: TagPropsType;
}

export interface InputType {
  [key: string]: string | string[];
}