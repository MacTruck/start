
class User {
	constructor(name, email) {
		this.name = name,
		this.email = email,
		this.records = []
	}

	newRecord() {
		let record = new Record();
		this.records.push(record);
	}
}

class Record {
	constructor {
		this.startTime = new Date()
		this.endTime = null,
		this.project = 'Untitled Project',
		this.tasks = []
		// this.pauses = []
	}

	// createPause() {}

	newTask() {
		let task = new Task();
		this.tasks.push(task);
	}
}
// >> after 'Start'

// class Pause {
// 	constructor {
// 		this.startPause = new Date(),
// 		this.endPause = null
// 	}
// } >> after 'Pause'

class Task {
	constructor(contents) {
		// this.timeStamp = new Date(),
		this.contents
	}
}
// >> after 'Add Task' (save previous)

