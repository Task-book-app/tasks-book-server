import {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
} from "graphql";
import Task from "../../models/Task.js";
import { TaskType } from "../types/TaskType.js";
import { SeedPromise } from "../../util/seedsFunctions.js";

export const createTask = {
  type: TaskType,
  description: "Authenticated user create a new task",
  args: {
    task: { type: GraphQLString },
    category: { type: GraphQLString },
    // date: { type: GraphQLString },
    priority: { type: GraphQLInt },
    completed: { type: GraphQLBoolean },
  },
  resolve: async (_, args, { user }) => {
    try {
      if (!user) throw new Error("INVALID_ACTION");
      const data = {
        ...args,
        owner: user._id,
      };
      const newTask = await Task.create(data);
      return newTask;
    } catch (error) {
      console.error(
        "Error in task_mutations > createTask > resolve:",
        error.message
      );
      throw new Error(error.message);
    }
  },
};

export const completedTask = {
  type: TaskType,
  description: "Authenticated user complete a task",
  args: {
    id: { type: GraphQLID },
    completed: { type: GraphQLBoolean },
  },
  resolve: async (_, args, { user }) => {
    try {
      if (!user) throw new Error("INVALID_ACTION");

      const updatedTask = await Task.findByIdAndUpdate(
        args.id,
        { completed: args.completed },
        { new: true }
      );
      if (!updatedTask) throw new Error("TASK_NOT_FOUND");
      return updatedTask;
    } catch (error) {
      console.error(
        "Error in task_mutations > completedTask > resolve:",
        error.message
      );
      throw new Error(error.message);
    }
  },
};

export const updateTask = {
  type: TaskType,
  description: "Authenticated user update a task",
  args: {
    id: { type: GraphQLID },
    task: { type: GraphQLString },
  },
  resolve: async (_, args, { user }) => {
    try {
      if (!user) throw new Error("INVALID_ACTION");
      const updatedTask = await Task.findByIdAndUpdate(
        args.id,
        { task: args.task },
        { new: true }
      );

      if (!updatedTask) throw new Error("TASK_NOT_FOUND");

      return updatedTask;
    } catch (error) {
      console.error(
        "Error in task_mutations > updateTask > resolve:",
        error.message
      );
      throw new Error(error.message);
    }
  },
};

export const deleteTask = {
  type: new GraphQLList(TaskType),
  description: "Authenticated user deletes a task",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args, { user }) => {
    try {
      if (!user) throw new Error("INVALID_ACTION");
      const deletedTask = await Task.findByIdAndDelete(args.id);
      if (!deletedTask) throw new Error("TASK_NOT_FOUND");
      // return deletedTask;
      const updatedList = await Task.find({ owner: user._id });
      return updatedList;
    } catch (error) {
      console.error(
        "Error in task_mutations > deletedTask > resolve:",
        error.message
      );
      throw new Error(error.message);
    }
  },
};

export const seedTasks = {
  type: GraphQLString,
  description: "Authenticated user seeds new fake tasks",
  resolve: async (_, __, { user }) => {
    if (!user) throw new Error("INVALID_ACTION");

    try {
      await Task.deleteMany({ owner: user._id });
      console.log(
        `All Tasks for ${user.username} are now in a better place... Cancun`
      );
    } catch (error) {
      console.log(error);
    }

    const homeTasks = new SeedPromise(user._id, "housework");
    const familyTasks = new SeedPromise(user._id, "family");
    const workTasks = new SeedPromise(user._id, "work");
    const sportsTasks = new SeedPromise(user._id, "sports");

    try {
      await Promise.all(
        homeTasks.addPromise(9),
        familyTasks.addPromise(5),
        workTasks.addPromise(3),
        sportsTasks.addPromise(7)
      );

      console.log(`****************************************************`);
      console.log(`All fake tasks have been stored to the DB`);
      console.log(`****************************************************`);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
    return `All fake tasks have been stored to the DB`;
  },
};
