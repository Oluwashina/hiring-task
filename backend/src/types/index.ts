import { UserEntity } from "../entities";

export type PayloadType = {
  id: string;
};

export type PayloadTypeUser = {
  uuid: string;
};

export type CreateTitleType = {
  title: string;
  userId: UserEntity;
};
