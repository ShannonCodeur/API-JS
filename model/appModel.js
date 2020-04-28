'use strict';

var sql = require('./db.js');

// Taks Object Constructor

var Task = function(task){
	this.task = task.task;
	this.status = task.status;
	this.created_at = new Date();
};

Task.createTask = function(newTask, result){
	sql.query("INSERT INTO tasks SET ?", newTask, function(err, res){
		if(err){
			console.log("Error: ", err);
			result(err, null);
		} else {
			console.log(res.insertId);
			result(null, res.inserId);
		}
	});
};

Task.getTaskById = function(taskId, result){
	sql.query("SELECT task FROM Tasks WHERE id = ? ", taskId, function(err, res){
		if(err){
				console.log("Error ", err);
				result(err, null);
		}else{
				console.log('Tasks : ', res);
				result(null, res);
			}

	});
};

Task.getAllTask = function(result){
	sql.query("SELECT * FROM tasks", function(err, res){
		if(err){
			console.log("Error: ", err);
			result(null, err);
		}
		else{
			console.log("Tasks: ", res);
			result(null, res);
		}

	});
		
};

Task.updateById = function(id, task, result){
	sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function(err,res){
		if(err){
			console.log("Error: ", err);
			result(null,err);
		}else{
			result(null, res);
		}
	});
};


Task.remove = function(id, result){
	sql.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res){
		if(err)
		{
			console.log("Error: ", err);
			result(null, err);
		}else{
			result(null, res);
		}
	});
};

module.exports = Task;