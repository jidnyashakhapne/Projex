import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { activities, projects, tasks, teamMembers } from '../data/mockData';
import { AppData, CreateTaskPayload, Task } from '../types';

const fallbackData: AppData = {
  projects,
  tasks,
  teamMembers,
  activities,
};

export function useAppData() {
  const [data, setData] = useState<AppData>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [projectList, taskList, memberList, activityList] = await Promise.all([
        api.getProjects(),
        api.getTasks(),
        api.getTeamMembers(),
        api.getActivities(),
      ]);

      setData({
        projects: projectList,
        tasks: taskList,
        teamMembers: memberList,
        activities: activityList,
      });
      setError(null);
    } catch (err) {
      setData(fallbackData);
      setError(err instanceof Error ? err.message : 'Unable to load backend data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createTask = useCallback(async (payload: CreateTaskPayload) => {
    const task = await api.createTask(payload);
    setData((current) => ({ ...current, tasks: [task, ...current.tasks] }));
    return task;
  }, []);

  const updateTaskStatus = useCallback(async (taskId: string, status: Task['status']) => {
    const task = await api.updateTaskStatus(taskId, status);
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((item) => item.id === task.id ? task : item),
    }));
    return task;
  }, []);

  return useMemo(() => ({
    ...data,
    isLoading,
    error,
    refresh,
    createTask,
    updateTaskStatus,
  }), [createTask, data, error, isLoading, refresh, updateTaskStatus]);
}
