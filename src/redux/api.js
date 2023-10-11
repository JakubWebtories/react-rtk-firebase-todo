import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const api = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getData: builder.query({
      async queryFn() {
        try {
          const tasksRef = collection(db, "tasks");
          const querySnaphot = await getDocs(tasksRef);
          let tasks = [];
          querySnaphot?.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
          });
          querySnaphot.forEach((task) => {
            console.log(task);
          });
          console.log(tasks);
          return { data: tasks };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Tasks"],
    }),

    singleTask: builder.query({
      async queryFn(id) {
        try {
          const taskRef = doc(db, "tasks", id);
          const snapshot = await getDoc(taskRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Tasks"], // Optionally invalidate the "Tasks" tag to trigger a refetch of the tasks data after a successful post
    }),

    postData: builder.mutation({
      async queryFn(newTask) {
        try {
          const tasksRef = collection(db, "tasks");
          const docRef = await addDoc(tasksRef, newTask);
          const addedDoc = await getDoc(docRef);
          const addedTask = { id: addedDoc.id, ...addedDoc.data() };
          return { data: addedTask };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Tasks"],
    }),

    deleteData: builder.mutation({
      async queryFn(id) {
        try {
          const tasksRef = doc(db, "tasks", id);
          console.log(tasksRef.id);
          await deleteDoc(tasksRef);
          return { id };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Tasks"], // Optionally invalidate the "Tasks" tag to trigger a refetch of the tasks data after a successful post
    }),

    updateTask: builder.mutation({
      async queryFn(updatedTask, id) {
        try {
          const { id, ...data } = updatedTask;
          const taskRef = doc(db, "tasks", id);
          await updateDoc(taskRef, data);
          return { data: updatedTask };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  useDeleteDataMutation,
  useUpdateTaskMutation,
  useSingleTaskQuery,
} = api;
