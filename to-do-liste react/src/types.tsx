export type project = {
  id: string;
  name: string;
};

export type LoginPageProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLoginSuccess: (accountId: string, userName: string) => void;
};

export type RegistrationPageProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export type TodoPageProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProjectSelected: boolean;
  setIsProjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
  currentProjectIndex: number;
  setCurrentProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  projects: project[];
  setProjects: React.Dispatch<React.SetStateAction<project[]>>;
  userName: string;
  onLogout: () => void;
};

export type SidebarProps = {
  projects: project[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProjectIndex?: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  onLogout: () => void;
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
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
  currentProjectIndex: number;
  setCurrentProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  projects: project[];
  setProjects: React.Dispatch<React.SetStateAction<project[]>>;
  userName: string;
  onLogout: () => void;
};

export type FilterKey = 'alle' | 'erledigt' | 'nichterledigt' | 'faellig';

export type FilterWindowProps = {
  isFilterWindowOpen: boolean;
  setIsFilterWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: FilterKey;
  setSelected: React.Dispatch<React.SetStateAction<FilterKey>>;
};
