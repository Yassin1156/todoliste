export type todo = {
  content: string,
  id:   string,
  done: boolean,
  deadline: string
}

export type project = {
  id: string;
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
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProjectSelected: boolean;
  setIsProjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
  currentProjectIndex: number;
  setCurrentProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type SidebarProps = {
  currentAccount: {
    userName: string;
    password: string;
    projects: {
      id: string;
      name: string;
      todos: { content: string; id: string; done: boolean }[];
    }[];
  };
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProjectIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export type SetTimeWindowProps = {
  isTimeWindowOpem: boolean;
  setIsTimeWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: () => void;
  hours: string;
  minutes: string;
  setHours: React.Dispatch<React.SetStateAction<string>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
};

export type ShareWindowProps = {
  isShareWindowOpen: boolean;
  setIsShareWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shareLink: string;
};

export type ProjectPageProps = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  currentAccountIndex: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
  currentProjectIndex: number;
  setCurrentProjectIndex: React.Dispatch<React.SetStateAction<number>>;
};