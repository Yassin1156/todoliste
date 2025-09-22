export type todo = {
  content: string,
  id: number,
  done: boolean
}

export type project = {
  name: string;
  todos: todo[];
};

export type Account = {
  email: string;
  password: string;
  projects: project[];
};
export type LoginPageProps = {
  accounts: Account[];
  setCurrentAccountIndex: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export type RegistrationPageProps = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setCurrentAccountIndex: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export type TodoPageProps = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  currentAccountIndex: number;
};