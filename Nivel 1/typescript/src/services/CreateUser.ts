type EechsProps = {
  title: string;
  experience: number;
};

type createUSerType = {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | EechsProps>;
  //   techs: EechsProps[] | string[];
};

export default function createUser({
  email,
  name = "",
  password,
  techs,
}: createUSerType) {
  const user: createUSerType = {
    name,
    email,
    password,
    techs,
  };

  return user;
}
