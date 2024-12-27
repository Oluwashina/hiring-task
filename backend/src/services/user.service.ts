import { UserEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createUser = async (data) => {
  const { username, email, hashPassword } = data;
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const existingUser = await userRepository.findOne({
    where: { email },
  });
  if (existingUser) return null;
  const user = userRepository.create({ username, email,password: hashPassword });
  await userRepository.save(user);
  const { password, ...otherUserField} = user
  return otherUserField;
};

export const getOneUser = async (data) => {
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const findUser = await userRepository.findOne({ where: { ...data } });
  if (!findUser) return null;
  return findUser;
};
