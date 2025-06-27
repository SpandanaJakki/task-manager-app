package com.sample.taskmanager.service;

import com.sample.taskmanager.exception.TaskNotFoundException;
import com.sample.taskmanager.model.Task;
import com.sample.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepo;


    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Task existingTask= taskRepo.findById(id)
                .orElseThrow(()->new TaskNotFoundException("cannot find the task with id:"+id));
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());
        return taskRepo.save(existingTask);
    }

    public void deleteTask(Long id) {
        if(!taskRepo.existsById(id)) {
            throw new TaskNotFoundException("cannot find the task with id:"+id);
        }
        taskRepo.deleteById(id);
    }


}
