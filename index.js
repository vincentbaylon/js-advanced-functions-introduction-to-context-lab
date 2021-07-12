// Your code here
function createEmployeeRecord(arr) {
    let employeeRecordObject = { 
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeRecordObject
}

function createEmployeeRecords(arr) {
    let employeeRecords = []

    arr.forEach(eachArr => {
        let newEmployeeObject = createEmployeeRecord(eachArr)
        employeeRecords.push(newEmployeeObject)
    })

    return employeeRecords
}

function createTimeInEvent(rec, date) {
    let newDate = date.split(' ')

    let newObject = {
        type: 'TimeIn',
        hour: parseInt(newDate[1]),
        date: newDate[0]
    }
    rec.timeInEvents.push(newObject)

    return rec
}

function createTimeOutEvent(rec, date) {
    let newDate = date.split(' ')

    let newObject = {
        type: 'TimeOut',
        hour: parseInt(newDate[1]),
        date: newDate[0]
    }
    rec.timeOutEvents.push(newObject)

    return rec
}

function hoursWorkedOnDate(rec, date) {
    let inEvent = rec.timeInEvents.find(eachDate => eachDate.date === date)
    let outEvent = rec.timeOutEvents.find(eachDate => eachDate.date === date)

    if (inEvent.date === outEvent.date) {
        return ((outEvent.hour - inEvent.hour) / 100)
    }
}

function wagesEarnedOnDate(rec, date) {
    return (hoursWorkedOnDate(rec, date) * rec.payPerHour)
}

function allWagesFor(rec) {
    let wages = 0;
    rec.timeInEvents.forEach(eachEvent => {
        wages = wages + wagesEarnedOnDate(rec, eachEvent.date)
    })
    return wages
}

function calculatePayroll(rec) {
    let wages = 0;
    rec.forEach(eachRec => eachRec.timeInEvents.forEach(eachEvent => {
        wages = wages + wagesEarnedOnDate(eachRec, eachEvent.date)
        })
    )
    return wages
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(eachRec => eachRec.firstName === name)
}