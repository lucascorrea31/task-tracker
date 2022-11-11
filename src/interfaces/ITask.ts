import IProject from "./IProject";

export default interface ITask {
  id: string;
  time: number;
  description: string;
  project: IProject;
}