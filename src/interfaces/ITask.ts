import IProject from "./IProject";

export default interface ITask {
  time: number;
  description: string;
  project: IProject;
}