export type todo = {
  content: string,
  id:   string,
  done: boolean
}

export type project = {
  name: string;
  todos: todo[];
};

export type Account = {
  userName: string;
  password: string;
  projects: project[];
};
export type LoginPageProps = {
  accounts: Account[];
  setCurrentAccountIndex: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export type RegistrationPageProps = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setCurrentAccountIndex: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export type TodoPageProps = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  currentAccountIndex: number;
};

export type SidebarProps = {
  currentAccount: {
    userName: string;
    password: string;
    projects: {
      name: string;
      todos: { content: string; id: string; done: boolean }[];
    }[];
  };
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};